import { createSlice } from "@reduxjs/toolkit";

export const loaderSlice = createSlice({
  name: "loader",
  initialState: {
    isLoaderActive: false,
  },
  reducers: {
    toggleLoader: (state) => {
      state.isLoaderActive = !state.isLoaderActive;
    },
    startLoader: (state) => {
      state.isLoaderActive = true;
    },
    stopLoader: (state) => {
      state.isLoaderActive = false;
    },
  },
});
export const { toggleLoader, startLoader, stopLoader } = loaderSlice.actions;
export default loaderSlice.reducer;
