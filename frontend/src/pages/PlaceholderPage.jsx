import React from 'react';
import { Hammer, ChevronLeft } from 'lucide-react';

const PlaceholderPage = ({ title }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] p-5">
      <div className="bg-gradient-to-br from-white to-gray-50/50 rounded-[2rem] p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 backdrop-blur-xl text-center max-w-md w-full relative overflow-hidden">
        
        {/* Decor */}
        <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-emerald-50 rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 left-0 -ml-8 -mb-8 w-32 h-32 bg-emerald-50 rounded-full blur-2xl"></div>

        <div className="relative z-10 flex flex-col items-center">
          <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mb-6 shadow-sm border border-emerald-100/50">
            <Hammer size={32} strokeWidth={1.5} className="animate-bounce" />
          </div>
          <h1 className="text-2xl font-extrabold text-gray-800 mb-2 tracking-tight">{title}</h1>
          <p className="text-sm text-gray-500 font-medium mb-8 leading-relaxed">
            Halaman ini sedang dalam tahap pengembangan dan akan segera hadir dengan fitur yang luar biasa!
          </p>
          
          <a href="/" className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-full text-sm font-bold shadow-lg shadow-gray-900/20 hover:-translate-y-0.5 active:scale-95 transition-all">
            <ChevronLeft size={16} /> Kembali ke Beranda
          </a>
        </div>
      </div>
    </div>
  );
};

export default PlaceholderPage;
