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
export const newRiskTableSlice = createSlice({
  name: "newRiskTable",
  initialState: {
    rows: [],
    loading: false,
    count: 0,
    error: null,
    riskAddEditLoader: false,
    ruleLoading: false,
    callRulesTableApi: false,
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
      state.rows = state.rows.filter((item: any) => item.ID !== payload);
    },
    setRuleLoading: (state: any, { payload }) => {
      state.ruleLoading = payload;
    },
    setCallRulesTableApi: (state: any, action ) => {
      console.log("Setting CallRulesTableAPI:", action.payload);
      state.callRulesTableApi = action.payload;
    },
    setCallRulesTbApi: (state: any, action ) => {
      console.log("Setting CallRulesTableAPI:", action.payload);
      state.callRulesTableApi = action.payload;
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
export const {
  setRiskAddEditLoader,
  addNewRow,
  removeRow,
  deleteRow,
  setRuleLoading,
  setCallRulesTableApi,
  setCallRulesTbApi,
} = newRiskTableSlice.actions;

export const riskGlobalData = (state: any) => state?.newRiskTable;

export default newRiskTableSlice.reducer;
