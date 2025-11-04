import { createSlice } from "@reduxjs/toolkit";

export const filterSlice = createSlice({
  name: "filter",
  initialState: {
    filter: "",
    filterPayload:null,
  },
  reducers: {
    userFilter: (state, action) => {
      state.filter = action.payload;
    },
    resetFilter: (state) => {
      state.filter = "";
    },
    setFilterPayload:(state, action) => {
      state.filterPayload = action.payload;
    },
  },
});
export const filteringData = (state: any) => state?.filter?.filter;

export const { userFilter } = filterSlice.actions;
export const { resetFilter, setFilterPayload } = filterSlice.actions;
export default filterSlice.reducer;
