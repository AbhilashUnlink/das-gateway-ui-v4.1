import { HTTP_STATUS } from "../../../../components/constants";
import {
  TRANSACTION,
  TRANSACTION_LEGACY,
} from "../../../../components/constants/api-paths";
import DasSnackbar from "../../../../components/das-snackbar/DasSnackbar";
// import { clearDrawer } from '../../../../redux/features/drawer';

import { useFetchWrapper as Api } from "../../../../utils";
import { DRAWER_TYPE } from "../../../../components/constants/drawer";
import {
  TRANSACTION_EVENT_LABEL,
  TRANSACTION_STATUS,
  TRANSACTION_TYPE_CONSTANTS,
} from "../constants/transaction";
import { getformatDate } from "../../../../utils/helper";
import i18n from "../../../../i18n";
import useLegacy from "../../../../hooks/use-legacy/useLegacy";
import {
  getTransactionTable,
  postTransactionTable,
} from "../../../../store/features/transaction-table";
import {
  getDetails,
  startTransactionActionLoader,
  stopTransactionActionLoader,
} from "../../../../store/features/details";

export const useHandleDownloadButtonClick = async (
  filteredValue: any,
  filteredDataValues: any,
  selectedDateRange: any,
  dispatch: any
) => {
  let selectedStartDate = "";
  let selectedEndDate = "";
  filteredValue = JSON.stringify(filteredDataValues);
  let updatedTimeZone = filteredValue.replace(/['"]+/g, "");
  if (selectedDateRange.length > 0) {
    selectedStartDate = getformatDate(selectedDateRange[0], "yyyy/MM/dd");
    if (selectedDateRange.length > 1 && selectedDateRange[1]) {
      selectedEndDate = getformatDate(selectedDateRange[1], "yyyy/MM/dd");
    } else selectedEndDate = getformatDate(selectedDateRange[0], "yyyy/MM/dd");
    if (updatedTimeZone === "{}") {
      await useTransactionsDownload(
        `StartDate=${selectedStartDate}&EndDate=${selectedEndDate}`,
        dispatch
      );
    } else {
      if (selectedStartDate !== "" || selectedEndDate !== "") {
        let removeDefaultSelectedDate = updatedTimeZone.split("&");
        let newSelectedDate = removeDefaultSelectedDate.filter(
          (item: any) =>
            item !== "" &&
            item.split("=")[0] != "StartDate" &&
            item.split("=")[0] != "EndDate"
        );
        let showSelectedValues = newSelectedDate.join("&");
        await useTransactionsDownload(
          `${showSelectedValues}&StartDate=${selectedStartDate}&EndDate=${selectedEndDate}`,
          dispatch
        );
      } else {
        await useTransactionsDownload(`${updatedTimeZone}`, dispatch);
      }
    }

    return;
  }
};

// Captured Amount Calculations
export const useCalculateCaptureAmount = (
  drawer: any,
  transactionDetail: any
) => {
  if (!!transactionDetail?.TransactionHistory) {
    if (drawer.type === DRAWER_TYPE.CAPTURE) {
      let totalCapturedAmountTemp = 0;
      let amountTemp = 0;
      const transactionHistory = transactionDetail.TransactionHistory;
      const AutorizedTransaction = transactionHistory.filter(
        (t: any) => t.event == TRANSACTION_EVENT_LABEL.AUTHORISED
      );
      if (AutorizedTransaction.length > 0) {
        amountTemp = AutorizedTransaction[0].amount;
        if (
          transactionHistory.some(
            (t: any) =>
              t.event == TRANSACTION_EVENT_LABEL.CAPTURED ||
              (t.event == TRANSACTION_EVENT_LABEL.INITIATED &&
                (t.TransactionType == TRANSACTION_TYPE_CONSTANTS.CAPTURE ||
                  t.TransactionType == TRANSACTION_TYPE_CONSTANTS.PURCHASE))
          )
        ) {
          const capturededTransactions = transactionHistory.filter(
            (t: any) =>
              t.event == TRANSACTION_EVENT_LABEL.CAPTURED ||
              (t.event == TRANSACTION_EVENT_LABEL.INITIATED &&
                (t.TransactionType == TRANSACTION_TYPE_CONSTANTS.CAPTURE ||
                  t.TransactionType == TRANSACTION_TYPE_CONSTANTS.PURCHASE))
          );
          totalCapturedAmountTemp = capturededTransactions.reduce(
            (accumulator: any, { amount }: any) => accumulator + Number(amount),
            0
          );
        }
      }
      let TempAmount = amountTemp;

      let InitialCaptureAmount =
        totalCapturedAmountTemp >= amountTemp
          ? 0
          : amountTemp - totalCapturedAmountTemp;

      return { TempAmount, InitialCaptureAmount };
    }
  }
};

// Refund Amount Calculations

export const useCalculateRefundAmount = (
  transactionDetail: any,
  drawer: any
) => {
  if (!!transactionDetail?.TransactionHistory) {
    if (drawer.type === DRAWER_TYPE.REFUND) {
      let totalRefundedAmountTemp = 0;
      let totalCapturedAmountTemp = 0;
      let amountTemp = 0;
      const transactionHistory = transactionDetail.TransactionHistory;
      const PurchasedTransaction = transactionHistory.filter(
        (t: any) => t.event == TRANSACTION_EVENT_LABEL.PURCHASED
      );
      //if The transaction is Purchased , the actual amount would be Purchased Transaction Amount
      if (PurchasedTransaction.length > 0) {
        amountTemp = PurchasedTransaction[0].amount;
      }
      //Else The amount would be total captured amount
      else {
        const capturedTransactions = transactionHistory.filter(
          (t: any) =>
            t.event == TRANSACTION_EVENT_LABEL.CAPTURED &&
            t.status === TRANSACTION_STATUS.SUCCESSFUL
        );
        totalCapturedAmountTemp =
          capturedTransactions.length > 0
            ? capturedTransactions.reduce(
                (accum: any, item: any) => accum + Number(item.amount),
                0
              )
            : 0;
        amountTemp = totalCapturedAmountTemp;
      }

      if (
        transactionHistory.some(
          (t: any) =>
            t.event == TRANSACTION_EVENT_LABEL.REFUNDED ||
            t.event == TRANSACTION_EVENT_LABEL.SENT_FOR_REFUND ||
            (t.event == TRANSACTION_EVENT_LABEL.INITIATED &&
              t.TransactionType == TRANSACTION_TYPE_CONSTANTS.REFUND)
        )
      ) {
        const refundedTransactions = transactionHistory.filter(
          (t: any) =>
            t.event == TRANSACTION_EVENT_LABEL.REFUNDED ||
            t.event == TRANSACTION_EVENT_LABEL.SENT_FOR_REFUND ||
            (t.event == TRANSACTION_EVENT_LABEL.INITIATED &&
              t.TransactionType == TRANSACTION_TYPE_CONSTANTS.REFUND)
        );

        totalRefundedAmountTemp = refundedTransactions.reduce(
          (accumulator: any, { amount }: any) => accumulator + Number(amount),
          0
        );
      }
      let TempAmount = amountTemp;
      let InitialRefundAmount =
        totalRefundedAmountTemp >= amountTemp
          ? 0
          : amountTemp - totalRefundedAmountTemp;
      return { TempAmount, InitialRefundAmount };
    }
  }
};
// Capture Api

export const useCaptureTransaction = async (
  TransactionRef: string,
  values: any,
  transactionDetail: any,
  dispatch: any,
  handleDrawerClose: any,
  detailsDrawerAlsoPresent: any,
  tableApiEndPoint: any,
  payload: any
) => {
  let captureData = {
    id: TransactionRef,
    captureAmount: parseFloat(values.CaptureAmount),
    notes: values.notes,
    merchant_id: transactionDetail.DASMID,
    secretKey: transactionDetail.SecretKey,
  };

  if (captureData && captureData.id == "") return undefined;
  const body = {
    id: captureData.id,
    captureAmount: captureData.captureAmount,
    notes: captureData.notes,
    merchant_id: captureData.merchant_id,
  };

  try {
    dispatch(startTransactionActionLoader());
    const result = await Api().post(TRANSACTION.CAPTURE_API, body, {
      "X-Authorization": `${captureData.secretKey}`,
    });
    dispatch(stopTransactionActionLoader());

    if ([HTTP_STATUS.CREATED, HTTP_STATUS.OK].includes(result.statusCode)) {
      DasSnackbar.success(i18n.t("API_STATUS_MESSAGE.INFO0001"));
      if (tableApiEndPoint === TRANSACTION.TABLE_API_V2) {
        dispatch(postTransactionTable({ apiPath: tableApiEndPoint, payload }));
      } else {
        dispatch(getTransactionTable(tableApiEndPoint));
      }
      handleDrawerClose();
      if (detailsDrawerAlsoPresent) {
        dispatch(getDetails({ uuid: TransactionRef, openDrawer: true }));
      } else {
        handleDrawerClose();
      }
    }
  } catch (e) {
    dispatch(stopTransactionActionLoader());
    console.log("error", e);
  }
};

// Refund Api
export const useRefundTransaction = async (
  TransactionRef: string,
  values: any,
  transactionDetail: any,
  dispatch: any,
  handleDrawerClose: any,
  detailsDrawerAlsoPresent: any,
  tableApiEndPoint: any,
  payload: any
) => {
  const legacy = useLegacy();
  let refundData = {
    id: legacy ? transactionDetail.V2TransId : TransactionRef,
    refundAmount: parseFloat(values.RefundAmount),
    notes: values.notes,
    merchant_id: transactionDetail.DASMID,
    secretKey: transactionDetail.SecretKey,
  };

  if (refundData && refundData.id == "") return undefined;
  const obj = {
    id: refundData.id,
    refundAmount: refundData.refundAmount,
    notes: refundData.notes,
    merchant_id: refundData.merchant_id,
  };
  const apiPath = legacy
    ? TRANSACTION_LEGACY.REFUND_API
    : TRANSACTION.REFUND_API;

  try {
    dispatch(startTransactionActionLoader());
    const res = await Api().post(apiPath, obj, {
      "X-Authorization": `${refundData.secretKey}`,
    });
    dispatch(stopTransactionActionLoader());
    if ([HTTP_STATUS.CREATED, HTTP_STATUS.OK].includes(res.statusCode)) {
      DasSnackbar.success(i18n.t("API_STATUS_MESSAGE.INFO0002"));
      if (tableApiEndPoint === TRANSACTION.TABLE_API_V2) {
        dispatch(postTransactionTable({ apiPath: tableApiEndPoint, payload }));
      } else {
        dispatch(getTransactionTable(tableApiEndPoint));
      }

      if (detailsDrawerAlsoPresent) {
        dispatch(getDetails({ uuid: TransactionRef, openDrawer: true }));
        handleDrawerClose();
      } else {
        handleDrawerClose();
      }
    } else {
      if (res.messageCode) {
        DasSnackbar.error(i18n.t(`API_STATUS_MESSAGE.${res.messageCode}`));
      }
    }
  } catch (e) {
    dispatch(stopTransactionActionLoader());
    console.log("error", e);
  }
};

export const useTransactionsDownload = async (
  filterModel: any,
  dispatch: any
) => {
  try {
    dispatch(startTransactionActionLoader());
    let downloadUrl;
    if (filterModel.includes("TimeZone")) {
      downloadUrl = `transactions/csv-file?${filterModel}`;
    } else {
      downloadUrl = `transactions/csv-file?TimeZone=${localStorage.getItem(
        "timeZone"
      )}&${filterModel}`;
    }
    const transactionFileurl = await Api().download(downloadUrl);
    const url = window.URL.createObjectURL(transactionFileurl);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute(
      "download",
      `Transaction Details-${new Date().toJSON().slice(0, 10)}`
    );
    document.body.appendChild(link);
    link.click();

    dispatch(stopTransactionActionLoader());

    return undefined;
  } catch (e) {
    dispatch(stopTransactionActionLoader());
    console.error(e);
  }
};
