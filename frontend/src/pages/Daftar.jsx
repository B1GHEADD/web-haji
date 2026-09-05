import React, { useState, useRef } from 'react';
import { User, Activity, FileCheck, CheckCircle2, Upload, X } from 'lucide-react';

const Daftar = () => {
  const [formData, setFormData] = useState({
    // Identitas
    noPorsi: '', namaIbu: '', nik: '', namaLengkap: '',
    binBinti: '', tempatLahir: '', tanggalLahir: '',
    alamat: '', provinsi: '', kabupaten: '', kecamatan: '', kelurahan: '',
    noWa: '', noWaKeluarga: '', pendidikan: '', pekerjaan: '',
    gender: 'Laki-laki', statusPernikahan: 'Belum Nikah',
    namaPasangan: '', noPorsiPasangan: '',
    namaPendamping: '', noWaPendamping: '',
    // Kesehatan
    penTubuh: false, ringJantung: false, kursiRoda: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const calculateAge = (dob) => {
    if (!dob) return '';
    const diff = Date.now() - new Date(dob).getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25)) + ' Tahun';
  };

  return (
    <div className="md:px-8 px-0 max-w-3xl mx-auto pb-10">
      
      <div className="text-center mb-10 px-5 md:px-0">
        <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight mb-2">Pendaftaran Jemaah</h1>
        <p className="text-sm font-medium text-gray-500">KBIHU Nurul Ummah (Jemaah Haji 1448 H / 2027 M)</p>
      </div>

      <form className="flex flex-col gap-8 px-5 md:px-0">
        
        {/* SEKSI 1: IDENTITAS */}
        <div className="bg-white rounded-[2rem] p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
          <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-50">
            <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center font-bold">1</div>
            <div>
              <h2 className="text-lg font-bold text-gray-800">Identitas Utama</h2>
              <p className="text-xs text-gray-500 font-medium">Lengkapi data sesuai KTP & Dokumen Porsi.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField label="Nomor Porsi *" name="noPorsi" value={formData.noPorsi} onChange={handleChange} placeholder="Wajib 10 digit" />
            <InputField label="Nama Ibu Kandung *" name="namaIbu" value={formData.namaIbu} onChange={handleChange} placeholder="Nama Ibu" />
            
            <div className="md:col-span-2">
              <InputField label="NIK *" name="nik" value={formData.nik} onChange={handleChange} placeholder="Wajib 16 digit" />
            </div>
            
            <InputField label="Nama Lengkap *" name="namaLengkap" value={formData.namaLengkap} onChange={handleChange} placeholder="Sesuai KTP" />
            <InputField label="Bin / Binti *" name="binBinti" value={formData.binBinti} onChange={handleChange} placeholder="Nama ayah jemaah" />
            
            <InputField label="Tempat Lahir (Sesuai KTP) *" name="tempatLahir" value={formData.tempatLahir} onChange={handleChange} placeholder="Contoh: Klaten" />
            
            <div className="grid grid-cols-2 gap-4">
              <InputField type="date" label="Tanggal Lahir *" name="tanggalLahir" value={formData.tanggalLahir} onChange={handleChange} />
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-emerald-700 tracking-widest uppercase ml-1">Usia / Umur *</label>
                <input readOnly value={calculateAge(formData.tanggalLahir)} placeholder="Otomatis" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-medium text-gray-600 cursor-not-allowed" />
              </div>
            </div>

            <div className="md:col-span-2 bg-gray-50/50 p-5 rounded-2xl border border-gray-50 mt-2">
              <label className="text-[10px] font-bold text-gray-500 tracking-widest uppercase mb-4 block">Detail Alamat Domisili *</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="md:col-span-2">
                  <InputField label="Alamat (Dk/ Ds/ Jalan...) *" name="alamat" value={formData.alamat} onChange={handleChange} placeholder="Contoh: Dk. Ngingas V/55 RT 02/03" />
                </div>
                <SelectField label="Provinsi *" name="provinsi" value={formData.provinsi} onChange={handleChange} options={['Jawa Tengah', 'DI Yogyakarta', 'Jawa Timur']} />
                <SelectField label="Kabupaten / Kota *" name="kabupaten" value={formData.kabupaten} onChange={handleChange} options={['Klaten', 'Surakarta', 'Boyolali']} />
                <SelectField label="Kecamatan *" name="kecamatan" value={formData.kecamatan} onChange={handleChange} options={['Klaten Selatan', 'Klaten Utara', 'Jogonalan']} />
                <InputField label="Kelurahan / Desa *" name="kelurahan" value={formData.kelurahan} onChange={handleChange} placeholder="Pilih atau ketik" />
              </div>
            </div>

            <InputField label="Nomor HP / Whatsapp *" name="noWa" value={formData.noWa} onChange={handleChange} placeholder="Contoh: 0812345678" />
            <InputField label="No. WA 2 / Keluarga (Opsional)" name="noWaKeluarga" value={formData.noWaKeluarga} onChange={handleChange} placeholder="Contoh: 0812987654" />
            
            <SelectField label="Pendidikan Terakhir *" name="pendidikan" value={formData.pendidikan} onChange={handleChange} options={['SD', 'SMP', 'SMA', 'D3', 'S1', 'S2', 'S3']} />
            <InputField label="Pekerjaan *" name="pekerjaan" value={formData.pekerjaan} onChange={handleChange} placeholder="Contoh: Swasta, PNS, Wiraswasta" />

            <SelectField label="Gender" name="gender" value={formData.gender} onChange={handleChange} options={['Laki-laki', 'Perempuan']} />
            <SelectField label="Status Pernikahan" name="statusPernikahan" value={formData.statusPernikahan} onChange={handleChange} options={['Belum Nikah', 'Menikah', 'Janda/Duda']} />

            <InputField label="Nama Suami / Istri (Opsional)" name="namaPasangan" value={formData.namaPasangan} onChange={handleChange} placeholder="Nama pasangan jika ada" />
            <InputField label="No Porsi Suami / Istri (Opsional)" name="noPorsiPasangan" value={formData.noPorsiPasangan} onChange={handleChange} placeholder="No porsi pasangan" />
          </div>
        </div>

        {/* SEKSI 2: KESEHATAN */}
        <div className="bg-white rounded-[2rem] p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
          <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-50">
            <div className="w-10 h-10 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center font-bold">2</div>
            <div>
              <h2 className="text-lg font-bold text-gray-800">Kesehatan</h2>
              <p className="text-xs text-gray-500 font-medium">Informasi kondisi kesehatan khusus jemaah.</p>
            </div>
          </div>

          <label className="text-[10px] font-bold text-gray-700 tracking-widest uppercase mb-4 block">Kondisi Khusus</label>
          <div className="flex flex-col gap-3">
            <ToggleRow label="Pen Tubuh" name="penTubuh" checked={formData.penTubuh} onChange={handleChange} />
            <ToggleRow label="Ring Jantung" name="ringJantung" checked={formData.ringJantung} onChange={handleChange} />
            <ToggleRow label="Kursi Roda" name="kursiRoda" checked={formData.kursiRoda} onChange={handleChange} />
          </div>
        </div>

        {/* SEKSI 3: DOKUMEN */}
        <div className="bg-white rounded-[2rem] p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
          <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-50">
            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center font-bold">3</div>
            <div className="flex-1 flex justify-between items-center">
              <div>
                <h2 className="text-lg font-bold text-gray-800">Dokumen Pendukung</h2>
                <p className="text-xs text-gray-500 font-medium">Upload KTP dan Bukti Porsi Anda.</p>
              </div>
              <span className="text-[9px] font-bold bg-amber-50 text-amber-600 px-3 py-1 rounded-full uppercase tracking-widest border border-amber-100">Wajib Diunggah</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <FileUpload label="Scan/Foto KTP" id="ktp" accept="image/*,.pdf" />
            <FileUpload label="Bukti Setoran Porsi" id="porsi" accept="image/*,.pdf" />
          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <button 
          type="submit"
          className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-emerald-500/30 hover:-translate-y-0.5 active:scale-95 transition-all text-sm tracking-wide mt-4"
        >
          KIRIM DATA PENDAFTARAN
        </button>
      </form>
    </div>
  );
};

