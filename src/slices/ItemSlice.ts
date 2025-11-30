import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Item, ItemState } from '@interfaces';

const initialState: ItemState = {
  items: [],
};

const itemSlice = createSlice({
  name: 'item',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<Item>) {
      const existingItemIndex = state.items.findIndex(
        (item) => item.name === action.payload.name,
      );
      if (existingItemIndex >= 0) {
        state.items[existingItemIndex].quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    removeAllItems(state) {
      state.items = [];
    },
  },
});

export default itemSlice.reducer;
export const { addItem, removeAllItems } = itemSlice.actions;
