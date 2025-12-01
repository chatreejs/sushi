import { Plate, PlateState } from '@interfaces';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: PlateState = {
  plates: [
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
  ],
};

const placeSlice = createSlice({
  name: 'place',
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
    resetPlates(state) {
      state.plates = initialState.plates;
    },
  },
});

export default placeSlice.reducer;
export const { addPlate, resetPlates } = placeSlice.actions;
