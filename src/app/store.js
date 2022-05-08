import { configureStore } from '@reduxjs/toolkit';
import menuReducer from '../features/menu/menuSlice.js';
import orderReducer from '../features/order/orderSlice.js';

export default configureStore({
  reducer: {
    menu: menuReducer,
    order: orderReducer,
  },
});
