import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import menuService from '../../services/menu';

export const fetchMenu = createAsyncThunk('order/fetchMenu', () => {
  return menuService.getMenu();
});

const menuSlice = createSlice({
  name: 'menu',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMenu.fulfilled, (state, action) => {
      const menu = action.payload;
      menu.forEach((menuItem) => {
        menuItem.image.src = `${process.env.PUBLIC_URL}/menu/${menuItem.image.src}`;
      });
      return menu;
    });
  },
});

export const selectMenuItemById = (id) => (state) =>
  state.menu.find((item) => item._id === id);

export default menuSlice.reducer;
