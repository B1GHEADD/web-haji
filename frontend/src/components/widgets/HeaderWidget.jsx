import React, { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import { useDrawer } from '../../context/DrawerContext';
import moment from 'moment';
import 'moment/locale/id';

const HeaderWidget = () => {
  const [time, setTime] = useState(moment());
  const { openDrawer } = useDrawer();

  useEffect(() => {
    moment.locale('id');
    const timer = setInterval(() => {
      setTime(moment());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-[#008854] text-white pt-6 pb-8 px-5 rounded-b-[2rem] relative overflow-hidden shadow-md">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 opacity-10 transform translate-x-4 -translate-y-10">
        <div className="w-32 h-32 rounded-full border-4 border-white"></div>
      </div>
      
      <div className="flex justify-between items-start relative z-10">
        {/* Logo & Title */}
        <div className="flex items-center gap-3 flex-1">
          <div className="bg-white p-1 rounded-full shadow-lg">
            <img src="/logo.png" alt="Logo" className="w-10 h-10 object-contain rounded-full" />
          </div>
          <div className="flex flex-col">
            <h1 className="font-bold text-lg leading-tight uppercase tracking-wide text-yellow-400">
              KBIHU NURUL UMMAH
            </h1>
            <p className="text-xs opacity-90 font-medium">Klaten, Jawa Tengah</p>
          </div>
        </div>

        {/* Right: Hamburger + Clock */}
        <div className="flex flex-col items-end gap-2 shrink-0">
          <button
            onClick={openDrawer}
            aria-label="Buka Menu"
            className="flex items-center justify-center w-9 h-9 bg-white/20 hover:bg-white/30 active:bg-white/40 rounded-xl transition-all border border-white/20"
          >
            <Menu size={20} className="text-white" />
          </button>
          <div className="text-right">
            <p className="text-[10px] opacity-90 font-medium">{time.format('dddd, DD MMM YYYY')}</p>
            <p className="text-sm font-bold tracking-widest">{time.format('HH:mm')} WIB</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderWidget;
