import React from 'react';
import { ChevronLeft, ExternalLink, Play, Heart, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const socials = [
  {
    name: 'Instagram',
    handle: '@nurul_ummah.klaten',
    url: 'https://www.instagram.com/nurul_ummah.klaten?igsh=ZjBmc2IxM3Bwemtv',
    desc: 'Foto kegiatan manasik, dokumentasi jamaah, dan info terkini seputar ibadah haji & umroh.',
    gradient: 'from-pink-500 via-rose-500 to-orange-400',
    bg: 'bg-gradient-to-br from-pink-50 to-orange-50',
    border: 'border-pink-100',
    iconBg: 'bg-gradient-to-br from-pink-500 via-rose-500 to-orange-400',
    badge: 'Instagram',
    badgeColor: 'bg-pink-100 text-pink-700',
    Icon: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-white">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
      </svg>
    ),
  },
  {
    name: 'TikTok',
    handle: '@nurul_ummah.klaten',
    url: 'https://www.tiktok.com/@nurul_ummah.klaten',
    desc: 'Video pendek tips manasik, highlight kegiatan jamaah, dan konten inspirasi ibadah sehari-hari.',
    gradient: 'from-gray-900 to-gray-700',
    bg: 'bg-gradient-to-br from-gray-50 to-slate-50',
    border: 'border-gray-200',
    iconBg: 'bg-gradient-to-br from-gray-900 to-gray-700',
    badge: 'TikTok',
    badgeColor: 'bg-gray-100 text-gray-700',
    Icon: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-white">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.72a4.85 4.85 0 01-1.01-.03z"/>
      </svg>
    ),
  },
  {
    name: 'YouTube',
    handle: '@kbihunurulummahklaten',
    url: 'https://youtube.com/@kbihunurulummahklaten?si=kHVuCYsEOiivyyIW',
    desc: 'Video manasik lengkap, rekaman kajian pembimbingan haji, dan dokumentasi perjalanan jamaah.',
    gradient: 'from-red-500 to-red-600',
    bg: 'bg-gradient-to-br from-red-50 to-rose-50',
    border: 'border-red-100',
    iconBg: 'bg-gradient-to-br from-red-500 to-red-600',
    badge: 'YouTube',
    badgeColor: 'bg-red-100 text-red-700',
    Icon: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-white">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
  },
];

const MediaSosial = () => {
  return (
    <div className="px-4 md:px-8 py-4 max-w-[700px] mx-auto pb-10">

      {/* Back Button */}
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-500 hover:text-emerald-700 mb-5 transition-colors"
      >
        <ChevronLeft size={16} /> Kembali ke Beranda
      </Link>

      {/* Hero */}
      <div className="bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-[2rem] p-7 shadow-xl shadow-emerald-900/20 relative overflow-hidden mb-6">
        <div className="absolute top-0 right-0 opacity-10 -mr-6 -mt-6">
          <div className="w-36 h-36 rounded-full border-[6px] border-white" />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <div className="flex gap-1.5">
              {['bg-pink-400', 'bg-gray-900', 'bg-red-500'].map((c, i) => (
                <div key={i} className={`w-8 h-8 rounded-full ${c} flex items-center justify-center shadow-md`}>
                  <Heart size={12} className="text-white" />
                </div>
              ))}
            </div>
          </div>
          <h1 className="font-extrabold text-2xl text-white mb-1">Media Sosial</h1>
          <p className="text-emerald-100 text-sm font-medium">
            Ikuti kami dan dapatkan info terkini seputar kegiatan KBIHU Nurul Ummah
          </p>
        </div>
      </div>

      {/* Social Cards */}
      <div className="flex flex-col gap-4">
        {socials.map((s) => (
          <a
            key={s.name}
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`group block rounded-2xl border ${s.border} ${s.bg} p-5 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98]`}
          >
            <div className="flex items-start gap-4">
              {/* Icon */}
              <div className={`w-14 h-14 rounded-2xl ${s.iconBg} flex items-center justify-center shadow-lg shrink-0`}>
                <s.Icon />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-0.5">
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-gray-900 text-base">{s.name}</p>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${s.badgeColor}`}>
                      {s.badge}
                    </span>
                  </div>
                  <ExternalLink
                    size={15}
                    className="text-gray-400 group-hover:text-emerald-600 transition-colors shrink-0"
                  />
                </div>
                <p className="text-xs font-semibold text-gray-500 mb-2">{s.handle}</p>
                <p className="text-xs text-gray-600 leading-relaxed">{s.desc}</p>
              </div>
            </div>

            {/* CTA Bar */}
            <div className={`mt-4 flex items-center justify-between bg-white/70 rounded-xl px-4 py-2.5 border border-white`}>
              <span className="text-xs font-semibold text-gray-600">Kunjungi {s.name}</span>
              <div className={`flex items-center gap-1 text-xs font-bold bg-gradient-to-r ${s.gradient} bg-clip-text text-transparent`}>
                <span>Ikuti Sekarang</span>
                <ExternalLink size={11} className="text-emerald-600" />
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* Footer note */}
      <div className="mt-6 text-center">
        <div className="inline-flex items-center gap-2 bg-white rounded-2xl px-5 py-3 shadow-sm border border-gray-100">
          <Users size={14} className="text-emerald-500" />
          <p className="text-xs text-gray-500 font-medium">
            Bergabung bersama komunitas jamaah KBIHU Nurul Ummah
          </p>
        </div>
      </div>

    </div>
  );
};

export default MediaSosial;
