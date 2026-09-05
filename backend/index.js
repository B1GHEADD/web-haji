const express  = require('express');
const cors     = require('cors');
const dotenv   = require('dotenv');
const https    = require('https');
const db       = require('./config/db');

dotenv.config();

const app  = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the uploads directory
app.use('/uploads', express.static('uploads'));

// ── OTP Store (in-memory, expired 3 menit) ──────────────────────────────────
/**
 * Map untuk menyimpan OTP sementara.
 * Key   : userId (string)
 * Value : { otp: string, expiredAt: number (timestamp ms) }
 */
const otpStore = new Map();

/** Durasi valid OTP dalam milidetik (3 menit) */
const OTP_TTL_MS = 3 * 60 * 1000;

/**
 * Generate kode OTP 5 digit angka acak.
 * @returns {string} misal '04821'
 */
const generateOTP = () => String(Math.floor(10000 + Math.random() * 90000));

/**
 * Simpan OTP baru untuk user, hapus otomatis setelah TTL.
 * @param {string} userId
 * @returns {string} kode OTP
 */
const createOTP = (userId) => {
  const otp       = generateOTP();
  const expiredAt = Date.now() + OTP_TTL_MS;
  otpStore.set(userId, { otp, expiredAt });

  // Auto-cleanup setelah expired agar tidak menumpuk
  setTimeout(() => {
    const entry = otpStore.get(userId);
    if (entry && entry.otp === otp) otpStore.delete(userId);
  }, OTP_TTL_MS);

  return otp;
};

/**
 * Verifikasi OTP yang dimasukkan user.
 * @param {string} userId
 * @param {string} inputOtp
 * @returns {{ valid: boolean, reason?: string }}
 */
const verifyOTP = (userId, inputOtp) => {
  const entry = otpStore.get(userId);
  if (!entry) return { valid: false, reason: 'OTP tidak ditemukan atau sudah kedaluwarsa.' };
  if (Date.now() > entry.expiredAt) {
    otpStore.delete(userId);
    return { valid: false, reason: 'OTP sudah kedaluwarsa. Silakan minta OTP baru.' };
  }
  if (entry.otp !== String(inputOtp)) return { valid: false, reason: 'Kode OTP salah.' };
  otpStore.delete(userId); // hapus setelah berhasil dipakai (one-time use)
  return { valid: true };
};

// ── Helper Fonnte WhatsApp ───────────────────────────────────────────────────
/**
 * Kirim pesan WhatsApp via Fonnte API.
 * @param {string} target  - Nomor tujuan format 628xxx
 * @param {string} message - Isi pesan
 * @returns {Promise<object>}
 */
const sendWhatsApp = (target, message) => {
  return new Promise((resolve, reject) => {
    const token = process.env.FONNTE_TOKEN;
    if (!token) return reject(new Error('FONNTE_TOKEN belum diset di file .env'));

    const payload = JSON.stringify({ target: String(target), message: String(message) });

    const options = {
      hostname: 'api.fonnte.com',
      path:     '/send',
      method:   'POST',
      headers: {
        'Authorization': token,
        'Content-Type':  'application/json',
        'Content-Length': Buffer.byteLength(payload),
      },
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try   { resolve(JSON.parse(data)); }
        catch { resolve({ raw: data, status: res.statusCode }); }
      });
    });

    req.on('error', reject);
    req.write(payload);
    req.end();
  });
};

/**
 * Normalisasi nomor HP ke format 628xxx.
 * @param {string} phone
 * @returns {string}
 */
const normalizePhone = (phone) => {
  let p = String(phone).replace(/[\s\-]/g, '');
  if (p.startsWith('+'))  p = p.substring(1);
  if (p.startsWith('0'))  p = '62' + p.substring(1);
  return p;
};

// ── Basic Health Check ───────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({
    status:    'success',
    message:   'Hajj App Backend API is running perfectly!',
    timestamp: new Date(),
  });
});

// ── Database Connection Test ─────────────────────────────────────────────────
app.get('/api/db-test', async (req, res) => {
  try {
    const result = await db.query('SELECT NOW() AS now');
    res.json({
      status:  'success',
      message: 'Database connected successfully to MariaDB',
      time:    result.rows[0].now,
    });
  } catch (err) {
    console.error('Database connection error:', err);
    res.status(500).json({ status: 'error', message: 'Database connection failed' });
  }
});

