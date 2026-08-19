import React from 'react';
import { Search } from 'lucide-react';

const SearchWidget = () => {
  return (
    <div className="w-full">
      <div className="text-left mb-3 md:hidden px-5">
        <h2 className="text-[11px] font-extrabold text-gray-400 uppercase tracking-widest pl-1">PENCARIAN DATA</h2>
      </div>
      <div className="relative shadow-xl shadow-black/5 group md:px-0 px-5">
        <div className="absolute inset-y-0 left-5 md:left-0 pl-4 flex items-center pointer-events-none">
          <Search size={18} className="text-gray-400 group-focus-within:text-emerald-500 transition-colors" />
        </div>
        <input
          type="text"
          className="block w-full pl-12 pr-4 py-4 bg-white border border-white/50 rounded-2xl md:rounded-[1.25rem] text-sm focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none font-medium text-gray-800 placeholder:text-gray-400"
          placeholder="Ketik Nama atau Nomor Porsi..."
        />
      </div>
    </div>
  );
};

export default SearchWidget;
