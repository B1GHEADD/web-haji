import React from 'react';
import { UserPlus, FileCheck, MapPin, FileText, ChevronRight } from 'lucide-react';

const ActionButtonsWidget = () => {
  const actions = [
    {
      title: 'Daftar KBIHU Nurul Ummah',
      subtitle: 'Jemaah Haji Tahun 2027',
      icon: UserPlus,
      bg: 'bg-gradient-to-r from-emerald-50 to-emerald-100/50',
      iconColor: 'text-emerald-600',
      iconBg: 'bg-emerald-100',
      border: 'border-emerald-200/50',
      link: '/daftar'
    },
    {
      title: 'Cek Kelengkapan Berkas',
      subtitle: 'Data Nama & Jenis Kekurangan',
      icon: FileCheck,
      bg: 'bg-gradient-to-r from-orange-50 to-orange-100/50',
      iconColor: 'text-orange-600',
      iconBg: 'bg-orange-100',
      border: 'border-orange-200/50',
      link: '/cek-berkas'
    },
    {
      title: 'Data Estimasi Keberangkatan',
      subtitle: 'Sesuai Edaran Kemenhaj',
      icon: FileText,
      bg: 'bg-gradient-to-r from-blue-50 to-blue-100/50',
      iconColor: 'text-blue-600',
      iconBg: 'bg-blue-100',
      border: 'border-blue-200/50',
      link: '/estimasi'
    }
  ];

  return (
    <div className="px-5 md:px-0">
      <div className="bg-gradient-to-br from-white to-gray-50/50 rounded-[2rem] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 backdrop-blur-xl">
        <h2 className="text-sm font-bold text-gray-800 tracking-wide mb-5">Pusat Layanan Jemaah</h2>
        <div className="flex flex-col gap-4">
          {actions.map((action, idx) => (
            <a 
              key={idx}
              href={action.link}
              className={`${action.bg} border ${action.border} w-full rounded-[1.5rem] p-4 flex items-center justify-between text-gray-800 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98] group`}
            >
              <div className="flex items-center gap-4">
                <div className={`${action.iconBg} p-3.5 rounded-[1.25rem] transition-colors shadow-sm`}>
                  <action.icon size={22} className={action.iconColor} strokeWidth={2} />
                </div>
                <div className="text-left">
                  <h3 className="font-bold text-[14px] text-gray-800 mb-0.5 group-hover:text-black transition-colors">{action.title}</h3>
                  <p className="text-[11px] font-medium text-gray-500">{action.subtitle}</p>
                </div>
              </div>
              <div className="text-gray-400 group-hover:text-gray-800 group-hover:translate-x-1 transition-all bg-white/50 p-2 rounded-full">
                <ChevronRight size={16} strokeWidth={3} />
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActionButtonsWidget;