// ── API Cek Berkas ───────────────────────────────────────────────────────────
app.get('/api/cek-berkas', (req, res) => {
  const data = [
    { noPorsi: '1100445566', nama: 'Budi Santoso',   kekurangan: 'Foto Copy KTP',          status: 'Belum Lengkap' },
    { noPorsi: '1100445567', nama: 'Siti Aminah',    kekurangan: 'Pas Foto 3x4 (4 lembar)', status: 'Belum Lengkap' },
    { noPorsi: '1100445568', nama: 'Ahmad Dahlan',   kekurangan: 'Buku Nikah',              status: 'Belum Lengkap' },
    { noPorsi: '1100445569', nama: 'Nurul Hidayah',  kekurangan: 'Bukti Setoran BPIH',      status: 'Belum Lengkap' },
    { noPorsi: '1100445570', nama: 'Joko Widodo',    kekurangan: 'Surat Keterangan Sehat',  status: 'Belum Lengkap' },
  ];
  res.json({ status: 'success', data });
});

// ── API Estimasi Keberangkatan ───────────────────────────────────────────────
app.get('/api/estimasi', (req, res) => {
  const data = [
    { noPorsi: '1100445566', nama: 'Budi Santoso',   kuota: 'Jawa Tengah', estimasiTahun: '2027', estimasiH: '1448 H', status: 'Terjadwal' },
    { noPorsi: '1100445567', nama: 'Siti Aminah',    kuota: 'Jawa Tengah', estimasiTahun: '2027', estimasiH: '1448 H', status: 'Terjadwal' },
    { noPorsi: '1100446001', nama: 'Rahmad Hidayat', kuota: 'Jawa Tengah', estimasiTahun: '2028', estimasiH: '1449 H', status: 'Menunggu'  },
    { noPorsi: '1100446002', nama: 'Dewi Lestari',   kuota: 'Jawa Tengah', estimasiTahun: '2028', estimasiH: '1449 H', status: 'Menunggu'  },
    { noPorsi: '1100446050', nama: 'Agus Salim',     kuota: 'Jawa Tengah', estimasiTahun: '2029', estimasiH: '1450 H', status: 'Menunggu'  },
  ];
  res.json({ status: 'success', data });
});

// ── Auth: Request OTP via Fonnte WhatsApp ────────────────────────────────────
/**
 * POST /api/auth/login-otp
 * Body: { nik: string }
 *
 * Flow:
 *  1. Cari user berdasarkan NIK → ambil phone_number
 *  2. Generate OTP 5 digit, simpan di otpStore (expired 3 menit)
 *  3. Kirim pesan OTP ke nomor WA user via Fonnte
 *  4. Return hint nomor HP (disensor) agar frontend bisa tampilkan info
 */
