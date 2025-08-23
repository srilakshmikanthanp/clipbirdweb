import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { RootState } from 'common/redux/store';
import UserResponseDto from 'user/UserResponseDto';

export interface AuthState {
  token: string | null;
  user: UserResponseDto | null;
}

const state: AuthState = {
  token: localStorage.getItem('token'),
  user: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: state,
  reducers: {
    setUser: (state, action: PayloadAction<UserResponseDto | null>) => {
      state.user = action.payload;
    },
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
      if (action.payload != null) {
        localStorage.setItem('token', action.payload);
      } else {
        localStorage.removeItem('token');
      }
    },
  },
});

export const { setToken, setUser } = authSlice.actions;
export const selectToken = (state: RootState) => state.auth.token;
export const selectUser = (state: RootState) => state.auth.user;
export default authSlice.reducer;
