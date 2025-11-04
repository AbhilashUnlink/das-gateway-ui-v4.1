import { createSlice } from "@reduxjs/toolkit";

export const transactionSlice = createSlice({
  name: "transaction",
  initialState: {
    transactionLink: {},
  },
  reducers: {
    userTransaction: (state, action) => {
      state.transactionLink = action.payload;
    },
  },
});export const { userTransaction } = transactionSlice.actions;
export default transactionSlice.reducer;
