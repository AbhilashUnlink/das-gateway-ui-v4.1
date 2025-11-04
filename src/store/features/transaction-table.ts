import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useFetchWrapper as Api } from "../../utils";
import { getformatDate } from "../../utils/helper";
import { DATE_TIME_FORMAT, SELECTED_TIME_ZONE } from "../../components/constants/constants";
import useLegacy from "../../hooks/use-legacy/useLegacy";
import { TRANSACTION, TRANSACTION_LEGACY } from "../../components/constants/api-paths";
import { HTTP_STATUS } from "../../components/constants";
import DasSnackbar from "../../components/das-snackbar/DasSnackbar";
import i18next from "i18next";
import i18n from "../../i18n";

// createAsyncThunk
export const downloadTransactionReportApi: any = createAsyncThunk(
  "transaction/TransactionsDateDownload",
  async (values: any) => {
    const legacy = useLegacy();
    const downloadUrlApiPath = legacy ? TRANSACTION_LEGACY.DOWNLOAD_URL_API : TRANSACTION.DOWNLOAD_URL_API;
    const downloadUrl = `${downloadUrlApiPath}/${values.id}`;
    const result = await Api().get(downloadUrl);
    const downloadedFile = await fetch(result.data.url).then((response: any) => {
      if (response.ok) {
        return response.blob();
      }
    });
    if (downloadedFile) {
      const a = document.createElement("a");
      if ([HTTP_STATUS.OK].includes(result?.statusCode)) {
        DasSnackbar.success(i18next.t("API_STATUS_MESSAGE.INFO_FS_O1000"));
      }
      const downloadUrl = window.URL.createObjectURL(downloadedFile);
      a.href = downloadUrl;
      a.download = `Transaction Details ${getformatDate(
        values.CreatedAt,
        DATE_TIME_FORMAT
      )}`;
      a.click();
      return result;
    }
  }
);
export const getDownloadTransactionReportListApi: any = createAsyncThunk(
  "transaction/TransactionsDateDownload",
  async (value: any, { dispatch }) => {
    let timeZone = localStorage.getItem(SELECTED_TIME_ZONE);
    const legacy = useLegacy();
    //const state:any= getState();
    //const selectedFormatType = state?.config?.listViewConfiguration?.transactionListView?.formatType;
    
    const downloadReportApiPath = legacy ? TRANSACTION_LEGACY.REQUEST_DOWNLOAD_API : TRANSACTION.REQUEST_DOWNLOAD_API;
    let resp = await Api().get(`${downloadReportApiPath}?${value.filter}&TimeZone=${timeZone}&DownloadFormat=${value.selectedFormatType}`);
    if ([HTTP_STATUS.OK].includes(resp?.statusCode)) {
      DasSnackbar.success(i18n.t(`API_STATUS_MESSAGE.${resp?.messageCode}`));
    }
    dispatch(getDownloadTransactionReportList(value.apiPath));
    return resp.data;
  }
);
export const getDownloadTransactionReportList: any = createAsyncThunk(
  "transaction/getDownloadTransactionReportList",
  async (apiPath) => {
    let { data } = await Api().get(apiPath);

    return data;
  }
);
export const getTransactionTable: any = createAsyncThunk(
  "transaction/getTransactionTable",
  async (apiPath) => {
    let data = await Api().get(apiPath);
    return data;
  }
);

export const postTransactionTable: any = createAsyncThunk(
  "transaction/postTransactionTable",
  async (props:any) => {
    const {apiPath,payload} = props;
    try {
      const data = await Api().post(apiPath,payload);
      return data;
    } catch (error) {
      console.log("err",error);
    }
  }
);


export const fetchTransactionStats: any = createAsyncThunk(
  "transaction/fetchTransactionStats",
  async (payload:any) => {
  const {apiPath,body} = payload;
    try {
      const response = await Api().post(apiPath, body);
      return response;
    } catch (error) {
      console.error('Error fetching transaction stats:', error);
    }
  }
);

// createSlice
export const transactionTableSlice = createSlice({
  name: "transactionTable",
  initialState: {
    transactionTable: [],
    count: 0,
    loading: false,
    error: null,
    downloadTransactionReportList: [],
    reportListCount: 0,
    downloadListLoading: false,
    transactionState:{
      totalSales: 0,
      totalRefund: 0,
      approvalRatio: 0,
      currency: ""
    }
  },
  reducers: {
    addNewRow: (state: any, { payload }) => {
      state.transactionTable = [payload, ...state.transactionTable];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTransactionTable.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getTransactionTable.fulfilled, (state, action) => {
      state.loading = false;
      state.transactionTable = action?.payload?.data?.records;
      state.count = action?.payload?.data?.total_count;
    });
    builder.addCase(getTransactionTable.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(postTransactionTable.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(postTransactionTable.fulfilled, (state, action) => {
      state.loading = false;
      state.transactionTable = action?.payload?.data?.records;
      state.count = action?.payload?.data?.total_count;
    });
    builder.addCase(postTransactionTable.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(getDownloadTransactionReportList.pending, (state) => {
      state.downloadListLoading = true;
    });
    builder.addCase(getDownloadTransactionReportList.fulfilled, (state, action) => {
      state.downloadListLoading = false;
      state.downloadTransactionReportList = action?.payload?.result;
      state.reportListCount = action?.payload?.total_count;
    });
    builder.addCase(getDownloadTransactionReportList.rejected, (state, action) => {
      state.downloadListLoading = false;
      state.error = action.payload;
    });

    builder.addCase(fetchTransactionStats.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchTransactionStats.fulfilled, (state, action) => {
      state.loading = false;
      state.transactionState = {
        totalSales: action?.payload?.data?.TransactionTotalSales || 0,
        totalRefund: action?.payload?.data?.TransactionTotalRefund || 0,
        approvalRatio: action?.payload?.data?.TransactionApprovalRatio || 0,
        currency: action?.payload?.data?.Currency,
      };
    });
    builder.addCase(fetchTransactionStats.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});
export const { addNewRow } = transactionTableSlice.actions;

export const loadingTransactionRows = (state: any) => state?.transactionTable?.loading;
export const downloadListLoading = (state: any) => state?.transactionTable?.downloadListLoading;
export const rowsCount = (state: any) => state?.transactionTable?.count;
export default transactionTableSlice.reducer;
