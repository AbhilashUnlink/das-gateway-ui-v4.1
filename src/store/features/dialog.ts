// Purpose - to open and close a dialog box,
//  used in -  risk tab delete button

import { createSlice } from "@reduxjs/toolkit";

export const dialogSlice = createSlice({
  name: "dialog",
  initialState: {
    open: false,
    data:{}
  },
  reducers: {
    openDialog: (state,action) => {
      state.open = true;
      state.data=action.payload;

    },
    closeDialog: (state) => {
        state.open = false;
        state.data={};
    },
  },
});
export const dialogState = (state: any) => state?.dialog?.open;
export const dialogData = (state: any) => state?.dialog?.data;

export const { openDialog,closeDialog } = dialogSlice.actions;
export default dialogSlice.reducer;



