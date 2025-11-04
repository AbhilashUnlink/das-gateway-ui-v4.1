import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { useFetchWrapper as Api } from "../../utils";


const initialState: any = {
    loading: false,
    rows:[],
    count:0,
    ipWhitelistAddEditLoader:false
};
export const getIpWhitelistTable: any = createAsyncThunk(
    "ipWhitelist/getIpWhitelistTable",
    async (apiPath) => {
      let data = await Api().get(apiPath);
      return data;
    }
  );


export const ipWhitelistSlice = createSlice({
  name: 'ipWhitelist',
  initialState,
  reducers: {
    setIpWhitelistAddEditLoader: (state: any, { payload }) => {
      state.ipWhitelistAddEditLoader = payload;
      state.loading = payload;
    },
    addNewRow: (state: any, { payload }) => {
      state.rows = [...state.rows, payload];
    },
    removeRow: (state: any, { payload }) => {
      let tableRowsAfterRemovingEditRow = state.rows.filter(
        (item: any) => item.MerchantIP !== payload.MerchantIP
      );
      state.rows = [...tableRowsAfterRemovingEditRow];
    },
    deleteRow: (state: any, { payload }) => {
      state.rows = state.rows.filter(
        (item: any) => item.MerchantIP !== payload
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getIpWhitelistTable.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getIpWhitelistTable.fulfilled, (state, action) => {
      state.loading = false;
      state.rows = action?.payload?.data?.records;
      state.count = action?.payload?.data?.total_count;
    });
    builder.addCase(getIpWhitelistTable.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
}
});

// Action creators are generated for each case reducer function
export const { setIpWhitelistAddEditLoader, addNewRow, removeRow, deleteRow } = ipWhitelistSlice.actions;

export default ipWhitelistSlice.reducer;