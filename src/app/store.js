import { configureStore } from '@reduxjs/toolkit';
import menuReducer from '../features/menu/menuSlice';
import orderReducer from '../features/order/orderSlice';
import userReducer from '../features/user/userSlice';
import eventsReducer from '../features/events/eventsSlice';

export default configureStore({
  reducer: {
    menu: menuReducer,
    order: orderReducer,
    user: userReducer,
    events: eventsReducer,
  },
});
