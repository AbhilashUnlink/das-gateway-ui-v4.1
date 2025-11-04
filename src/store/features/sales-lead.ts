import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useFetchWrapper as Api } from "../../utils";

// createAsyncThunk
export const getSalesLeadApplications: any = createAsyncThunk(
  "salesLead/getMerchantAppications",
  async (apiPath) => {
    let data = await Api().get(apiPath);
    return data;
  }
);

// createSlice
export const salesLeadSlice = createSlice({
  name: "salesLead",
  initialState: {
    salesLeadTable: [],
    count: 0,
    loading: false,
    error: null,
  },
  reducers: {
    addNewRow: (state: any, { payload }) => {
      state.salesLeadTable = [payload, ...state.salesLeadTable];
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getSalesLeadApplications.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getSalesLeadApplications.fulfilled, (state, action) => {
      state.loading = false;
      state.salesLeadTable = action?.payload?.data?.records;
      state.count = action?.payload?.data?.total_count;
    });
    builder.addCase(getSalesLeadApplications.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});
export const { addNewRow } = salesLeadSlice.actions;

export const salesLeadMerchantData = (state: any) => state.salesLead;

export default salesLeadSlice.reducer;
