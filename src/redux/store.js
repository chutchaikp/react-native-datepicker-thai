// store.js
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
import dateSelectorReducer from "./dateSelectorSlice";
import personReducer from "./personSlice";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    dateSelector: dateSelectorReducer,
    person: personReducer,
  },
});

// export const useAppDispatch = () => useDispatch()
// export type RootState = ReturnType()
