import React from 'react';
import HeaderWidget from '../components/widgets/HeaderWidget';
import SearchWidget from '../components/widgets/SearchWidget';
import WorldClockWidget from '../components/widgets/WorldClockWidget';
import QuranWidget from '../components/widgets/QuranWidget';
import CurrencyWidget from '../components/widgets/CurrencyWidget';

const Home = () => {
  return (
    <div className="md:px-8 px-0 max-w-[1100px] mx-auto">
      {/* Mobile-only Header */}
      <div className="md:hidden">
        <HeaderWidget />
      </div>

      <div className="md:grid md:grid-cols-12 md:gap-6 md:h-[calc(100vh-110px)] md:mt-2 -mt-4 relative z-10">
        
        {/* Left Column */}
        <div className="md:col-span-7 flex flex-col gap-6 h-full">
          
          {/* Welcome Card Desktop */}
          <div className="hidden md:block bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-[2rem] p-8 shadow-lg shadow-emerald-900/10 relative overflow-hidden shrink-0">
            {/* Decorative background element */}
            <div className="absolute top-0 right-0 -mr-8 -mt-8 w-48 h-48 bg-white/10 rounded-full blur-2xl"></div>
            
            <h2 className="text-3xl font-extrabold text-white tracking-tight mb-2 relative z-10">Selamat Datang, Jamaah!</h2>
            <p className="text-emerald-100 text-sm mb-6 relative z-10 font-medium">Silakan gunakan layanan KBIHU Nurul Ummah di bawah ini.</p>
            
            <div className="w-full relative z-10">
               <SearchWidget />
            </div>
          </div>

          <div className="md:hidden shrink-0">
            <SearchWidget />
          </div>

          
          <div className="hidden md:flex flex-1 min-h-0">
            <QuranWidget className="h-full w-full" />
          </div>
        </div>

        {/* Right Column */}
        <div className="md:col-span-5 flex flex-col gap-6 h-full">
          <div className="flex-1 min-h-0 md:flex">
            <WorldClockWidget className="h-full w-full" />
          </div>
          <div className="md:hidden shrink-0">
            <QuranWidget />
          </div>
          <div className="shrink-0">
            <CurrencyWidget />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Home;
