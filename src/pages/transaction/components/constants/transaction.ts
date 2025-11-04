/* eslint-disable @typescript-eslint/no-explicit-any */

import i18n from "i18n";

export const TRANSACTION_EVENT_LABEL: any = {
  PENDING: "PENDING",
  REFUSED: "REFUSED",
  CANCELLED: "CANCELLED",
  PURCHASED: "PURCHASED",
  CAPTURED: "CAPTURED",
  AUTHORISED: "AUTHORISED",
  REFUNDED: "REFUNDED",
  ACQERROR: "ACQERROR",
  VOIDED: "VOIDED",
  INITIATED: "INITIATED",
  PARTIALLY_CAPTURED: "PARTIALLY_CAPTURED",
  PARTIALLY_REFUNDED: "PARTIALLY_REFUNDED",
  PRECONDITION_FAILED: "PRECONDITION_FAILED",
  NOT_ACCEPTABLE: "NOT_ACCEPTABLE",
  UNKNOWN_ERROR: "UNKNOWN_ERROR",
  TIMEOUT: "TIMEOUT",
  DECLINED: "DECLINED",
  SENT_FOR_REFUND: "SENT_FOR_REFUND",
};


export const TRANSACTION_STATUS: any = {
  SUCCESSFUL: "SUCCESSFUL",
  NOTSUCCESSFUL: "NOTSUCCESSFUL",
  PENDING: "PENDING",
};

export type T_TRANSACTION_STATUS =
  (typeof TRANSACTION_STATUS)[keyof typeof TRANSACTION_STATUS];


export const TRANSACTION_STATUS_LABEL: any = {
  SUCCESSFUL: i18n.t("Filter.SUCCESSFUL"),
  NOTSUCCESSFUL: i18n.t("Filter.NOTSUCCESSFUL"),
  PENDING: i18n.t("Filter.PENDING"),
};

export const TRANSACTION_SUBSCRIPTION_STATUS: any = {
  ACTIVE: i18n.t("FinanceStatements.StatusTypes.ACTIVE"),
  INACTIVE: i18n.t("FinanceStatements.StatusTypes.INACTIVE"),
};

export const TRANSACTION_TYPE: any = {
  AUTHORISATION: i18n.t("Filter.AUTHORISATION"),
  PURCHASE: i18n.t("Filter.PURCHASE"),
  CAPTURE: i18n.t("Filter.CAPTURE"),
  VOIDAUTHORISATION: i18n.t("Filter.VOIDAUTHORISATION"),
  REFUND: i18n.t("Filter.REFUND"),
};
export const TRANSACTION_TYPE_CONSTANTS: any = {
  AUTHORISATION: "AUTHORISATION",
  PURCHASE: "PURCHASE",
  CAPTURE: "CAPTURE",
  VOIDAUTHORISATION: "VOID AUTHORISATION",
  REFUND: "REFUND",
};

export const TRANSACTION_TYPE_LABEL: any = {
  AUTHORISATION: i18n.t("Filter.AUTHORISATION"),
  PURCHASE: i18n.t("Filter.PURCHASE"),
  CAPTURE: i18n.t("Filter.CAPTURE"),
  VOIDAUTHORISATION: i18n.t("Filter.VOIDAUTHORISATION"),
  REFUND: i18n.t("Filter.REFUND"),
};

export const INTEGRATION_TYPE: any = {
  HPP: i18n.t("ProductModal.ConnectionMethods.value.HPP"),
  SERVERTOSERVERAPI: i18n.t(
    "ProductModal.ConnectionMethods.value.SERVERTOSERVERAPI"
  ),
};

export type T_CardType = (typeof CARD_TYPE)[keyof typeof CARD_TYPE];

export const CARD_TYPE: any = {
  VISA: "VISA",
  MASTERCARD: "MASTERCARD",
  AMEX: "AMEX",
  JCB: "JCB",
  googlepay: "googlepay",
  applepay: "applepay",
  dinersclub: "dinersclub",
  gcash: "gcash",
  paypay: "paypay",
  payeasy: "payeasy",
  konbini: "konbini",
};
export const PAYMENT_TYPE: any = {
  CARDPAYMENT: "CARD PAYMENT",
  gcash: "gcash",
  paypay: "paypay",
  payeasy: "payeasy",
  konbini: "konbini",
};
export const TRANSACTION_PAYMENT_TYPE = [
  {
    label: "CARD PAYMENT",
    value: "CARDPAYMENT",
  },
  {
    label: "GCASH",
    value: "gcash",
  },
  {
    label: "PAYPAY",
    value: "paypay",
  },
  {
    label: "PAYEASY",
    value: "payeasy",
  },
  {
    label: "KONBINI",
    value: "konbini",
  },
];

export const SUPPORTED_COUNTRY = [{ name: "Japan", value: "JP" }];
export const TRANSACTION_STATUS_TYPE = [
  {
    label: i18n.t("Filter.SUCCESSFUL"),
    value: "SUCCESSFUL",
  },
  {
    label: i18n.t("Filter.NOTSUCCESSFUL"),
    value: "NOTSUCCESSFUL",
  },
];

export const DOWNLOAD_RECORD_COUNTS = {
  min: 0,
  max: 50000,
};
