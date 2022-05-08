import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import loginService from '../../services/login';

export const login = createAsyncThunk('user/login', ({ email, password }) => {
  return loginService.login(email, password);
});

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser: (state, action) => {
      const user = {
        token: action.payload.token,
        email: action.payload.email,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        rewards: action.payload.rewards,
      };
      return user;
    },
    logout: (state, action) => null,
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => action.payload);
    // builder.addCase(login.rejected, (state, action) => state);
  },
});

export const { setUser, logout } = userSlice.actions;

export default userSlice.reducer;
