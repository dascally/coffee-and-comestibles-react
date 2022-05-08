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
    builder.addCase(fetchMenu.fulfilled, (state, action) => action.payload);
  },
});

export default menuSlice.reducer;
