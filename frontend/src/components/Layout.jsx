import React, { useState } from 'react';
import BottomNav from './BottomNav';
import MobileDrawer from './MobileDrawer';
import { DrawerContext } from '../context/DrawerContext';
import { ChevronDown, BookOpen, Video, Calendar, BookText, Share2, PhoneCall, UserPlus, FileCheck, FileText } from 'lucide-react';

const Layout = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const menus = [
    { name: 'Profil KBIHU', icon: BookOpen, color: 'text-blue-500', link: '/profil' },
    { name: 'Dokumentasi', icon: Video, color: 'text-rose-500', link: '/dokumentasi' },
    { name: 'Kegiatan', icon: Calendar, color: 'text-orange-500', link: '/kegiatan' },
    { name: 'Materi', icon: BookText, color: 'text-indigo-500', link: '/materi' },
    { name: 'Media Sosial', icon: Share2, color: 'text-cyan-500', link: '/sosmed' },
    { name: 'Bantuan', icon: PhoneCall, color: 'text-emerald-500', link: '/bantuan' },
  ];

  const actions = [
    { name: 'Pendaftaran Baru', icon: UserPlus, color: 'text-emerald-600', link: '/daftar' },
    { name: 'Cek Kelengkapan Berkas', icon: FileCheck, color: 'text-orange-600', link: '/cek-berkas' },
    { name: 'Estimasi Keberangkatan', icon: FileText, color: 'text-blue-600', link: '/estimasi' }
  ];

  return (
    <DrawerContext.Provider value={{ openDrawer: () => setDrawerOpen(true), closeDrawer: () => setDrawerOpen(false) }}>
      <div className="min-h-screen bg-[#fafafa] flex flex-col font-sans">
        
        {/* Top Navbar for Desktop */}
        <div className="hidden md:flex bg-white/80 backdrop-blur-lg border-b border-gray-100 py-4 px-10 items-center justify-between sticky top-0 z-50">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Logo" className="w-8 h-8 object-contain" />
            <h1 className="font-bold text-base text-gray-800 tracking-wide">KBIHU NURUL UMMAH</h1>
          </div>
          
          <div className="flex items-center gap-8 text-sm font-medium text-gray-500">
            <a href="/" className="text-emerald-600 font-semibold">Beranda</a>
            
            {/* Dropdown Layanan Utama */}
            <div className="relative group py-2">
              <button className="flex items-center gap-1 hover:text-emerald-600 transition-colors focus:outline-none">
                Layanan <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />
              </button>
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[340px] bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top group-hover:translate-y-0 scale-95 group-hover:scale-100 p-3 grid grid-cols-2 gap-2">
                {menus.map((menu, idx) => (
                  <a key={idx} href={menu.link} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group/item">
                    <div className={`p-2 bg-gray-50 rounded-lg group-hover/item:bg-white group-hover/item:shadow-sm transition-all ${menu.color}`}>
                      <menu.icon size={16} strokeWidth={2} />
                    </div>
                    <span className="text-xs font-semibold text-gray-600 group-hover/item:text-emerald-600">{menu.name}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Dropdown Pusat Jemaah */}
            <div className="relative group py-2">
              <button className="flex items-center gap-1 hover:text-emerald-600 transition-colors focus:outline-none">
                Pusat Jemaah <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />
              </button>
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[280px] bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top group-hover:translate-y-0 scale-95 group-hover:scale-100 p-3 flex flex-col gap-1">
                {actions.map((action, idx) => (
                  <a key={idx} href={action.link} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group/item">
                    <div className={`p-2 bg-gray-50 rounded-lg group-hover/item:bg-white group-hover/item:shadow-sm transition-all ${action.color}`}>
                      <action.icon size={16} strokeWidth={2} />
                    </div>
                    <span className="text-xs font-semibold text-gray-600 group-hover/item:text-emerald-600">{action.name}</span>
                  </a>
                ))}
              </div>
            </div>

            <a href="/login" className="text-emerald-600 hover:text-white border border-emerald-500 hover:bg-emerald-500 px-5 py-2 rounded-full font-semibold transition-all">Login</a>
          </div>
        </div>

        {/* Mobile Drawer */}
        <MobileDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />

        {/* Main Content Area */}
        <main className="flex-1 w-full max-w-[1100px] mx-auto pb-24 md:pb-12 pt-0 md:pt-8 relative hide-scrollbar">
          {children}
        </main>
        
        {/* Bottom Nav */}
        <div className="md:hidden">
          <BottomNav />
        </div>
        
        {/* Utility class to hide scrollbar */}
        <style dangerouslySetInnerHTML={{__html: `
          .hide-scrollbar::-webkit-scrollbar { display: none; }
          .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}} />
      </div>
    </DrawerContext.Provider>
  );
};

export default Layout;
