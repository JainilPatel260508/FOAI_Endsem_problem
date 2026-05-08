import { create } from 'zustand';
import { LS_THEME, LS_CHAT_MESSAGES, CHAT_MAX_MESSAGES, MAX_SPEED_HISTORY } from '../constants';

const useStore = create((set, get) => ({
  // Theme
  theme: localStorage.getItem(LS_THEME) || 'dark',
  toggleTheme: () => {
    const newTheme = get().theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem(LS_THEME, newTheme);
    set({ theme: newTheme });
  },

  // ISS Data
  issData: null,
  path: [],
  speedHistory: [],
  totalTracked: 0,
  nearestPlace: 'Loading...',
  
  setISSData: (data, speed, place) => set((state) => {
    const newPath = [...state.path, [data.latitude, data.longitude]].slice(-15);
    const newSpeedHistory = [...state.speedHistory, {
      time: new Date(data.timestamp * 1000).toLocaleTimeString(),
      speed: speed
    }].slice(-MAX_SPEED_HISTORY);

    return {
      issData: data,
      path: newPath,
      speedHistory: newSpeedHistory,
      totalTracked: state.totalTracked + 1,
      nearestPlace: place
    };
  }),

  // Astronauts
  astronauts: [],
  astrosCount: 0,
  setAstronauts: (data) => set({ 
    astronauts: data.people, 
    astrosCount: data.number 
  }),

  // News
  news: [],
  newsLoading: false,
  newsError: null,
  setNews: (news) => set({ news, newsLoading: false, newsError: null }),
  setNewsLoading: (loading) => set({ newsLoading: loading }),
  setNewsError: (error) => set({ newsError: error, newsLoading: false }),

  // Chatbot
  messages: JSON.parse(localStorage.getItem(LS_CHAT_MESSAGES)) || [],
  addMessage: (message) => set((state) => {
    const newMessages = [...state.messages, message].slice(-CHAT_MAX_MESSAGES);
    localStorage.setItem(LS_CHAT_MESSAGES, JSON.stringify(newMessages));
    return { messages: newMessages };
  }),
  clearChat: () => {
    localStorage.removeItem(LS_CHAT_MESSAGES);
    set({ messages: [] });
  }
}));

export default useStore;
