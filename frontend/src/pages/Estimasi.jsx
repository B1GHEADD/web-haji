import React, { useState, useEffect } from 'react';
import { FileText, Search, ChevronLeft, MapPin } from 'lucide-react';
import api from '../utils/api';

const Estimasi = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/api/estimasi')
      .then(res => {
        if(res.data && res.data.status === 'success') {
          setData(res.data.data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching data", err);
        setLoading(false);
      });
  }, []);

  const filteredData = data.filter(d => 
    d.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.noPorsi.includes(searchTerm)
  );

  return (
    <div className="flex flex-col items-center min-h-[70vh] p-5">
      <div className="bg-gradient-to-br from-white to-gray-50/50 rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 backdrop-blur-xl w-full max-w-4xl relative overflow-hidden">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shadow-sm">
              <FileText size={24} strokeWidth={2} />
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-gray-800 tracking-tight">Data Estimasi Keberangkatan</h1>
              <p className="text-sm text-gray-500 font-medium">Sesuai dengan Kuota Nasional Kementerian Agama RI.</p>
            </div>
          </div>
          <a href="/" className="inline-flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-xl text-sm font-bold shadow-sm hover:bg-gray-50 transition-colors">
            <ChevronLeft size={16} /> Kembali
          </a>
        </div>

        <div className="relative mb-6 group">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
          <input
            type="text"
            className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-4 focus:ring-blue-50 focus:border-blue-300 transition-all outline-none placeholder:text-gray-400 font-medium text-gray-800"
            placeholder="Cari berdasarkan Nama atau Nomor Porsi..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="overflow-x-auto rounded-xl border border-gray-100 shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/80 text-gray-600 text-xs uppercase tracking-wider font-bold">
                <th className="p-4 border-b border-gray-100">No. Porsi</th>
                <th className="p-4 border-b border-gray-100">Nama Jemaah</th>
                <th className="p-4 border-b border-gray-100">Kuota Provinsi</th>
                <th className="p-4 border-b border-gray-100 text-center">Estimasi Tahun</th>
                <th className="p-4 border-b border-gray-100 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {filteredData.length > 0 ? (
                filteredData.map((item, index) => (
                  <tr key={index} className="hover:bg-blue-50/30 transition-colors group">
                    <td className="p-4 border-b border-gray-50 text-sm font-bold text-gray-800">{item.noPorsi}</td>
                    <td className="p-4 border-b border-gray-50 text-sm font-semibold text-gray-700">{item.nama}</td>
                    <td className="p-4 border-b border-gray-50 text-sm text-gray-500 font-medium flex items-center gap-1">
                      <MapPin size={14} className="text-gray-400" /> {item.kuota}
                    </td>
                    <td className="p-4 border-b border-gray-50 text-center">
                      <div className="flex flex-col items-center">
                        <span className="text-[13px] font-bold text-gray-800">{item.estimasiTahun}</span>
                        <span className="text-[11px] font-semibold text-emerald-600">{item.estimasiH}</span>
                      </div>
                    </td>
                    <td className="p-4 border-b border-gray-50 text-center">
                      {item.status === 'Terjadwal' ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-emerald-100 text-emerald-700 border border-emerald-200">
                          {item.status}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-blue-100 text-blue-700 border border-blue-200">
                          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></span>
                          {item.status}
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-sm text-gray-500 font-medium">
                    Tidak ada data yang cocok dengan pencarian Anda.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Estimasi;