app.post('/api/auth/login-otp', async (req, res) => {
  const { nik } = req.body;
  if (!nik) return res.status(400).json({ status: 'error', message: 'NIK diperlukan.' });

  try {
    // 1. Cari user berdasarkan NIK
    const q1 = `
      SELECT jd.user_id, u.phone_number, u.name
      FROM jamaah_details jd
      JOIN users u ON jd.user_id = u.id
      WHERE jd.nik = ?
    `;
    const result = await db.query(q1, [nik]);
    const user   = result.rows[0];

    if (!user) {
      return res.status(404).json({ status: 'error', message: 'NIK tidak ditemukan di database.' });
    }

    // 2. Buat OTP 5 digit & simpan ke store (expired 3 menit)
    console.log('[DEBUG login-otp] user object keys:', Object.keys(user));
    console.log('[DEBUG login-otp] user.user_id:', user.user_id);
    console.log('[DEBUG login-otp] user.id:', user.id);
    const otpKey = user.user_id || user.id;
    console.log('[DEBUG login-otp] key yg dipakai untuk simpan OTP:', otpKey);
    const otp    = createOTP(otpKey);
    const target = normalizePhone(user.phone_number);

    // 3. Kirim OTP via Fonnte
    const message = `Berikut ini kode OTP anda ${otp}\n\nKode ini berlaku selama 3 menit dan hanya untuk sekali pakai.\nJangan berikan kode ini kepada siapapun.`;

    let waSent   = false;
    let waPending = false;
    let waError  = '';
    let waProcess = '';

    try {
      const fonnteRes = await sendWhatsApp(target, message);
      const fonnteStatus = fonnteRes.status === true || fonnteRes.status === 'true';
      waProcess = fonnteRes.process || '';

      // Fonnte mengembalikan status:true tapi process:'pending' = masuk antrian, belum tentu terkirim
      if (fonnteStatus && waProcess === 'pending') {
        waPending = true;
        waSent    = true; // diterima Fonnte, tapi masih pending
        console.log(`[OTP] ⏳ Masuk antrian Fonnte ke ${target} | Process: pending | ID:`, fonnteRes.id);
      } else if (fonnteStatus) {
        waSent = true;
        console.log(`[OTP] ✅ Terkirim ke ${target} | Response:`, fonnteRes);
      } else {
        waError = fonnteRes.reason || 'Gagal dikirim oleh Fonnte';
        console.error(`[OTP] ❌ Ditolak Fonnte ke ${target} | Reason:`, fonnteRes.reason);
      }
    } catch (waErr) {
      waError = waErr.message;
      console.error('[OTP] ❌ Gagal kirim via Fonnte:', waErr.message);
    }

    // Sensor nomor: tampilkan 4 digit awal + **** + 3 digit akhir
    const rawPhone = user.phone_number.replace(/\s/g, '');
    const phoneHint = rawPhone.slice(0, 4) + '****' + rawPhone.slice(-3);

    const isDev = process.env.NODE_ENV !== 'production';

    res.json({
      status:     'success',
      message:    waSent
        ? (waPending ? 'OTP masuk antrian WhatsApp, tunggu sebentar.' : 'OTP berhasil dikirim via WhatsApp.')
        : 'OTP diproses (pengiriman WA gagal).',
      phone_hint: phoneHint,
      wa_sent:    waSent,
      wa_pending: waPending,
      wa_error:   waError || null,
      // Selalu tampilkan OTP di mode development agar testing mudah
      debug_otp:  isDev ? otp : undefined,
    });

  } catch (err) {
    console.error('[Auth] login-otp error:', err);
    res.status(500).json({ status: 'error', message: 'Terjadi kesalahan server.' });
  }
});

// ── Auth: Verifikasi OTP ─────────────────────────────────────────────────────
/**
 * POST /api/auth/verify-otp
 * Body: { nik: string, otp: string }
 * Response: data profil jamaah lengkap setelah login berhasil
 */
