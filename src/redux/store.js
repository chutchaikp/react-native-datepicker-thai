// store.js
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
import dateSelectorReducer from "./dateSelectorSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    dateSelector: dateSelectorReducer,
  },
});
