import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import axios from 'axios';
import moment from 'moment';

const WorldClockWidget = ({ className = "" }) => {
  const [wibTime, setWibTime] = useState(moment());
  const [wasTime, setWasTime] = useState(moment().utcOffset('+03:00'));
  const [prayerTimes, setPrayerTimes] = useState(null);
  const [makkahPrayerTimes, setMakkahPrayerTimes] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setWibTime(moment());
      setWasTime(moment().utcOffset('+03:00'));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Aladhan for accurate global prayer times
    axios.get('https://api.aladhan.com/v1/timingsByCity', {
      params: { city: 'Klaten', country: 'Indonesia', method: 11 }
    }).then(res => setPrayerTimes(res.data.data.timings))
      .catch(err => console.error("Error fetching Klaten prayer times", err));

    axios.get('https://api.aladhan.com/v1/timingsByCity', {
      params: { city: 'Makkah', country: 'Saudi Arabia', method: 4 }
    }).then(res => setMakkahPrayerTimes(res.data.data.timings))
      .catch(err => console.error("Error fetching Makkah prayer times", err));
  }, []);

  const renderPrayerTable = (times, isSaudi) => {
    if (!times) return <div className="text-[10px] text-center py-4 text-gray-400 animate-pulse">Memuat...</div>;
    const list = [
      { name: 'Subuh', time: times.Fajr },
      { name: 'Zuhur', time: times.Dhuhr },
      { name: 'Ashar', time: times.Asr },
      { name: 'Maghrib', time: times.Maghrib },
      { name: 'Isya', time: times.Isha },
    ];
    return (
      <div className="flex flex-col gap-1.5 mt-3 w-full">
        {list.map((p, idx) => (
          <div key={p.name} className={`flex justify-between items-center py-1.5 border-b ${isSaudi ? 'border-orange-50/50' : 'border-emerald-50/50'} last:border-0`}>
            <span className="text-[11px] font-medium text-gray-500">{p.name}</span>
            <span className={`text-[12px] font-bold ${isSaudi ? 'text-orange-700' : 'text-emerald-700'}`}>{p.time}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={`px-5 md:px-0 ${className}`}>
      <div className="bg-gradient-to-br from-white to-gray-50/50 rounded-[2rem] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 backdrop-blur-xl h-full flex flex-col justify-center">
        
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-gray-100/80 p-2 rounded-xl text-gray-500">
            <Clock size={18} strokeWidth={2} />
          </div>
          <h2 className="text-sm font-bold text-gray-800">Waktu & Jadwal Salat</h2>
        </div>

        {/* Clocks Comparison */}
        <div className="grid grid-cols-2 gap-4">
          
          {/* Indonesia */}
          <div className="flex flex-col items-center bg-emerald-50/30 rounded-3xl p-4 border border-emerald-100/50">
            <span className="text-[9px] font-bold text-emerald-600/70 tracking-widest mb-2">KLATEN (WIB)</span>
            <span className="text-2xl font-black text-emerald-800 tracking-tight">{wibTime.format('HH:mm:ss')}</span>
            <span className="text-[10px] font-medium text-emerald-600/70 mt-1">{wibTime.format('DD MMM YYYY')}</span>
            <div className="w-full mt-3 pt-3 border-t border-emerald-100/50">
              {renderPrayerTable(prayerTimes, false)}
            </div>
          </div>

          {/* Saudi Arabia */}
          <div className="flex flex-col items-center bg-orange-50/30 rounded-3xl p-4 border border-orange-100/50">
            <span className="text-[9px] font-bold text-orange-600/70 tracking-widest mb-2">MAKKAH (WAS)</span>
            <span className="text-2xl font-black text-orange-600 tracking-tight">{wasTime.format('HH:mm:ss')}</span>
            <span className="text-[10px] font-medium text-orange-600/70 mt-1">{wasTime.format('DD MMM YYYY')}</span>
            <div className="w-full mt-3 pt-3 border-t border-orange-100/50">
              {renderPrayerTable(makkahPrayerTimes, true)}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default WorldClockWidget;
