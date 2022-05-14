import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit';
import orderService from '../../services/order';

export const placeOrder = createAsyncThunk(
  'order/placeOrder',
  async ({ userId, orderList, contactPhone, contactName, ccInfo }) => {
    const invoice = await orderService.submitOrder(userId, {
      orderList,
      contactPhone,
      contactName,
      ccInfo,
    });
    return invoice;
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState: [],
  reducers: {
    addItem: (state, action) => {
      const newItem = {
        menuItem: action.payload.menuItem,
        selectedOptions: action.payload.selectedOptions
          ? { ...action.payload.selectedOptions }
          : {},
        useRewards: action.payload.useRewards ?? false,
        id: nanoid(),
      };

      return state.concat(newItem);
    },
    removeItem: (state, action) =>
      state.filter((item) => item.id !== action.payload),
    clearOrder: (state, action) => [],
  },
  extraReducers: (builder) => {
    builder.addCase(placeOrder.fulfilled, (state, action) => {
      return [];
    });
  },
});

export const selectOrderItemById = (id) => (state) =>
  state.order.find((item) => item.id === id);

export const { addItem, removeItem, clearOrder } = orderSlice.actions;
export default orderSlice.reducer;
