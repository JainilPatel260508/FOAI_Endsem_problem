import React, { useState, useEffect } from 'react';
import { Newspaper, Search, Filter, RefreshCcw } from 'lucide-react';
import useStore from '../store/useStore';
import { fetchNews } from '../services/newsService';
import NewsGrid from '../components/NewsGrid';
import { NEWS_CATEGORIES } from '../constants';
import toast from 'react-hot-toast';

const NewsPage = () => {
  const { news, setNews, newsLoading, setNewsLoading, setNewsError } = useStore();
  const [category, setCategory] = useState('general');
  const [searchTerm, setSearchTerm] = useState('');

  const loadNews = async () => {
    setNewsLoading(true);
    try {
      const data = await fetchNews(category, searchTerm);
      setNews(data);
    } catch (error) {
      setNewsError(error.message);
      toast.error("Failed to fetch news.");
    }
  };

  useEffect(() => {
    loadNews();
  }, [category]);

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-800 dark:text-white flex items-center gap-3">
            <Newspaper className="text-primary-500" size={32} />
            Space Chronicles
          </h1>
          <p className="text-slate-500 text-sm mt-1">Deep space intelligence and global aerospace updates.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search universe..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && loadNews()}
              className="input-field pl-10"
            />
          </div>
          <select 
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="input-field w-auto appearance-none"
          >
            {NEWS_CATEGORIES.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.label}</option>
            ))}
          </select>
          <button onClick={loadNews} className="btn-primary">
            <RefreshCcw size={16} />
          </button>
        </div>
      </div>

      <NewsGrid news={news} loading={newsLoading} />
    </div>
  );
};

export default NewsPage;
