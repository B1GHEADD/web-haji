import React from 'react';
import { Home, UserPlus, LogIn, HelpCircle, User } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const BottomNav = () => {
  const location = useLocation();
  const navigate  = useNavigate();
  const { isLoggedIn, logout } = useAuth();
  const currentPath = location.pathname;

  const navItems = isLoggedIn
    ? [
        { name: 'HOME',    icon: Home,   path: '/' },
        { name: 'DAFTAR',  icon: UserPlus, path: '/daftar' },
        { name: 'PROFIL',  icon: User,   path: '/dashboard' },
        { name: 'BANTUAN', icon: HelpCircle, path: '/bantuan' },
      ]
    : [
        { name: 'HOME',    icon: Home,   path: '/' },
        { name: 'DAFTAR',  icon: UserPlus, path: '/daftar' },
        { name: 'LOGIN',   icon: LogIn,  path: '/login' },
        { name: 'BANTUAN', icon: HelpCircle, path: '/bantuan' },
      ];

  return (
    <div className="fixed bottom-0 w-full max-w-md bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] rounded-t-3xl z-50">
      <div className="flex justify-around items-center p-3">
        {navItems.map((item) => {
          const isActive = currentPath === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex flex-col items-center justify-center w-16 transition-colors duration-200 ${
                isActive ? 'text-emerald-600' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <item.icon size={22} className={`mb-1 ${isActive ? 'stroke-[2.5px]' : 'stroke-2'}`} />
              <span className="text-[10px] font-bold">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;
