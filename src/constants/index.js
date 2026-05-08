// API endpoints — wheretheiss.at supports HTTPS + CORS from the browser
export const ISS_POSITION_URL   = 'https://api.wheretheiss.at/v1/satellites/25544';
export const ISS_ASTROS_URL     = 'https://corsproxy.io/?url=http://api.open-notify.org/astros.json';

// News API — uses CORS proxy to bypass browser restrictions
export const NEWS_API_BASE      = 'https://newsapi.org/v2';
export const NEWS_PROXY_BASE    = 'https://api.allorigins.win/get?url=';

// HuggingFace AI
export const AI_API_URL         = 'https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2';

// ISS tracking config
export const ISS_POLL_INTERVAL  = 15_000;   // 15 seconds
export const MAX_PATH_POINTS    = 15;
export const MAX_SPEED_HISTORY  = 30;
export const EARTH_RADIUS_KM    = 6371;

// ISS approx orbital speed (km/h) used as sanity fallback
export const ISS_ORBITAL_SPEED  = 27_600;

// Cache config
export const NEWS_CACHE_TTL_MS  = 15 * 60 * 1000; // 15 minutes
export const CHAT_MAX_MESSAGES  = 30;

// News categories
export const NEWS_CATEGORIES = [
  { id: 'general',       label: 'General'       },
  { id: 'technology',    label: 'Technology'    },
  { id: 'science',       label: 'Science'       },
  { id: 'health',        label: 'Health'        },
  { id: 'business',      label: 'Business'      },
  { id: 'entertainment', label: 'Entertainment' },
  { id: 'sports',        label: 'Sports'        },
];

// LocalStorage keys
export const LS_THEME          = 'iss_dashboard_theme';
export const LS_NEWS_CACHE     = 'iss_dashboard_news_cache';
export const LS_CHAT_MESSAGES  = 'iss_dashboard_chat_messages';
