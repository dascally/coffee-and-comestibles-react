import { configureStore } from '@reduxjs/toolkit';
import orderReducer from '../features/order/orderSlice.js';

export default configureStore({
  reducer: {
    order: orderReducer,
  },
});
