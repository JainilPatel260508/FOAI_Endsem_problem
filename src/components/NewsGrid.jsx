import React from 'react';
import { ExternalLink, Calendar, User } from 'lucide-react';
import { motion } from 'framer-motion';

const NewsCard = ({ article }) => {
  return (
    <motion.div 
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white dark:bg-dark-800 rounded-2xl overflow-hidden border border-slate-200 dark:border-white/5 flex flex-col hover:shadow-xl hover:shadow-primary-500/5 transition-all group"
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={article.urlToImage || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80'} 
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <span className="px-2 py-1 bg-primary-600 text-white text-[10px] font-bold rounded-lg shadow-lg">
            {article.source.name}
          </span>
        </div>
      </div>
      
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-center gap-3 text-[10px] text-slate-500 dark:text-slate-400 mb-3 font-medium">
          <span className="flex items-center gap-1"><Calendar size={12} /> {new Date(article.publishedAt).toLocaleDateString()}</span>
          {article.author && <span className="flex items-center gap-1 truncate max-w-[100px]"><User size={12} /> {article.author}</span>}
        </div>
        
        <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 mb-2 line-clamp-2 leading-snug group-hover:text-primary-500 transition-colors">
          {article.title}
        </h3>
        
        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 mb-4 leading-relaxed">
          {article.description}
        </p>
        
        <div className="mt-auto pt-4 border-t border-slate-100 dark:border-white/5">
          <a 
            href={article.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-2 bg-slate-100 dark:bg-white/5 hover:bg-primary-600 hover:text-white rounded-xl text-xs font-bold transition-all"
          >
            Read Full Article <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

const NewsGrid = ({ news, loading }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-[400px] bg-slate-200 dark:bg-dark-800 rounded-2xl animate-pulse" />
        ))}
      </div>
    );
  }

  if (news.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-500">
        <p className="text-lg font-medium">No space news found</p>
        <p className="text-sm">Try adjusting your search or category</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {news.map((article, index) => (
        <NewsCard key={index} article={article} />
      ))}
    </div>
  );
};

export default NewsGrid;
