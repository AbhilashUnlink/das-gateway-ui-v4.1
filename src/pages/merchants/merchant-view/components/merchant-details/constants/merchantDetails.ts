import i18n from "i18n";

export const HEADERS = {
  PartnerName: "Partner Name",
  Country: "Country",
  SubsidiaryID: "SubsidiaryID",
  MerchantCategoryCode: "MerchantCategoryCode",
  TimeZone: "TimeZone",
  CountryID: "CountryID",
  SettlementOffset: "SettlementOffset",
  ShippingCountry: "ShippingCountry",
  BillingCountry: "BillingCountry",
  IssuingCountry: "IssuingCountry",
  Amount: "Amount",
  Date: "Date",
  Status: "Status",
  TransactionType: "TransactionType",
  Reseller: "Reseller",
  SecretKey: "SecretKey",
  SecretKeyTest: "SecretKeyTest",
  Product: "PRODUCT",
  Velocity: "VELOCITY",
  UpdatedDate: "UpdatedDate",
  NextPaymentDate: "NextPaymentDate",
  country: "country",
  linkExpiry: "linkExpiry",
  DueDate: "DueDate",
  AcquirerCode: "AcquirerCode",
  JavaEnabled: "javaEnabled",
  PaymentType: "PaymentType",
  Scheme: "Scheme",
  acceptHeader: "acceptHeader",
};

export const USER_ACCESS_ROLE = [
  {
    label: i18n.t("Merchant_Detail.User_Management.User_Roles.Admin"),
    value: "ADMIN",
  },
  {
    label: i18n.t("Merchant_Detail.User_Management.User_Roles.Editor"),
    value: "EDITOR",
  },
  {
    label: i18n.t("Merchant_Detail.User_Management.User_Roles.Viewer"),
    value: "VIEWER",
  },
];
export const USER_ROLE_STATUS: any = {
  ADMIN: i18n.t("Merchant_Detail.User_Management.User_Roles.Admin"),
  EDITOR: i18n.t("Merchant_Detail.User_Management.User_Roles.Editor"),
  VIEWER: i18n.t("Merchant_Detail.User_Management.User_Roles.Viewer"),
};
export const USER_STATUS: any = {
  ACTIVE: i18n.t("FinanceStatements.StatusTypes.ACTIVE"),
  INACTIVE: i18n.t("FinanceStatements.StatusTypes.INACTIVE"),
};
