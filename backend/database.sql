-- 1. Buat Tabel ROLES
CREATE TABLE roles (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    name VARCHAR(50) NOT NULL UNIQUE
);

-- Insert default roles
INSERT IGNORE INTO roles (name) VALUES ('admin'), ('jamaah');
-- Catatan: jika error saat insert karena UUID, gunakan query ini:
-- INSERT IGNORE INTO roles (id, name) VALUES (UUID(), 'admin'), (UUID(), 'jamaah');

-- 2. Buat Tabel USERS
CREATE TABLE users (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    role_id VARCHAR(36) NOT NULL,
    name VARCHAR(100) NOT NULL,
    phone_number VARCHAR(20) UNIQUE NOT NULL,
    username VARCHAR(50) UNIQUE, -- Opsional, bisa null untuk jamaah
    password VARCHAR(255),       -- Opsional, bisa null jika pakai OTP
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE RESTRICT
);

-- 3. Buat Tabel JAMAAH_DETAILS
CREATE TABLE jamaah_details (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    user_id VARCHAR(36) NOT NULL,
    nik VARCHAR(20) UNIQUE NOT NULL,
    birth_date DATE,
    uses_wheelchair BOOLEAN DEFAULT false,
    extra_metadata JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 4. Buat Tabel DOCUMENTS
CREATE TABLE documents (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    user_id VARCHAR(36) NOT NULL,
    type ENUM('KTP', 'KK', 'PASPOR', 'BUKU_NIKAH', 'FOTO') NOT NULL,
    file_url TEXT NOT NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
