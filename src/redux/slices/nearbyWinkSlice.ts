import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

type NearbyUser = {
  id: string;
  firstName: string;
  birthDate: string;
  location: { latitude: number; longitude: number };
  profilePictureUrl: string;
  city?: string;
};

type NearbyUsersState = {
  users: NearbyUser[];
  loading: boolean;
  error: string | null;
};

const initialState: NearbyUsersState = {
  users: [],
  loading: false,
  error: null,
};

const fetchCityName = async (latitude: number, longitude: number): Promise<string> => {
  try {
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10`
    );
    const { city, town, village } = response.data.address;
    return city || town || village || 'Unknown';
  } catch (error) {
    console.error('Error fetching city:', error);
    return 'Unknown';
  }
};

export const fetchNearbyUsers = createAsyncThunk(
  'nearbyUsers/fetchNearbyUsers',
  async (radius: number, { rejectWithValue }) => {
    try {
      const response = await axios.post('/users/nearby', { radius });
      const users: NearbyUser[] = response.data;

      const usersWithCities = await Promise.all(
        users.map(async (user) => ({
          ...user,
          city: await fetchCityName(user.location.latitude, user.location.longitude),
        }))
      );

      return usersWithCities;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch nearby users');
    }
  }
);

const nearbyUsersSlice = createSlice({
  name: 'nearbyUsers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNearbyUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNearbyUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
      })
      .addCase(fetchNearbyUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default nearbyUsersSlice.reducer;
