import i18n from "i18n";

export const STATUS_TYPE: any = {
  PENDING: i18n.t("SalesLead.StatusType.PENDING"),
  APPROVED: i18n.t("SalesLead.StatusType.APPROVED"),
  REJECTED: i18n.t("SalesLead.StatusType.REJECTED"),
  NOTSUPPORTEDCOUNTRY: i18n.t("SalesLead.StatusType.NOTSUPPORTEDCOUNTRY"),
  APPROVALINPROGRESS: i18n.t("SalesLead.StatusType.APPROVALINPROGRESS"),
  INPROGRESS: i18n.t("SalesLead.StatusType.INPROGRESS_REG_NOT_COMPLETED"),
};

export const SALES_LEAD_FILTER_DATA: any = {
  BusinessLocation: "businessLocation",
  createdAt: "createdAt",
  status: "status",
};

export const REGESTRATION_TYPE: any = {
  REFERRAL: i18n.t("SalesLead.RegisterationType.REFERRAL"),
  SELF: i18n.t("SalesLead.RegisterationType.SELF"),
};

export const APPLICATION_TYPE: any = {
  MERCHANT: "MERCHANT",
  THIRDPARTY: "THIRDPARTY",
};
