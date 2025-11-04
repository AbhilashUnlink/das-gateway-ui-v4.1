import { createSlice } from "@reduxjs/toolkit";

export const actionButtonSlice = createSlice({
  name: "actionButton",
  initialState: {
    actionButton: [],
  },
  reducers: {
    setActionButton: (state, action) => {
      state.actionButton = action.payload;
    },
  },
});
export const { setActionButton } = actionButtonSlice.actions;
export const actionDetails = (state: any) => state?.actionButton?.actionButton;
export default actionButtonSlice.reducer;