// --- Reusable Components ---

const InputField = ({ label, name, value, onChange, placeholder, type = "text" }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[10px] font-bold text-emerald-700 tracking-widest uppercase ml-1">{label}</label>
    <input 
      type={type} 
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-2xl text-[13px] focus:ring-4 focus:ring-emerald-50 focus:border-emerald-300 transition-all outline-none font-medium text-gray-800 placeholder:text-gray-300"
      placeholder={placeholder}
    />
  </div>
);

const SelectField = ({ label, name, value, onChange, options }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[10px] font-bold text-emerald-700 tracking-widest uppercase ml-1">{label}</label>
    <select 
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-2xl text-[13px] focus:ring-4 focus:ring-emerald-50 focus:border-emerald-300 transition-all outline-none font-medium text-gray-800 appearance-none"
      style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 0.5rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em' }}
    >
      <option value="">-- Pilih --</option>
      {options.map((opt, i) => <option key={i} value={opt}>{opt}</option>)}
    </select>
  </div>
);

const ToggleRow = ({ label, name, checked, onChange }) => (
  <div className="flex justify-between items-center bg-gray-50/50 p-4 rounded-2xl border border-gray-50">
    <span className="text-sm font-bold text-gray-700">{label}</span>
    <label className="relative inline-flex items-center cursor-pointer">
      <input type="checkbox" name={name} checked={checked} onChange={onChange} className="sr-only peer" />
      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
    </label>
  </div>
);

