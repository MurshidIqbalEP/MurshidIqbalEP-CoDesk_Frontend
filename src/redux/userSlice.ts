import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null, 
  isLoggedIn: false, 
  accessToken: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logIn: (state, action) => {
      state.user = action.payload.user; 
      state.accessToken = action.payload.accessToken;
      state.isLoggedIn = true;
    },
    logOut: (state) => {
      state.user = null; 
      accessToken: null;
      state.isLoggedIn = false;
    },
    updateAccessToken: (state, action) => {
      state.accessToken = action.payload; // Update access token
    },
  },
});

export const { logIn, logOut,updateAccessToken } = userSlice.actions;

export default userSlice.reducer;
