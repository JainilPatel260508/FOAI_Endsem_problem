import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Bot, Trash2, Loader2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import useStore from '../store/useStore';
import { askAI } from '../services/aiService';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef(null);
  
  const { 
    messages, addMessage, clearChat,
    issData, astronauts, astrosCount, news, nearestPlace
  } = useStore();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { 
      role: 'user', 
      content: input, 
      timestamp: new Date().toISOString() 
    };
    
    addMessage(userMessage);
    setInput('');
    setIsLoading(true);

    // Build Context
    const context = {
      iss: {
        latitude: issData?.latitude,
        longitude: issData?.longitude,
        speed: "27,600 km/h",
        location: nearestPlace
      },
      personnel: {
        count: astrosCount || 0,
        names: (astronauts || []).map(a => a?.name || 'Unknown')
      },
      news: {
        count: news?.length || 0,
        headlines: (news || []).slice(0, 5).map(n => n?.title || 'No Title')
      }
    };

    try {
      const response = await askAI([...messages, userMessage], context);
      addMessage({ 
        role: 'assistant', 
        content: response, 
        timestamp: new Date().toISOString() 
      });
    } catch (error) {
      addMessage({ 
        role: 'assistant', 
        content: "System error: Failed to reach orbital intelligence processing. Please verify network link.", 
        timestamp: new Date().toISOString() 
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-primary-600 text-white rounded-full flex items-center justify-center shadow-2xl shadow-primary-500/40 z-50 border-4 border-white dark:border-dark-900"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent-500 rounded-full border-2 border-white dark:border-dark-900 animate-pulse"></span>
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            className="fixed bottom-24 right-6 w-[90vw] md:w-[400px] h-[600px] max-h-[70vh] bg-white dark:bg-dark-800 rounded-3xl shadow-2xl z-50 flex flex-col border border-slate-200 dark:border-white/10 overflow-hidden"
          >
            {/* Header */}
            <div className="p-5 bg-gradient-to-r from-primary-600 to-cyber-purple text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-md">
                  <Bot size={24} />
                </div>
                <div>
                  <h3 className="font-bold">AstroAI Assistant</h3>
                  <p className="text-[10px] opacity-80 uppercase tracking-widest font-mono">Telemetry Expert</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={clearChat}
                  className="p-2 hover:bg-white/20 rounded-lg transition-all"
                  title="Clear Chat"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-5 space-y-6 custom-scrollbar bg-slate-50 dark:bg-dark-900/50"
            >
              {messages.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full text-center p-10 space-y-4">
                  <div className="w-16 h-16 bg-primary-600/10 text-primary-500 rounded-full flex items-center justify-center">
                    <Sparkles size={32} />
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 dark:text-slate-100">Synchronized Intelligence</p>
                    <p className="text-xs text-slate-500">Ask about current ISS position, astronauts, or latest news.</p>
                  </div>
                </div>
              )}

              {messages.map((msg, i) => (
                <div 
                  key={i} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-slide-up`}
                >
                  <div className={`
                    max-w-[85%] p-4 rounded-2xl text-sm
                    ${msg.role === 'user' 
                      ? 'bg-primary-600 text-white rounded-tr-none' 
                      : 'bg-white dark:bg-dark-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-white/5 rounded-tl-none shadow-sm'}
                  `}>
                    <ReactMarkdown 
                      remarkPlugins={[remarkGfm]}
                      className="prose prose-sm dark:prose-invert max-w-none"
                    >
                      {String(msg?.content || '')}
                    </ReactMarkdown>
                    <p className={`text-[8px] mt-2 opacity-50 ${msg?.role === 'user' ? 'text-right' : 'text-left'}`}>
                      {msg?.timestamp ? new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                    </p>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white dark:bg-dark-800 p-4 rounded-2xl rounded-tl-none border border-slate-200 dark:border-white/5 shadow-sm">
                    <Loader2 size={16} className="animate-spin text-primary-500" />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <form onSubmit={handleSend} className="p-4 bg-white dark:bg-dark-800 border-t border-slate-200 dark:border-white/5">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask orbital command..."
                  className="w-full pl-4 pr-12 py-3 bg-slate-100 dark:bg-dark-900/80 rounded-2xl border-none focus:ring-2 focus:ring-primary-500/50 transition-all text-sm"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-primary-600 text-white rounded-xl hover:bg-primary-500 transition-all disabled:opacity-50"
                >
                  <Send size={16} />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
