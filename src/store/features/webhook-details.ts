import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useFetchWrapper as Api } from '../../utils';

const initialState: any = {
    details: {},
    loading: false,
    rows:[],
    count:0,
    webhookAddEditLoader:false
};
// createAsyncThunk
export const getWebhookDetails: any = createAsyncThunk(
  'webhook/getWebhookDetails',
  async apiPath => {
    let data = await Api().get(apiPath);
    return data;
  },
);

export const webhookDetailSlice = createSlice({
  name: 'webhookDetails',
  initialState,
  reducers: {
    setWebhookAddEditLoader: (state: any, { payload }) => {
      state.webhookAddEditLoader = payload;
      state.loading = payload;
    },
    addNewRow: (state: any, { payload }) => {
      state.rows = [...state.rows, payload];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getWebhookDetails.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getWebhookDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.rows = action?.payload?.data?.records;
      state.count = action?.payload?.data?.total_count;
    });
    builder.addCase(getWebhookDetails.rejected, (state, action) => {
      state.loading = false;
      state.rows = [];
      state.count = 0;
      state.error = action.payload;
    });
}
});
export const webhookDetailsData = (state: any) =>
    state?.webhookDetails;
// Action creators are generated for each case reducer function
export const { setWebhookAddEditLoader, addNewRow } = webhookDetailSlice.actions;

export default webhookDetailSlice.reducer;