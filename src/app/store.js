import { configureStore } from '@reduxjs/toolkit';
import menuReducer from '../features/menu/menuSlice.js';
import orderReducer from '../features/order/orderSlice.js';
import userReducer from '../features/user/userSlice.js';

export default configureStore({
  reducer: {
    menu: menuReducer,
    order: orderReducer,
    user: userReducer,
  },
});
