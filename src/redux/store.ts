import { configureStore } from '@reduxjs/toolkit';
import profileReducer from './slices/profileSlice';
import winkerReducer from './slices/winkerSlice';
export const store = configureStore({
  reducer: {
    profile: profileReducer,
    winker: winkerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
