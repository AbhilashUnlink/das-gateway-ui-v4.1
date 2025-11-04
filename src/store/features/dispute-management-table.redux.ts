import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { useFetchWrapper as Api } from '../../utils';
import { HTTP_STATUS } from '../../components/constants';
import { CHARGEBACK, CHARGEBACK_LEGACY } from '../../components/constants/api-paths';
import { getBase64, sanitizeFileName } from '../../utils/helper';
import useLegacy from '../../hooks/use-legacy/useLegacy';
import { t } from 'i18next';
import { getDisputeDetails } from './chargeback-details';
import DasSnackbar from 'components/das-snackbar/DasSnackbar';
// import { DRAWER_TYPE } from "../../components/constants/drawer";

const name = "Name";
const userID = "UserID";
// createAsyncThunk
export const getDisputeMangementTable: any = createAsyncThunk(
  'main/getDisputeMangementTable',
  async apiPath => {
    let data = await Api().get(apiPath);
    return data;
  },
);
export const getCreateDisputeTable: any = createAsyncThunk(
  'create/getCreateDisputeTable',
  async (value: any, { dispatch }) => {
    let { data } = await Api().get(value.apiPath);
    if (value.legacy) {
      data?.records?.length > 0 && dispatch(setCreateTableCount(data?.total_count));
      return data?.records;
    } else {
      data?.length > 0 ? dispatch(setCreateTableCount(data[0]?.TotalCount)) : dispatch(setCreateTableCount(0));
      return data;
    }
  },
);

// add chargeback
export const addChargeback: any = createAsyncThunk(
  'chargeback/addChargeback',
  async (values: any, thunkAPI: any) => {
    const { getState, dispatch } = thunkAPI;
    const store = getState();
    const { drawer, disputeManagementTable } = store;
    let drawerData = drawer?.drawer[1]?.data;
    const { handleDrawerClose, newDueDate } = values;
    let tableData = disputeManagementTable.rows;
    let payload = {
      ...values,
      DASMID: drawerData?.DASMID,
      LegalName: drawerData?.LegalName,
      TransactionID: drawerData?.uuid,
      Currency: drawerData?.CurrencyCode,
      DueDate: newDueDate,
    };
    delete payload['handleDrawerClose'];
    delete payload['newDueDate'];
    const legacy = useLegacy();
    const addChargebackPath = legacy ? CHARGEBACK_LEGACY.ADD_CHARGEBACK : CHARGEBACK.ADD_CHARGEBACK;
    let data = await Api().post(addChargebackPath, payload);
    if ([HTTP_STATUS.CREATED, HTTP_STATUS.OK].includes(data?.statusCode)) {
      // DasSnackbar.success(data.message); 
      DasSnackbar.success(t(`API_STATUS_MESSAGE.${data?.messageCode}`));
      handleDrawerClose();
      dispatch(setRefreshList(true));
    }
    return tableData;
  },
);
export const transactionInfoQuery: any = createAsyncThunk(
  'chargeback/transactionInfoQuery',
  async id => {
    let data = await Api().get(`transactions/${id}`);
    return data;
  },
);

//Send to acquirer
export const sendToAcquirerDetails: any = createAsyncThunk(
  'chargeback/sendToAcquirerDetails',
  async ({
    values,
    handleDrawerClose,
    TransactionID,
    ChargeBackID
  }: any, { dispatch }) => {
    let payload = {
      ChargeBackID: values.ChargeBackID,
      Message: values.data.message,
      CaseInfoStatus: 'SentToAcquirer',
      DisputeAmount: values.Amount,
      LegalName: values.LegalName,
    };
    let data = await Api().post(CHARGEBACK.UPLOAD_DOCUMENTS, payload);
    if ([HTTP_STATUS.CREATED, HTTP_STATUS.OK].includes(data?.statusCode)) {
      DasSnackbar.success(t(`API_STATUS_MESSAGE.${data?.messageCode}`));
      handleDrawerClose();
      dispatch(getDisputeDetails({
        TransactionID,
        ChargeBackID,
        openDrawer: false
      }));
    }
  },
);

