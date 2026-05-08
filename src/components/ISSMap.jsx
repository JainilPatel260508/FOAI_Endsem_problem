import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import useStore from '../store/useStore';

// Custom ISS Icon
const issIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/2554/2554971.png',
  iconSize: [40, 40],
  iconAnchor: [20, 20],
  popupAnchor: [0, -20],
  className: 'iss-marker-icon'
});

const ChangeView = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
};

const ISSMap = () => {
  const { issData, path, theme } = useStore();

  if (!issData) return (
    <div className="w-full h-[400px] bg-dark-800 animate-pulse rounded-2xl flex items-center justify-center">
      <p className="text-slate-500">Initializing Orbital Uplink...</p>
    </div>
  );

  const position = [issData.latitude, issData.longitude];

  return (
    <div className="h-[400px] w-full rounded-2xl overflow-hidden relative border border-white/5 shadow-2xl">
      <MapContainer 
        center={position} 
        zoom={3} 
        scrollWheelZoom={true} 
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url={theme === 'dark' 
            ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          }
          attribution='&copy; OpenStreetMap contributors'
        />
        <Polyline 
          positions={path} 
          color="#6366f1" 
          weight={3} 
          opacity={0.6} 
          dashArray="10, 10"
        />
        <Marker position={position} icon={issIcon}>
          <Popup>
            <div className="p-1">
              <p className="font-bold text-primary-500">ISS LIVE</p>
              <p className="text-xs">Lat: {issData.latitude.toFixed(4)}</p>
              <p className="text-xs">Lon: {issData.longitude.toFixed(4)}</p>
            </div>
          </Popup>
        </Marker>
        <ChangeView center={position} />
      </MapContainer>
      
      {/* Map Overlay Stats */}
      <div className="absolute top-4 right-4 z-[1000] flex flex-col gap-2">
        <div className="bg-dark-900/80 backdrop-blur-md px-3 py-2 rounded-xl border border-white/10 text-[10px] font-mono text-primary-400">
          <p>SIGNAL: OPTIMAL</p>
          <p>HGT: 408 KM</p>
        </div>
      </div>
    </div>
  );
};

export default ISSMap;
