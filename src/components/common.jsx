import React from 'react';
import { motion } from 'framer-motion';

export const Card = ({ children, className = '', title, icon: Icon, actions }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className={`glass-card p-6 ${className}`}
  >
    {(title || Icon || actions) && (
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          {Icon && (
            <div className="p-2 bg-primary-600/10 text-primary-500 rounded-lg">
              <Icon size={20} />
            </div>
          )}
          {title && <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">{title}</h3>}
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
    )}
    {children}
  </motion.div>
);

export const Skeleton = ({ className = '' }) => (
  <div className={`shimmer bg-slate-200 dark:bg-dark-700 rounded-lg ${className}`} />
);

export const Badge = ({ children, variant = 'primary' }) => {
  const variants = {
    primary: 'bg-primary-600/10 text-primary-500',
    success: 'bg-accent-500/10 text-accent-500',
    warning: 'bg-orange-500/10 text-orange-500',
    danger: 'bg-red-500/10 text-red-500',
  };
  return (
    <span className={`badge ${variants[variant]}`}>
      {children}
    </span>
  );
};
