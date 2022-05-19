import { configureStore } from '@reduxjs/toolkit';
import menuReducer from '../features/menu/menuSlice';
import orderReducer from '../features/order/orderSlice';
import userReducer from '../features/user/userSlice';

export default configureStore({
  reducer: {
    menu: menuReducer,
    order: orderReducer,
    user: userReducer,
  },
});
