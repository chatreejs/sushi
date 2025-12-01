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
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.name !== action.payload);
    },
    updateItemName(
      state,
      action: PayloadAction<{
        oldName: string;
        newName: string;
        newPrice: number;
      }>,
    ) {
      const existingItemIndex = state.items.findIndex(
        (item) => item.name === action.payload.oldName,
      );
      if (existingItemIndex >= 0) {
        state.items[existingItemIndex].name = action.payload.newName;
        state.items[existingItemIndex].price = action.payload.newPrice;
      }
    },
  },
});

export default itemSlice.reducer;
export const {
  addItem,
  decreaseItemQuantity,
  removeAllItems,
  removeItem,
  updateItemName,
} = itemSlice.actions;
