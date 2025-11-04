import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { useFetchWrapper as Api } from '../../utils';
import { STATEMENT, STATEMENT_LEGACY } from '../../components/constants/api-paths';
import { HTTP_STATUS } from '../../components/constants';
import { STATEMENT_LABEL } from '../../pages/statements/components/merchant-statement/constants/statement-status';
import DasSnackbar from '../../components/das-snackbar/DasSnackbar';
import { STATUS } from '../../pages/merchants/constants/merchant';
import useLegacy from '../../hooks/use-legacy/useLegacy';

const modifyMerchantStatementTableRows = (data: any) => {
  const rows = data.map((val: any) => {
    return {
      ...val, DASMID: val.DAS_MID,
      StatementID: val.STATEMENT_ID,
      WiredStatus: val.Wired_Status,
      SettlementStatus: val.STATUS,
      ReconStatusBySystem: val.Recon_Status,
      AcquirerName: val.Acquirer,
      TotalFees: val.TOTAL_FEES,
      NetSales: val.NET_SALES,

    };
  });
  return rows;
};

export const getStatementTable = async (tableApiPath="") => {
  const response = await Api().get(tableApiPath);
  if ([HTTP_STATUS.OK]?.includes(response.statusCode)) {
    return modifyMerchantStatementTableRows(response.data.records);
  }
};

export const getMerchantStatementTable: any = createAsyncThunk(
  'statements/getMerchantStatementTable',
  async apiPath => {
    let data = await Api().get(apiPath);
    return data;
  },
);

export const editMerchantStatement: any = createAsyncThunk(
  'statements/editMerchantStatement',
  async ({ payload, tableApiPath, handleDrawerClose }: any) => {
    const legacy = useLegacy();

    const approveStatementApiPath = legacy ? STATEMENT_LEGACY.APPROVE_STATEMENT : STATEMENT.APPROVE_STATEMENT;

    let data = await Api().post(`${approveStatementApiPath}`, payload);
    if ([HTTP_STATUS.CREATED, HTTP_STATUS.OK].includes(data?.statusCode)) {
      if ([HTTP_STATUS.OK].includes(data?.statusCode)) {
        DasSnackbar.success(data?.message);
        handleDrawerClose();
        return getStatementTable(tableApiPath);
      }
      else {
        return data;
      }
    }
  },
);
export const approveStatement: any = createAsyncThunk(
  'chargeback/approveStatement',
  async (values: any) => {
    const legacy = useLegacy();
    const { setStatementID, statementID, tableApiPath } = values;
    try {
      const approveStatementApiPath = legacy ? STATEMENT_LEGACY.APPROVE_STATEMENT : STATEMENT.APPROVE_STATEMENT;
      const result = await Api().post(approveStatementApiPath, {
        data: { STATUS: STATUS.APPROVED },
        ID: statementID.toString(),
      });
      if ([HTTP_STATUS.OK].includes(result?.statusCode)) {
        DasSnackbar.success(result?.message);
        setStatementID();
        return getStatementTable(tableApiPath);
      }
      return result;
    } catch (e) {
      console.error(e);
    }
  },
);

// createSlice
export const merchantStatementTableSlice = createSlice({
  name: 'merchantStatementTable',
  initialState: {
    rows: [],
    count: 0,
    loading: false,
    error: null,
    loaderLoading: false
    // refreshList:false
  },
  reducers: {
    addNewRow: (state: any, { payload }) => {
      state.rows = [payload, ...state.rows];
    },
  },
  extraReducers: builder => {
    builder.addCase(getMerchantStatementTable.pending, state => {
      state.loading = true;
      // state.refreshList=false;
    });
    builder.addCase(getMerchantStatementTable.fulfilled, (state, action) => {
      let newRecords = action?.payload?.data?.records?.map((item: any) => {
        let updatedValues = item;
        STATEMENT_LABEL.forEach((data: any) => {
          delete Object.assign(updatedValues, updatedValues, {
            [data['customLabel']]: updatedValues[data['defaultLabel']],
          })[data['defaultLabel']];
        });
        return updatedValues;
      });
      state.loading = false;
      state.rows = newRecords;
      state.count = action?.payload?.data?.records[0]?.TotalCount;
      // state.refreshList=false;
    });
    builder.addCase(getMerchantStatementTable.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      // state.refreshList=false;
    });
    //Edit merchant statement
    builder.addCase(editMerchantStatement.pending, state => {
      state.loading = true;
      state.loaderLoading = true;
    });
    builder.addCase(editMerchantStatement.fulfilled, (state, { payload }) => {
      state.rows = payload;
      state.loading = false;
      state.loaderLoading = false;

    });
    builder.addCase(editMerchantStatement.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.loaderLoading = false;
    });

    builder.addCase(approveStatement.pending, state => {
      state.loading = true;
      state.loaderLoading = true;
    });
    builder.addCase(approveStatement.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.rows = payload;
      state.loaderLoading = false;
    });
    builder.addCase(approveStatement.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.loaderLoading = false;
    });
  },
});
export const { addNewRow } = merchantStatementTableSlice.actions;

export const merchantStatementTableData = (state: any) =>
  state?.merchantStatementTable;
export const rowsCount = (state: any) => state?.merchantStatementTable?.count;
// export const refreshStatementList = (state: any)=>state?.merchantStatementTable?.refreshList;
export default merchantStatementTableSlice.reducer;
