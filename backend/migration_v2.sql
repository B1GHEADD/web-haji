-- =====================================================================
-- Migration: Redesign Database Jamaah Haji
-- Tanggal  : 2026-08-19
-- Deskripsi: Upgrade tabel existing + tambah tabel baru
-- =====================================================================

-- Nonaktifkan foreign key check sementara selama migrasi
SET FOREIGN_KEY_CHECKS = 0;

-- ─────────────────────────────────────────────────────────────────────
-- 1. UPGRADE TABEL: users
--    Tambah: email, gender, address, photo_url, status
-- ─────────────────────────────────────────────────────────────────────
ALTER TABLE users
  ADD COLUMN email      VARCHAR(100) NULL        AFTER phone_number,
  ADD COLUMN gender     ENUM('L','P') NULL       AFTER email,
  ADD COLUMN address    TEXT NULL                AFTER gender,
  ADD COLUMN photo_url  VARCHAR(500) NULL        AFTER address,
  ADD COLUMN status     ENUM('aktif','nonaktif') NOT NULL DEFAULT 'aktif' AFTER photo_url;

-- ─────────────────────────────────────────────────────────────────────
-- 2. UPGRADE TABEL: jamaah_details
--    Pecah extra_metadata menjadi kolom-kolom terstruktur
-- ─────────────────────────────────────────────────────────────────────
ALTER TABLE jamaah_details
  -- Data paspor
  ADD COLUMN no_paspor              VARCHAR(20)  NULL AFTER nik,
  ADD COLUMN tanggal_terbit_paspor  DATE         NULL AFTER no_paspor,
  ADD COLUMN tanggal_expired_paspor DATE         NULL AFTER tanggal_terbit_paspor,
  -- Data haji
  ADD COLUMN no_porsi               VARCHAR(20)  NULL AFTER tanggal_expired_paspor,
  ADD COLUMN tahun_berangkat        YEAR         NULL AFTER no_porsi,
  ADD COLUMN jenis_haji             ENUM('reguler','plus','umrah') NULL AFTER tahun_berangkat,
  ADD COLUMN status_haji            ENUM('menunggu','terjadwal','berangkat','selesai') NOT NULL DEFAULT 'menunggu' AFTER jenis_haji,
  -- Data fisik & kesehatan
  ADD COLUMN golongan_darah         ENUM('A','B','AB','O','A+','A-','B+','B-','AB+','AB-','O+','O-') NULL AFTER status_haji,
  ADD COLUMN tinggi_badan           SMALLINT     NULL COMMENT 'dalam cm' AFTER golongan_darah,
  ADD COLUMN berat_badan            DECIMAL(5,2) NULL COMMENT 'dalam kg' AFTER tinggi_badan,
  ADD COLUMN penyakit_bawaan        TEXT         NULL AFTER berat_badan,
  -- Data mahram/pendamping
  ADD COLUMN nama_mahram            VARCHAR(100) NULL AFTER penyakit_bawaan,
  ADD COLUMN hubungan_mahram        VARCHAR(50)  NULL AFTER nama_mahram,
  ADD COLUMN nik_mahram             VARCHAR(20)  NULL AFTER hubungan_mahram;

-- ─────────────────────────────────────────────────────────────────────
-- 3. UPGRADE TABEL: documents
--    Tambah status verifikasi, catatan, tanggal_expired, verifikator
--    Tambah tipe dokumen baru
-- ─────────────────────────────────────────────────────────────────────

-- Ubah ENUM type dengan tipe dokumen baru
ALTER TABLE documents
  MODIFY COLUMN type ENUM(
    'KTP','KK','PASPOR','BUKU_NIKAH','FOTO',
    'VISA','VAKSIN','SURAT_SEHAT','SURAT_MAHRAM','LAINNYA'
  ) NOT NULL,
  ADD COLUMN status       ENUM('pending','verified','rejected') NOT NULL DEFAULT 'pending' AFTER file_url,
  ADD COLUMN catatan      TEXT NULL       AFTER status,
  ADD COLUMN tanggal_expired DATE NULL   AFTER catatan,
  ADD COLUMN verified_by  VARCHAR(100) NULL AFTER tanggal_expired,
  ADD COLUMN verified_at  TIMESTAMP NULL AFTER verified_by;

