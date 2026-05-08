import axios from 'axios';
import { NEWS_API_BASE, LS_NEWS_CACHE, NEWS_CACHE_TTL_MS } from '../constants';
import { cacheWithExpiry, getCacheWithExpiry } from '../utils';

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

export const fetchNews = async (category = 'general', query = '') => {
  const cacheKey = `${LS_NEWS_CACHE}_${category}_${query}`;
  const cachedData = getCacheWithExpiry(cacheKey);
  
  if (cachedData) return cachedData;

  // Note: NewsAPI usually blocks client-side requests from localhost on free tier
  // If this fails, we could use a proxy or just warn the user.
  try {
    const { data } = await axios.get(`${NEWS_API_BASE}/top-headlines`, {
      params: {
        country: 'us',
        category: category !== 'general' ? category : undefined,
        q: query || undefined,
        apiKey: API_KEY,
        pageSize: 20
      }
    });

    if (data.status === 'ok') {
      cacheWithExpiry(cacheKey, data.articles, NEWS_CACHE_TTL_MS);
      return data.articles;
    }
    throw new Error(data.message || 'Failed to fetch news');
  } catch (error) {
    console.error('News fetch error:', error);
    throw error;
  }
};
