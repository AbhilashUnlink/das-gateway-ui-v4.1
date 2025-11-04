import { createSlice } from "@reduxjs/toolkit";

export const drawerSlice = createSlice({
  name: "drawer",
  initialState: {
    drawer: [],
    riskEditData: {},
    productRiskEditData: {},
    merchantStatementData:[],
    holidayData:[]
  },
  reducers: {
    setDrawer: (state, action) => {
      state.drawer = action.payload;
    },
    clearDrawer: (state) => {
      state.drawer = [];
    },
    setRiskEditData: (state, action) => {
      state.riskEditData = action.payload;
    },

    clearRiskEditData: (state) => {
      state.riskEditData = {};
    },
    setProductRiskEditData: (state, action) => {
      state.productRiskEditData = action.payload;
    },
    clearProductRiskEditData: (state) => {
      state.productRiskEditData = {};
    },
    setMerchantStatementEditData: (state, action) => {
      state.merchantStatementData = action.payload;
    },
    clearMerchantStatementEditData: (state) => {
      state.merchantStatementData = [];
    },
    setHolidayData: (state, action) => {
      state.holidayData = action.payload;
    },
    clearHolidayData: (state) => {
      state.holidayData = [];
    },
  },
});

export const {
  setDrawer,
  clearDrawer,
  setRiskEditData,
  clearRiskEditData,
  setProductRiskEditData,
  clearProductRiskEditData,
  setMerchantStatementEditData,
  clearMerchantStatementEditData,
  setHolidayData,
  clearHolidayData
} = drawerSlice.actions;
export const drawerDetails = (state: any) => state?.drawer?.drawer;
export const riskEdit = (state: any) => state?.drawer?.riskEditData;
export const productRiskEdit = (state: any) =>
  state?.drawer?.productRiskEditData;
export const merchantStatementEdit = (state: any) => state?.drawer?.merchantStatementData;
export default drawerSlice.reducer;
