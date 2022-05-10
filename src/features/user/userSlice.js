import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import loginService from '../../services/login';
import userService from '../../services/user';

export const login = createAsyncThunk('user/login', ({ email, password }) => {
  return loginService.login(email, password);
});

export const viewAccountInfo = createAsyncThunk(
  'user/viewAccountInfo',
  async ({ userId, jwt }) => {
    const results = await Promise.all([
      userService.getRewards(userId, jwt),
      userService.getSavedOrders(userId, jwt),
      userService.getSavedPayments(userId, jwt),
    ]);

    return {
      rewards: results[0],
      savedOrders: results[1],
      savedPayments: results[2],
    };
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser: (state, action) => {
      const user = {
        token: action.payload.token,
        id: action.payload.id,
        email: action.payload.email,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        rewards: null,
        savedOrders: [],
        savedPayments: [],
      };
      return user;
    },
    logout: (state, action) => null,
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => action.payload);
    builder.addCase(viewAccountInfo.fulfilled, (state, action) => ({
      ...state,
      ...action.payload,
    }));
  },
});

export const { setUser, logout } = userSlice.actions;

export default userSlice.reducer;
