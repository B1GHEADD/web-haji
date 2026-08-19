import React from 'react';
import { BookOpen, Video, Calendar, BookText, Share2, PhoneCall } from 'lucide-react';

const MenuGridWidget = () => {
  const menus = [
    { name: 'PROFIL KBIHU', icon: BookOpen, color: 'text-blue-500', bg: 'bg-blue-50/80 hover:bg-blue-100/80', shadow: 'shadow-blue-500/10', link: '/profil' },
    { name: 'DOKUMENTASI', icon: Video, color: 'text-rose-500', bg: 'bg-rose-50/80 hover:bg-rose-100/80', shadow: 'shadow-rose-500/10', link: '/dokumentasi' },
    { name: 'KEGIATAN', icon: Calendar, color: 'text-orange-500', bg: 'bg-orange-50/80 hover:bg-orange-100/80', shadow: 'shadow-orange-500/10', link: '/kegiatan' },
    { name: 'MATERI', icon: BookText, color: 'text-indigo-500', bg: 'bg-indigo-50/80 hover:bg-indigo-100/80', shadow: 'shadow-indigo-500/10', link: '/materi' },
    { name: 'MEDIA SOSIAL', icon: Share2, color: 'text-cyan-500', bg: 'bg-cyan-50/80 hover:bg-cyan-100/80', shadow: 'shadow-cyan-500/10', link: '/sosmed' },
    { name: 'BANTUAN', icon: PhoneCall, color: 'text-emerald-500', bg: 'bg-emerald-50/80 hover:bg-emerald-100/80', shadow: 'shadow-emerald-500/10', link: '/bantuan' },
  ];

  return (
    <div className="px-5 md:px-0">
      <div className="bg-gradient-to-br from-white to-gray-50/50 rounded-[2rem] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 backdrop-blur-xl">
        <div className="flex justify-between items-end mb-6">
          <h2 className="text-sm font-bold text-gray-800 tracking-wide">Layanan Utama</h2>
        </div>
        
        <div className="grid grid-cols-3 gap-y-8 gap-x-4">
          {menus.map((menu, idx) => (
            <a 
              key={idx}
              href={menu.link}
              className="group flex flex-col items-center"
            >
              <div className={`w-[60px] h-[60px] flex items-center justify-center rounded-[1.25rem] mb-3 ${menu.bg} transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg ${menu.shadow}`}>
                <menu.icon className={menu.color} size={26} strokeWidth={1.5} />
              </div>
              <span className="text-[10px] font-bold text-gray-600/80 text-center tracking-wide leading-tight px-1 group-hover:text-gray-800 transition-colors">{menu.name}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuGridWidget;
