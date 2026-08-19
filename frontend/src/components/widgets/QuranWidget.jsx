import React, { useState, useEffect } from 'react';
import { Book, Search, ChevronLeft } from 'lucide-react';
import axios from 'axios';

const QuranWidget = ({ className = "" }) => {
  const [surahs, setSurahs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loadingList, setLoadingList] = useState(true);
  
  // Detail State
  const [selectedSurah, setSelectedSurah] = useState(null);
  const [surahDetail, setSurahDetail] = useState(null);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    axios.get('https://api.myquran.com/v3/quran')
      .then(res => {
        if (res.data.status) {
          setSurahs(res.data.data);
        }
        setLoadingList(false);
      })
      .catch(err => {
        console.error('Error fetching Quran data', err);
        setLoadingList(false);
      });
  }, []);

  const fetchAyahs = (surahNumber, page = 1, append = false) => {
    if (!append) setLoadingDetail(true);
    else setLoadingMore(true);

    axios.get(`https://api.myquran.com/v3/quran/${surahNumber}?limit=50&page=${page}`)
      .then(res => {
        if (res.data.status) {
          if (append) {
            setSurahDetail(prev => ({
              ...prev,
              ayahs: [...prev.ayahs, ...res.data.data.ayahs]
            }));
          } else {
            setSurahDetail(res.data.data);
          }
          // Check if there are more ayahs
          setHasMore(res.data.data.ayahs.length === 50);
          setCurrentPage(page);
        }
        setLoadingDetail(false);
        setLoadingMore(false);
      })
      .catch(err => {
        console.error('Error fetching Surah detail', err);
        setLoadingDetail(false);
        setLoadingMore(false);
      });
  };

  const handleSelectSurah = (surahNumber) => {
    setSelectedSurah(surahNumber);
    setSurahDetail(null);
    setCurrentPage(1);
    setHasMore(true);
    fetchAyahs(surahNumber, 1, false);
  };

  const handleBack = () => {
    setSelectedSurah(null);
    setSurahDetail(null);
  };

  const filteredSurahs = surahs.filter(s => 
    s.name_latin.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.translation.toLowerCase().includes(searchTerm.toLowerCase())
  ).slice(0, 4);

  return (
    <div className={`px-5 md:px-0 ${className}`}>
      <div className="bg-gradient-to-br from-white to-gray-50/50 rounded-[2rem] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 backdrop-blur-xl relative overflow-hidden h-full flex flex-col">
        
        {/* VIEW: SURAH DETAIL */}
        {selectedSurah ? (
          <div className="flex flex-col h-full min-h-0">
            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
              <button 
                onClick={handleBack}
                className="bg-gray-100 hover:bg-emerald-100 text-gray-600 hover:text-emerald-600 p-2 rounded-full transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              <div>
                <h2 className="text-sm font-bold text-gray-800">
                  {surahDetail ? surahDetail.name_latin : 'Memuat...'}
                </h2>
                <p className="text-[10px] text-emerald-600 font-medium">
                  {surahDetail ? `${surahDetail.translation} • ${surahDetail.number_of_ayahs} Ayat` : ''}
                </p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
              {loadingDetail ? (
                <div className="flex flex-col items-center justify-center h-full text-emerald-500 animate-pulse gap-2">
                  <Book size={24} />
                  <span className="text-xs font-medium">Mengambil Ayat...</span>
                </div>
              ) : (
                <div className="flex flex-col gap-6 pb-4">
                  {surahDetail?.ayahs.map((ayah) => (
                    <div key={ayah.id} className="flex flex-col gap-3">
                      <div className="flex items-start gap-3">
                        <div className="shrink-0 w-7 h-7 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center text-[10px] font-bold mt-1">
                          {ayah.ayah_number}
                        </div>
                        <p className="text-right flex-1 text-2xl leading-[2.5rem] font-arabic text-gray-800" dir="rtl">
                          {ayah.arab}
                        </p>
                      </div>
                      <p className="text-[12px] text-gray-500 leading-relaxed pl-10 border-b border-gray-50 pb-4">
                        {ayah.translation}
                      </p>
                    </div>
                  ))}
                  
                  {hasMore && (
                    <button 
                      onClick={() => fetchAyahs(selectedSurah, currentPage + 1, true)}
                      disabled={loadingMore}
                      className="mt-4 w-full py-3 bg-emerald-50 text-emerald-600 rounded-2xl text-[11px] font-bold hover:bg-emerald-100 transition-colors disabled:opacity-50"
                    >
                      {loadingMore ? 'Memuat Ayat...' : 'Muat Ayat Selanjutnya'}
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        ) : (
          
          /* VIEW: SURAH LIST */
          <>
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className="bg-emerald-100/50 p-2 rounded-xl text-emerald-600">
                  <Book size={18} strokeWidth={2} />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-gray-800">Al-Qur'an Digital</h2>
                  <p className="text-[10px] text-gray-400">Sumber: api.myquran.com</p>
                </div>
              </div>
            </div>

            <div className="relative mb-5 group">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-500 transition-colors" />
              <input
                type="text"
                className="w-full pl-11 pr-4 py-3 bg-white border border-gray-100 rounded-2xl text-[13px] focus:ring-4 focus:ring-emerald-50 focus:border-emerald-200 transition-all outline-none placeholder:text-gray-400 shadow-sm"
                placeholder="Cari Surah atau Terjemahan..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {loadingList ? (
              <div className="text-center text-xs text-gray-400 py-6 animate-pulse">Menghubungkan ke API Muslim...</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {filteredSurahs.map((surah) => (
                  <button 
                    key={surah.number} 
                    onClick={() => handleSelectSurah(surah.number)}
                    className="flex items-center justify-between p-3.5 rounded-2xl bg-white border border-gray-100 hover:border-emerald-200 hover:shadow-md hover:shadow-emerald-500/5 transition-all text-left group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-xs font-bold text-emerald-600 group-hover:bg-emerald-50 transition-colors">
                        {surah.number}
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-gray-800 group-hover:text-emerald-600 transition-colors">{surah.name_latin}</h3>
                        <p className="text-[11px] text-gray-400 line-clamp-1">{surah.translation}</p>
                      </div>
                    </div>
                    <div className="text-right flex flex-col items-end gap-1">
                      <span className="text-lg font-arabic text-gray-800" dir="rtl">{surah.name}</span>
                      <span className="text-[9px] font-medium text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-full">{surah.number_of_ayahs} Ayat</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #d1d5db;
          border-radius: 20px;
        }
      `}} />
    </div>
  );
};

export default QuranWidget;
