import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Pharmacy {
  id: string;
  pharmaciesName: string;
  address: string;
  location: number;
}

interface PharmaciesState {
  pharmacies: Pharmacy[];
}

const initialState: PharmaciesState = {
  pharmacies: [],
};

const pharmaciesSlice = createSlice({
  name: 'pharmacies',
  initialState,
  reducers: {
    addPharmacy: (state, action: PayloadAction<Pharmacy>) => {
      state.pharmacies.push(action.payload);
    },
    setPharmacies: (state, action: PayloadAction<Pharmacy[]>) => {
      state.pharmacies = action.payload;
    },
  },
});

export const { addPharmacy, setPharmacies } = pharmaciesSlice.actions;
export default pharmaciesSlice.reducer

