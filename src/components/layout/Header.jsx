import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import NotificationCenter from './NotificationCenter';

const Header = () => {
  const { user, logout } = useAuth();
  
  return (
    <header className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 shadow-[0_4px_20px_rgba(99,102,241,0.3)] backdrop-blur-lg border-b border-white/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo with enhanced design */}
          <div className="flex items-center space-x-3 group cursor-pointer">
            <Link to="/dashboard" className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:rotate-12 transition-transform duration-300 group-hover:scale-110">
                <span className="text-white font-extrabold text-2xl">FF</span>
              </div>
              <div>
                <span className="text-2xl font-extrabold text-white tracking-tight">Future Forge</span>
                <p className="text-xs text-indigo-100 font-medium">Shape Your Future</p>
              </div>
            </Link>
          </div>
          
          {/* User menu with glassmorphism */}
          <div className="flex items-center space-x-4">
            {user && (
              <>
                {/* Quick Access: Book Counsellor Button */}
                <Link
                  to="/counsellors"
                  className="hidden md:flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-bold py-2 px-5 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm border border-white/30"
                  title="Book Expert Counsellor Session"
                >
                  👨‍🏫 Book Session
                </Link>
                
                <NotificationCenter />
                <Link
                  to="/settings"
                  className="hidden md:flex items-center gap-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white font-bold py-2 px-4 rounded-xl transition-all duration-300 border border-white/30 hover:shadow-lg transform hover:-translate-y-0.5 text-sm"
                  title="Settings (Ctrl+,)"
                >
                  ⚙️ Settings
                </Link>
              </>
            )}
            
            <div className="hidden md:block text-right">
              <p className="text-sm font-bold text-white">{user?.name}</p>
              <p className="text-xs text-indigo-100">{user?.email}</p>
            </div>
            <div className="w-10 h-10 bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 shadow-lg">
              <span className="text-white font-bold text-lg">{user?.name?.charAt(0) || '👤'}</span>
            </div>
            <button
              onClick={logout}
              className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white font-bold py-2 px-6 rounded-xl transition-all duration-300 border border-white/30 hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;