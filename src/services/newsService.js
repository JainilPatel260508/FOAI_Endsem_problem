import { NEWS_API_BASE, LS_NEWS_CACHE, NEWS_CACHE_TTL_MS } from '../constants';
import { cacheWithExpiry, getCacheWithExpiry } from '../utils';

export const fetchNews = async (category = 'general', query = '') => {
  // Map category/query to cache key
  const cacheKey = `${LS_NEWS_CACHE}_${category}_${query}`;
  const cachedData = getCacheWithExpiry(cacheKey);
  
  if (cachedData) return cachedData;

  try {
    const params = new URLSearchParams({
      limit: '15'
    });

    // Spaceflight News API uses 'search' for text search
    const searchQuery = query || (category !== 'general' ? category : '');
    if (searchQuery) {
      params.append('search', searchQuery);
    }

    const url = `${NEWS_API_BASE}?${params.toString()}`;
    console.log('AstroHub | Fetching News:', url);

    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    
    const data = await response.json();

    if (!data || !data.results || !Array.isArray(data.results)) {
      console.warn('AstroHub | News API returned unexpected format:', data);
      return [];
    }

    // SNAPI v4 returns results in a 'results' array
    const articles = data.results.map(item => ({
      title: item.title || 'Untitled Space Report',
      description: item.summary || 'Telemetry data received. No textual summary available for this entry.',
      url: item.url || '#',
      urlToImage: item.image_url || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80',
      publishedAt: item.published_at || new Date().toISOString(),
      source: { name: item.news_site || 'Orbital Command' }
    }));

    cacheWithExpiry(cacheKey, articles, NEWS_CACHE_TTL_MS);
    return articles;
  } catch (error) {
    console.error('AstroHub | News fetch error:', error);
    return [];
  }
};
