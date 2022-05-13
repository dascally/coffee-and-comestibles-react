import { createSlice, nanoid } from '@reduxjs/toolkit';

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
});

export const selectOrderItemById = (id) => (state) =>
  state.order.find((item) => item.id === id);

export const { addItem, removeItem, clearOrder } = orderSlice.actions;
export default orderSlice.reducer;
