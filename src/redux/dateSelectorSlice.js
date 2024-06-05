import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

const DATE_FROM_INIT = () => {
  const m = moment().utcOffset(7 * 60);
  m.set({ hour: 0, minute: 0 });
  return m.toISOString();
};
const DATE_TO_INIT = () => {
  const m = moment().utcOffset(7 * 60);
  m.set({ hour: 0, minute: 0 });
  m.add(1, "day");
  return m.toISOString();
};

export const dateSelectorSlice = createSlice({
  name: "dateSelector",
  initialState: {
    dateFrom: DATE_FROM_INIT(),
    dateTo: DATE_TO_INIT(),
  },
  reducers: {
    selectorChange: (state, action) => {
      state.dateFrom = action.payload.dateFrom;
      state.dateTo = action.payload.dateTo;
    },
    selectorReset: (state) => {
      state.dateFrom = DATE_FROM_INIT();
      state.dateTo = DATE_TO_INIT();
    },
  },
});

export const { selectorChange, selectorReset } = dateSelectorSlice.actions;

export const dateFrom = (state) => state.dateSelector.dateFrom;
export const dateTo = (state) => state.dateSelector.dateTo;

export default dateSelectorSlice.reducer;
