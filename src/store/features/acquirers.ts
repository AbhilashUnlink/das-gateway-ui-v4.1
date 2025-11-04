import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useFetchWrapper as Api } from "../../utils";

// createAsyncThunk
export const getAcquirersTable: any = createAsyncThunk(
  "risk/getAcquirersTable",
  async (apiPath) => {
    let data = await Api().get(apiPath);
    return data;
  }
);

// createSlice
export const acquirersTableSlice = createSlice({
  name: "acquirersTable",
  initialState: {
    rows: [],
    count: 0,
    loading: false,
    error: null,
  },
  reducers: {
    addNewRow: (state: any, { payload }) => {
      state.acquirersTable = [payload, ...state.acquirersTable];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAcquirersTable.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAcquirersTable.fulfilled, (state, action) => {
      state.loading = false;
      state.rows = action?.payload?.data?.records;
      state.count = action?.payload?.data?.total_count;
    });
    builder.addCase(getAcquirersTable.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});
export const { addNewRow } = acquirersTableSlice.actions;

export const acquirersTableData = (state: any) =>
  state?.acquirersTable;

export default acquirersTableSlice.reducer;
