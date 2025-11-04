import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useFetchWrapper as Api } from "../../utils";
import { PARTNER } from "../../components/constants/api-paths";
import { getCountry } from "../../utils/helper";

// createAsyncThunk
export const getPartnerTable: any = createAsyncThunk(
  "partner/getPartnerTable",
  async (apiPath) => {
    let data = await Api().get(apiPath);
    return data;
  }
);
export const getPartnerDetails: any = createAsyncThunk(
  "partner/getPartnerDetails",
  async (data: any, thunkAPI: any) => {
    const { getState } = thunkAPI;
    const store = getState();
    const { id } = data;
    const { auth } = store;
    const referralCode = auth?.profile?.referralCode;
    if (id) {
      let resellerDetails;
      resellerDetails = await Api().get(`${PARTNER.PARTNER_DETAILS_API}/${id}`);
      let updatedData = {
        ...resellerDetails.data,
        country:
          resellerDetails?.data?.country !== null
            ? getCountry(resellerDetails?.data?.country)?.name
            : "N/A",
      };
      return updatedData;
    } else {
      let referralDetails;
      referralDetails = await Api().get(
        `${PARTNER.REFERRAL_CODE_DETAILS}/${referralCode}/`
      );
      return referralDetails.data;
    }
  }
);
export const getReferralMerchantDetails: any = createAsyncThunk(
  "partner/getReferralMerchantDetails",
  async (referralCode) => {
    let resellerDetails;
    resellerDetails = await Api().get(
      `${PARTNER.REFERRAL_MERCHANT_DETAILS}${referralCode}/`
    );
    if (resellerDetails === undefined) {
      // navigate(`/result/error/404`)
    }
    return resellerDetails.data;
  }
);
// createSlice
export const partnerTableSlice = createSlice({
  name: "partnersTable",
  initialState: {
    partnerTable: [],
    rows: [],
    count: 0,
    loading: false,
    error: null,
    partnerDetails: {},
    referralMerchantDetails: [],
  },
  reducers: {
    addNewRow: (state: any, { payload }) => {
      state.partnerTable = [payload, ...state.partnerTable];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPartnerTable.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPartnerTable.fulfilled, (state, action) => {
      state.loading = false;
      state.partnerTable = action?.payload?.data;
      state.rows = action?.payload?.data?.records;
      state.count = action?.payload?.data?.total_count;
    });
    builder.addCase(getPartnerTable.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    //Partner Details
    builder.addCase(getPartnerDetails.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPartnerDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.partnerDetails = action?.payload;
      state.count = action?.payload?.total_count;
    });
    builder.addCase(getPartnerDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    ////Referral Merchant Details
    builder.addCase(getReferralMerchantDetails.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getReferralMerchantDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.referralMerchantDetails = action?.payload?.records;
      state.count = action?.payload?.total_count;
    });
    builder.addCase(getReferralMerchantDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});
export const { addNewRow } = partnerTableSlice.actions;

export const partnerTableData = (state: any) => state?.partnersTable;

export default partnerTableSlice.reducer;
