/* eslint-disable @typescript-eslint/no-explicit-any */
import i18n from "i18n";

export const HTML_ELEMENT = {
  TEXT_FIELD: "TextField",
  SELECT: "Select",
  DATE_RANGE_PICKER: "DateRangePicker",
  NEW_DATE_RANGE_PICKER: "NewDateRangePicker",
  SELECT_WITH_SEARCH: "SelectWithSearch",
};

export const HEADER_COLUMN = {
  COUNTRY: "Country",
  COUNTRY_ID: "CountryID",
  AMOUNT: "amount",
  SUBSIDIARY_ID: "SubsidiaryID",
  POENTITY: "poEntity",
  TRANSACTION_TYPE: "TransactionType",
  SCHEME: "Scheme",
  MCC: "MCC",
  TYPE: "type",
  TIME_ZOME: "TimeZone",
  DATE: "Date",
  UPDATED_DATE: "UpdatedDate",
  CREATED_AT: "CreatedAt",
  START_DATE: "StartDate",
  END_DATE: "EndDate",
  CASE_TYPE: "CaseType",
  REASON_CODE: "ReasonCode",
  STATUS: "status",
  ACQUIRER_NAME: "AcquirerName",
  ACQUIRER: "Acquirer",
  ISSUED_DATE: "IssuedDate",
  DUE_DATE: "DueDate",
  CURRENCY: "Currency",
  CURRENCY_CODE: "CurrencyCode",
  PRODUCT_TYPE: "ProductType",
  CTC_COUNTRY: "ctcCountry",
  RECON_STATUS: "ReconStatusBySystem",
  STATEMENT_STATUS: "SettlementStatus",
  WIRED_STATUS: "WiredStatus",
  RELEASED_DATE: "ReleasedDate",
  PAYOUT_DATE: "Payout_Date",
  COUNTRY_CODE: "CountryCode",
  TRANSACTION_END_DATE: "TRANSACTION_END_DATE",
  TRANSACTION_START_DATE: "TRANSACTION_START_DATE",
  PARTNER_ISACTIVE: "isActive",
  BUSINESS_LOCATION: "businessLocation",
  IS_THIRDPARTY: "isThirdPartyApp",
  REGISTRATION_TYPE: "registrationType",
  SALESLEAD_CREATED_AT: "createdAt",
  HAS_3DS: "has3DS",
  BILLING_CYCLE_TYPE: "billingCycleType",
  CCY: "ccy",
  BILLING_COUNTRY: "billingCountry",
  SUBSCRIPTION_STATUS: "status",
  SUBSCRIBER_STATUS: "subscriptionStatus",
  SUBSCRIPTION_STARTS_AT: "subscriptionStartsAt",
  SUBSCRIPTION_ENDS_AT: "subscriptionEndsAt",
  SUBSCRIPTION_PLAN_CCY: "subscriptionPlanCcy",
  SETTLEMENT_OFFSET: "SettlementOffset",
  SUBSCRIBER_CARD_EXP: "cardExp",
  HOLIDAY_DATE: "Date",
  STATEMENT_ID: "StatementID",
  NEXT_PAYMENT_DATE: "nextPaymentDate",
  ACCESS_LEVEL: "accessLevel",
  DASMID: "DASMID",
  DAS_MID: "DAS_MID",
  ACQUIRER_MID: "AcquirerMID",
  LEGAL_NAME: "LegalName",
  ROLLING_RESERVE_HELD: "ROLLING_RESERVE_HELD",
  ROLLING_RESERVE_RELEASED: "ROLLING_RESERVE_RELEASED",
  FIXED_DEPOSITE_HELD_YTD_AMOUNT: "FixedDepositHeldYTDAmount",
  ADJUSTMENTS_AMOUNT: "AdjustmentsAmount",
  NET_SALES: "NetSales",
  TOTAL_FEES: "TotalFees",
  DISPUTE_AMOUNT: "Amount",
  COMPLETED_PAYMENT_CYCLE: "completedPaymentCycle",
  SUBSCRIPTION_PLAN_AMOUNT: "subscriptionPlanAmount",
  ACQUIRER_CODE: "AcquirerCode",
  COMPANY_NAME: "companyName",
  HOLIDAY: "Holiday",
  SubscriptionStatus: "Status",
  UpdatedHashCardStatus: "status",
  STATEMENT_WHITELISTED: "IsWhitelisted",
  INTEGRATION_TYPE: "IntegrationType",
  PAYMENT_TYPE: "PaymentType",
  CATALOG_CATEGORY_STATUS: "CategoryStatus",
  CATALOG_PRODUCT_STATUS: "ProductStatus",
  IP_STATUS: "Status",
  PRODUCT_FOOD_TYPE: "ProductFoodType",
  PRODUCT_FOOD_SIZE: "ProductSize",
  MERCHANT_ID: "MerchantID",
};
export const View_Name_Space = {
  TRANSACTION: "TRANSACTION",
  MERCHANT: "MERCHANT",
  ACQUIRERS: "ACQUIRERS",
  PRODUCTS: "PRODUCTS",
  CHARGEBACK: "CHARGEBACK",
  ONBOARDING: "ONBOARDING",
  STATEMENTS: "STATEMENTS",
  SALESLEAD: "SALESLEAD",
  PARTNER: "PARTNER",
  SUBSCRIPTION: "SUBSCRIPTION",
  PUBLIC_HOLIDAY: "PUBLIC_HOLIDAY",
  SUBSCRIPTION_STATUS: "SUBSCRIPTION_STATUS",
  STATEMENT_TRANSACTION: "STATEMENT_TRANSACTION",
  HASH_CARD_NUMBER: "HASH_CARD_NUMBER",
  IP_WHITELISTING: "IP_WHITELISTING",
  MERCHANT_CATALOG_CATEGORY: "MERCHANT_CATALOG_CATEGORY",
  MERCHANT_CATALOG_PRODUCT_CATEGORY: "MERCHANT_CATALOG_PRODUCT_CATEGORY",
};

