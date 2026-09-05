import React, { useState } from 'react';
import {
  User, Phone, MapPin, FileText, Heart, Calendar,
  Plane, BookOpen, ChevronRight, LogOut, CheckCircle2,
  Clock, AlertCircle, IdCard, Home, Shield, Users
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

// ─── Helpers ──────────────────────────────────────────────────────────────────
const formatDate = (d) => {
  if (!d) return '—';
  return new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
};

const hitungUsia = (birthDate) => {
  if (!birthDate) return null;
  const diff = Date.now() - new Date(birthDate).getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
};

const STATUS_HAJI_CONFIG = {
  menunggu:   { label: 'Menunggu Jadwal', color: 'bg-amber-50 text-amber-700 border-amber-200', icon: Clock },
  terjadwal:  { label: 'Sudah Terjadwal', color: 'bg-blue-50 text-blue-700 border-blue-200',   icon: Calendar },
  berangkat:  { label: 'Sedang Berangkat', color: 'bg-emerald-50 text-emerald-700 border-emerald-200', icon: Plane },
  selesai:    { label: 'Sudah Kembali',   color: 'bg-gray-50 text-gray-600 border-gray-200',   icon: CheckCircle2 },
};

const DOC_LABELS = {
  KTP: 'KTP', KK: 'Kartu Keluarga',
  BPIH_AWAL: 'BPIH Awal', SPPH: 'SPPH', FOTO: 'Foto Terbaru',
};

// ─── Sub-komponen ──────────────────────────────────────────────────────────────
const SectionCard = ({ title, icon: Icon, iconColor = 'text-emerald-600', iconBg = 'bg-emerald-50', columns = true, children }) => (
  <div className="bg-white rounded-3xl p-5 shadow-[0_2px_20px_rgba(0,0,0,0.04)] border border-gray-100 lg:p-7 lg:rounded-[28px]">
    <div className="flex items-center gap-3 mb-5 pb-4 border-b border-gray-50">
      <div className={`w-9 h-9 ${iconBg} ${iconColor} rounded-xl flex items-center justify-center`}>
        <Icon size={18} strokeWidth={2.5} />
      </div>
      <h2 className="text-sm font-bold text-gray-800 tracking-wide">{title}</h2>
    </div>
    <div className={columns ? 'lg:grid lg:grid-cols-2 lg:gap-x-10' : ''}>{children}</div>
  </div>
);

const InfoRow = ({ label, value, highlight = false }) => (
  <div className="flex flex-col gap-0.5 py-2.5 border-b border-gray-50 last:border-0 lg:py-3.5">
    <span className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">{label}</span>
    <span className={`text-sm font-semibold ${highlight ? 'text-emerald-700' : 'text-gray-800'} ${!value ? 'text-gray-300 italic' : ''}`}>
      {value || 'Belum diisi'}
    </span>
  </div>
);

const BadgePill = ({ label, active }) => (
  <div className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-bold ${
    active ? 'bg-red-50 text-red-600 border-red-100' : 'bg-gray-50 text-gray-400 border-gray-100'
  }`}>
    <div className={`w-2 h-2 rounded-full ${active ? 'bg-red-500' : 'bg-gray-300'}`} />
    {label}
  </div>
);

const DocStatus = ({ type, uploaded, status }) => {
  const isVerified  = status === 'verified';
  const isPending   = status === 'pending';
  const isRejected  = status === 'rejected';

  return (
    <div className={`flex items-center justify-between p-3 rounded-2xl border ${
      isVerified ? 'bg-emerald-50 border-emerald-100' :
      isRejected ? 'bg-red-50 border-red-100' :
      uploaded   ? 'bg-amber-50 border-amber-100' :
                   'bg-gray-50 border-gray-100'
    }`}>
      <div className="flex items-center gap-2.5">
        <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
          isVerified ? 'bg-emerald-100' : isRejected ? 'bg-red-100' : uploaded ? 'bg-amber-100' : 'bg-gray-100'
        }`}>
          {isVerified  ? <CheckCircle2 size={15} className="text-emerald-600" strokeWidth={2.5} /> :
           isRejected  ? <AlertCircle  size={15} className="text-red-500"     strokeWidth={2.5} /> :
           uploaded    ? <Clock        size={15} className="text-amber-600"   strokeWidth={2.5} /> :
                         <FileText     size={15} className="text-gray-400"    strokeWidth={2.5} />}
        </div>
        <span className="text-xs font-bold text-gray-700">{DOC_LABELS[type] || type}</span>
      </div>
      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
        isVerified  ? 'bg-emerald-100 text-emerald-700' :
        isRejected  ? 'bg-red-100 text-red-600' :
        uploaded    ? 'bg-amber-100 text-amber-700' :
                      'bg-gray-100 text-gray-400'
      }`}>
        {isVerified ? 'Terverifikasi' : isRejected ? 'Ditolak' : uploaded ? 'Menunggu' : 'Belum Diunggah'}
      </span>
    </div>
  );
};

// ─── Halaman Utama Dashboard ──────────────────────────────────────────────────
const DashboardJamaah = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profil');

  if (!user) {
    navigate('/login');
    return null;
  }

  const p = user; // alias
  const usia = hitungUsia(p.birth_date);
  const statusHaji = STATUS_HAJI_CONFIG[p.status_haji] || STATUS_HAJI_CONFIG.menunggu;
  const StatusIcon = statusHaji.icon;

  const dokumenLengkap = p.dokumen?.filter(d => d.uploaded).length || 0;
  const totalDokumen   = p.dokumen?.length || 5;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const tabs = [
    { id: 'profil',    label: 'Identitas',  icon: User },
    { id: 'haji',      label: 'Data Haji',  icon: Plane },
    { id: 'dokumen',   label: 'Dokumen',    icon: FileText },
    { id: 'kesehatan', label: 'Kesehatan',  icon: Heart },
  ];

  return (
    <div className="max-w-md mx-auto pb-28 lg:max-w-6xl lg:pb-12">

      {/* ── Header Profil ── */}
      <div className="relative bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-800 px-5 pt-8 pb-20 overflow-hidden lg:mx-8 lg:rounded-[32px] lg:px-10 lg:pt-10 lg:pb-24">
        {/* Dekorasi */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -mr-16 -mt-16" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full -ml-10 -mb-10" />

        {/* Tombol logout */}
        <button
          onClick={handleLogout}
          className="absolute top-5 right-5 w-9 h-9 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-white/20 transition-colors"
        >
          <LogOut size={16} className="text-white" strokeWidth={2.5} />
        </button>

        {/* Avatar & Nama */}
        <div className="flex items-center gap-4 relative z-10">
          <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20">
            <User size={30} className="text-white" strokeWidth={1.5} />
          </div>
          <div className="flex-1">
            <p className="text-emerald-200 text-[10px] font-bold tracking-widest uppercase mb-0.5">Jemaah Haji</p>
            <h1 className="text-white text-lg font-bold leading-tight">{p.name || '—'}</h1>
            <p className="text-emerald-200 text-xs font-medium mt-0.5">NIK: {p.nik}</p>
          </div>
        </div>

        {/* Status Haji Badge */}
        <div className="mt-5 relative z-10">
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border bg-white/10 border-white/20 backdrop-blur-sm`}>
            <StatusIcon size={12} className="text-emerald-200" strokeWidth={2.5} />
            <span className="text-white text-[11px] font-bold">{statusHaji.label}</span>
          </div>
        </div>
      </div>

      {/* ── Stats Bar ── */}
      <div className="mx-4 -mt-10 relative z-10 lg:mx-14 lg:-mt-12">
        <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] border border-gray-100 grid grid-cols-3 divide-x divide-gray-100">
          <div className="p-4 text-center">
            <p className="text-lg font-bold text-emerald-700">{p.no_porsi || '—'}</p>
            <p className="text-[9px] font-bold text-gray-400 tracking-widest uppercase mt-0.5">No. Porsi</p>
          </div>
          <div className="p-4 text-center">
            <p className="text-lg font-bold text-emerald-700">{p.tahun_berangkat || '—'}</p>
            <p className="text-[9px] font-bold text-gray-400 tracking-widest uppercase mt-0.5">Est. Berangkat</p>
          </div>
          <div className="p-4 text-center">
            <p className="text-lg font-bold text-emerald-700">{dokumenLengkap}/{totalDokumen}</p>
            <p className="text-[9px] font-bold text-gray-400 tracking-widest uppercase mt-0.5">Dokumen</p>
          </div>
        </div>
      </div>

      {/* ── Tabs ── */}
      <div className="px-4 mt-6 lg:px-8 lg:mt-8 lg:grid lg:grid-cols-[220px_minmax(0,1fr)] lg:items-start lg:gap-6">
        <aside className="lg:sticky lg:top-28">
        <div className="flex bg-gray-50 p-1 rounded-2xl border border-gray-100 gap-1 lg:flex-col lg:p-2 lg:rounded-3xl">
          {tabs.map(tab => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex flex-col items-center py-2 px-1 rounded-xl text-[9px] font-bold tracking-widest uppercase transition-all gap-1 lg:flex-none lg:flex-row lg:justify-start lg:gap-3 lg:px-4 lg:py-3 lg:text-[10px] ${
                  isActive ? 'bg-white text-emerald-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <tab.icon size={15} strokeWidth={isActive ? 2.5 : 2} />
                {tab.label}
              </button>
            );
          })}
        </div>
        </aside>

      {/* ── Konten Tab ── */}
      <div className="mt-4 flex flex-col gap-4 lg:mt-0 lg:gap-5">

        {/* TAB: Identitas */}
        {activeTab === 'profil' && (
          <>
            <SectionCard title="Identitas Diri" icon={IdCard}>
              <InfoRow label="Nama Lengkap"   value={p.name} highlight />
              <InfoRow label="NIK"             value={p.nik} />
              <InfoRow label="Nama Ibu Kandung" value={p.nama_ibu_kandung} />
              <InfoRow label="Bin / Binti"     value={p.bin_binti} />
              <InfoRow label="Tempat Lahir"    value={p.tempat_lahir} />
              <InfoRow label="Tanggal Lahir"   value={p.birth_date ? `${formatDate(p.birth_date)} (${usia} tahun)` : null} />
              <InfoRow label="Jenis Kelamin"   value={p.gender === 'L' ? 'Laki-laki' : p.gender === 'P' ? 'Perempuan' : null} />
              <InfoRow label="Status Pernikahan" value={p.status_pernikahan?.replace('_', ' ')} />
              {p.nama_pasangan && <InfoRow label="Nama Pasangan" value={p.nama_pasangan} />}
              {p.no_porsi_pasangan && <InfoRow label="No Porsi Pasangan" value={p.no_porsi_pasangan} />}
            </SectionCard>

            <SectionCard title="Kontak & Alamat" icon={MapPin} iconColor="text-blue-600" iconBg="bg-blue-50">
              <InfoRow label="No. WhatsApp Utama" value={p.phone_number} highlight />
              <InfoRow label="No. WA Keluarga"    value={p.no_wa_keluarga} />
              <InfoRow label="Email"              value={p.email} />
              <InfoRow label="Alamat"             value={p.alamat_detail} />
              <InfoRow label="Kelurahan / Desa"   value={p.kelurahan_desa} />
              <InfoRow label="Kecamatan"          value={p.kecamatan} />
              <InfoRow label="Kabupaten / Kota"   value={p.kabupaten_kota} />
              <InfoRow label="Provinsi"           value={p.provinsi} />
            </SectionCard>

            <SectionCard title="Pendidikan & Pekerjaan" icon={BookOpen} iconColor="text-purple-600" iconBg="bg-purple-50">
              <InfoRow label="Pendidikan Terakhir" value={p.pendidikan_terakhir} />
              <InfoRow label="Pekerjaan"           value={p.pekerjaan} />
            </SectionCard>

            {(p.nama_mahram || p.nama_pendamping_lansia) && (
              <SectionCard title="Mahram & Pendamping" icon={Users} iconColor="text-orange-600" iconBg="bg-orange-50">
                {p.nama_mahram && <InfoRow label="Nama Mahram" value={p.nama_mahram} />}
                {p.hubungan_mahram && <InfoRow label="Hubungan Mahram" value={p.hubungan_mahram} />}
                {p.nama_pendamping_lansia && <InfoRow label="Pendamping Lansia" value={p.nama_pendamping_lansia} />}
                {p.no_wa_pendamping && <InfoRow label="WA Pendamping" value={p.no_wa_pendamping} />}
              </SectionCard>
            )}
          </>
        )}

        {/* TAB: Data Haji */}
        {activeTab === 'haji' && (
          <>
            <SectionCard title="Informasi Keberangkatan" icon={Plane} iconColor="text-sky-600" iconBg="bg-sky-50">
              <InfoRow label="Nomor Porsi"     value={p.no_porsi} highlight />
              <InfoRow label="Jenis Haji"      value={p.jenis_haji ? p.jenis_haji.charAt(0).toUpperCase() + p.jenis_haji.slice(1) : null} />
              <InfoRow label="Est. Tahun Berangkat" value={p.tahun_berangkat} />
              <InfoRow label="Status"          value={statusHaji.label} highlight />
            </SectionCard>

            <SectionCard title="Data Paspor" icon={FileText} iconColor="text-indigo-600" iconBg="bg-indigo-50">
              <InfoRow label="Nomor Paspor"    value={p.no_paspor} highlight />
              <InfoRow label="Tanggal Expired" value={formatDate(p.tanggal_expired_paspor)} />
              {p.tanggal_expired_paspor && new Date(p.tanggal_expired_paspor) < new Date(Date.now() + 1.5 * 365 * 24 * 60 * 60 * 1000) && (
                <div className="mt-2 flex items-center gap-2 bg-amber-50 border border-amber-100 rounded-xl px-3 py-2.5">
                  <AlertCircle size={14} className="text-amber-600 flex-shrink-0" strokeWidth={2.5} />
                  <p className="text-[11px] font-semibold text-amber-700">Paspor akan expired dalam kurang dari 1,5 tahun. Segera perpanjang.</p>
                </div>
              )}
            </SectionCard>

            {p.kloter && (
              <SectionCard title="Data Kloter" icon={Users} iconColor="text-teal-600" iconBg="bg-teal-50">
                <InfoRow label="Nama Kloter"  value={p.kloter.nama_kloter} highlight />
                <InfoRow label="Posisi"       value={p.kloter.posisi?.replace('_', ' ')} />
                <InfoRow label="Nomor Urut"   value={p.kloter.nomor_urut} />
                <InfoRow label="Maskapai"     value={p.kloter.maskapai} />
                <InfoRow label="Embarkasi"    value={p.kloter.embarkasi} />
                <InfoRow label="Tgl Berangkat" value={formatDate(p.kloter.tanggal_berangkat)} />
                <InfoRow label="Tgl Pulang"   value={formatDate(p.kloter.tanggal_pulang)} />
              </SectionCard>
            )}

            {!p.kloter && (
              <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5 flex items-start gap-3">
                <AlertCircle size={18} className="text-amber-500 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                <div>
                  <p className="text-sm font-bold text-amber-800">Belum Terdaftar di Kloter</p>
                  <p className="text-xs text-amber-600 mt-1">Anda belum ditempatkan dalam kloter keberangkatan. Hubungi petugas KBIHU untuk informasi lebih lanjut.</p>
                </div>
              </div>
            )}
          </>
        )}

        {/* TAB: Dokumen */}
        {activeTab === 'dokumen' && (
          <SectionCard title="Kelengkapan Dokumen" icon={FileText} iconColor="text-blue-600" iconBg="bg-blue-50" columns={false}>
            {/* Progress bar */}
            <div className="mb-5">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-gray-600">Kelengkapan</span>
                <span className="text-xs font-bold text-emerald-600">{dokumenLengkap}/{totalDokumen} dokumen</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full transition-all duration-700"
                  style={{ width: `${(dokumenLengkap / totalDokumen) * 100}%` }}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2.5">
              {(p.dokumen || []).map((doc) => (
                <DocStatus key={doc.type} {...doc} />
              ))}
            </div>

            {dokumenLengkap < totalDokumen && (
              <div className="mt-4 bg-blue-50 border border-blue-100 rounded-2xl p-4">
                <p className="text-xs font-semibold text-blue-700">Segera lengkapi dokumen yang belum diunggah melalui menu Pendaftaran atau hubungi petugas KBIHU.</p>
              </div>
            )}
          </SectionCard>
        )}

        {/* TAB: Kesehatan */}
        {activeTab === 'kesehatan' && (
          <>
            <SectionCard title="Data Fisik" icon={Heart} iconColor="text-rose-600" iconBg="bg-rose-50">
              <InfoRow label="Golongan Darah"  value={p.golongan_darah} highlight />
              <InfoRow label="Tinggi Badan"    value={p.tinggi_badan ? `${p.tinggi_badan} cm` : null} />
              <InfoRow label="Berat Badan"     value={p.berat_badan ? `${p.berat_badan} kg` : null} />
              <InfoRow label="Penyakit Bawaan" value={p.penyakit_bawaan} />
            </SectionCard>

            <SectionCard title="Kondisi Khusus" icon={Shield} iconColor="text-orange-600" iconBg="bg-orange-50">
              <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mb-3">Status Kondisi</p>
              <div className="flex flex-col gap-2.5">
                <BadgePill label="Pen Tubuh"    active={p.kondisi_pen_tubuh} />
                <BadgePill label="Ring Jantung" active={p.kondisi_ring_jantung} />
                <BadgePill label="Kursi Roda"   active={p.kondisi_kursi_roda} />
              </div>
              {!p.kondisi_pen_tubuh && !p.kondisi_ring_jantung && !p.kondisi_kursi_roda && (
                <p className="text-xs text-gray-400 mt-4 text-center">Tidak ada kondisi khusus yang terdaftar.</p>
              )}
            </SectionCard>
          </>
        )}
      </div>
      </div>
    </div>
  );
};

export default DashboardJamaah;
