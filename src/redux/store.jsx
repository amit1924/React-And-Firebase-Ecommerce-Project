import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice"; // Import the default export, not named export

export const store = configureStore({
  reducer: {
    cart: cartReducer, // Use the reducer, not the slice itself
  },
});
