import { Plate, PlateState } from '@interfaces';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const defaultPlate: Plate[] = [
  {
    price: 30,
    color: '#fcf9fa',
  },
  {
    price: 40,
    color: '#ec003f',
  },
  {
    price: 60,
    color: '#cad5e2',
  },
  {
    price: 80,
    color: '#f0b100',
  },
  {
    price: 120,
    color: '#364153',
  },
];

const initialState: PlateState = {
  plates: [],
};

const plateSlice = createSlice({
  name: 'plate',
  initialState,
  reducers: {
    addPlate(state, action: PayloadAction<Plate>) {
      state.plates.push(action.payload);
    },
    removePlate(state, action: PayloadAction<number>) {
      state.plates = state.plates.filter(
        (plate) => plate.price !== action.payload,
      );
    },
    updatePlate(
      state,
      action: PayloadAction<{ oldPrice: number; newPrice: number }>,
    ) {
      const index = state.plates.findIndex(
        (plate) => plate.price === action.payload.oldPrice,
      );
      if (index >= 0) {
        state.plates[index].price = action.payload.newPrice;
      }
    },
    resetPlates(state) {
      state.plates = defaultPlate;
    },
  },
});

export default plateSlice.reducer;
export const { addPlate, removePlate, updatePlate, resetPlates } =
  plateSlice.actions;
