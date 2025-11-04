import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useFetchWrapper as Api } from "../../utils";
import { MERCHANT_DETAILS } from "../../components/constants/api-paths";


export const getProductInfoQuery: any = createAsyncThunk(
  "merchant/getProductInfoQuery",
  async (productId) => {
    const { data } = await Api().get(`${MERCHANT_DETAILS.PRODUCT_DETAILS}/${productId}/`);
    return data;
  }
);

export const merchantDrawerSlice = createSlice({
  name: "merchantDrawer",
  initialState: {
    drawer: [],
    productInfo: {},
    loading: false,
    error: null,
  },
  reducers: {
    setMerchantDrawer: (state, action) => {
      state.drawer = action.payload;
    },
    clearMerchnatDrawer: (state) => {
      state.drawer = [];
    },
    clearProductInfo: (state) => {
      state.productInfo = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProductInfoQuery.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getProductInfoQuery.fulfilled, (state, action) => {
      state.loading = false;
      state.productInfo = action?.payload;
    });
    builder.addCase(getProductInfoQuery.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const merchantDrawerDetails = (state: any) =>
  state?.merchantDrawer?.drawer;
export const merchantDrawerLoader = (state: any) =>
  state?.merchantDrawer?.loading;
export const productInfoDetails = (state: any) =>
  state?.merchantDrawer?.productInfo;
export const ProductName = (state: any) =>
  state?.merchantDrawer?.productInfo?.ProductName;
export const ProductType = (state: any) =>
  state?.merchantDrawer?.productInfo?.ProductType;
export const currentMerchantName = (state: any) =>
  state?.merchantDrawer?.productInfo?.MerchantName;

export const { setMerchantDrawer, clearMerchnatDrawer, clearProductInfo } =
  merchantDrawerSlice.actions;
export default merchantDrawerSlice.reducer;
