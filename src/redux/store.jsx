import { configureStore } from "@reduxjs/toolkit";

import hospitalsSlice from "./slices/HospitalSlice";
import pharmaciesReducer from "./slices/PharmacySlice";

const store = configureStore({
  reducer: {
    hospitals: hospitalsSlice,
    pharmacies: pharmaciesReducer
  }
  
});

export default store;
