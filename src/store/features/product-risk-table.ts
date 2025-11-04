import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { useFetchWrapper as Api } from '../../utils';

// createAsyncThunk
export const getProductRiskTable: any = createAsyncThunk(
  'productRisk/getProductRiskTable',
  async apiPath => {
    let data = await Api().get(apiPath);
    return data;
  },
);

// createSlice
export const productRiskTableSlice = createSlice({
  name: 'productRiskTable',
  initialState: {
    rows: [],
    loading: false,
    count: 0,
    error: null,
    timeFrameValue: 'RANGE_IN_MONTHS',
    riskRuleDetails: {},
    productRiskAddEditLoader: false
  },
  reducers: {
    setProductRiskAddEditLoader: (state: any, { payload }) => {
      state.productRiskAddEditLoader = payload;
      state.loading = payload;
    },
    addNewRow: (state: any, { payload }) => {
      state.rows = [...state.rows, payload];
    },
    removeRow: (state: any, { payload }) => {
      let tableRowsAfterRemovingEditRow = state.rows.filter(
        (item: any) => item.ID !== payload.ID,
      );
      state.rows = [...tableRowsAfterRemovingEditRow];
    },
    deleteRow: (state: any, { payload }) => {
      state.rows = state.rows.filter(
        (item: any) => item.ID !== payload,
      );
    },
    setTimeFrameValue: (state, action) => {
      state.timeFrameValue = action.payload;
    },
    setRiskRuleDetails: (state, action) => {
      state.riskRuleDetails = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(getProductRiskTable.pending, state => {
      state.loading = true;
    });
    builder.addCase(getProductRiskTable.fulfilled, (state, action) => {
      state.loading = false;
      state.rows = action?.payload?.data;
      state.count = action?.payload?.length;
    });
    builder.addCase(getProductRiskTable.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});
// for editing I am removing the old row and adding the new row
export const { setProductRiskAddEditLoader, addNewRow, removeRow, deleteRow, setTimeFrameValue } =
  productRiskTableSlice.actions;


export const productRiskGlobalData = (state: any) => state?.productRiskTable;
export const timeFrameData = (state: any) =>
  state?.productRiskTable?.timeFrameValue;
export const riskRuleDetailSData = (state: any) =>
  state?.productRiskTable?.riskRuleDetails;
export default productRiskTableSlice.reducer;