const FileUpload = ({ label, id, accept = 'image/*,.pdf' }) => {
  const [file, setFile] = useState(null);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef(null);

  const handleFile = (f) => {
    if (f) setFile(f);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    handleFile(f);
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    setFile(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div
      onClick={() => !file && inputRef.current?.click()}
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      className={`border-2 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center text-center transition-all ${
        file
          ? 'border-emerald-300 bg-emerald-50/50 cursor-default'
          : dragging
          ? 'border-blue-400 bg-blue-50 cursor-copy scale-[1.02]'
          : 'border-gray-200 hover:border-emerald-300 hover:bg-gray-50/50 cursor-pointer group'
      }`}
    >
      {/* Hidden real file input */}
      <input
        ref={inputRef}
        id={id}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => handleFile(e.target.files[0])}
      />

      {file ? (
        /* State: file sudah dipilih */
        <>
          <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-3">
            <CheckCircle2 size={22} strokeWidth={2} />
          </div>
          <span className="text-sm font-bold text-emerald-700 mb-1 max-w-full truncate px-2">{file.name}</span>
          <span className="text-[10px] text-emerald-500 font-medium">{(file.size / 1024).toFixed(0)} KB</span>
          <button
            type="button"
            onClick={handleRemove}
            className="mt-3 flex items-center gap-1 text-[10px] font-bold text-red-400 hover:text-red-600 transition-colors"
          >
            <X size={12} /> Hapus file
          </button>
        </>
      ) : (
        /* State: belum ada file */
        <>
          <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 group-hover:bg-emerald-50 group-hover:text-emerald-500 transition-all">
            <Upload size={20} strokeWidth={2} />
          </div>
          <span className="text-sm font-bold text-gray-800 mb-1">{label}</span>
          <span className="text-[10px] font-medium text-gray-400">Klik atau seret file ke sini</span>
          <span className="text-[9px] text-gray-300 mt-1">JPG, PNG, PDF maks. 5MB</span>
        </>
      )}
    </div>
  );
};

export default Daftar;
