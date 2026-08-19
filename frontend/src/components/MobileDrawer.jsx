import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  X,
  BookOpen, Video, Calendar, BookText, Share2, PhoneCall,
  UserPlus, FileCheck, FileText,
  Home, LogIn, HelpCircle
} from 'lucide-react';

const MobileDrawer = ({ isOpen, onClose }) => {
  const location = useLocation();

  // Tutup drawer saat route berubah
  useEffect(() => {
    onClose();
  }, [location.pathname]);

  // Lock body scroll saat drawer terbuka
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const menus = [
    { name: 'Profil KBIHU', icon: BookOpen, color: 'text-blue-500', bg: 'bg-blue-50', link: '/profil' },
    { name: 'Dokumentasi', icon: Video, color: 'text-rose-500', bg: 'bg-rose-50', link: '/dokumentasi' },
    { name: 'Kegiatan', icon: Calendar, color: 'text-orange-500', bg: 'bg-orange-50', link: '/kegiatan' },
    { name: 'Materi', icon: BookText, color: 'text-indigo-500', bg: 'bg-indigo-50', link: '/materi' },
    { name: 'Media Sosial', icon: Share2, color: 'text-cyan-500', bg: 'bg-cyan-50', link: '/sosmed' },
    { name: 'Bantuan', icon: PhoneCall, color: 'text-emerald-500', bg: 'bg-emerald-50', link: '/bantuan' },
  ];

  const actions = [
    { name: 'Pendaftaran Baru', icon: UserPlus, color: 'text-emerald-600', bg: 'bg-emerald-50', link: '/daftar' },
    { name: 'Cek Kelengkapan Berkas', icon: FileCheck, color: 'text-orange-600', bg: 'bg-orange-50', link: '/cek-berkas' },
    { name: 'Estimasi Keberangkatan', icon: FileText, color: 'text-blue-600', bg: 'bg-blue-50', link: '/estimasi' },
  ];

  const quickNav = [
    { name: 'Beranda', icon: Home, link: '/' },
    { name: 'Login', icon: LogIn, link: '/login' },
    { name: 'Bantuan', icon: HelpCircle, link: '/bantuan' },
  ];

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-[90] transition-opacity duration-300 md:hidden ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-[82vw] max-w-[340px] bg-white z-[100] shadow-2xl flex flex-col transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="bg-gradient-to-br from-emerald-600 to-emerald-800 pt-10 pb-6 px-5 relative overflow-hidden shrink-0">
          <div className="absolute top-0 right-0 opacity-10 -mr-4 -mt-4">
            <div className="w-28 h-28 rounded-full border-4 border-white" />
          </div>
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-3">
              <div className="bg-white p-1 rounded-full shadow">
                <img src="/logo.png" alt="Logo" className="w-9 h-9 object-contain rounded-full" />
              </div>
              <div>
                <p className="font-bold text-yellow-400 text-sm leading-tight uppercase tracking-wide">KBIHU Nurul Ummah</p>
                <p className="text-emerald-100 text-[11px]">Klaten, Jawa Tengah</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="bg-white/20 hover:bg-white/30 rounded-full p-1.5 transition-colors"
            >
              <X size={18} className="text-white" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-5">

          {/* Quick Navigation */}
          <div className="flex gap-2">
            {quickNav.map((item) => (
              <Link
                key={item.link}
                to={item.link}
                className={`flex-1 flex flex-col items-center gap-1 py-2.5 rounded-xl border transition-all text-xs font-semibold ${
                  location.pathname === item.link
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-200'
                    : 'bg-gray-50 text-gray-600 border-gray-100 hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-700'
                }`}
              >
                <item.icon size={16} />
                {item.name}
              </Link>
            ))}
          </div>

          {/* Layanan Utama */}
          <div>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3 px-1">Layanan Utama</p>
            <div className="grid grid-cols-2 gap-2">
              {menus.map((menu, idx) => (
                <Link
                  key={idx}
                  to={menu.link}
                  className="flex items-center gap-2.5 p-3 bg-gray-50 hover:bg-white border border-transparent hover:border-gray-200 rounded-xl transition-all group shadow-sm hover:shadow-md"
                >
                  <div className={`p-2 rounded-lg ${menu.bg} ${menu.color} group-hover:scale-110 transition-transform`}>
                    <menu.icon size={15} strokeWidth={2} />
                  </div>
                  <span className="text-[11px] font-semibold text-gray-700 group-hover:text-emerald-700 leading-tight">{menu.name}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Pusat Layanan Jemaah */}
          <div>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3 px-1">Pusat Layanan Jemaah</p>
            <div className="flex flex-col gap-2">
              {actions.map((action, idx) => (
                <Link
                  key={idx}
                  to={action.link}
                  className="flex items-center gap-3 p-3.5 bg-gray-50 hover:bg-white border border-transparent hover:border-gray-200 rounded-xl transition-all group shadow-sm hover:shadow-md"
                >
                  <div className={`p-2.5 rounded-xl ${action.bg} ${action.color} group-hover:scale-110 transition-transform`}>
                    <action.icon size={16} strokeWidth={2} />
                  </div>
                  <span className="text-sm font-semibold text-gray-700 group-hover:text-emerald-700">{action.name}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Login CTA */}
          <Link
            to="/login"
            className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-2xl transition-all shadow-md shadow-emerald-200 active:scale-95 text-sm"
          >
            <LogIn size={17} />
            Masuk / Login
          </Link>
        </div>
      </div>
    </>
  );
};

export default MobileDrawer;
