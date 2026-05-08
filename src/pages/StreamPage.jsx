import React, { useState } from 'react';
import { Radio, AlertCircle, ExternalLink, Tv2, Wifi, Activity, Globe } from 'lucide-react';
import { Card } from '../components/common';
import { motion } from 'framer-motion';

const STREAM_URLS = [
  {
    id: 'nasa_hdev',
    label: 'NASA ISS HD Earth View',
    // youtube-nocookie avoids the X-Frame-Options restriction on localhost
    embed: 'https://www.youtube-nocookie.com/embed/xAieE-QtOeM?autoplay=1&mute=1&controls=1',
    link: 'https://www.youtube.com/watch?v=xAieE-QtOeM',
  },
  {
    id: 'nasa_official',
    label: 'NASA TV Public',
    embed: 'https://www.youtube-nocookie.com/embed/21X5lGlDOfg?autoplay=1&mute=1&controls=1',
    link: 'https://www.youtube.com/watch?v=21X5lGlDOfg',
  },
];

const StreamPage = () => {
  const [activeStream, setActiveStream] = useState(STREAM_URLS[0]);
  const [iframeError, setIframeError] = useState(false);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-800 dark:text-white flex items-center gap-3">
            <Radio className="text-primary-500" size={32} />
            ISS Live Stream
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            High-definition video relay from the International Space Station.
          </p>
        </div>

        {/* Stream Selector */}
        <div className="flex gap-2">
          {STREAM_URLS.map((s) => (
            <button
              key={s.id}
              onClick={() => { setActiveStream(s); setIframeError(false); }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeStream.id === s.id
                  ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/20'
                  : 'bg-slate-100 dark:bg-dark-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-white/10'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Stream Player */}
      <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-black">
        {/* LIVE Badge */}
        <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1 bg-red-600 text-white text-[10px] font-bold rounded-full">
          <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse inline-block"></span>
          LIVE FEED
        </div>

        {/* Open in new tab fallback */}
        <a
          href={activeStream.link}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-4 right-4 z-10 flex items-center gap-2 px-3 py-1.5 bg-dark-900/80 backdrop-blur-md text-white text-[10px] font-bold rounded-full hover:bg-primary-600 transition-all"
        >
          <ExternalLink size={12} />
          Open Full Stream
        </a>

        {!iframeError ? (
          <div className="w-full aspect-video">
            <iframe
              key={activeStream.id}
              src={activeStream.embed}
              title={activeStream.label}
              className="w-full h-full border-none"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              referrerPolicy="no-referrer"
              sandbox="allow-scripts allow-same-origin allow-presentation allow-popups"
              onError={() => setIframeError(true)}
            />
          </div>
        ) : (
          /* Fallback UI when iframe is blocked */
          <div className="w-full aspect-video flex flex-col items-center justify-center bg-gradient-to-br from-dark-900 to-dark-700 text-center p-10">
            <Tv2 size={64} className="text-primary-500 mb-4 animate-pulse" />
            <h3 className="text-xl font-bold text-white mb-2">Embedded Stream Restricted</h3>
            <p className="text-slate-400 text-sm max-w-md mb-6">
              Your browser or network is blocking the embedded stream. Click below to watch live in a new tab directly from NASA/YouTube.
            </p>
            <a
              href={activeStream.link}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary px-8 py-3 text-sm"
            >
              <ExternalLink size={16} />
              Watch Live Stream
            </a>
          </div>
        )}
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-green-500/10 rounded-xl">
              <Wifi className="text-green-500" size={20} />
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase font-bold">Signal Link</p>
              <p className="text-lg font-black text-green-500">OPTIMAL</p>
            </div>
          </div>
          <div className="flex flex-col gap-2 text-xs text-slate-500 dark:text-slate-400 font-mono border-t border-white/5 pt-3">
            <div className="flex justify-between"><span>Protocol</span><span className="text-slate-300">TDRS S-Band</span></div>
            <div className="flex justify-between"><span>Downlink</span><span className="text-slate-300">150 Mbps</span></div>
            <div className="flex justify-between"><span>Uplink</span><span className="text-slate-300">25 Mbps</span></div>
          </div>
        </Card>

        <Card className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-primary-500/10 rounded-xl">
              <Activity className="text-primary-500" size={20} />
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase font-bold">Stream Quality</p>
              <p className="text-lg font-black text-white">1080p / 60fps</p>
            </div>
          </div>
          <div className="flex flex-col gap-2 text-xs text-slate-500 dark:text-slate-400 font-mono border-t border-white/5 pt-3">
            <div className="flex justify-between"><span>Codec</span><span className="text-slate-300">H.264 / AVC</span></div>
            <div className="flex justify-between"><span>Latency</span><span className="text-slate-300">~1.2s (relay)</span></div>
            <div className="flex justify-between"><span>Bitrate</span><span className="text-slate-300">8 Mbps</span></div>
          </div>
        </Card>

        <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-5 flex gap-4">
          <AlertCircle className="text-amber-500 shrink-0 mt-0.5" size={20} />
          <div>
            <h4 className="font-bold text-amber-500 text-sm mb-1">Orbital Night Notice</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Earth view is only available when ISS is in sunlight. The ISS completes an orbit every ~92 minutes — expect 45-min day/night cycles.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StreamPage;
