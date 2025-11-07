/* eslint-disable @typescript-eslint/no-explicit-any */
import { formatInTimeZone } from "date-fns-tz";
import { DATE_FORMATS_OPTIONS } from "../components/constants/date-formats";
import { ROWS_OPTIONS_VALUES } from "../components/das-table/CustomFooter";
import COUNTRIES from "../config/common/countries";
import {
  CARD_TYPE,
  TRANSACTION_STATUS,
  type T_CardType,
  type T_TRANSACTION_STATUS,
} from "pages/transaction/components/constants/transaction";
import visa from "../assets/cards/visa.png";
import mastercard from "../assets/cards/mastercard.png";
import amex from "../assets/cards/amex.png";
import jcb from "../assets/cards/jcb.png";
import invalid from "../assets/cards/invalid-card.png";
import googlepay from "../assets/cards/thumb-GPay.png";
import applepay from "../assets/cards/thumb-APay.png";
import gcash from "../assets/cards/gcash.svg";
import paypay from "../assets/apms/ico_logo_paypay_sp.svg";
import payeasy from "../assets/cards/payeasy.png";
import konbini from "../assets/cards/konbini.svg";
import dinersclub from "../assets/cards/diners-club.png";
import Pending from "../assets/transaction-icons/payment-pending.png";
import Failed from "../assets/transaction-icons/payment-failed.png";
import Capture from "../assets/transaction-icons/payment-captured.png";
import CryptoJS from "crypto-js";
import { addSeconds, formatDate } from "date-fns";
import i18n from "i18n";
import Currency from "config/common/currency";
import { DATE_FORMAT } from "components/constants/constants";
import MCC from "config/common/mcc";
import Purcahse from "../assets/transaction-icons/purchase-successful.png";
import Refund from "../assets/transaction-icons/payment-refunded.png";
import Authorisation from "../assets/transaction-icons/payment-authorized.png";
import VoidAuthorised from "../assets/transaction-icons/voided-authorization.png";
import {
  subsidaryLevel,
  type T_subsidaryType,
} from "config/common/subsidaryLevel";
// import { store } from "../store/store";

const SECRET_KEY = import.meta.env.VITE_X_API_KEY;

const base64ToObject = (base64String: string) => {
  if (base64String) {
    let base64 = base64String.replace(/-/g, "+").replace(/_/g, "/");

    // Add padding if missing
    while (base64.length % 4) {
      base64 += "=";
    }
    const jsonString = atob(base64); // Decode Base64 to JSON string
    return JSON.parse(jsonString);
  } else {
    return null;
  }
};

const getAmount = (amount?: any, currency?: any) => {
  return amount
    ? (amount = `${
        currency === "JPY"
          ? parseFloat(amount).toFixed(0)
          : parseFloat(amount).toFixed(2)
      }`)
    : 0;
};

function filterDateFormatter(payloadDate: Date, patternStr: string) {
  return formatInTimeZone(payloadDate, selectedTimeZone, patternStr);
};
function filterDateFormatterNoTimeZone(payloadDate: Date, patternStr: string) {
  return formatDate(payloadDate, patternStr);
};
function trimToSingleSpace(input:any) {
  return input.replace(/\s+/g, ' ').trim();
};
const getFilterRequest = (item: any) => {
  if (item.selectFilterType === "autoSelect") {
    if (Array.isArray(item.valueLabel)) {
      const autoSearchFilter = item.value?.map((i: any) => {
        return i?.value;
      });
      return {
        field: item.field,
        operator: item.operator,
        value: autoSearchFilter?.map((str: any) => str),
        ...(item?.operand && { operand: item.operand }),
      };
    } else {
      return {
        field: item.field,
        operator: item.operator,
        value: item.value.value,
        ...(item?.operand && { operand: item.operand }),
      };
    }
  } else if (item.selectFilterType === "newDateRangePicker") {
    if (item && item?.value?.length > 0) {
      if (item?.operator !== "isnull" && item?.operator !== "notnull") {
        const startDate = filterDateFormatter(
          item.value[0],
          DATE_FORMATS_OPTIONS.DATE_TIME_AM_PM
        );
        const endDate = filterDateFormatter(
          item.value[1] !== null ? item.value[1] : item.value[0],
          DATE_FORMATS_OPTIONS.DATE_TIME_AM_PM
        );

        return [
          {
            field: `${item.field}Start`,
            operator: item.operator,
            value: startDate,
            ...(item?.operand && { operand: item.operand }),
          },
          {
            field: `${item.field}End`,
            operator: item.operator,
            value: endDate,
            ...(item?.operand && { operand: item.operand }),
          },
        ];
      } else {
        return [
          {
            field: `${item.field}Start`,
            operator: item.operator,
            value: "",
            ...(item?.operand && { operand: item.operand }),
          },
          {
            field: `${item.field}End`,
            operator: item.operator,
            value: "",
            ...(item?.operand && { operand: item.operand }),
          },
        ];
      }
    }
  } else {
    return {
      field: item.field,
      operator: item.operator,
      value: item.value,
      ...(item?.operand && { operand: item.operand }),
    };
  }
};

