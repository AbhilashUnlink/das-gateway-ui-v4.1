import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useFetchWrapper as Api } from "../../utils";

// createAsyncThunk
export const getRiskTable: any = createAsyncThunk(
  "risk/getRiskTable",
  async (apiPath) => {
    let data = await Api().get(apiPath);
    return data;
  }
);

// createSlice
export const riskTableSlice = createSlice({
  name: "riskTable",
  initialState: {
    rows: [],
    loading: false,
    count: 0,
    error: null,
    riskAddEditLoader:false
  },
  reducers: {
    setRiskAddEditLoader: (state: any, { payload }) => {
      state.riskAddEditLoader = payload;
      state.loading = payload;
    },
    addNewRow: (state: any, { payload }) => {
      state.rows = [...state.rows, payload];
    },
    removeRow: (state: any, { payload }) => {
      let tableRowsAfterRemovingEditRow = state.rows.filter(
        (item: any) => item.ID !== payload.ID
      );
      state.rows = [...tableRowsAfterRemovingEditRow];
    },
    deleteRow: (state: any, { payload }) => {
      state.rows = state.rows.filter(
        (item: any) => item.ID !== payload
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getRiskTable.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getRiskTable.fulfilled, (state, action) => {
      state.loading = false;
      state.rows = action?.payload?.data;
      state.count = action?.payload?.length;
    });
    builder.addCase(getRiskTable.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});
export const { setRiskAddEditLoader, addNewRow, removeRow, deleteRow } = riskTableSlice.actions;

export const riskGlobalData = (state: any) => state?.riskTable;

export default riskTableSlice.reducer;