//Missing info
export const missingInfoDetails: any = createAsyncThunk(
  'chargeback/missingInfoDetails',
  async (values: any, { dispatch }) => {

    const { ChargeBackID, TransactionID, Amount, LegalName } = values?.payload;
    let payload = {
      ChargeBackID: ChargeBackID,
      Message: values?.payload?.data?.message,
      UserName: name,
      UserID: userID,
      CaseInfoStatus: values?.type,
      DisputeAmount: Amount,
      LegalName: LegalName,
      FilePath: '',
      KeyName: '',
    };
    let data;
    const legacy = useLegacy();
    if (values?.payload?.data?.FilePath) {
      // if (values?.payload?.data?.hasOwn('FilePath')) {
      let Image = await getBase64(
        values?.payload?.data?.FilePath?.inputFiles[0],
      ).then((res: any) => {
        return res;
      });
      let uploadedFile = {
        image: Image,
        name: values?.payload?.data?.FilePath?.inputFiles[0].name,
        type: values?.payload?.data?.FilePath?.inputFiles[0].type,
      };
      let urlencoded = new URLSearchParams();
      urlencoded.append('base64image', uploadedFile.image);
      urlencoded.append('name', sanitizeFileName(uploadedFile.name));
      urlencoded.append('type', uploadedFile.type);
      const missingInfoUploadPath = legacy ? CHARGEBACK_LEGACY.MISSING_INFO_UPLOAD : CHARGEBACK.MISSING_INFO_UPLOAD;
      data = await Api().post(missingInfoUploadPath, urlencoded, {
        'Content-Type': 'application/x-www-form-urlencoded',
      });
      if ([HTTP_STATUS.CREATED, HTTP_STATUS.OK].includes(data?.statusCode)) {
        payload.FilePath = data?.data?.Location;
        payload.KeyName = data?.data?.Key;
      }
    }
    const missingInfoMessagePath = legacy ? CHARGEBACK_LEGACY.MISSING_INFO_MSG : CHARGEBACK.MISSING_INFO_MSG;
    data = await Api().post(missingInfoMessagePath, payload);
    if ([HTTP_STATUS.CREATED, HTTP_STATUS.OK].includes(data?.statusCode)) {
      DasSnackbar.success(t(`API_STATUS_MESSAGE.${data?.messageCode}`));
      values.handleDrawerClose();
      dispatch(getDisputeDetails({
        TransactionID,
        ChargeBackID,
        openDrawer: false
      }));
    }
  },
);

//case close
export const caseCloseDetails: any = createAsyncThunk(
  'chargeback/caseCloseDetails',
  async ({
    values,
    handleDrawerClose,
    TransactionID,
    ChargeBackID
  }: any, thunkAPI) => {
    const { dispatch } = thunkAPI;

    let payload = {
      ChargeBackID: values.ChargeBackID,
      Message: values.data.message,
      CaseInfoStatus:
        values.data.Reason === undefined ? 'CaseClosed' : values.data.Reason,
    };
    let data = await Api().post(CHARGEBACK.UPLOAD_DOCUMENTS, payload);
    if ([HTTP_STATUS.CREATED, HTTP_STATUS.OK].includes(data?.statusCode)) {

      DasSnackbar.success(t(`API_STATUS_MESSAGE.${data?.messageCode}`));

      handleDrawerClose();

      dispatch(getDisputeDetails({
        TransactionID,
        ChargeBackID,
        openDrawer: false
      }));

      const { tableData } = values;
      let index = tableData.findIndex(
        (item: any) => item.ChargeBackID === values.ChargeBackID,
      );
      let finalData = tableData;
      if (index !== -1) {
        let itemWithChargebackID = tableData[index];
        itemWithChargebackID = { ...itemWithChargebackID, IsClosed: true };

        finalData = [
          ...tableData.slice(0, index),
          itemWithChargebackID,
          ...tableData.slice(index + 1),
        ];
      }


      return finalData;
    } else return;
  },
);

