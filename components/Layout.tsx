
import React from 'react';
import { NavLink } from 'react-router-dom';
import { NAV_ITEMS,ABOUT } from '../constants';
import { Bell, User } from 'lucide-react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-0 md:pl-64">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex flex-col fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200 z-50">
        <div className="p-6">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
            LunaFlow
          </h1>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          {[...NAV_ITEMS,...ABOUT,].map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'bg-purple-50 text-purple-600 font-semibold shadow-sm'
                    : 'text-gray-500 hover:bg-gray-50'
                }`
              }
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="p-4 border-t">
          <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
              <User className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-semibold">Sarah Jenkins</p>
              <p className="text-xs text-gray-500">Perimenopause</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Header - Mobile & Desktop */}
      <header className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-200 z-40 px-6 py-4 flex items-center justify-between">
        <h2 className="md:hidden font-bold text-xl text-purple-600">LunaFlow</h2>
        <div className="hidden md:block">
          <p className="text-sm text-gray-500">Welcome back,</p>
          <h3 className="font-semibold text-lg">Good morning, Sarah</h3>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-gray-100 rounded-full text-gray-500 relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-pink-500 rounded-full border-2 border-white"></span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-4 md:p-8">
        {children}
      </main>

      {/* Bottom Nav - Mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center py-3 px-2 z-50">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 transition-all ${
                isActive ? 'text-purple-600' : 'text-gray-400'
              }`
            }
          >
            {item.icon}
            <span className="text-[10px] font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Layout;
