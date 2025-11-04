import i18n from '../../../i18n';

export const FILTER = {
  ctcCountry: 'ctcCountry',
};

export const SUBSIDIARY_ID = [
  {
    label: i18n.t('Singapore'),
    value: 'SG',
  },
  {
    label: i18n.t('Canada'),
    value: 'CA',
  },
  {
    label: i18n.t('England'),
    value: 'ENG',
  },
];

export const SCHEME_TYPE = [
  {
    label: 'Visa',
    value: 'hasVISA',
    imagevalue: 'VISA',
  },
  {
    label: 'MasterCard',
    value: 'hasMastercard',
    imagevalue: 'MASTERCARD',
  },
  {
    label: 'Amex',
    value: 'hasAmex',
    imagevalue: 'AMEX',
  },
  {
    label: 'JCB',
    value: 'hasJCB',
    imagevalue: 'JCB',
  },
  {
    label: 'China Unionpay',
    value: 'hasUnionPay',
    imagevalue: 'CHINAUNIONPAY',
  },
  {
    label: 'GOOGLE PAY',
    value: 'hasGooglePay',
    imagevalue: 'googlepay',
  },
  {
    label: 'APPLE PAY',
    value: 'hasApplePay',
    imagevalue: 'applepay',
  },
  {
    label: 'GCASH',
    value: 'hasGCash',
    imagevalue: 'gcash',
  },
  {
    label: 'PAYPAY',
    value: 'hasPayPay',
    imagevalue: 'paypay',
  },
  {
    label: 'PAYEASY',
    value: 'hasPayEasy',
    imagevalue: 'payeasy',
  },
  {
    label: 'KONBINI',
    value: 'hasKonbini',
    imagevalue: 'konbini',
  },
];

export const CONNECTION_METHODS = [
  {
    label: 'ProductModal.ConnectionMethods.value.HPP',
    value: 'hasShopPlugin',
  },

  {
    label: 'ProductModal.ConnectionMethods.value.SERVERTOSERVERAPI',
    value: 'hasMobileApp',
  },
];

export const PRODUCT_INFO_TRANSACTION_TYPE = [
  {
    value: 'has3DS',
    label1: 'ProductModal.TransactionType.value.3DSecure',
    label2: 'ProductModal.TransactionType.value.Non3DSecure',
  },

  {
    value: 'hasCVC',
    label1: 'ProductModal.TransactionType.value.CVV2/CVC2',
    label2: 'ProductModal.TransactionType.value.NonCVV2/CVC2',
  },

  {
    value: 'hasRecurring',
    label1: 'ProductModal.TransactionType.value.Recurring',
  },
  {
    value: 'hasTokenised',
    label1: 'ProductModal.TransactionType.value.Tokenised',
  },
  {
    value: 'hasDynamicMCC',
    label1: 'ProductModal.TransactionType.value.DynamicMCC',
  },
];

export const TRIGGER_TYPE = [
  {
    label: i18n.t('ProductRiskRuleDrawerModal.Blacklist'),
    value: 'BLACKLIST',
  },
  {
    label: i18n.t('ProductRiskRuleDrawerModal.Threshold'),
    value: 'THRESHOLD',
  },
  {
    label: i18n.t('ProductRiskRuleDrawerModal.Velocity'),
    value: 'VELOCITY',
  },
  {
    label: i18n.t('ProductRiskRuleDrawerModal.Max_Volume'),
    value: 'VOLUME',
  },
  {
    label: i18n.t('ProductRiskRuleDrawerModal.Whitelist'),
    value: 'WHITELIST',
  },
  {
    label: i18n.t('ProductRiskRuleDrawerModal.Refund_Percentage'),
    value: 'REFUND',
  },
];

export const FIELD_WHITELIST: any = [
  {
    label: i18n.t('IP Address'),
    value: 'IP',
  },
  {
    label: i18n.t('Bin Numbers'),
    value: 'BIN',
  },
];
export const FIELD_BLACKLIST: any = [
    {
      label: i18n.t("Issuing Country"),
      value: "COUNTRY",
    },
];

export const MIN_MAX_Amount = [
  {
    label: i18n.t('ProductRiskRuleDrawerModal.option.MaxTransactionAmount'),
    value: 'AMOUNT',
  },
  {
    label: i18n.t('ProductRiskRuleDrawerModal.option.MinTransactionAmount'),
    value: 'MINAMOUNT',
  },
];

export const VELOCITY_PAN_IP = [
  {
    label: i18n.t('PAN'),
    value: 'PAN',
  },
  {
    label: i18n.t('IP Address'),
    value: 'IP',
  },
  {
    label: i18n.t("ProductRiskRuleDrawerModal.option.REFUND"),
    value: "REFUND",
  },
  {
    label: i18n.t("ProductRiskRuleDrawerModal.option.REFUND_VOLUME"),
    value: "REFUND_VOLUME",
  },
];
export const STATUS: any = {
  APPROVED: 'APPROVED',
};

export const SUBSCRIPTION_Type: any = {
  SubscriptionType: 'Subscription Type',
  TrialPeriod: 'Trial Period (Free Days)',
  Discount: 'Discount',
  Days: 'DAY(S)',
  Month: 'Month(s)',
  Active: 'ACTIVE',
  InActive: 'InActive',
};

export const QR_TRANSACTION_TYPES = [
  {
    value: 'has3DS',
    label1: 'ProductModal.TransactionType.value.3DSecure',
    label2: 'ProductModal.TransactionType.value.Non3DSecure',
  },
  {
    value: 'hasCVC',
    label1: 'ProductModal.TransactionType.value.CVV2/CVC2',
    label2: 'ProductModal.TransactionType.value.NonCVV2/CVC2',
  },
  {
    value: 'hasTokenised',
    label1: 'ProductModal.TransactionType.value.Tokenised',
  },
  {
    value: 'hasDynamicMCC',
    label1: 'ProductModal.TransactionType.value.DynamicMCC',
  },
];

export const TIME_FRAME_OPTIONS = [
  {
    label: "Months",
    value: "RANGE_IN_MONTHS"
  },
  {
    label: "Hours",
    value: "RANGE_IN_HOURS"
  },
  {
    label: "Days",
    value: "RANGE_IN_DAYS"
  },
  {
    label: "Minutes",
    value: "RANGE_IN_MINUTES"
  },
];
export const STATEMENT_STATUS = ["Pending","Approved","CARRY FORWARD",'CF UNAPPROVED'];