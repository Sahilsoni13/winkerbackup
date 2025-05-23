import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { API_BASE_URL } from '@/apiInfo';

interface Wink {
  isAccepted: boolean;
  createdAt: string;
  id: string;
  receiverId: string;
  updatedAt: string;
  senderId: string;
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
export const fetchReceivedWinks = createAsyncThunk(
  'winker/fetchReceivedWinks',
  async (_, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem('idToken') || '';
      const response = await axios.get(`${API_BASE_URL}/winks/received`, {
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

const winkerSlice = createSlice({
  name: 'winker',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReceivedWinks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReceivedWinks.fulfilled, (state, action) => {
        state.loading = false;
        state.winks = action.payload;
      })
      .addCase(fetchReceivedWinks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = winkerSlice.actions;
export default winkerSlice.reducer;