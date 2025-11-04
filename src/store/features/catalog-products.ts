import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { useFetchWrapper as Api } from "../../utils";


const initialState: any = {
    loading: false,
    rows:[],
    count:0,
    productAddEditLoader:false
};
export const getCatalogProductsTable: any = createAsyncThunk(
    "catalogProducts/getCatalogProductsTable",
    async (apiPath) => {
      let data = await Api().get(apiPath);
      return data;
    }
  );


export const catalogProductsSlice = createSlice({
  name: 'catalogProducts',
  initialState,
  reducers: {
    setProductAddEditLoader: (state: any, { payload }) => {
      state.productAddEditLoader = payload;
      state.loading = payload;
    },
    addNewRow: (state: any, { payload }) => {
      state.rows = [...state.rows, payload];
    },
    removeRow: (state: any, { payload }) => {
      let tableRowsAfterRemovingEditRow = state.rows.filter(
        (item: any) => item.PartnerID !== payload.PartnerID
      );
      state.rows = [...tableRowsAfterRemovingEditRow];
    },
    deleteRow: (state: any, { payload }) => {
      state.rows = state.rows.filter(
        (item: any) => item.PartnerID !== payload
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCatalogProductsTable.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCatalogProductsTable.fulfilled, (state, action) => {
      state.loading = false;
      state.rows = action?.payload?.data?.records;
      state.count = action?.payload?.data?.total_count;
    });
    builder.addCase(getCatalogProductsTable.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
}
});

// Action creators are generated for each case reducer function
// export const { } = hashcardSlice.actions;
export const { setProductAddEditLoader, addNewRow, removeRow, deleteRow } = catalogProductsSlice.actions;

export default catalogProductsSlice.reducer;