import { createSlice } from "@reduxjs/toolkit";

export const csvDateSlice = createSlice({
  name: "csvDate",
  initialState: {
    csvDate: [],
  },
  reducers: {
    setCsvDate: (state, action) => {
      state.csvDate = action.payload;
    },
    resetCsvDate: (state) => {
      state.csvDate = [];
    },
  },
});
export const csvDateData = (state: any) => state?.csvDate?.csvDate;

export const { setCsvDate } = csvDateSlice.actions;
export const { resetCsvDate } = csvDateSlice.actions;
export default csvDateSlice.reducer;
