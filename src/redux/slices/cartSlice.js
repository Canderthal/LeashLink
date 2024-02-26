import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    addItemToCart(state, action) {
      state.items.push(action.payload);
    },
    removeItemFromCart(state, action) {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    removeAllItemsFromCart(state) {
      state.items = [];
    },
  },
});

export const { addItemToCart, removeItemFromCart, removeAllItemsFromCart } = cartSlice.actions;
export default cartSlice.reducer;