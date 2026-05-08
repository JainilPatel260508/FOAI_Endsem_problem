import axios from 'axios';
import { ISS_POSITION_URL, ISS_ASTROS_URL } from '../constants';

/**
 * Fetch live ISS position & telemetry from wheretheiss.at
 * This API supports HTTPS and proper CORS headers — works in the browser without a proxy.
 * Returns: latitude, longitude, altitude, velocity (km/h), timestamp
 */
export const fetchISSPosition = async () => {
  const { data } = await axios.get(ISS_POSITION_URL);
  return {
    latitude:  parseFloat(data.latitude),
    longitude: parseFloat(data.longitude),
    altitude:  parseFloat(data.altitude),   // km
    velocity:  parseFloat(data.velocity),   // km/h
    timestamp: data.timestamp,
  };
};

/**
 * Fetch astronauts currently in space.
 * Uses corsproxy.io to bypass CORS on the HTTP open-notify endpoint.
 */
export const fetchAstronauts = async () => {
  try {
    const { data } = await axios.get(ISS_ASTROS_URL);
    // corsproxy.io wraps the response — handle both wrapped and direct
    const parsed = typeof data === 'string' ? JSON.parse(data) : data;
    return parsed;
  } catch {
    // Fallback: direct call (works in some environments)
    const { data } = await axios.get('https://corsproxy.io/?url=http://api.open-notify.org/astros.json');
    return data;
  }
};