export const STATUS: any = {
  MERCHANT: {
    SUBMITTED: i18n.t("FinanceStatements.StatusTypes.SUBMITTED"),
    APPROVED: i18n.t("FinanceStatements.StatusTypes.APPROVED"),
    COMPLETED: i18n.t("FinanceStatements.StatusTypes.COMPLETED"),
  },
  TRANSACTION: {
    SUCCESSFUL: i18n.t("Filter.SUCCESSFUL"),
    NOTSUCCESSFUL: i18n.t("Filter.NOTSUCCESSFUL"),
    PENDING: i18n.t("Filter.PENDING"),
  },
  CHARGEBACK: {
    OPEN: i18n.t("DisputeManagement.FilterStatus.open"),
    CLOSED: i18n.t("DisputeManagement.FilterStatus.closed"),
  },
  ACQUIRERS: {
    ACTIVE: i18n.t("FinanceStatements.StatusTypes.ACTIVE"),
    INACTIVE: i18n.t("FinanceStatements.StatusTypes.INACTIVE"),
  },
  SUBSCRIPTION_PLAN_STATUS: {
    ACTIVE: i18n.t("FinanceStatements.StatusTypes.ACTIVE"),
    INACTIVE: i18n.t("FinanceStatements.StatusTypes.INACTIVE"),
  },
  PARTNER_STATUS: {
    ACTIVE: i18n.t("FinanceStatements.StatusTypes.ACTIVE"),
    INACTIVE: i18n.t("FinanceStatements.StatusTypes.INACTIVE"),
  },
  HASH_CARD_STATUS: {
    ACTIVE: i18n.t("FinanceStatements.StatusTypes.ACTIVE"),
    INACTIVE: i18n.t("FinanceStatements.StatusTypes.INACTIVE"),
  },
  PARTNER: {
    ACTIVE: "true",
    INACTIVE: "false",
  },
  SALESLEAD: {
    PENDING: i18n.t("SalesLead.StatusType.PENDING"),
    APPROVED: i18n.t("SalesLead.StatusType.APPROVED"),
    REJECTED: i18n.t("SalesLead.StatusType.REJECTED"),
    INPROGRESS: i18n.t("SalesLead.StatusType.INPROGRESS"),
    APPROVALINPROGRESS: i18n.t("SalesLead.StatusType.APPROVALINPROGRESS"),
  },
  SUBSCRIPTION: {
    ACTIVE: "true",
    INACTIVE: "false",
  },
  SUBSCRIPTION_STATUS: {
    ACTIVE: "ACTIVE",
    COMPLETED: "COMPLETED",
    PAUSED: "PAUSED",
    INITIATED: "PENDING",
    CANCELLED: "CANCELLED",
    REJECTED: "REJECTED",
    TOKENPAYMENTFAILED: "TOKEN PAYMENT FAILED",
    TOKENEXPIRED: "TOKEN EXPIRED",
  },
  HASH_CARD_NUMBER: {
    ACTIVE: "1",
    INACTIVE: "0",
  },
  IP_WHITELISTING: {
    NEW: i18n.t("NEW"),
    SUBMITTED: i18n.t("SUBMITTED"),
    APPROVED: i18n.t("APPROVED"),
    REJECTED: i18n.t("REJECTED"),
  },
};

export const HAS_3DS_TYPE: any = {
  true: "3DS",
  false: "Non 3DS",
};

