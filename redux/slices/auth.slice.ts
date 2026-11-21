import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../types';

type AuthState = {
  authToken: string | null; // short-lived OTP / reset token, sent as the `token` header
  accessToken: string | null;
  refreshToken: string | null;
  user: IUser | null;
};

const initialState: AuthState = {
  authToken: null,
  accessToken: null,
  refreshToken: null,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ accessToken: string; refreshToken: string; user: IUser }>) => {
      state.authToken = null;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.user = action.payload.user;
    },
    setTokens: (state, action: PayloadAction<{ accessToken: string; refreshToken: string }>) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    setAuthToken: (state, action: PayloadAction<string | null>) => {
      state.authToken = action.payload;
    },
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.authToken = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.user = null;
    },
  },
});

export const { setCredentials, logout, setTokens, setAuthToken, setUser } = authSlice.actions;
export default authSlice.reducer;
