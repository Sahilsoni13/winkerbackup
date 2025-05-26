import axios from 'axios';

interface GeocodeResponse {
  address: {
    city?: string;
    town?: string;
    village?: string;
  };
}

// Cache to store city names
const cityCache = new Map<string, string>();

/**
 * Gets the city name from a location string like "latitude,longitude".
 * @param location - A string in the format "latitude,longitude"
 * @returns A promise that resolves to the city name or 'Unknown'
 */
export const getCityFromLocationString = async (location: string): Promise<string> => {
  try {
    // Step 1: Parse location
    if (!location || typeof location !== 'string') {
      throw new Error('Location must be a non-empty string');
    }

    const [latitudeStr, longitudeStr] = location.split(',').map(coord => coord.trim());

    if (!latitudeStr || !longitudeStr) {
      throw new Error('Location must contain both latitude and longitude, separated by a comma');
    }

    const latitude = parseFloat(latitudeStr);
    const longitude = parseFloat(longitudeStr);

    if (isNaN(latitude) || isNaN(longitude)) {
      throw new Error('Invalid coordinates: latitude and longitude must be valid numbers');
    }

    if (latitude < -90 || latitude > 90) {
      throw new Error('Latitude must be between -90 and 90 degrees');
    }
    if (longitude < -180 || longitude > 180) {
      throw new Error('Longitude must be between -180 and 180 degrees');
    }

    // Step 2: Check cache
    const cacheKey = `${latitude},${longitude}`;
    if (cityCache.has(cacheKey)) {
      return cityCache.get(cacheKey)!;
    }

    // Step 3: Fetch from API
    const response = await axios.get<GeocodeResponse>(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10`,
      {
        headers: { 'User-Agent': 'YourAppName/1.0' },
      }
    );

    const { city, town, village } = response.data.address;
    const result = city || town || village || 'Unknown';

    // Step 4: Cache result
    cityCache.set(cacheKey, result);
    return result;
  } catch (err) {
    console.error('Error getting city from location:', err instanceof Error ? err.message : err);
    return 'Unknown';
  }
};
