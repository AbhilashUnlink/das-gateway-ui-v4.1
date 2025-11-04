import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { useFetchWrapper as Api } from '../../utils';
import { HTTP_STATUS } from '../../components/constants';
import {
  MERCHANT_DETAILS,
  PRODUCT_RISK,
} from '../../components/constants/api-paths';
import DasSnackbar from '../../components/das-snackbar/DasSnackbar';
import { setFilteredDASMID } from './merchant';

export const getProductsList: any = createAsyncThunk(
  'productTab/getProductsList',
  async (apiLink: any, thunkAPI: any) => {
    const { dispatch } = thunkAPI;
    const { data } = await Api().get(apiLink);
    dispatch(setFilteredDASMID([]));
    return data;
  },
);

// createAsyncThunk
export const updateDASMIDStatus: any = createAsyncThunk(
  'productTab/updateDASMIDStatus',
  async (payload: any) => {
    const { DASMID, locationId, status, tableData } = payload;
    let result = await Api().patch(PRODUCT_RISK.UPDATE_DASMID_STATUS, {
      DASMID,
      locationId,
      status,
    });
    if ([HTTP_STATUS.OK].includes(result.statusCode)) {
      // let table = [...payload.tableData]
      DasSnackbar.success(result.message);
      let index = tableData.findIndex((item: any) => item.DASMID === DASMID);
      let finalData = tableData;
      if (index !== -1) {
        let itemWithDasmid = tableData[index];
        itemWithDasmid = { ...itemWithDasmid, ProductStatus: payload.status };

        finalData = [
          ...tableData.slice(0, index),
          itemWithDasmid,
          ...tableData.slice(index + 1),
        ];
      }
      return finalData;
    } else return;
  },
);

export const getProductDetails: any = createAsyncThunk(
  'merchant/getProductDetails',
  async productId => {
    const productdetail = await Api().get(
      `${MERCHANT_DETAILS.PRODUCT_DETAILS}/${productId}/`,
    );
    return productdetail;
  },
);

export const productsListSlice = createSlice({
  name: 'productsList',
  initialState: {
    productsList: [],
    count: 0,
    loading: false,
    error: null,
    productDetails: {},
    loadingProductTable: false
  },
  reducers: {
    resetProductDetails: (state) => {
      state.productDetails = {};
    }
  },
  extraReducers: builder => {
    builder.addCase(getProductsList.pending, state => {
      state.loadingProductTable = true;
    });
    builder.addCase(getProductsList.fulfilled, (state, action) => {
      state.loadingProductTable = false;
      state.productsList = action?.payload?.records;
      state.count = action?.payload?.total_count;
    });
    builder.addCase(getProductsList.rejected, (state, action) => {
      state.loadingProductTable = false;
      state.error = action.payload;
    });
    // Update DASMID Status

    builder.addCase(updateDASMIDStatus.pending, state => {
      state.loading = true;
    });
    builder.addCase(updateDASMIDStatus.fulfilled, (state, action) => {
      state.productsList = action.payload;
    });
    builder.addCase(updateDASMIDStatus.rejected, () => { });

    //product details
    builder.addCase(getProductDetails.pending, state => {
      state.loading = true;
    });
    builder.addCase(getProductDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.productDetails = action?.payload?.data;
    });
    builder.addCase(getProductDetails.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { resetProductDetails } = productsListSlice.actions;

export const loadingProductDetails = (store: any) => store.productsList.loading;
export const loadingProductTable = (store: any) => store.productsList.loadingProductTable;

export default productsListSlice.reducer;
