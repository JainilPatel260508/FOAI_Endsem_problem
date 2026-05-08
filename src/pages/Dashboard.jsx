import React, { useEffect, useState, useCallback } from 'react';
import { RefreshCcw, Activity, Globe, Zap, Search, Filter, Users } from 'lucide-react';
import useStore from '../store/useStore';
import { fetchISSPosition, fetchAstronauts } from '../services/issService';
import { fetchNews } from '../services/newsService';
import { nearestLocationResolver } from '../utils';
import { Card } from '../components/common';
import ISSMap from '../components/ISSMap';
import SpeedChart from '../charts/SpeedChart';
import AstronautsList from '../components/AstronautsList';
import NewsGrid from '../components/NewsGrid';
import NewsCategoryChart from '../charts/NewsCategoryChart';
import { ISS_POLL_INTERVAL, NEWS_CATEGORIES } from '../constants';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const { 
    issData, setISSData, setAstronauts, astronauts, astrosCount,
    news, setNews, newsLoading, setNewsLoading, setNewsError
  } = useStore();

  const [category, setCategory] = useState('general');
  const [searchTerm, setSearchTerm] = useState('');
  const [lastUpdate, setLastUpdate] = useState(new Date());

  const updateISS = useCallback(async () => {
    try {
      const data = await fetchISSPosition();
      const place = await nearestLocationResolver(data.latitude, data.longitude);
      // Use the actual velocity from the API (wheretheiss.at provides it directly)
      const speed = data.velocity || 27600;
      setISSData(data, speed, place);
      setLastUpdate(new Date());
    } catch (error) {
      console.error('ISS Update Error:', error);
    }
  }, [setISSData]);

  const loadInitialData = async () => {
    // Load Astronauts (Independent)
    fetchAstronauts().then(astros => {
      if (astros) setAstronauts(astros);
    }).catch(err => console.error("Astronauts fetch failed:", err));

    // Load News (Independent)
    setNewsLoading(true);
    fetchNews(category).then(newsData => {
      setNews(newsData);
    }).catch(err => {
      setNewsError(err.message);
      toast.error("Failed to fetch space news.");
    });
  };

  useEffect(() => {
    loadInitialData();
    updateISS();
    const interval = setInterval(updateISS, ISS_POLL_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  const handleNewsRefresh = async () => {
    setNewsLoading(true);
    try {
      const newsData = await fetchNews(category, searchTerm);
      setNews(newsData);
      toast.success("News feed updated.");
    } catch (error) {
      toast.error("Telemetry link failed. Retry suggested.");
      setNewsError(error.message);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase">Latitude</span>
            <Globe size={16} className="text-primary-500" />
          </div>
          <p className="text-2xl font-black text-slate-800 dark:text-white">
            {issData?.latitude?.toFixed(4) || '---'}°
          </p>
          <p className="text-[10px] text-slate-400 mt-1">Real-time coordinate tracking</p>
        </Card>
        
        <Card className="flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase">Longitude</span>
            <Globe size={16} className="text-cyber-blue" />
          </div>
          <p className="text-2xl font-black text-slate-800 dark:text-white">
            {issData?.longitude?.toFixed(4) || '---'}°
          </p>
          <p className="text-[10px] text-slate-400 mt-1">Real-time coordinate tracking</p>
        </Card>

        <Card className="flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase">Current Velocity</span>
            <Zap size={16} className="text-accent-500" />
          </div>
          <p className="text-2xl font-black text-slate-800 dark:text-white">
            {issData?.velocity ? Math.round(issData.velocity).toLocaleString() : '~27,600'}
            <span className="text-sm font-normal text-slate-500"> km/h</span>
          </p>
          <p className="text-[10px] text-accent-500 mt-1">Orbital synchronization stable</p>
        </Card>

        <Card className="flex flex-col justify-between bg-primary-600 text-white border-none shadow-lg shadow-primary-500/20">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold opacity-80 uppercase">Last Sync</span>
            <Activity size={16} className="opacity-80" />
          </div>
          <p className="text-2xl font-black">
            {lastUpdate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </p>
          <p className="text-[10px] opacity-80 mt-1">Auto-refresh every 15s</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Main Map */}
          <Card 
            title="ISS Live Trajectory" 
            icon={Activity}
            actions={
              <button 
                onClick={updateISS} 
                className="p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg transition-all"
                title="Manual Refresh"
              >
                <RefreshCcw size={18} className="text-primary-500" />
              </button>
            }
          >
            <ISSMap />
          </Card>

          {/* News Controls */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <h2 className="text-2xl font-black text-slate-800 dark:text-white">Galactic Feed</h2>
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input 
                  type="text" 
                  placeholder="Search articles..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleNewsRefresh()}
                  className="input-field pl-10"
                />
              </div>
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="input-field w-auto md:w-40 appearance-none bg-dark-700/50"
              >
                {NEWS_CATEGORIES.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.label}</option>
                ))}
              </select>
              <button 
                onClick={handleNewsRefresh}
                className="btn-primary"
              >
                <RefreshCcw size={16} />
              </button>
            </div>
          </div>

          <NewsGrid news={news} loading={newsLoading} />
        </div>

        <div className="space-y-8">
          <Card title="Speed Metrics" icon={Zap}>
            <SpeedChart />
          </Card>

          <Card title="Orbital Personnel" icon={Users}>
            <AstronautsList astronauts={astronauts} count={astrosCount} />
          </Card>

          <Card title="Source Breakdown" icon={Filter}>
            <NewsCategoryChart />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