app.post('/api/auth/verify-otp', async (req, res) => {
  const { nik, otp } = req.body;
  if (!nik || !otp) {
    return res.status(400).json({ status: 'error', message: 'NIK dan OTP diperlukan.' });
  }

  try {
    // 1. Cari user berdasarkan NIK — ambil semua data profil
    const q1 = `
      SELECT
        u.id, u.name, u.phone_number, u.email, u.gender,
        u.address, u.photo_url, u.status,
        jd.id          AS jamaah_id,
        jd.nik,
        jd.nama_ibu_kandung,
        jd.bin_binti,
        jd.tempat_lahir,
        jd.birth_date,
        jd.alamat_detail,
        jd.provinsi,
        jd.kabupaten_kota,
        jd.kecamatan,
        jd.kelurahan_desa,
        jd.no_wa_keluarga,
        jd.no_porsi,
        jd.no_paspor,
        jd.tanggal_expired_paspor,
        jd.tahun_berangkat,
        jd.jenis_haji,
        jd.status_haji,
        jd.golongan_darah,
        jd.tinggi_badan,
        jd.berat_badan,
        jd.penyakit_bawaan,
        jd.pendidikan_terakhir,
        jd.pekerjaan,
        jd.status_pernikahan,
        jd.nama_pasangan,
        jd.no_porsi_pasangan,
        jd.nama_pendamping_lansia,
        jd.no_wa_pendamping,
        jd.kondisi_pen_tubuh,
        jd.kondisi_ring_jantung,
        jd.kondisi_kursi_roda,
        jd.nama_mahram,
        jd.hubungan_mahram
      FROM jamaah_details jd
      JOIN users u ON jd.user_id = u.id
      WHERE jd.nik = ?
    `;
    const result = await db.query(q1, [nik]);
    const user   = result.rows[0];

    if (!user) {
      return res.status(404).json({ status: 'error', message: 'NIK tidak ditemukan.' });
    }

    // 2. Verifikasi OTP
    console.log('[DEBUG verify-otp] user.id:', user.id);
    console.log('[DEBUG verify-otp] user.user_id:', user.user_id);
    console.log('[DEBUG verify-otp] OTP store size:', otpStore.size);
    console.log('[DEBUG verify-otp] OTP store keys:', [...otpStore.keys()]);
    const check = verifyOTP(user.id, otp);
    console.log('[DEBUG verify-otp] check result:', check);
    if (!check.valid) {
      return res.status(401).json({ status: 'error', message: check.reason });
    }

    // 3. Ambil dokumen jamaah
    const docsResult = await db.query(
      `SELECT type, file_url, status, catatan, tanggal_expired FROM documents WHERE user_id = ?`,
      [user.id]
    );

    // 4. Ambil data kloter jika ada
    let kloter = null;
    try {
      const kloterResult = await db.query(`
        SELECT k.nama_kloter, k.tahun, k.tanggal_berangkat, k.tanggal_pulang,
               k.maskapai, k.embarkasi, k.status AS status_kloter,
               jk.posisi, jk.nomor_urut
        FROM jamaah_kloter jk
        JOIN kloter k ON jk.kloter_id = k.id
        WHERE jk.jamaah_id = ?
        LIMIT 1
      `, [user.jamaah_id]);
      kloter = kloterResult.rows[0] || null;
    } catch (_) {}

    // 5. Hitung kelengkapan dokumen
    const dokumenWajib = ['KTP', 'KK', 'BPIH_AWAL', 'SPPH', 'FOTO'];
    const dokumenTersedia = docsResult.rows.map(d => d.type);
    const kelengkapanDokumen = dokumenWajib.map(d => ({
      type: d,
      uploaded: dokumenTersedia.includes(d),
      status: docsResult.rows.find(r => r.type === d)?.status || null,
    }));

    // 6. Sensor nomor HP
    const rawPhone = user.phone_number?.replace(/\s/g, '') || '';
    const phoneHint = rawPhone.length > 6
      ? rawPhone.slice(0, 4) + '****' + rawPhone.slice(-3)
      : rawPhone;

    res.json({
      status:  'success',
      message: 'Login berhasil.',
      data: {
        // Identitas
        id:             user.id,
        jamaah_id:      user.jamaah_id,
        name:           user.name,
        nik:            user.nik,
        phone_number:   user.phone_number,
        phone_hint:     phoneHint,
        email:          user.email,
        gender:         user.gender,
        photo_url:      user.photo_url,
        status_akun:    user.status,

        // Detail jamaah
        nama_ibu_kandung:    user.nama_ibu_kandung,
        bin_binti:           user.bin_binti,
        tempat_lahir:        user.tempat_lahir,
        birth_date:          user.birth_date,

        // Alamat
        alamat_detail:   user.alamat_detail,
        provinsi:        user.provinsi,
        kabupaten_kota:  user.kabupaten_kota,
        kecamatan:       user.kecamatan,
        kelurahan_desa:  user.kelurahan_desa,
        no_wa_keluarga:  user.no_wa_keluarga,

        // Data haji
        no_porsi:         user.no_porsi,
        no_paspor:        user.no_paspor,
        tanggal_expired_paspor: user.tanggal_expired_paspor,
        tahun_berangkat:  user.tahun_berangkat,
        jenis_haji:       user.jenis_haji,
        status_haji:      user.status_haji,

        // Sosial
        pendidikan_terakhir: user.pendidikan_terakhir,
        pekerjaan:           user.pekerjaan,
        status_pernikahan:   user.status_pernikahan,
        nama_pasangan:       user.nama_pasangan,
        no_porsi_pasangan:   user.no_porsi_pasangan,

        // Kesehatan
        golongan_darah:       user.golongan_darah,
        tinggi_badan:         user.tinggi_badan,
        berat_badan:          user.berat_badan,
        penyakit_bawaan:      user.penyakit_bawaan,
        kondisi_pen_tubuh:    !!user.kondisi_pen_tubuh,
        kondisi_ring_jantung: !!user.kondisi_ring_jantung,
        kondisi_kursi_roda:   !!user.kondisi_kursi_roda,

        // Mahram & pendamping
        nama_mahram:             user.nama_mahram,
        hubungan_mahram:         user.hubungan_mahram,
        nama_pendamping_lansia:  user.nama_pendamping_lansia,
        no_wa_pendamping:        user.no_wa_pendamping,

        // Relasi
        kloter,
        dokumen: kelengkapanDokumen,
      },
    });

  } catch (err) {
    console.error('[Auth] verify-otp error:', err);
    res.status(500).json({ status: 'error', message: 'Terjadi kesalahan server.' });
  }
});

// ── Start Server ─────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

