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
    decreaseItemQuantity(
      state,
      action: PayloadAction<{ name: string; quantity: number }>,
    ) {
      const existingItemIndex = state.items.findIndex(
        (item) => item.name === action.payload.name,
      );
      if (existingItemIndex >= 0) {
        state.items[existingItemIndex].quantity -= action.payload.quantity;
        if (state.items[existingItemIndex].quantity <= 0) {
          state.items.splice(existingItemIndex, 1);
        }
      }
    },
    removeAllItems(state) {
      state.items = [];
    },
  },
});

export default itemSlice.reducer;
export const { addItem, decreaseItemQuantity, removeAllItems } =
  itemSlice.actions;
