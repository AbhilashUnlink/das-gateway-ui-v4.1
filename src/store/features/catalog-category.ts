import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { useFetchWrapper as Api } from "../../utils";


const initialState: any = {
    loading: false,
    rows:[],
    count:0,
    categoryAddEditLoader:false
};
export const getCatalogCategoryTable: any = createAsyncThunk(
    "catalogCategory/getCatalogCategoryTable",
    async (apiPath) => {
      let data = await Api().get(apiPath);
      return data;
    }
  );


export const catalogCategorySlice = createSlice({
  name: 'catalogCategory',
  initialState,
  reducers: {
    setCategoryAddEditLoader: (state: any, { payload }) => {
      state.categoryAddEditLoader = payload;
      state.loading = payload;
    },
    addNewRow: (state: any, { payload }) => {
      state.rows = [...state.rows, payload];
    },
    removeRow: (state: any, { payload }) => {
      let tableRowsAfterRemovingEditRow = state.rows.filter(
        (item: any) => item.CategoryID !== payload.CategoryID
      );
      state.rows = [...tableRowsAfterRemovingEditRow];
    },
    deleteRow: (state: any, { payload }) => {
      state.rows = state.rows.filter(
        (item: any) => item.CategoryID !== payload
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCatalogCategoryTable.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCatalogCategoryTable.fulfilled, (state, action) => {
      state.loading = false;
      state.rows = action?.payload?.data?.records;
      state.count = action?.payload?.data?.total_count;
    });
    builder.addCase(getCatalogCategoryTable.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
}
});

// Action creators are generated for each case reducer function
// export const { } = hashcardSlice.actions;
export const { setCategoryAddEditLoader, addNewRow, removeRow, deleteRow } = catalogCategorySlice.actions;

export default catalogCategorySlice.reducer;