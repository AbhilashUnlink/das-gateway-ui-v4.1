import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { useFetchWrapper as Api } from '../../utils';
import {
  TRANSACTION_EVENT_LABEL,
  TRANSACTION_STATUS,
  TRANSACTION_TYPE_CONSTANTS,
} from '../../pages/transaction/components/constants/transaction';
import { HTTP_STATUS } from '../../components/constants';
import { CHARGEBACK, CHARGEBACK_LEGACY, TRANSACTION, TRANSACTION_LEGACY } from '../../components/constants/api-paths';
import useLegacy from '../../hooks/use-legacy/useLegacy';
import { setDrawer } from './drawer';
import { DRAWER_TITLE, DRAWER_TYPE } from '../../components/constants/drawer';
import { LEGACY_TRANSACTION_DETAILS_LINK, TRANSACTION_DETAILS_LINK } from '../../pages/transaction/components/constants/url';



// createAsyncThunk
export const handleDetailsDrawer = (uuid: any, dispatch: any, openDrawer = false) => {
  if (openDrawer) {
    dispatch(
      setDrawer([
        {
          id: uuid,
          title: DRAWER_TITLE.DETAILS,
          type: DRAWER_TYPE.DETAILS,
          isDrawerOpen: true,
        },
      ]),
    );
  }
};
export const getDetails: any = createAsyncThunk(
  "transaction/getDetails",
  async (
    { uuid, openDrawer = false, navigate = undefined, chargeBackID }: any,
    { dispatch }
  ) => {
    const legacy = useLegacy();
    const apiPath = legacy
      ? TRANSACTION_LEGACY.TRANSACTION_INFO_QUERY
      : TRANSACTION.TRANSACTION_INFO_QUERY;
    let response = await Api().get(`${apiPath}/${uuid}`);
    let chargebackData: any = [];
    if ([HTTP_STATUS.OK].includes(response.statusCode)) {
      const chargebackApiPath = legacy
        ? CHARGEBACK_LEGACY.CHARGEBACK_TRANSACTION_ID
        : CHARGEBACK.CHARGEBACK_TRANSACTION_ID;
      let res = await Api().get(`${chargebackApiPath}/${uuid}`);
      if ([HTTP_STATUS.OK]?.includes(res.statusCode)) {
        handleDetailsDrawer(uuid, dispatch, openDrawer);
      }
      chargebackData = res.data;
      dispatch(setChargeBackData(chargebackData));
      if (navigate) {
        if (legacy) {
          navigate(`${LEGACY_TRANSACTION_DETAILS_LINK}${uuid}`);
        } else {
          navigate(
            `${TRANSACTION_DETAILS_LINK}${uuid}${
              chargeBackID ? "&ChargeBackID=" + chargeBackID : ""
            }`
          );
        }
      }
    }
    let transactionEvent = "";
    transactionEvent = response?.data?.Event;

    let TransactionHistory = response?.data?.TransactionHistory;
    let isCaptureButtonEnabled = false;
    let isRefundButtonEnabled = false;
    let isVoidAuthorizationButtonEnabled = false;
    // =============
    //If any of the transaction is Voided disable VOIDAUTH buttons
    let lastTransaction = null;
    if (TransactionHistory) {
      const successTransactions = TransactionHistory.filter(
        (t: any) => t?.status === TRANSACTION_STATUS.SUCCESSFUL
      );
      if (successTransactions.length > 0) {
        lastTransaction = successTransactions.shift();
        transactionEvent = lastTransaction.event;
      }
    }
    if (
      TransactionHistory?.some(
        (t: any) =>
          t?.event == TRANSACTION_EVENT_LABEL.VOIDED ||
          t?.event == TRANSACTION_EVENT_LABEL.CANCELLED
      )
    ) {
      //isVoidAuthorizationButtonEnabled = false;
      //isCaptureButtonEnabled = true;
    }
    // ===============

    if (
      TransactionHistory?.some(
        (t: any) =>
          t.event == TRANSACTION_EVENT_LABEL.CAPTURED ||
          (t.event == TRANSACTION_EVENT_LABEL.INITIATED &&
            (t.TransactionType === TRANSACTION_TYPE_CONSTANTS.CAPTURE ||
              t.TransactionType === TRANSACTION_TYPE_CONSTANTS.PURCHASE))
      )
    ) {
      //Get All Captured Transactions
      const capturedTransactions = TransactionHistory.filter(
        (t: any) =>
          t.event == TRANSACTION_EVENT_LABEL.CAPTURED &&
          t.status == TRANSACTION_STATUS.SUCCESSFUL
      );

      const pendingCapturedTransactions: any = TransactionHistory.filter(
        (t: any) =>
          t.event == TRANSACTION_EVENT_LABEL.INITIATED &&
          (t.TransactionType === TRANSACTION_TYPE_CONSTANTS.CAPTURE ||
            t.TransactionType === TRANSACTION_TYPE_CONSTANTS.PURCHASE)
      );
      //Get All AUTHORISED Transactions
      const AutorizedTransaction: any = TransactionHistory.filter(
        (t: any) =>
          t.event == TRANSACTION_EVENT_LABEL.AUTHORISED &&
          t.TransactionType === TRANSACTION_TYPE_CONSTANTS.AUTHORISATION
      );
      //Get All PURCHASED Transactions
      const PurchasedTransaction: any = TransactionHistory.filter(
        (t: any) => t.event == TRANSACTION_EVENT_LABEL.PURCHASED
      );
      //Get All REFUNDED Transactions
      const refundedTransactions: any = TransactionHistory.filter(
        (t: any) =>
          t.event == TRANSACTION_EVENT_LABEL.REFUNDED ||
          ((t.event == TRANSACTION_EVENT_LABEL.INITIATED ||
            t.event == TRANSACTION_EVENT_LABEL.SENT_FOR_REFUND) &&
            t.TransactionType === TRANSACTION_TYPE_CONSTANTS.REFUND)
      );
      //Authorized Amount
      const authorisedAmount: any =
        AutorizedTransaction.length > 0
          ? AutorizedTransaction[0].amount
          : false;
      //Purchased Amount
      const puchasedAmount: any =
        PurchasedTransaction.length > 0
          ? PurchasedTransaction[0].amount
          : false;
      const totalCapturedAmount =
        capturedTransactions.length > 0
          ? capturedTransactions.reduce(
              (accum: any, item: any) => accum + Number(item.amount),
              0
            )
          : 0;

      const totalPendingCaptureAmount =
        pendingCapturedTransactions.length > 0
          ? pendingCapturedTransactions.reduce(
              (accum: any, item: any) => accum + Number(item.amount),
              0
            )
          : 0;

      const totalRefundedAmount =
        refundedTransactions.length > 0
          ? refundedTransactions.reduce(
              (accumulator: any, { amount }: any) =>
                accumulator + Number(amount),
              0
            )
          : 0;
      if (
        authorisedAmount &&
        authorisedAmount > totalCapturedAmount + totalPendingCaptureAmount
      ) {
        isCaptureButtonEnabled = true;
        // ================
        if (lastTransaction.event === TRANSACTION_EVENT_LABEL.CAPTURED) {
          transactionEvent = TRANSACTION_EVENT_LABEL.PARTIALLY_CAPTURED;
        }
        // ==================
      }

      const chargeBacksOtherThanRetrivalRequest =
        (chargebackData &&
          chargebackData?.length > 0 &&
          chargebackData?.filter(
            (item: any) => Object.keys(item)[0] !== "RetrievalRequest"
          )) ||
        [];
      // lets say now we got first and second chargeback with arrays of 0 and 2 objects respectively
      const checkIfThereIsDataInChargeBack =
        (chargeBacksOtherThanRetrivalRequest &&
          chargeBacksOtherThanRetrivalRequest?.length > 0 &&
          chargeBacksOtherThanRetrivalRequest?.map(
            (item: any) => Object.values(item)?.length
          )) ||
        [];
      // it will give [0,2]
      const firstOrSecondChangebacksHaveArrayLengthMoreThanZero =
        checkIfThereIsDataInChargeBack?.filter((item: any) => item !== 0) || [];
      // it will give [2]
      // it means secondChargeBack with array of 2 object is there so button will hide in this case
      if (
        (totalCapturedAmount > totalRefundedAmount ||
          (puchasedAmount && puchasedAmount > totalRefundedAmount)) &&
        firstOrSecondChangebacksHaveArrayLengthMoreThanZero?.length === 0
      ) {
        isRefundButtonEnabled = true;
        // =========================
        if (lastTransaction.event === TRANSACTION_EVENT_LABEL.REFUNDED) {
          transactionEvent = TRANSACTION_EVENT_LABEL.PARTIALLY_REFUNDED;
        }
        // =========================
      }
    } else if (
      TransactionHistory?.some(
        (t: any) =>
          t.event == TRANSACTION_EVENT_LABEL.AUTHORISED &&
          t.TransactionType.toLowerCase() ==
            TRANSACTION_TYPE_CONSTANTS.AUTHORISATION.toLowerCase()
      ) &&
      !TransactionHistory?.some(
        (t: any) =>
          (t.event == TRANSACTION_EVENT_LABEL.CAPTURED &&
            t.status === TRANSACTION_STATUS.SUCCESSFUL) ||
          (t.event == TRANSACTION_EVENT_LABEL.INITIATED &&
            t.status === TRANSACTION_STATUS.PENDING &&
            t.TransactionType === TRANSACTION_TYPE_CONSTANTS.CAPTURE) ||
          (t.event === TRANSACTION_EVENT_LABEL.INITIATED &&
            t.TransactionType ===
              TRANSACTION_TYPE_CONSTANTS.VOIDAUTHORISATION) ||
          ((t.event === TRANSACTION_EVENT_LABEL.CANCELLED ||
            t.event === TRANSACTION_EVENT_LABEL.VOIDED) &&
            t.status === TRANSACTION_STATUS.SUCCESSFUL)
      )
    ) {
      isVoidAuthorizationButtonEnabled = true;
      isCaptureButtonEnabled = true;
    }
    return {
      response,
      transactionEvent,
      isRefundButtonEnabled,
      isVoidAuthorizationButtonEnabled,
      isCaptureButtonEnabled,
    };
  }
);
const handleRefundDrawer = (dispatch: any) => {
  dispatch(
    setDrawer([
      {
        title: DRAWER_TITLE.REFUND,
        type: DRAWER_TYPE.REFUND,
        isDrawerOpen: true,
      },
    ]),
  );
};
const handleCaptureDrawer = (dispatch: any) => {
  dispatch(
    setDrawer([
      {
        title: DRAWER_TITLE.CAPTURE,
        //titleColor: '#019a4c',
        type: DRAWER_TYPE.CAPTURE,
        isDrawerOpen: true,
      },
    ]),
  );
};