function findClosest(num: number) {
  // Initialize the closest number and minimum difference
  const arr = ROWS_OPTIONS_VALUES;
  let closestNum = arr[0];
  let minDiff = Math.abs(num - closestNum);

  // Iterate through the array to find the closest number
  for (let i = 1; i < arr.length; i++) {
    const diff = Math.abs(num - arr[i]);
    if (diff < minDiff) {
      minDiff = diff;
      closestNum = arr[i];
    }
  }

  return closestNum;
}

const getInitialRowCount = (screenHeightOtherThanTableHeight = 0) => {
  if (
    screenHeightOtherThanTableHeight &&
    screenHeightOtherThanTableHeight > 160
  ) {
    const tableHeight = window.innerHeight - screenHeightOtherThanTableHeight;
    const num = Math.floor(+tableHeight / 40);
    const result = findClosest(num);
    return result;
  } else {
    return 10;
  }
};

const uuidTestRegexExp =
  /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

const getAmountWithCurrency = (amount: any, currency: any) => {
  return `${currency} ${amount
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
};

const getCardType = (type: T_CardType) => {
  switch (type) {
    case CARD_TYPE.VISA:
      return visa;
    case CARD_TYPE.MASTERCARD:
      return mastercard;
    case CARD_TYPE.AMEX:
      return amex;
    case CARD_TYPE.JCB:
      return jcb;
    case CARD_TYPE.googlepay:
      return googlepay;
    case CARD_TYPE.applepay:
      return applepay;
    case CARD_TYPE.dinersclub:
      return dinersclub;
    case CARD_TYPE.gcash:
      return gcash;
    case CARD_TYPE.paypay:
      return paypay;
    case CARD_TYPE.payeasy:
      return payeasy;
    case CARD_TYPE.konbini:
      return konbini;
    default:
      return invalid;
  }
};

const getStatusIcon = (status: T_TRANSACTION_STATUS) => {
  const transactionStatusIcon =
    status === TRANSACTION_STATUS.SUCCESSFUL
      ? Capture
      : status === TRANSACTION_STATUS.NOTSUCCESSFUL
      ? Failed
      : status === TRANSACTION_STATUS.PENDING
      ? Pending
      : "";
  return transactionStatusIcon;
};

const getCountry = (cd: any) => {
  return COUNTRIES.find(
    (c: any) => c.value == cd || c.label == cd || c.name == cd
  );
};

function encryptString(text: string) {
  return CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
}
function decryptString(ciphertext: string) {
  const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
}
const selectedTimeZone = localStorage.getItem("timeZone") || "Asia/Calcutta";

function getformatDate(date: string, patternStr = "dd MMMM yyyy") {
  // const env_ibec_key = store?.getState()?.auth?.profile?.merchantId;
  // TODO:
  const env_ibec_key = "";

  const newFormat = import.meta.env[`VITE_MERCHANT_IBEC_${env_ibec_key}`];
  let payloadDate = new Date(date);

  const milliseconds = payloadDate.getMilliseconds();

  // adding 1 second if the milliseconds is more than or equal to  500

  payloadDate = milliseconds >= 500 ? addSeconds(payloadDate, 1) : payloadDate;

  // this will work for ibec

  if (newFormat) {
    return formatInTimeZone(payloadDate, selectedTimeZone, newFormat);
  }

  // below code will work  for all the merchants

  if (!patternStr) {
    patternStr = "M/d/yyyy";
  }

  if (selectedTimeZone) {
    return formatInTimeZone(payloadDate, selectedTimeZone, patternStr);
  }
  return payloadDate.toLocaleDateString(i18n.t("languagecode"), {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  });
}

function customSort(arr: any) {
  return arr
    .map((item: any) => item.trim()) // Remove leading and trailing spaces
    .sort((a: any, b: any) => {
      const isAEnglish = /^[\x00-\x7F]+$/.test(a);
      const isBEnglish = /^[\x00-\x7F]+$/.test(b);
      const startsWithNumberA = /^\d/.test(a);
      const startsWithNumberB = /^\d/.test(b);
      const isASpecial = /^[^a-zA-Z0-9]*$/.test(a);
      const isBSpecial = /^[^a-zA-Z0-9]*$/.test(b);

      // Move strings starting with numbers or special characters down the list
      if (startsWithNumberA && !startsWithNumberB) return 1;
      if (!startsWithNumberA && startsWithNumberB) return -1;
      if (isASpecial && !isBSpecial) return 1;
      if (!isASpecial && isBSpecial) return -1;

      // Sort English strings first
      if (isAEnglish && !isBEnglish) return -1;
      if (!isAEnglish && isBEnglish) return 1;

      // For same type, sort alphabetically
      return a.localeCompare(b);
    });
}

function sanitizeFileName(fileName: string) {
  // Replace anything that is not a letter, number, dot, or underscore with '_'
  return fileName.replace(/[^a-zA-Z0-9._]/g, "_");
}

const getBase64 = (file: any) => {
  return new Promise((resolve) => {
    let baseURL: any = "";
    let reader = new FileReader();
    // Convert the file to base64 text
    reader.readAsDataURL(file);
    // on reader load somthing...
    reader.onload = () => {
      // Make a fileInfo Object
      baseURL = reader.result;
      resolve(baseURL);
    };
  });
};

const getCurrency = (currency: any) => {
  const updatedCurrency = Currency.find(
    (currData) => currData.value === currency
  );
  return updatedCurrency?.label || "";
};

function isDateValid(dateNum: number): boolean {
  const date = new Date(dateNum);
  return !isNaN(date.getTime());
}

function getCustomDate(date: any, format = DATE_FORMAT) {
  if (date && isDateValid(date)) {
    return formatDate(new Date(date.split("T")[0]), format);
  } else {
    return "N/A";
  }
}

const getMCC = (mcc: any) => {
  const updatedMcc = MCC.find((mccData) => mccData.value === mcc);
  return updatedMcc?.d;
};

const quickSort = (val: any) => {
  return val;
};

const getSignInDataFromLocalStorage = () => {
  const localStore = localStorage.getItem("persist:root");
  const store = localStore && JSON.parse(localStore);
  const auth = store && JSON.parse(store?.auth);
  const profile = auth && auth?.profile;
  if (profile) {
    return profile;
  } else {
    return {
      token: {
        idToken: "",
      },
    };
  }
};

const onCopyClick = async (item: { allowCopy: boolean; value: string }) => {
  if (item?.allowCopy) {
    try {
      await navigator.clipboard.writeText(item.value);
      // DasSnackbar.success(`${i18n.t(item.label)} copied!`);
    } catch (error) {
      // DasSnackbar.error(`Failed to copy ${i18n.t(item.label)}.`);
    }
  } else {
    return;
  }
};

const getTransactionTypeIconClass = (TransactionType: any, status: any) => {
  switch (TransactionType) {
    case "PURCHASE":
      if (status === "NOTSUCCESSFUL") {
        return Failed;
      }
      if (status === TRANSACTION_STATUS.PENDING) {
        return Pending;
      }
      return Purcahse;
    case "REFUND":
      if (status === "NOTSUCCESSFUL") {
        return Failed;
      }
      if (status === TRANSACTION_STATUS.PENDING) {
        return Pending;
      }
      return Refund;
    case "AUTHORISATION":
      if (status === "NOTSUCCESSFUL") {
        return Failed;
      }
      if (status === TRANSACTION_STATUS.PENDING) {
        return Pending;
      }
      return Authorisation;
    case "CAPTURE":
      if (status === "NOTSUCCESSFUL") {
        return Failed;
      }
      if (status === TRANSACTION_STATUS.PENDING) {
        return Pending;
      }
      if (status === TRANSACTION_STATUS.PENDING) {
        return Pending;
      }
      return Capture;
    case "VOIDAUTHORISATION":
      if (status === "NOTSUCCESSFUL") {
        return Failed;
      }
      if (status === TRANSACTION_STATUS.PENDING) {
        return Pending;
      }
      return VoidAuthorised;
    default:
      return "transaction-default-status";
  }
};

const objectToBase64 = (obj: any) => {
  const jsonString = JSON.stringify(obj); // Convert object to JSON string
  const utf8Bytes = new TextEncoder().encode(jsonString);
  const base64 = btoa(String.fromCharCode(...utf8Bytes));
  return base64
    .replace(/\+/g, "-") // Convert '+' to '-'
    .replace(/\//g, "_") // Convert '/' to '_'
    .replace(/=+$/, ""); // Remove trailing '='
};

export default function getEntity(SUBSIDARY: any) {
  return SUBSIDARY?.map((entity: T_subsidaryType) => {
    return {
      label: `PG ${subsidaryLevel[entity]}`,
      value: entity,
      oldLabel: subsidaryLevel[entity],
    };
  }).filter((item: { oldLabel: string }) => item.oldLabel);
}

function showInAscendingOrder(a: any, b: any) {
  if ((a.headerName || a.label) < (b.headerName || b.label)) {
    return -1;
  }
  if ((a.headerName || a.label) > (b.headerName || b.label)) {
    return 1;
  }
  return 0;
}

export {
  base64ToObject,
  getAmount,
  getFilterRequest,
  getInitialRowCount,
  uuidTestRegexExp,
  getAmountWithCurrency,
  getCardType,
  getStatusIcon,
  getCountry,
  decryptString,
  encryptString,
  getformatDate,
  customSort,
  sanitizeFileName,
  getBase64,
  getCurrency,
  getCustomDate,
  getMCC,
  quickSort,
  getSignInDataFromLocalStorage,
  onCopyClick,
  getTransactionTypeIconClass,
  objectToBase64,
  showInAscendingOrder,
  filterDateFormatter,
  filterDateFormatterNoTimeZone,
  trimToSingleSpace
};