-- ─────────────────────────────────────────────────────────────────────
-- 4. TABEL BARU: kloter
--    Kelompok / Kloter keberangkatan haji
-- ─────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS kloter (
  id                VARCHAR(36)  NOT NULL DEFAULT (UUID()) PRIMARY KEY,
  nama_kloter       VARCHAR(100) NOT NULL,
  tahun             YEAR         NOT NULL,
  kuota             INT          NOT NULL DEFAULT 0,
  tanggal_berangkat DATE         NULL,
  tanggal_pulang    DATE         NULL,
  maskapai          VARCHAR(100) NULL,
  embarkasi         VARCHAR(100) NULL,
  status            ENUM('persiapan','aktif','selesai') NOT NULL DEFAULT 'persiapan',
  keterangan        TEXT         NULL,
  created_at        TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at        TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ─────────────────────────────────────────────────────────────────────
-- 5. TABEL BARU: jamaah_kloter
--    Relasi Jamaah ↔ Kloter (many-to-one)
-- ─────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS jamaah_kloter (
  id          VARCHAR(36)  NOT NULL DEFAULT (UUID()) PRIMARY KEY,
  jamaah_id   VARCHAR(36)  NOT NULL,
  kloter_id   VARCHAR(36)  NOT NULL,
  nomor_urut  INT          NULL COMMENT 'Nomor urut dalam kloter',
  posisi      ENUM('anggota','ketua_rombongan','ketua_kloter') NOT NULL DEFAULT 'anggota',
  created_at  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY  uq_jamaah_kloter (jamaah_id, kloter_id),
  FOREIGN KEY (jamaah_id) REFERENCES jamaah_details(id) ON DELETE CASCADE,
  FOREIGN KEY (kloter_id) REFERENCES kloter(id) ON DELETE CASCADE
);

-- ─────────────────────────────────────────────────────────────────────
-- 6. TABEL BARU: bimbingan_manasik
--    Jadwal sesi bimbingan manasik
-- ─────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS bimbingan_manasik (
  id            VARCHAR(36)  NOT NULL DEFAULT (UUID()) PRIMARY KEY,
  judul         VARCHAR(200) NOT NULL,
  tanggal       DATE         NOT NULL,
  waktu_mulai   TIME         NULL,
  waktu_selesai TIME         NULL,
  lokasi        VARCHAR(200) NULL,
  pemateri      VARCHAR(100) NULL,
  keterangan    TEXT         NULL,
  created_at    TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at    TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ─────────────────────────────────────────────────────────────────────
-- 7. TABEL BARU: absensi_manasik
--    Kehadiran jamaah di setiap sesi manasik
-- ─────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS absensi_manasik (
  id            VARCHAR(36)  NOT NULL DEFAULT (UUID()) PRIMARY KEY,
  bimbingan_id  VARCHAR(36)  NOT NULL,
  jamaah_id     VARCHAR(36)  NOT NULL,
  status        ENUM('hadir','tidak_hadir','izin') NOT NULL DEFAULT 'tidak_hadir',
  keterangan    VARCHAR(200) NULL,
  created_at    TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY    uq_absensi (bimbingan_id, jamaah_id),
  FOREIGN KEY   (bimbingan_id) REFERENCES bimbingan_manasik(id) ON DELETE CASCADE,
  FOREIGN KEY   (jamaah_id)    REFERENCES jamaah_details(id)     ON DELETE CASCADE
);

-- Aktifkan kembali foreign key check
SET FOREIGN_KEY_CHECKS = 1;

-- ─────────────────────────────────────────────────────────────────────
-- Selesai. Verifikasi:
-- SHOW TABLES;
-- ─────────────────────────────────────────────────────────────────────
