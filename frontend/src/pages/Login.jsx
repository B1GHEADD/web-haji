import React, { useState } from 'react';
import { LogIn, Phone, KeyRound, User, Lock, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { login } = useAuth();
  const navigate  = useNavigate();
  const [loginType, setLoginType] = useState('jamaah'); // 'jamaah' | 'petugas'
  
  // Jamaah State
  const [nik, setNik] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [otpInfo, setOtpInfo] = useState(null); // { phoneHint, debugOtp, waPending, waError }

  // Petugas State
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSendOTP = async (e) => {
    e.preventDefault();
    if (!nik) return alert("Masukkan NIK terlebih dahulu");
    if (nik.length !== 16) return alert("NIK harus 16 digit");

    setLoading(true);
    try {
      const res = await api.post('/api/auth/login-otp', { nik });
      if (res.data.status === 'success') {
        const { wa_sent, wa_pending, phone_hint, debug_otp, wa_error } = res.data;
        setOtpInfo({ phoneHint: phone_hint, debugOtp: debug_otp, waPending: wa_pending, waSent: wa_sent, waError: wa_error });
        setOtpSent(true);
      }
    } catch (err) {
      if (err.response && err.response.data) {
        alert(err.response.data.message);
      } else {
        alert("Gagal terhubung ke server");
      }
    }
    setLoading(false);
  };

  const handleLoginJamaah = async (e) => {
    e.preventDefault();
    if (!otp) return alert('Masukkan kode OTP');
    setLoading(true);
    try {
      const res = await api.post('/api/auth/verify-otp', { nik, otp });
      if (res.data.status === 'success') {
        login(res.data.data);   // simpan ke AuthContext + localStorage
        navigate('/dashboard'); // redirect ke halaman profil
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Gagal memverifikasi OTP';
      alert(`❌ ${msg}`);
    }
    setLoading(false);
  };

  const handleLoginPetugas = (e) => {
    e.preventDefault();
    console.log("Login Petugas:", { username, password });
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-5">
      <div className="w-full max-w-md bg-white rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 relative overflow-hidden">
        
        {/* Decor */}
        <div className="absolute top-0 right-0 -mr-10 -mt-10 w-32 h-32 bg-emerald-50 rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 left-0 -ml-10 -mb-10 w-32 h-32 bg-emerald-50 rounded-full blur-2xl"></div>

        <div className="relative z-10">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 shadow-sm">
              <LogIn size={28} strokeWidth={2} />
            </div>
          </div>
          
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-2 tracking-tight">Masuk Akun</h1>
            <p className="text-sm text-gray-500 font-medium">Pilih tipe akun untuk melanjutkan.</p>
          </div>

          {/* Toggle Login Type */}
          <div className="flex bg-gray-50 p-1 rounded-2xl mb-8 border border-gray-100">
            <button 
              onClick={() => setLoginType('jamaah')}
              className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${loginType === 'jamaah' ? 'bg-white text-emerald-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
            >
              Jemaah
            </button>
            <button 
              onClick={() => setLoginType('petugas')}
              className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${loginType === 'petugas' ? 'bg-white text-emerald-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
            >
              Petugas
            </button>
          </div>

          {/* Form Jemaah */}
          {loginType === 'jamaah' && (
            <form onSubmit={otpSent ? handleLoginJamaah : handleSendOTP} className="flex flex-col gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-gray-700 tracking-wider uppercase ml-1">Nomor Induk Kependudukan (NIK)</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <User size={16} className="text-gray-400 group-focus-within:text-emerald-500 transition-colors" />
                  </div>
                  <input 
                    type="text" 
                    required
                    disabled={otpSent}
                    className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-sm focus:bg-white focus:ring-4 focus:ring-emerald-50 focus:border-emerald-200 transition-all outline-none font-medium text-gray-800 disabled:opacity-60"
                    placeholder="Masukkan 16 digit NIK Anda"
                    value={nik}
                    onChange={(e) => setNik(e.target.value.replace(/[^0-9]/g, ''))}
                    maxLength={16}
                  />
                </div>
              </div>

              {otpSent && otpInfo && (
                <div className="flex flex-col gap-3 animate-in fade-in slide-in-from-top-2 duration-300">

                  {/* Banner status WA */}
                  {otpInfo.waSent && !otpInfo.waPending && (
                    <div className="flex items-start gap-3 bg-emerald-50 border border-emerald-200 rounded-2xl px-4 py-3">
                      <span className="text-lg">✅</span>
                      <div>
                        <p className="text-xs font-bold text-emerald-700">OTP Terkirim via WhatsApp</p>
                        <p className="text-[11px] text-emerald-600 mt-0.5">Dikirim ke nomor: <span className="font-bold">{otpInfo.phoneHint}</span></p>
                      </div>
                    </div>
                  )}

                  {otpInfo.waPending && (
                    <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-2xl px-4 py-3">
                      <span className="text-lg">⏳</span>
                      <div>
                        <p className="text-xs font-bold text-amber-700">Pesan WhatsApp dalam antrian</p>
                        <p className="text-[11px] text-amber-600 mt-0.5">Nomor: <span className="font-bold">{otpInfo.phoneHint}</span> — mungkin butuh beberapa detik.</p>
                      </div>
                    </div>
                  )}

                  {!otpInfo.waSent && (
                    <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-2xl px-4 py-3">
                      <span className="text-lg">❌</span>
                      <div>
                        <p className="text-xs font-bold text-red-700">WhatsApp gagal dikirim</p>
                        <p className="text-[11px] text-red-600 mt-0.5">{otpInfo.waError || 'Sender tidak aktif'}</p>
                      </div>
                    </div>
                  )}

                  {/* Debug OTP — selalu tampil di dev mode */}
                  {otpInfo.debugOtp && (
                    <div className="bg-gray-900 border border-gray-700 rounded-2xl px-4 py-3">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">🔧 Mode Testing — Kode OTP Anda</p>
                      <p className="text-2xl font-black text-white tracking-[0.35em] text-center py-1">{otpInfo.debugOtp}</p>
                      <p className="text-[10px] text-gray-500 text-center mt-1">Salin kode ini ke kolom OTP di bawah · Berlaku 3 menit</p>
                    </div>
                  )}

                  {/* Input OTP */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold text-gray-700 tracking-wider uppercase ml-1">Kode OTP WhatsApp</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                        <MessageSquare size={16} className="text-gray-400 group-focus-within:text-emerald-500 transition-colors" />
                      </div>
                      <input 
                        type="text" 
                        required
                        autoFocus
                        className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-sm focus:bg-white focus:ring-4 focus:ring-emerald-50 focus:border-emerald-200 transition-all outline-none font-bold text-gray-800 tracking-[0.5em] text-center"
                        placeholder="• • • • • •"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, '').substring(0, 6))}
                        maxLength={6}
                      />
                    </div>
                    <p className="text-[10px] text-gray-500 text-center mt-1">Masukkan kode OTP yang dikirim ke nomor WhatsApp terdaftar.</p>
                  </div>
                </div>
              )}

              <button 
                type="submit"
                disabled={loading}
                className="w-full mt-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-emerald-500/30 hover:-translate-y-0.5 active:scale-95 transition-all disabled:opacity-70"
              >
                {loading ? 'MENGIRIM...' : (otpSent ? 'VERIFIKASI & MASUK' : 'KIRIM KODE OTP (WHATSAPP)')}
              </button>

              {otpSent && (
                <button 
                  type="button" 
                  onClick={() => { setOtpSent(false); setOtpInfo(null); setOtp(''); }}
                  className="text-xs font-bold text-emerald-600 hover:text-emerald-700 mt-2"
                >
                  Ubah NIK
                </button>
              )}
            </form>
          )}

          {/* Form Petugas */}
          {loginType === 'petugas' && (
            <form onSubmit={handleLoginPetugas} className="flex flex-col gap-5 animate-in fade-in duration-300">
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-gray-700 tracking-wider uppercase ml-1">Username Petugas</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <User size={16} className="text-gray-400 group-focus-within:text-emerald-500 transition-colors" />
                  </div>
                  <input 
                    type="text" 
                    required
                    className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-sm focus:bg-white focus:ring-4 focus:ring-emerald-50 focus:border-emerald-200 transition-all outline-none font-medium text-gray-800"
                    placeholder="Masukkan username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-gray-700 tracking-wider uppercase ml-1">Kata Sandi</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <Lock size={16} className="text-gray-400 group-focus-within:text-emerald-500 transition-colors" />
                  </div>
                  <input 
                    type="password" 
                    required
                    className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-sm focus:bg-white focus:ring-4 focus:ring-emerald-50 focus:border-emerald-200 transition-all outline-none font-medium text-gray-800"
                    placeholder="Masukkan kata sandi"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <button 
                type="submit"
                className="w-full mt-4 bg-gray-800 text-white font-bold py-4 rounded-2xl shadow-lg shadow-gray-500/20 hover:-translate-y-0.5 active:scale-95 transition-all"
              >
                MASUK SEBAGAI PETUGAS
              </button>
            </form>
          )}

          {loginType === 'jamaah' && (
            <p className="text-center text-xs font-medium text-gray-500 mt-8">
              Belum pernah mendaftar? <a href="/daftar" className="text-emerald-600 font-bold hover:underline">Pendaftaran Baru</a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
