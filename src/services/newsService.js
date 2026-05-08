import axios from 'axios';
import { NEWS_API_BASE, LS_NEWS_CACHE, NEWS_CACHE_TTL_MS } from '../constants';
import { cacheWithExpiry, getCacheWithExpiry } from '../utils';

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

export const fetchNews = async (category = 'general', query = '') => {
  const cacheKey = `${LS_NEWS_CACHE}_${category}_${query}`;
  const cachedData = getCacheWithExpiry(cacheKey);
  
  if (cachedData) return cachedData;

  try {
    const params = new URLSearchParams({
      country: 'us',
      apiKey: API_KEY,
      pageSize: '20'
    });

    if (category !== 'general') params.append('category', category);
    if (query) params.append('q', query);

    const targetUrl = `${NEWS_API_BASE}/top-headlines?${params.toString()}`;
    const proxyUrl = `https://corsproxy.io/?url=${encodeURIComponent(targetUrl)}`;

    const { data } = await axios.get(proxyUrl);

    if (data.status === 'ok') {
      cacheWithExpiry(cacheKey, data.articles, NEWS_CACHE_TTL_MS);
      return data.articles;
    }
    throw new Error(data.message || 'Failed to fetch news');
  } catch (error) {
    console.error('News fetch error:', error);
    // Return empty array as fallback instead of throwing to keep UI stable
    return [];
  }
};
