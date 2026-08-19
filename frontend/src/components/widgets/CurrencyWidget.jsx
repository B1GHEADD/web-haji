import React, { useState, useEffect } from 'react';
import { Banknote, ArrowRightLeft } from 'lucide-react';
import axios from 'axios';

const CurrencyWidget = ({ className = "" }) => {
  const [exchangeRate, setExchangeRate] = useState(null);
  const [inputValue, setInputValue] = useState('1000000');
  const [isIdrToSar, setIsIdrToSar] = useState(true);

  useEffect(() => {
    // Fetch latest IDR to SAR exchange rate
    axios.get('https://open.er-api.com/v6/latest/IDR')
      .then(res => {
        if(res.data && res.data.rates && res.data.rates.SAR) {
          setExchangeRate(res.data.rates.SAR);
        }
      })
      .catch(err => console.error("Error fetching exchange rate", err));
  }, []);

  const handleSwap = () => setIsIdrToSar(!isIdrToSar);

  const calculateResult = () => {
    if (!exchangeRate) return '...';
    const num = parseFloat(inputValue.replace(/[^0-9]/g, '')) || 0;
    if (isIdrToSar) {
      return Math.floor(num * exchangeRate).toLocaleString('id-ID');
    } else {
      return Math.floor(num / exchangeRate).toLocaleString('id-ID');
    }
  };

  const formatCurrency = (val) => val ? parseInt(val).toLocaleString('id-ID') : '';

  return (
    <div className={`px-5 md:px-0 ${className}`}>
      <div className="bg-gradient-to-br from-white to-gray-50/50 rounded-[2rem] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 backdrop-blur-xl h-full flex flex-col justify-center">
        
        <div className="flex items-center gap-3 mb-5">
          <div className="bg-blue-50/80 p-2 rounded-xl text-blue-500">
            <Banknote size={18} strokeWidth={2} />
          </div>
          <h2 className="text-sm font-bold text-gray-800">Kalkulator Kurs</h2>
        </div>

        <div className="flex flex-col gap-3 relative z-10">
          
          {/* Input Box */}
          <div className="flex justify-between items-center bg-gray-50/80 p-3 rounded-2xl border border-gray-100">
            <div className="flex flex-col">
              <span className="text-[9px] font-bold text-gray-400 tracking-widest">{isIdrToSar ? 'RUPIAH (IDR)' : 'RIYAL (SAR)'}</span>
              <div className="flex items-center font-bold text-lg text-gray-800 mt-1">
                <span className="text-gray-400 mr-2 text-sm">{isIdrToSar ? 'Rp' : 'SR'}</span>
                <input 
                  type="text"
                  className="bg-transparent outline-none w-32 font-bold text-gray-800"
                  value={formatCurrency(inputValue)}
                  onChange={(e) => setInputValue(e.target.value.replace(/[^0-9]/g, ''))}
                />
              </div>
            </div>
          </div>

          {/* Swap Button (Absolute center) */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
            <button 
              onClick={handleSwap}
              className="bg-white p-2 rounded-full shadow-md text-blue-500 hover:text-blue-600 hover:scale-110 active:scale-95 transition-all border border-gray-50"
            >
              <ArrowRightLeft size={14} />
            </button>
          </div>

          {/* Output Box */}
          <div className="flex justify-between items-center bg-blue-50/30 p-3 rounded-2xl border border-blue-50">
            <div className="flex flex-col">
              <span className="text-[9px] font-bold text-blue-400 tracking-widest">{isIdrToSar ? 'RIYAL (SAR)' : 'RUPIAH (IDR)'}</span>
              <div className="flex items-center font-bold text-xl text-blue-600 mt-1">
                <span className="text-blue-400 mr-2 text-sm">{isIdrToSar ? 'SR' : 'Rp'}</span>
                <span>{calculateResult()}</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default CurrencyWidget;
