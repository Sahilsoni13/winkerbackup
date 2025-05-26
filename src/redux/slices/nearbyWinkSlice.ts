import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { API_BASE_URL } from '@/apiInfo';

interface Wink {
  id: string;
  isAccepted: boolean;
  createdAt: string;
  updatedAt: string;
  sender:{
    id:string,
    firstName:string,
    birthDate:string,
     location:string,
     profilePictureUrls:string[]
  },
  receiver:{
      id:string,
  }
}

interface WinkerState {
  winks: Wink[];
  loading: boolean;
  error: string | null;
}

const initialState: WinkerState = {
  winks: [],
  loading: false,
  error: null,
};

// Async thunk to fetch received winks
export const fetchSentWinks = createAsyncThunk(
  'winker/fetchReceivedWinks',
  async (_, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem('idToken') || '';
      const response = await axios.get(`${API_BASE_URL}/winks`, {
        headers: {
          Accept: 'application/json',
          Authorization: `${token}`,
        },
      });
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch winks');
    }
  }
);

const nearbyWinkSlice = createSlice({
  name: 'nearbyWink',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSentWinks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSentWinks.fulfilled, (state, action) => {
        state.loading = false;
        state.winks = action.payload;
      })
      .addCase(fetchSentWinks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = nearbyWinkSlice.actions;
export default nearbyWinkSlice.reducer;