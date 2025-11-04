import i18n from "../../../../../i18n";
// Added this for CUSTOMER(MERCHANT) Statement type
export const MERCHANT_STATEMENT_TYPE: any = {
  APPROVED: i18n.t("FinanceStatements.StatusTypes.APPROVED"),
  CARRYFORWARD: i18n.t("FinanceStatements.StatusTypes.CARRY_FORWARD"),
};
export const STATEMENT_STATUS: any = [
  {
    label: i18n.t("FinanceStatements.StatusTypes.PENDING"),
    value: "PENDING",
  },
  {
    label: i18n.t("FinanceStatements.StatusTypes.APPROVED"),
    value: "APPROVED",
  },
  {
    label: i18n.t("FinanceStatements.StatusTypes.CARRY_FORWARD"),
    value: "CARRYFORWARD",
  },
  {
    label: i18n.t("FinanceStatements.StatusTypes.CARRYFORWARDUNAPPROVED"),
    value: "CARRYFORWARDUNAPPROVED",
  },
];
export const STATEMENT_STATUS_FILTER: any = (INTERNAL: any) => {
  if (INTERNAL) {
    return [
      {
        label: i18n.t("FinanceStatements.StatusTypes.PENDING"),
        value: "PENDING",
      },
      {
        label: i18n.t("FinanceStatements.StatusTypes.APPROVED"),
        value: "APPROVED",
      },
      {
        label: i18n.t("FinanceStatements.StatusTypes.CARRY_FORWARD"),
        value: "CARRYFORWARD",
      },
      {
        label: i18n.t("FinanceStatements.StatusTypes.CARRYFORWARDUNAPPROVED"),
        value: "CARRYFORWARDUNAPPROVED",
      },
    ];
  } else {
    return [
      {
        label: i18n.t("FinanceStatements.StatusTypes.APPROVED"),
        value: "APPROVED",
      },
      {
        label: i18n.t("FinanceStatements.StatusTypes.CARRY_FORWARD"),
        value: "CARRYFORWARD",
      },
    ];
  }
};

export const STATEMENT_WIRED_STATUS: any = [
  {
    label: i18n.t("FinanceStatements.StatusTypes.NOT_PAID"),
    value: "NOTPAID",
  },
  {
    label: i18n.t("FinanceStatements.StatusTypes.PAID_OUT"),
    value: "SETTLED",
  },
];
export const STATEMENT_TYPE: any = {
  PENDING: i18n.t("FinanceStatements.StatusTypes.PENDING"),
  APPROVED: i18n.t("FinanceStatements.StatusTypes.APPROVED"),
  CARRYFORWARD: i18n.t("FinanceStatements.StatusTypes.CARRY_FORWARD"),
  CARRYFORWARDUNAPPROVED: i18n.t(
    "FinanceStatements.StatusTypes.CARRYFORWARDUNAPPROVED"
  ),
};

export const WIRED_TYPE_KEYS: any = {
  NOTPAID: "NOTPAID",
  SETTLED: "SETTLED",
  ONHOLD: "ONHOLD",
};
export const WIRED_TYPE: any = {
  NOTPAID: i18n.t("FinanceStatements.StatusTypes.NOT_PAID"),
  SETTLED: i18n.t("FinanceStatements.StatusTypes.PAID_OUT"),
  ONHOLD: i18n.t("FinanceStatements.StatusTypes.ON_HOLD"),
};
export const RECON_TYPE: any = {
  RECONCILED: i18n.t("FinanceStatements.StatusTypes.RECONCILED"),
  DISCREPANCY: i18n.t("FinanceStatements.StatusTypes.DISCREPANCY"),
  Pending: i18n.t("FinanceStatements.StatusTypes.PENDING"),
};
export const STATEMENT_LABEL: any = [
  {
    defaultLabel: "DAS_MID",
    customLabel: "DASMID",
  },
  {
    defaultLabel: "STATEMENT_ID",
    customLabel: "StatementID",
  },
  {
    defaultLabel: "Wired_Status",
    customLabel: "WiredStatus",
  },
  {
    defaultLabel: "STATUS",
    customLabel: "SettlementStatus",
  },
  {
    defaultLabel: "Recon_Status",
    customLabel: "ReconStatusBySystem",
  },
  {
    defaultLabel: "Acquirer",
    customLabel: "AcquirerName",
  },
  {
    defaultLabel: "TOTAL_FEES",
    customLabel: "TotalFees",
  },
  {
    defaultLabel: "NET_SALES",
    customLabel: "NetSales",
  },
];

export const STATEMENT_FILTER: any = {
  Date: "Date",
  ReleasedDate: "ReleasedDate",
  Payout_Date: "Payout_Date",
  TRANSACTION_START_DATE: "TRANSACTION_START_DATE",
  TRANSACTION_UPDATED_DATE: "UpdatedDate",
};

export const COMMON_STATEMENT_STATUS: any = {
  PENDING: "PENDING",
  APPROVED: "APPROVED",
  CARRYFORWARD: "CARRYFORWARD",
  CARRYFORWARDUNAPPROVED: "CARRYFORWARDUNAPPROVED",
};

export const STATEMENT_WHITELISTED_STATUS: any = [
  {
    label: i18n.t("YES"),
    value: "1",
  },
  {
    label: i18n.t("NO"),
    value: "0",
  },
];
