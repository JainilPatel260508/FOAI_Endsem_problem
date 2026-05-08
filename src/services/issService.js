import axios from 'axios';
import { ISS_POSITION_URL, ISS_ASTROS_URL } from '../constants';

/**
 * Fetch live ISS position & telemetry from wheretheiss.at
 * This API supports HTTPS and proper CORS headers — works in the browser without a proxy.
 * Returns: latitude, longitude, altitude, velocity (km/h), timestamp
 */
export const fetchISSPosition = async () => {
  const response = await fetch(ISS_POSITION_URL);
  const data = await response.json();
  return {
    latitude:  parseFloat(data.latitude),
    longitude: parseFloat(data.longitude),
    altitude:  parseFloat(data.altitude),
    velocity:  parseFloat(data.velocity),
    timestamp: data.timestamp,
  };
};

export const fetchAstronauts = async () => {
  try {
    const response = await fetch(ISS_ASTROS_URL);
    if (!response.ok) throw new Error('Proxy error');
    const data = await response.json();
    // corsproxy.io wraps the response — handle both wrapped and direct
    const parsed = typeof data === 'string' ? JSON.parse(data) : data;
    return parsed;
  } catch (error) {
    console.warn('AstroHub | Astronauts fetch failed, using fallback empty state');
    return { people: [], number: 0 };
  }
};
