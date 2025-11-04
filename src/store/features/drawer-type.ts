
import { createSlice } from "@reduxjs/toolkit";

export const drawerTypeSlice = createSlice({
  name: "drawerType",
  initialState: {
    drawerType: "",
  },
  reducers: {
    setDrawerType: (state, action) => {
      state.drawerType = action.payload;
    },
    clearDrawerType: (state) => {
      state.drawerType = "";
    },
  },
});
export const { setDrawerType, clearDrawerType } = drawerTypeSlice.actions;
export const drawerType = (state: any) => state?.drawerType?.drawerType;
export default drawerTypeSlice.reducer;
