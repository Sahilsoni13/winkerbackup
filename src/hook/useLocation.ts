import { useState, useEffect } from 'react';
import axios from 'axios';

interface GeocodeResponse {
  address: {
    city?: string;
    town?: string;
    village?: string;
  };
}

interface LocationResult {
  coordinates: { latitude: number; longitude: number } | null;
  city: string;
  loading: boolean;
  error: string | null;
}

export const useLocation = (location: string): LocationResult => {
  const [coordinates, setCoordinates] = useState<{ latitude: number; longitude: number } | null>(null);
  const [city, setCity] = useState<string>('Unknown');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const parseAndFetch = async () => {
      setLoading(true);
      setError(null);

      // Parse location
      try {
        const coords = parseLocation(location);
        if (!coords) {
          setError('Invalid coordinates');
          setCoordinates(null);
          setCity('Unknown');
          return;
        }
        setCoordinates(coords);

        // Fetch city name
        const cityName = await fetchCityName(coords.latitude, coords.longitude);
        setCity(cityName);
      } catch (err) {
        setError('Failed to process location');
        setCoordinates(null);
        setCity('Unknown');
      } finally {
        setLoading(false);
      }
    };

    if (location) {
      parseAndFetch();
    } else {
      setCoordinates(null);
      setCity('Unknown');
      setError(null);
    }
  }, [location]);

  return { coordinates, city, loading, error };
};

const parseLocation = (location: string): { latitude: number; longitude: number } | null => {
  try {
    const [latitude, longitude] = location.split(',').map(coord => parseFloat(coord.trim()));
    if (isNaN(latitude) || isNaN(longitude)) {
      throw new Error('Invalid coordinates');
    }
    return { latitude, longitude };
  } catch (err) {
    console.log('Error parsing location:', err);
    return null;
  }
};

const fetchCityName = async (latitude: number, longitude: number): Promise<string> => {
  try {
    const response = await axios.get<GeocodeResponse>(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10`
    );
    const { city, town, village } = response.data.address;
    return city || town || village || 'Unknown';
  } catch (err) {
    console.log('Error fetching city:', err);
    return 'Unknown';
  }
};