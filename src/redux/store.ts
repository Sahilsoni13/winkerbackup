import { configureStore } from '@reduxjs/toolkit';
import profileReducer from './slices/profileSlice';
import winkerReducer from './slices/winkerSlice';
import nearbyWinkReducer from './slices/nearbyWinkSlice'
export const store = configureStore({
  reducer: {
    profile: profileReducer,
    winker: winkerReducer,
    nearbyWink: nearbyWinkReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
