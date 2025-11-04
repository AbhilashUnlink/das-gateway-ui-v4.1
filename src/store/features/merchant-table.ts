import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { useFetchWrapper as Api } from '../../utils';
import { setFilteredDASMID } from './merchant';

// createAsyncThunk
export const getMerchantTable: any = createAsyncThunk(
  'risk/getMerchantTable',
  async (apiPath: any, thunkAPI: any) => {
    const { dispatch } = thunkAPI;
    let data = await Api().get(apiPath);
    dispatch(setFilteredDASMID([]));
    return data;
  },
);
// createSlice
export const merchantTableSlice = createSlice({
  name: 'merchantTable',
  initialState: {
    merchantTable: [],
    count: 0,
    loading: false,
    error: null,
  },
  reducers: {
    addNewRow: (state: any, { payload }) => {
      state.merchantTable = [payload, ...state.merchantTable];
    },
    approveStatemenetRow: (state: any, { payload }) => {
      state.merchantTable = [payload, ...state.merchantTable];
    },
  },
  extraReducers: builder => {
    builder.addCase(getMerchantTable.pending, state => {
      state.loading = true;
    });
    builder.addCase(getMerchantTable.fulfilled, (state, action) => {
      state.loading = false;
      state.merchantTable = action?.payload?.data?.records;
      state.count = action?.payload?.data?.total_count;
    });
    builder.addCase(getMerchantTable.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});
export const { addNewRow } = merchantTableSlice.actions;

export const riskRows = (state: any) => state?.merchantTable?.merchantTable;
export const merchantTableLoading = (state: any) => state?.merchantTable?.loading;
export const rowsCount = (state: any) => state?.merchantTable?.count;
export default merchantTableSlice.reducer;