export const getRefundCapture: any = createAsyncThunk(
  'transaction/getRefundCapture',
  async ({ uuid, type }: any, { dispatch }) => {
    const legacy = useLegacy();
    const apiPath = legacy ? TRANSACTION_LEGACY.TRANSACTION_INFO_QUERY : TRANSACTION.TRANSACTION_INFO_QUERY;
    let response = await Api().get(`${apiPath}/${uuid}`);
    if ([HTTP_STATUS.OK].includes(response.statusCode)) {
      if (type === DRAWER_TYPE.REFUND) {
        handleRefundDrawer(dispatch);
      }
      if (type === DRAWER_TYPE.CAPTURE) {
        handleCaptureDrawer(dispatch);
      }
      return {
        response
      };
    }
  }

);

// createSlice
export const detailSlice = createSlice({
  name: "details",
  initialState: {
    details: {},
    transactionEvent: "",
    isRefundButtonEnabled: false,
    isVoidAuthorizationButtonEnabled: false,
    isCaptureButtonEnabled: false,
    loading: false,
    error: null,
    chargeBackData: [],
    transactionActionLoader: false,
  },
  reducers: {
    startTransactionActionLoader: (state) => {
      state.transactionActionLoader = true;
    },
    stopTransactionActionLoader: (state) => {
      state.transactionActionLoader = false;
    },
    addDetails: (state, action) => {
      state.details = action?.payload;
    },
    setChargeBackData: (state, action) => {
      state.chargeBackData = action?.payload;
    },
    clearDetails: (state) => {
      state.details = {};
      state.transactionEvent = "";
      state.isRefundButtonEnabled = false;
      state.isVoidAuthorizationButtonEnabled = false;
      state.isCaptureButtonEnabled = false;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // getDetails
      .addCase(getDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.details = action?.payload?.response?.data;
        state.transactionEvent = action?.payload?.transactionEvent;
        state.isRefundButtonEnabled = action?.payload?.isRefundButtonEnabled;
        state.isVoidAuthorizationButtonEnabled =
          action?.payload?.isVoidAuthorizationButtonEnabled;
        state.isCaptureButtonEnabled = action?.payload?.isCaptureButtonEnabled;
      })
      .addCase(getDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload;
      })

      // getRefundCapture
      .addCase(getRefundCapture.pending, (state) => {
        state.loading = true;
      })
      .addCase(getRefundCapture.fulfilled, (state, action) => {
        state.loading = false;
        state.details = action?.payload?.response?.data;
        state.transactionEvent = action?.payload?.transactionEvent;
        state.isRefundButtonEnabled = action?.payload?.isRefundButtonEnabled;
        state.isVoidAuthorizationButtonEnabled =
          action?.payload?.isVoidAuthorizationButtonEnabled;
        state.isCaptureButtonEnabled = action?.payload?.isCaptureButtonEnabled;
      })
      .addCase(getRefundCapture.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload;
      });
  },
});

export const TransactionRefID = (state: any) =>
  state?.details?.details?.TransactionRefID;
export const transactionDetails = (state: any) => state?.details?.details;
export const loadingTransactionDetails = (state: any) => state?.details?.loading;
export const { addDetails, clearDetails, setChargeBackData, startTransactionActionLoader, stopTransactionActionLoader } = detailSlice.actions;
export default detailSlice.reducer;
