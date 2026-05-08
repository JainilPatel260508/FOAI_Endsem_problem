import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Newspaper, Settings, Info, Radio } from 'lucide-react';

const Sidebar = () => {
  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: Newspaper, label: 'Space News', path: '/news' },
    { icon: Radio, label: 'ISS Stream', path: '/stream' },
  ];

  return (
    <aside className="fixed inset-y-0 left-0 w-64 bg-white dark:bg-dark-800 border-r border-slate-200 dark:border-white/5 hidden md:flex flex-col z-30 transition-colors duration-300">
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/20">
          <Radio className="text-white w-6 h-6" />
        </div>
        <div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-primary-400 to-cyber-blue bg-clip-text text-transparent">
            AstroHub
          </h1>
          <p className="text-[10px] text-slate-500 dark:text-slate-400 font-mono tracking-tighter">
            INTELLIGENT ISS DASH
          </p>
        </div>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `
              flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
              ${isActive 
                ? 'bg-primary-600/10 text-primary-500 font-semibold' 
                : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5'}
            `}
          >
            <item.icon size={20} />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 mt-auto">
        <div className="bg-gradient-to-br from-primary-600 to-cyber-purple p-4 rounded-2xl text-white">
          <p className="text-xs font-medium opacity-80 mb-1">PRO FEATURES</p>
          <h3 className="text-sm font-bold mb-3">Upgrade AstroHub</h3>
          <button className="w-full py-2 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-lg text-xs font-semibold transition-all">
            Unlock Advanced AI
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