//Accept Dispute
export const acceptDisputeDetails: any = createAsyncThunk(
  'chargeback/acceptDisputeDetails',
  async (values: any, { dispatch }) => {
    const { ChargeBackID, TransactionID, Amount, LegalName } = values;
    let payload = {
      ChargeBackID,
      Message: '',
      CaseInfoStatus: 'AcceptDispute',
      DisputeAmount: Amount,
      LegalName: LegalName,
      UserName: name,
      UserID: userID,
    };
    let data = await Api().post(CHARGEBACK.MISSING_INFO_MSG, payload);
    if ([HTTP_STATUS.CREATED, HTTP_STATUS.OK].includes(data?.statusCode)) {
      DasSnackbar.success(t(`API_STATUS_MESSAGE.${data?.messageCode}`));
      dispatch(getDisputeDetails({
        TransactionID,
        ChargeBackID,
        openDrawer: false
      }));
    }
  },
);
// createSlice
export const disputeManagementTableSlice = createSlice({
  name: 'disputeManagementTable',
  initialState: {
    rows: [],
    createDisputeTable: [],
    createTableCount: 0,
    count: 0,
    loading: false,
    tableLoading: false,
    loaderLoading: false,
    error: null,
    transactionInfo: {},
    refreshList: false,
  },
  reducers: {
    setCreateTableCount: (state: any, { payload }) => {
      state.createTableCount = payload;
    },
    resetCreateDisputeDrawer: (state: any) => {
      state.createDisputeTable = [];
      state.createTableCount = 0;
    },
    addNewRow: (state: any, { payload }) => {
      state.rows = [payload, ...state.rows];
    },
    setRefreshList: (state: any, { payload }) => {
      state.refreshList = payload;
    },
    resetDisputeDrawerTableList: (state: any) => {
      state.createDisputeTable = [];
    },
  },
  extraReducers: builder => {
    builder.addCase(getDisputeMangementTable.pending, state => {
      state.loading = true;
    });
    builder.addCase(getDisputeMangementTable.fulfilled, (state, action) => {
      state.loading = false;
      state.rows = action?.payload?.data?.records;
      state.count = action?.payload?.data?.total_count;
    });
    builder.addCase(getDisputeMangementTable.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    // Create Table
    builder.addCase(getCreateDisputeTable.pending, state => {
      state.tableLoading = true;
    });
    builder.addCase(getCreateDisputeTable.fulfilled, (state, action) => {
      state.tableLoading = false;
      state.createDisputeTable = action?.payload;

    });
    builder.addCase(getCreateDisputeTable.rejected, (state, action) => {
      state.tableLoading = false;
      state.error = action.payload;
    });

    //add chargeback
    builder.addCase(addChargeback.pending, state => {
      state.loaderLoading = true;
    });
    builder.addCase(addChargeback.fulfilled, (state: any, { payload }) => {
      state.loaderLoading = false;
      state.rows = payload;
      state.count = payload ? state.count : state.count + 1;
    });
    builder.addCase(addChargeback.rejected, (state, action) => {
      state.loaderLoading = false;
      state.error = action.payload;
    });

    //transaction details
    builder.addCase(sendToAcquirerDetails.pending, state => {
      state.loaderLoading = true;
    });
    builder.addCase(sendToAcquirerDetails.fulfilled, (state, payload) => {
      state.loaderLoading = false;
      state.rows = state?.rows?.filter(
        (item: any) => item.ID !== payload,
      );
    });
    builder.addCase(sendToAcquirerDetails.rejected, (state, action) => {
      state.loaderLoading = false;
      state.error = action.payload;
    });
    // Missing Info
    builder.addCase(missingInfoDetails.pending, state => {
      state.loaderLoading = true;
    });
    builder.addCase(missingInfoDetails.fulfilled, (state, payload) => {
      state.loaderLoading = false;
      state.rows = state?.rows?.filter(
        (item: any) => item.ID !== payload,
      );
    });
    builder.addCase(missingInfoDetails.rejected, (state, action) => {
      state.loaderLoading = false;
      state.error = action.payload;
    });

    //case closed
    builder.addCase(caseCloseDetails.pending, state => {
      state.loaderLoading = true;
    });
    builder.addCase(caseCloseDetails.fulfilled, (state, { payload }) => {
      state.loaderLoading = false;
      state.rows = payload;
    });
    builder.addCase(caseCloseDetails.rejected, (state, action) => {
      state.loaderLoading = false;
      state.error = action.payload;
    });
    // accept dispute details
    builder.addCase(acceptDisputeDetails.pending, state => {
      state.loaderLoading = true;
    });
    builder.addCase(acceptDisputeDetails.fulfilled, (state) => {
      state.loaderLoading = false;
    });
    builder.addCase(acceptDisputeDetails.rejected, (state) => {
      state.loaderLoading = false;
    });
  },
});
export const { setCreateTableCount, addNewRow, setRefreshList, resetDisputeDrawerTableList, resetCreateDisputeDrawer } =
  disputeManagementTableSlice.actions;

export const disputeManagementTableData = (state: any) =>
  state?.disputeManagementTable;
export default disputeManagementTableSlice.reducer;
