import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useFetchWrapper as Api } from "../../utils";
import {
  ADD_SUPPORT_TICKET,
  SHARE_FEEDBACK_TICKET,
} from "../../components/constants/api-paths";
import DasSnackbar from "../../components/das-snackbar/DasSnackbar";
import i18next from "i18next";

// createAsyncThunk
export const getSupportTicketProductType: any = createAsyncThunk(
  "contactUs/getProductType",
  async (apiPath) => {
    let response = await Api().get(apiPath);
    return response;
  }
);

export const uploadChargebackFileInfoQuery: any = createAsyncThunk(
  "contactUs/uploadChargebackFileInfoQuery",
  async (data: any) => {
    try {
      let urlencoded = new URLSearchParams();
      urlencoded.append("base64image", data.image);
      urlencoded.append("name", data.name);
      urlencoded.append("type", data.type);
      const result = await Api().post("chargeback/uploadFile", urlencoded, {
        "Content-Type": "application/x-www-form-urlencoded",
      });
      return result.data;
    } catch (e) {
      console.error(e);
    }
  }
);

export const addSupportTicketInfoQuery: any = createAsyncThunk(
  "contactUs/addSupportTicketInfoQuery",
  async (data: any) => {
    const result = await Api().post(
      `${ADD_SUPPORT_TICKET.ADD_SUPPORT_TICKET_INFOQUERY}`,
      data
    );
    DasSnackbar.success(i18next.t(`API_STATUS_MESSAGE.${result.messageCode}`));
    return result;
  }
);
// feedback form
export const addFeedbackInfoQuery: any = createAsyncThunk(
  "addFeedbackInfoQuery",
  async (data: any) => {
    const result = await Api().post(
      `${SHARE_FEEDBACK_TICKET.SHARE_FEEDBACK_TICKET_INFOQUERY}`,
      data
    );
    DasSnackbar.success(i18next.t(`API_STATUS_MESSAGE.${result.messageCode}`));
    return result;
  }
);
// createSlice
export const productType = createSlice({
  name: "details",
  initialState: {
    details: [],
    loading: false,
    error: null,
    uploadedFileData: {},
    supportTicketInfoQuery: {},
  },
  reducers: {
    addDetails: (state: any, { action }: any) => {
      state.details = action?.payload;
      state.uploadedFileData = action?.payload;
    },
    clearDetails: (state) => {
      state.details = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSupportTicketProductType.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSupportTicketProductType.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.details = payload;
      })
      .addCase(getSupportTicketProductType.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(uploadChargebackFileInfoQuery.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        uploadChargebackFileInfoQuery.fulfilled,
        (state, { payload }) => {
          state.loading = false;
          state.uploadedFileData = payload;
        }
      )
      .addCase(uploadChargebackFileInfoQuery.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(addSupportTicketInfoQuery.pending, (state) => {
        state.loading = true;
      })
      .addCase(addSupportTicketInfoQuery.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.supportTicketInfoQuery = payload;
      })
      .addCase(addSupportTicketInfoQuery.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const productTypeDetails = (state: any) => state?.details;
export const loadingDetails = (state: any) => state?.details?.loading;
export const { addDetails, clearDetails } = productType.actions;
export const uploadedFileData = (state: any) => state?.uploadedFileData;
export const supportTicketInfoQuery = (state: any) =>
  state?.supportTicketInfoQuery;
export default productType.reducer;
