import { createSlice } from "@reduxjs/toolkit";

export const titleSlice = createSlice({
  name: "title",
  initialState: {
    title: "Payment Options",
  },
  reducers: {
    setAppTitle: (state, action) => {
      state.title = action.payload;
    },

  },
});
export const filteringData = (state: any) => state?.filter?.filter;

export const { setAppTitle } = titleSlice.actions;

export default titleSlice.reducer;
