import i18next from "i18next";
import { SUBSCRIPTION_Type } from "../../../../../constants/merchant";

export const COLUMN_HEADRES = {
  STATUS: "Status",
  AMOUNT: "Amount",
  SUBSCRIPTION_LINK: "Subscription Link",
  DUPLICATE_PLAN: "DUPLICATE",
  EDIT_PLAN: "EDIT",
  EDIT_SUBSCRIPTION_PLAN: "Edit Subscription Plan",
  BILLING_COUNTRY: "Billing Country",
  ADD: "ADD",
  EDIT_SUBSCRIPTION: "Edit Subscription",
  START_DATE: "Start Date",
  END_DATE: "End Date",
  LINK_EXPIRY_DATE: "Link Expiry Date",
};
export const SETTLEMENT_STATUS = {
  PENDING: "PENDING",
  APPROVED: "APPROVED",
  CARRYFORWARDUNAPPROVED: "CARRYFORWARDUNAPPROVED",
};
export const SUBSCRIPTION_STATUS: any = {
  INITIATED: i18next.t("SUBSCRIPTION_STATUS.INITIATED"),
  PENDING: i18next.t("SUBSCRIPTION_STATUS.PENDING"),
  ACTIVE: i18next.t("SUBSCRIPTION_STATUS.ACTIVE"),
  PAUSED: i18next.t("SUBSCRIPTION_STATUS.PAUSED"),
  INACTIVE: i18next.t("SUBSCRIPTION_STATUS.INACTIVE"),
  CANCELLED: i18next.t("SUBSCRIPTION_STATUS.CANCELLED"),
  COMPLETED: i18next.t("SUBSCRIPTION_STATUS.COMPLETED"),
  REJECTED: i18next.t("SUBSCRIPTION_STATUS.REJECTED"),
  EXPIRED: i18next.t("SUBSCRIPTION_STATUS.EXPIRED"),
};
export const SUBSCRIPTION_TYPE_VALUES = {
  INFINITE: "INFINITE",
  IMMEDIATELY: "Immediately",
  SPECIFIC_DATE: "SpecificDate",
  SUB_DISCOUNT: "discount",
  SUB_TRIAL_PERIOD: "trialPeriod",
  DISCOUNT: "Discount",
  TRIAL_PERIOD: "Trial Period",
  CYCLE: "CYCLE",
  EDIT: "Edit",
  MONTHLY: "MONTHLY",
  QUARTERLY: "QUARTERLY",
  SEMIANNUALLY: "SEMIANNUALLY",
  ANNUALLY: "ANNUALLY",
  DAYS: "DAYS",
};
export const SUBSCRIPTION_START_DATE = [
  {
    label: i18next.t("Merchant_Detail.Subscription.columnDefs.immediately"),
    value: SUBSCRIPTION_TYPE_VALUES.IMMEDIATELY,
  },
  {
    label: i18next.t("Merchant_Detail.Subscription.columnDefs.specificDate"),
    value: SUBSCRIPTION_TYPE_VALUES.SPECIFIC_DATE,
  },
];
export const SUBSCRIPTION_END_DATE = [
  {
    label: i18next.t("Merchant_Detail.Subscription.columnDefs.forever"),
    value: SUBSCRIPTION_TYPE_VALUES.INFINITE,
  },
  {
    label: i18next.t("Merchant_Detail.Subscription.columnDefs.after"),
    value: SUBSCRIPTION_TYPE_VALUES.CYCLE,
  },
  {
    label: i18next.t("Merchant_Detail.Subscription.columnDefs.specificDate"),
    value: SUBSCRIPTION_TYPE_VALUES.SPECIFIC_DATE,
  },
];
export const SUBSCRIPTION_TYPE = [
  {
    label: SUBSCRIPTION_Type.TrialPeriod,
    value: SUBSCRIPTION_TYPE_VALUES.SUB_TRIAL_PERIOD,
  },
  {
    label: SUBSCRIPTION_Type.Discount,
    value: SUBSCRIPTION_TYPE_VALUES.SUB_DISCOUNT,
  },
];
