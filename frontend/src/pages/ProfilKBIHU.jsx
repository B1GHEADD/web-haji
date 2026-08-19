import React from 'react';
import { ChevronLeft, MapPin, Calendar, Award, Users, Target, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const milestones = [
  { year: '2004', label: 'Berdiri & mulai melayani jamaah haji dan umroh' },
  { year: '2018', label: 'Lokakarya kurikulum di Bandungan, Semarang (23–24 Nov)' },
  { year: 'Kini', label: 'Pemateri bersertifikat pembimbing haji profesional Kemenag' },
];

const values = [
  {
    icon: Target,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    title: 'Jamaah Mandiri',
    desc: 'Setiap jamaah disiapkan mampu menyelesaikan seluruh rangkaian ibadah secara mandiri, bahkan saat terpisah dari rombongan.',
  },
  {
    icon: BookOpen,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    title: 'Kurikulum Terstruktur',
    desc: 'Kurikulum manasik haji & umroh disusun secara sistematis oleh tim pembuat kurikulum yang berpengalaman.',
  },
  {
    icon: Award,
    color: 'text-amber-500',
    bg: 'bg-amber-50',
    title: 'Pembimbing Profesional',
    desc: 'Pemateri memiliki sertifikat pembimbing haji profesional dari Kementerian Agama Republik Indonesia.',
  },
  {
    icon: Users,
    color: 'text-rose-500',
    bg: 'bg-rose-50',
    title: 'Ibadah Terbimbing',
    desc: 'Pendampingan intensif agar jamaah meraih haji mabrur dan umroh maqbul di hadapan Allah Subhanahu wa Ta\'ala.',
  },
];

const ProfilKBIHU = () => {
  return (
    <div className="px-4 md:px-8 py-4 max-w-[700px] mx-auto pb-10">

      {/* Back Button */}
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-500 hover:text-emerald-700 mb-5 transition-colors"
      >
        <ChevronLeft size={16} /> Kembali ke Beranda
      </Link>

      {/* Hero Card */}
      <div className="bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-[2rem] p-7 shadow-xl shadow-emerald-900/20 relative overflow-hidden mb-6">
        <div className="absolute top-0 right-0 opacity-10 -mr-8 -mt-8">
          <div className="w-40 h-40 rounded-full border-[6px] border-white" />
        </div>
        <div className="absolute bottom-0 left-0 opacity-10 -ml-6 -mb-6">
          <div className="w-24 h-24 rounded-full bg-white" />
        </div>
        <div className="flex items-center gap-4 relative z-10 mb-4">
          <div className="bg-white p-1.5 rounded-2xl shadow-lg shrink-0">
            <img src="/logo.png" alt="Logo KBIHU" className="w-14 h-14 object-contain rounded-xl" />
          </div>
          <div>
            <h1 className="font-extrabold text-xl text-yellow-400 uppercase tracking-wide leading-tight">
              KBIHU Nurul Ummah
            </h1>
            <div className="flex items-center gap-1.5 mt-1">
              <MapPin size={12} className="text-emerald-200" />
              <p className="text-emerald-100 text-xs font-medium">Klaten, Jawa Tengah</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-white/15 rounded-xl px-3 py-2 relative z-10 w-fit">
          <Calendar size={13} className="text-emerald-200" />
          <span className="text-white text-xs font-semibold">Berdiri sejak 2004 · ±20 tahun pengalaman</span>
        </div>
      </div>

      {/* Tentang */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-5">
        <h2 className="font-bold text-gray-800 text-base mb-3 flex items-center gap-2">
          <span className="w-1 h-5 bg-emerald-500 rounded-full inline-block" />
          Tentang Kami
        </h2>
        <p className="text-sm text-gray-600 leading-relaxed mb-3">
          Sejak tahun <strong>2004</strong>, KBIHU Nurul Ummah telah melayani masyarakat muslim yang hendak menunaikan 
          ibadah haji dan umroh melalui kegiatan pembimbingan manasik yang terstruktur dan profesional.
        </p>
        <p className="text-sm text-gray-600 leading-relaxed">
          Fokus utama kami adalah mencetak <strong>jamaah yang mandiri dan terbimbing</strong> — mampu menyelesaikan 
          seluruh rangkaian ibadah haji maupun umroh dengan baik, bahkan ketika terpisah dari rombongan.
        </p>
      </div>

      {/* Values Grid */}
      <div className="grid grid-cols-1 gap-3 mb-5">
        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest px-1">Keunggulan Kami</p>
        {values.map((v, i) => (
          <div key={i} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-start gap-4">
            <div className={`p-2.5 rounded-xl ${v.bg} ${v.color} shrink-0 mt-0.5`}>
              <v.icon size={18} strokeWidth={2} />
            </div>
            <div>
              <p className="font-bold text-gray-800 text-sm mb-0.5">{v.title}</p>
              <p className="text-xs text-gray-500 leading-relaxed">{v.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Timeline */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4 px-1">Perjalanan Kami</p>
        <div className="flex flex-col gap-0">
          {milestones.map((m, i) => (
            <div key={i} className="flex gap-4 relative">
              {/* Line */}
              {i < milestones.length - 1 && (
                <div className="absolute left-[19px] top-8 bottom-0 w-0.5 bg-emerald-100" />
              )}
              {/* Dot */}
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-extrabold text-[10px] shrink-0 z-10 border-2 border-white shadow-sm">
                {m.year === 'Kini' ? '★' : m.year.slice(2)}
              </div>
              <div className="pb-5">
                <p className="text-xs font-bold text-emerald-700">{m.year}</p>
                <p className="text-sm text-gray-600 leading-relaxed">{m.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default ProfilKBIHU;
