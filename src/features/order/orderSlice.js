import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
  name: 'order',
  initialState: [],
  reducers: {
    changeItemQuantity: (state, action) => {
      const { id, quantityChange } = action.payload;
      const itemIdx = state.findIndex((menuItem) => menuItem.id === id);

      if (itemIdx >= 0) {
        if (state[itemIdx].quantity + quantityChange <= 0) {
          return state.filter((menuItem) => menuItem.id !== id);
        } else {
          // Rely on immer to update state without mutating old state
          state[itemIdx].quantity += quantityChange;
        }
      } else if (quantityChange > 0) {
        return [...state, { id, quantity: quantityChange }];
      } else {
        return state;
      }
    },
    removeItem: (state, action) =>
      state.filter((menuItem) => menuItem.id !== action.payload),
    clearOrder: () => [],
  },
});

export const selectOrderItemQuantity = (menuItemID) => (state) =>
  state.order.find((menuItem) => menuItem.id === menuItemID).quantity;

export const { changeItemQuantity, removeItem, clearOrder } =
  orderSlice.actions;
export default orderSlice.reducer;
