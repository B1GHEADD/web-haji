import React, { useState } from 'react';
import { ChevronLeft, X, ChevronRight, ChevronLeft as Prev, Image, Video, Play } from 'lucide-react';
import { Link } from 'react-router-dom';

const photos = [
  {
    src: '/dokumentasi/foto1.jpeg',
    caption: 'Jamaah KBIHU Nurul Ummah',
    location: 'Masjidil Haram, Makkah',
  },
  {
    src: '/dokumentasi/foto2.jpeg',
    caption: 'Kegiatan Sa\'i Jamaah',
    location: 'Mas\'a, Makkah',
  },
  {
    src: '/dokumentasi/foto3.jpeg',
    caption: 'Dokumentasi Jamaah',
    location: 'Tanah Suci',
  },
  {
    src: '/dokumentasi/foto4.jpeg',
    caption: 'Foto Bersama Jamaah di Makkah',
    location: 'Masjidil Haram, Makkah',
  },
];

const videos = [
  {
    src: '/dokumentasi/video1.mp4',
    caption: 'Kegiatan Jamaah KBIHU Nurul Ummah',
    date: 'Juni 2026',
  },
  {
    src: '/dokumentasi/video2.mp4',
    caption: 'Dokumentasi Perjalanan Haji',
    date: 'Juni 2026',
  },
];

const Dokumentasi = () => {
  const [activeTab, setActiveTab] = useState('foto');
  const [lightbox, setLightbox] = useState(null); // index of photo

  const openLightbox = (idx) => setLightbox(idx);
  const closeLightbox = () => setLightbox(null);
  const prevPhoto = () => setLightbox((p) => (p - 1 + photos.length) % photos.length);
  const nextPhoto = () => setLightbox((p) => (p + 1) % photos.length);

  // Close lightbox on Escape
  React.useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') closeLightbox(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

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
        <div className="absolute bottom-0 left-0 opacity-10 -ml-4 -mb-4">
          <div className="w-20 h-20 rounded-full bg-white" />
        </div>
        <div className="relative z-10">
          <h1 className="font-extrabold text-2xl text-white mb-1">Dokumentasi</h1>
          <p className="text-emerald-100 text-sm font-medium">
            Kenangan indah perjalanan ibadah jamaah KBIHU Nurul Ummah ke Tanah Suci
          </p>
          <div className="flex gap-3 mt-4">
            <div className="bg-white/20 rounded-xl px-3 py-1.5 flex items-center gap-1.5">
              <Image size={13} className="text-white" />
              <span className="text-white text-xs font-semibold">{photos.length} Foto</span>
            </div>
            <div className="bg-white/20 rounded-xl px-3 py-1.5 flex items-center gap-1.5">
              <Video size={13} className="text-white" />
              <span className="text-white text-xs font-semibold">{videos.length} Video</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-gray-100 rounded-2xl p-1 mb-5 gap-1">
        <button
          onClick={() => setActiveTab('foto')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-all ${
            activeTab === 'foto'
              ? 'bg-white text-emerald-700 shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <Image size={15} /> Foto
        </button>
        <button
          onClick={() => setActiveTab('video')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-all ${
            activeTab === 'video'
              ? 'bg-white text-emerald-700 shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <Video size={15} /> Video
        </button>
      </div>

      {/* FOTO TAB */}
      {activeTab === 'foto' && (
        <div className="grid grid-cols-2 gap-3">
          {photos.map((photo, idx) => (
            <button
              key={idx}
              onClick={() => openLightbox(idx)}
              className="group relative rounded-2xl overflow-hidden aspect-[4/3] shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 focus:outline-none"
            >
              <img
                src={photo.src}
                alt={photo.caption}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-2.5 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <p className="text-white text-[11px] font-bold leading-tight">{photo.caption}</p>
                <p className="text-white/70 text-[10px]">{photo.location}</p>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* VIDEO TAB */}
      {activeTab === 'video' && (
        <div className="flex flex-col gap-4">
          {videos.map((vid, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
            >
              <div className="relative bg-black aspect-video rounded-t-2xl overflow-hidden">
                <video
                  controls
                  className="w-full h-full object-cover"
                  preload="metadata"
                >
                  <source src={vid.src} type="video/mp4" />
                  Browser Anda tidak mendukung pemutaran video.
                </video>
              </div>
              <div className="p-4 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
                  <Play size={14} className="text-emerald-600 fill-emerald-600 ml-0.5" />
                </div>
                <div>
                  <p className="font-bold text-gray-800 text-sm">{vid.caption}</p>
                  <p className="text-xs text-gray-400 font-medium">{vid.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* LIGHTBOX */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close */}
          <button
            className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 rounded-full p-2 text-white transition-colors z-10"
            onClick={closeLightbox}
          >
            <X size={22} />
          </button>

          {/* Counter */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/50 text-white text-xs font-bold px-3 py-1.5 rounded-full">
            {lightbox + 1} / {photos.length}
          </div>

          {/* Prev */}
          <button
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/25 rounded-full p-2.5 text-white transition-colors z-10"
            onClick={(e) => { e.stopPropagation(); prevPhoto(); }}
          >
            <Prev size={20} />
          </button>

          {/* Image */}
          <img
            src={photos[lightbox].src}
            alt={photos[lightbox].caption}
            className="max-w-[92vw] max-h-[82vh] object-contain rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Next */}
          <button
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/25 rounded-full p-2.5 text-white transition-colors z-10"
            onClick={(e) => { e.stopPropagation(); nextPhoto(); }}
          >
            <ChevronRight size={20} />
          </button>

          {/* Caption */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
            <p className="text-white font-bold text-sm">{photos[lightbox].caption}</p>
            <p className="text-white/60 text-xs mt-0.5">{photos[lightbox].location}</p>
          </div>
        </div>
      )}

    </div>
  );
};

export default Dokumentasi;