export const SUBSCRIPTION_STATUS: any = {
  ACTIVE: i18n.t("SUBSCRIPTION_STATUS.ACTIVE"),
  COMPLETED: i18n.t("SUBSCRIPTION_STATUS.COMPLETED"),
  PAUSED: i18n.t("SUBSCRIPTION_STATUS.PAUSED"),
  INITIATED: i18n.t("SUBSCRIPTION_STATUS.PENDING"),
  CANCELLED: i18n.t("SUBSCRIPTION_STATUS.CANCELLED"),
  REJECTED: i18n.t("SUBSCRIPTION_STATUS.REJECTED"),
  TOKENPAYMENTFAILED: i18n.t("SUBSCRIPTION_STATUS.TOKENPAYMENTFAILED"),
  TOKENEXPIRED: i18n.t("SUBSCRIPTION_STATUS.TOKENEXPIRED"),
};
export const PBL_STATUS: any = {
  ACTIVE: i18n.t("Merchant_Detail.User_Management.Status.Active"),
  INACTIVE: i18n.t("Merchant_Detail.User_Management.Status.Inactive"),
  EXPIRED: i18n.t("Merchant_Detail.User_Management.Status.Expired"),
};

export const FILTER_POPOP_OF = {
  PRODUCT_INFO_ON_MERCHANT_DETAILS: "PRODUCT_INFO_ON_MERCHANT_DETAILS",
  ACQUIRER_MID_DETAIL_TABLE: "ACQUIRER_MID_DETAIL_TABLE",
  RISK_RULE: "RISK_RULE",
};
export const SIDE_MENU_TABS = {
  HOLIDAY: "Holiday",
  MERCHANT: "Merchant",
  SUBSCRIPTIONS: "Subscriptions",
  STATEMENT: "Statement",
  MERCHANT_VIEW: "Merchant View",
  TRANSACTION: "Transaction",
  SALES_LEAD: "Sales Lead",
  MERCHANT_DETAILS: "Merchant Details",
  ACQUIRER_DETAILS: "Acquirer Details",
  PARTNER_DETAILS: "Partner Details",
  USER_PREFERENCE: "User Settings",
  MERCHANT_SETTINGS: "Merchant Settings",
};

export const SALES_LEAD_FILTER_POPOP_OF = {
  SALES_LEAD_MERCHANT: "SALES_LEAD_MERCHANT",
  SALES_LEAD_PARTNER: "SALES_LEAD_PARTNER",
};

export const HOLIDAY_NAME_SPECIAL_CHARACTERS = [
  "~",
  "`",
  "@",
  "#",
  "$",
  "%",
  "^",
  "&",
  "*",
  "(",
  ")",
  "+",
  "=",
  "|",
  '"',
  "`",
  ";",
  ":",
  ".",
  ",",
  "?",
  "/",
  "[",
  "]",
  "{",
  "}",
  "!",
  "<",
  ">",
  "\\",
];

export const MERCHANT_STATUS: any = {
  SUBMITTED: i18n.t("FinanceStatements.StatusTypes.SUBMITTED"),
  APPROVED: i18n.t("FinanceStatements.StatusTypes.APPROVED"),
  COMPLETED: i18n.t("FinanceStatements.StatusTypes.COMPLETED"),
};

export const SUBSCRIPTION_STATUS_LABELS: any = {
  ACTIVE: i18n.t("SUBSCRIPTION_STATUS.ACTIVE"),
  COMPLETED: i18n.t("SUBSCRIPTION_STATUS.COMPLETED"),
  PAUSED: i18n.t("SUBSCRIPTION_STATUS.PAUSED"),
  INITIATED: i18n.t("SUBSCRIPTION_STATUS.INITIATED"),
  CANCELLED: i18n.t("SUBSCRIPTION_STATUS.CANCELLED"),
  REJECTED: i18n.t("SUBSCRIPTION_STATUS.REJECTED"),
  TOKENPAYMENTFAILED: i18n.t("SUBSCRIPTION_STATUS.TOKENPAYMENTFAILED"),
  TOKENEXPIRED: i18n.t("SUBSCRIPTION_STATUS.TOKENEXPIRED"),
  PENDING: i18n.t("SUBSCRIPTION_STATUS.PENDING"),
};

export const FILTER_INPUT_TYPES: any = {
  TEXT: "text",
  AUTOSELECT: "autoSelect",
  DATERANGEPICKER: "dateRangePicker",
  SELECT: "select",
  NUMBER: "numeric",
  MONTHPICKER: "monthPicker",
  NEWDATERANGEPICKER: "newDateRangePicker",
  NUMBERSTRING: "numberString",
  SELECTWITHOUTIN: "selectWithoutIn",
};

export const FILTER_PO_ENTITY: any = [
  {
    headerName: i18n.t("FilterPopup.PoEntityName.PO Singapore"),
    value: "PO Singapore",
  },
  {
    headerName: i18n.t("FilterPopup.PoEntityName.PO Japan"),
    value: "PO Japan",
  },
  {
    headerName: i18n.t("FilterPopup.PoEntityName.PO Mauritius"),
    value: "PO Mauritius",
  },
  {
    headerName: i18n.t("FilterPopup.PoEntityName.PO Europe"),
    value: "PO Europe",
  },
  {
    headerName: i18n.t("FilterPopup.PoEntityName.PO Hong Kong"),
    value: "PO Hong Kong",
  },
  {
    headerName: i18n.t("FilterPopup.PoEntityName.PO China"),
    value: "PO China",
  },
];
