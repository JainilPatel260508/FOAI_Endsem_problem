import React from 'react';
import { Sun, Moon, Bell, Search, Menu } from 'lucide-react';
import useStore from '../store/useStore';

const Navbar = () => {
  const { theme, toggleTheme } = useStore();

  return (
    <header className="h-20 flex items-center justify-between px-4 md:px-8 bg-white/80 dark:bg-dark-900/80 backdrop-blur-md sticky top-0 z-20 border-b border-slate-200 dark:border-white/5 transition-colors duration-300">
      <div className="flex items-center gap-4">
        <button className="p-2 md:hidden hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg transition-all">
          <Menu className="text-slate-600 dark:text-slate-400" />
        </button>
        <div className="relative hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input 
            type="text" 
            placeholder="Search data..." 
            className="pl-10 pr-4 py-2 bg-slate-100 dark:bg-dark-800 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary-500/50 transition-all w-64"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button 
          onClick={toggleTheme}
          className="p-2.5 bg-slate-100 dark:bg-dark-800 text-slate-600 dark:text-slate-400 rounded-xl hover:bg-slate-200 dark:hover:bg-white/10 transition-all"
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <button className="p-2.5 bg-slate-100 dark:bg-dark-800 text-slate-600 dark:text-slate-400 rounded-xl hover:bg-slate-200 dark:hover:bg-white/10 transition-all relative">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-accent-500 rounded-full border-2 border-white dark:border-dark-800"></span>
        </button>
        <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-primary-500 to-cyber-blue p-0.5 ml-2">
          <div className="h-full w-full rounded-[10px] bg-white dark:bg-dark-800 flex items-center justify-center overflow-hidden">
             <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
