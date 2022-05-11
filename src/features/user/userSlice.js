import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import loginService from '../../services/login';
import userService from '../../services/user';

export const login = createAsyncThunk('user/login', ({ email, password }) => {
  return loginService.login(email, password);
});

export const viewAccountInfo = createAsyncThunk(
  'user/viewAccountInfo',
  async ({ userId, jwt }, { rejectWithValue }) => {
    try {
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
    } catch (err) {
      throw rejectWithValue({ ...err });
    }
  }
);

export const addSavedPayment = createAsyncThunk(
  'user/addSavedPayment',
  async ({
    userId,
    jwt,
    cardNumber,
    securityCode,
    billingName,
    streetAddress,
    city,
    state,
    zipCode,
  }) => {
    const paymentInfo = {
      cardNumber,
      securityCode,
      billingName,
      streetAddress,
      city,
      state,
      zipCode,
    };
    return await userService.addSavedPayment(userId, jwt, paymentInfo);
  }
);

export const deleteSavedPayment = createAsyncThunk(
  'user/deleteSavedPayment',
  async ({ userId, jwt, paymentId }) => {
    await userService.deleteSavedPayment(userId, jwt, paymentId);
    return paymentId;
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
    logout: (state, action) => {
      localStorage.removeItem('user');
      return null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
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
    });
    builder.addCase(viewAccountInfo.fulfilled, (state, action) => ({
      ...state,
      ...action.payload,
    }));
    builder.addCase(viewAccountInfo.rejected, (state, action) => {
      if (action.payload.status === 401) {
        localStorage.removeItem('user');
        return null;
      }
    });
    builder.addCase(addSavedPayment.fulfilled, (state, action) => {
      state.savedPayments.push(action.payload);
    });
    builder.addCase(deleteSavedPayment.fulfilled, (state, action) => {
      return {
        ...state,
        savedPayments: state.savedPayments.filter(
          (payment) => payment._id !== action.payload
        ),
      };
    });
  },
});

export const { setUser, logout } = userSlice.actions;

export default userSlice.reducer;
