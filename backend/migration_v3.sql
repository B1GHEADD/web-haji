-- =====================================================================
-- Migration v3: Sinkronisasi DB dengan Form Pendaftaran
-- Tanggal  : 2026-08-19
-- Disesuaikan dari screenshot referensi web yang sudah ada
-- =====================================================================

SET FOREIGN_KEY_CHECKS = 0;

-- ─────────────────────────────────────────────────────────────────────
-- Tambah kolom yang belum ada di jamaah_details
-- (v2 migration sudah menambah: no_paspor, no_porsi, dll)
-- ─────────────────────────────────────────────────────────────────────

-- Cek & tambah kolom baru yang belum ada dari form frontend
ALTER TABLE jamaah_details
  -- Identitas tambahan
  ADD COLUMN IF NOT EXISTS nama_ibu_kandung    VARCHAR(100) NULL AFTER nik,
  ADD COLUMN IF NOT EXISTS bin_binti           VARCHAR(100) NULL AFTER nama_ibu_kandung,
  ADD COLUMN IF NOT EXISTS tempat_lahir        VARCHAR(100) NULL AFTER bin_binti,

  -- Alamat terstruktur (diturunkan dari users.address → lebih detail)
  ADD COLUMN IF NOT EXISTS alamat_detail       TEXT         NULL AFTER tempat_lahir,
  ADD COLUMN IF NOT EXISTS provinsi            VARCHAR(100) NULL AFTER alamat_detail,
  ADD COLUMN IF NOT EXISTS kabupaten_kota      VARCHAR(100) NULL AFTER provinsi,
  ADD COLUMN IF NOT EXISTS kecamatan           VARCHAR(100) NULL AFTER kabupaten_kota,
  ADD COLUMN IF NOT EXISTS kelurahan_desa      VARCHAR(100) NULL AFTER kecamatan,

  -- Kontak tambahan
  ADD COLUMN IF NOT EXISTS no_wa_keluarga      VARCHAR(20)  NULL AFTER kelurahan_desa,

  -- Sosial & pekerjaan
  ADD COLUMN IF NOT EXISTS pendidikan_terakhir ENUM('SD','SMP','SMA/SMK','D3','S1','S2','S3','Lainnya') NULL,
  ADD COLUMN IF NOT EXISTS pekerjaan           VARCHAR(100) NULL,
  ADD COLUMN IF NOT EXISTS status_pernikahan   ENUM('belum_nikah','menikah','cerai_hidup','cerai_mati') NULL DEFAULT 'belum_nikah',

  -- Data pasangan (opsional)
  ADD COLUMN IF NOT EXISTS nama_pasangan       VARCHAR(100) NULL,
  ADD COLUMN IF NOT EXISTS no_porsi_pasangan   VARCHAR(20)  NULL,

  -- Pendamping lansia (opsional)
  ADD COLUMN IF NOT EXISTS nama_pendamping_lansia VARCHAR(100) NULL,
  ADD COLUMN IF NOT EXISTS no_wa_pendamping       VARCHAR(20)  NULL,

  -- Kondisi kesehatan spesifik (gantikan uses_wheelchair)
  ADD COLUMN IF NOT EXISTS kondisi_pen_tubuh   TINYINT(1)   NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS kondisi_ring_jantung TINYINT(1)  NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS kondisi_kursi_roda  TINYINT(1)   NOT NULL DEFAULT 0;

-- ─────────────────────────────────────────────────────────────────────
-- Upgrade tipe dokumen: tambah BPIH_AWAL & SPPH
-- ─────────────────────────────────────────────────────────────────────
ALTER TABLE documents
  MODIFY COLUMN type ENUM(
    'KTP','KK','PASPOR','BUKU_NIKAH','FOTO',
    'BPIH_AWAL','SPPH',
    'VISA','VAKSIN','SURAT_SEHAT','SURAT_MAHRAM','LAINNYA'
  ) NOT NULL;

-- ─────────────────────────────────────────────────────────────────────
-- Tambah kolom phone_number ke users jika belum ada (backup WA keluarga)
-- users.phone_number sudah ada — tambah no_wa_keluarga di users juga
-- ─────────────────────────────────────────────────────────────────────
ALTER TABLE users
  ADD COLUMN IF NOT EXISTS no_wa_keluarga VARCHAR(20) NULL AFTER phone_number;

SET FOREIGN_KEY_CHECKS = 1;

-- Verifikasi semua kolom
-- SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS
-- WHERE TABLE_SCHEMA = 'jamaah_haji' AND TABLE_NAME = 'jamaah_details'
-- ORDER BY ORDINAL_POSITION;
