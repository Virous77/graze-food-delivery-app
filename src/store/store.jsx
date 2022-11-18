import { configureStore, combineReducers } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";

const Reducer = combineReducers({
  cart: cartSlice,
});

const Store = configureStore({
  reducer: Reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default Store;
