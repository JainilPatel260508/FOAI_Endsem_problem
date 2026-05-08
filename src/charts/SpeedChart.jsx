import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import useStore from '../store/useStore';

const SpeedChart = () => {
  const { speedHistory } = useStore();

  return (
    <div className="h-[250px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={speedHistory}>
          <defs>
            <linearGradient id="colorSpeed" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
          <XAxis 
            dataKey="time" 
            hide 
          />
          <YAxis 
            domain={['dataMin - 100', 'dataMax + 100']} 
            stroke="#64748b" 
            fontSize={10} 
            tickFormatter={(val) => `${Math.round(val)}`}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#0f0f1a', 
              border: '1px solid rgba(99,102,241,0.2)', 
              borderRadius: '8px',
              fontSize: '12px'
            }}
            itemStyle={{ color: '#6366f1' }}
          />
          <Area 
            type="monotone" 
            dataKey="speed" 
            stroke="#6366f1" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorSpeed)" 
            animationDuration={1000}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SpeedChart;
