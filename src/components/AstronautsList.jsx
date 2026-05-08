import React from 'react';
import { Users, Rocket } from 'lucide-react';
import { Badge } from './common';

const AstronautsList = ({ astronauts, count }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="text-primary-500" size={18} />
          <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">Active Personnel</span>
        </div>
        <Badge variant="success">{count} In Orbit</Badge>
      </div>

      <div className="grid grid-cols-1 gap-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
        {astronauts.map((astro, idx) => (
          <div 
            key={idx} 
            className="flex items-center justify-between p-3 bg-slate-50 dark:bg-white/5 rounded-xl border border-slate-100 dark:border-white/5 hover:border-primary-500/30 transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary-600/10 flex items-center justify-center text-primary-500 font-bold text-xs">
                {astro.name.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-200 group-hover:text-primary-500 transition-colors">
                  {astro.name}
                </p>
                <p className="text-[10px] text-slate-500 flex items-center gap-1">
                  <Rocket size={10} /> {astro.craft}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AstronautsList;
