import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import loginService from '../../services/login';
import userService from '../../services/user';
import { placeOrder } from '../order/orderSlice';

export const register = createAsyncThunk(
  'user/register',
  ({ firstName, lastName, email, password }, { rejectWithValue }) => {
    return userService.register({ firstName, lastName, email, password });
  }
);

export const login = createAsyncThunk('user/login', ({ email, password }) => {
  return loginService.login(email, password);
});

export const confirmPassword = createAsyncThunk(
  'user/confirmPassword',
  ({ email, password }) => {
    return loginService.login(email, password);
  }
);

export const deleteAccount = createAsyncThunk(
  'user/deleteAccount',
  ({ userId, jwt }) => {
    return userService.deleteAccount(userId, jwt);
  }
);

export const updateAccount = createAsyncThunk(
  'user/updateAccount',
  ({ userId, jwt, firstName, lastName, email, password }) => {
    const user = { firstName, lastName, email, password };
    return userService.updateAccount(userId, jwt, user);
  }
);

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

export const viewSavedPayments = createAsyncThunk(
  'user/viewSavedPayments',
  async ({ userId, jwt }, { rejectWithValue }) => {
    try {
      return await userService.getSavedPayments(userId, jwt);
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

export const editSavedPayment = createAsyncThunk(
  'user/editSavedPayment',
  async ({
    userId,
    jwt,
    paymentId,
    billingName,
    streetAddress,
    city,
    state,
    zipCode,
  }) => {
    const paymentInfo = {
      billingName,
      streetAddress,
      city,
      state,
      zipCode,
    };

    return await userService.editSavedPayment(
      userId,
      jwt,
      paymentId,
      paymentInfo
    );
  }
);

export const addSavedOrder = createAsyncThunk(
  'user/addSavedOrder',
  async ({ userId, jwt, name, orderList }) => {
    return await userService.addSavedOrder(userId, jwt, { name, orderList });
  }
);

export const deleteSavedOrder = createAsyncThunk(
  'user/deleteSavedOrder',
  async ({ userId, jwt, orderId }) => {
    await userService.deleteSavedOrder(userId, jwt, orderId);
    return orderId;
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
        invoices: [],
      };
      return user;
    },
    logout: (state, action) => {
      localStorage.removeItem('user');
      return null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(register.fulfilled, (state, action) => {
      const user = {
        token: action.payload.token,
        id: action.payload.id,
        email: action.payload.email,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        rewards: null,
        savedOrders: [],
        savedPayments: [],
        invoices: [],
      };
      return user;
    });

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
        invoices: [],
      };
      return user;
    });

    builder.addCase(deleteAccount.fulfilled, (state, action) => {
      localStorage.removeItem('user');
      return { deleted: true };
    });

    builder.addCase(updateAccount.fulfilled, (state, action) => {
      const user = {
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        email: action.payload.email,
      };
      return { ...state, ...user };
    });

    builder
      .addCase(viewAccountInfo.fulfilled, (state, action) => ({
        ...state,
        ...action.payload,
      }))
      .addCase(viewAccountInfo.rejected, (state, action) => {
        if (action.payload.status === 401) {
          localStorage.removeItem('user');
          return null;
        }
      });

    builder
      .addCase(viewSavedPayments.fulfilled, (state, action) => ({
        ...state,
        savedPayments: action.payload,
      }))
      .addCase(viewSavedPayments.rejected, (state, action) => {
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

    builder.addCase(editSavedPayment.fulfilled, (state, action) => {
      return {
        ...state,
        savedPayments: state.savedPayments.map((payment) =>
          payment._id === action.payload._id ? action.payload : payment
        ),
      };
    });

    builder.addCase(placeOrder.fulfilled, (state, action) => {
      state.invoices.push(action.payload);
    });

    builder.addCase(addSavedOrder.fulfilled, (state, action) => {
      state.savedOrders.push(action.payload);
    });

    builder.addCase(deleteSavedOrder.fulfilled, (state, action) => {
      return {
        ...state,
        savedOrders: state.savedOrders.filter(
          (order) => order._id !== action.payload
        ),
      };
    });
  },
});

export const selectSavedOrderById = (id) => (state) =>
  state.user.savedOrders.find((order) => order._id === id);

export const { setUser, logout } = userSlice.actions;

export default userSlice.reducer;
