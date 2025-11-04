import { ACCESS_GROUP_NAMES } from './access-group-name';

// need to work on checking the permissions like who has access to and who not
export const COMMON_ACCESS = [
  ACCESS_GROUP_NAMES.SALES,
  ACCESS_GROUP_NAMES.SALESOPS,
  ACCESS_GROUP_NAMES.FRAUD,
  ACCESS_GROUP_NAMES.RISK,
  ACCESS_GROUP_NAMES.COMPLIANCE,
  ACCESS_GROUP_NAMES.SUPPORT,
  ACCESS_GROUP_NAMES.SETTLEMENT,
  ACCESS_GROUP_NAMES.FINANCE,
  ACCESS_GROUP_NAMES.OPS,
];
export const ALL_ACCESS = [
  ACCESS_GROUP_NAMES.SALES,
  ACCESS_GROUP_NAMES.SALESOPS,
  ACCESS_GROUP_NAMES.FRAUD,
  ACCESS_GROUP_NAMES.RISK,
  ACCESS_GROUP_NAMES.COMPLIANCE,
  ACCESS_GROUP_NAMES.SUPPORT,
  ACCESS_GROUP_NAMES.SETTLEMENT,
  ACCESS_GROUP_NAMES.FINANCE,
  ACCESS_GROUP_NAMES.OPS,
  ACCESS_GROUP_NAMES.GUEST,
  ACCESS_GROUP_NAMES.GUESTTHIRDPARTY,
  ACCESS_GROUP_NAMES.MERCHANT,
  ACCESS_GROUP_NAMES.CUSTOMER,
  ACCESS_GROUP_NAMES.THIRDPARTY,
  ACCESS_GROUP_NAMES.GUESTSCHEDULER,
];
export const TRANSACTIONS_BUTTON = [
  ACCESS_GROUP_NAMES.SETTLEMENT,
  ACCESS_GROUP_NAMES.SUPPORT
];

export const TRANSACTIONS_EDIT_BUTTON = [
  ACCESS_GROUP_NAMES.SUPPORT
];

export const DISPUTE_EDIT_BUTTON = [
  ACCESS_GROUP_NAMES.SETTLEMENT
];

export const SALES_ACCESS = [
  ACCESS_GROUP_NAMES.SUPPORT,
  ACCESS_GROUP_NAMES.SALESOPS,
  ACCESS_GROUP_NAMES.SALES,
];
export const PERMISSION: any = {
  REGISTRATION_URL: {
    comment: 'Allow Registration View',
    allowedGroups: [
      ACCESS_GROUP_NAMES.GUEST,
      ACCESS_GROUP_NAMES.GUESTTHIRDPARTY,
      ACCESS_GROUP_NAMES.GUESTSCHEDULER,
    ],
  },
  MISSING_INFO_UPLOAD_BUTTON: {
    comment: 'Missing info step file upload drawer button',
    allowedGroups: [
      ACCESS_GROUP_NAMES.GUEST,
      ACCESS_GROUP_NAMES.GUESTTHIRDPARTY,
      ACCESS_GROUP_NAMES.GUESTSCHEDULER,
      ACCESS_GROUP_NAMES.THIRDPARTY,
    ],
  },
  ALL_GUEST_ROLES: {
    comment: 'Not Onboarded Yet',
    allowedGroups: [
      ACCESS_GROUP_NAMES.GUEST,
      ACCESS_GROUP_NAMES.GUESTSCHEDULER,
      ACCESS_GROUP_NAMES.GUESTTHIRDPARTY
    ],
  },
  GUEST: {
    comment: 'Allow Guest Access',
    allowedGroups: [
      ACCESS_GROUP_NAMES.GUEST,
      ACCESS_GROUP_NAMES.GUESTSCHEDULER,
    ],
  },
  ONBOARDING_PAGE: {
    comment: 'Allow Registration View',
    allowedGroups: [
      ACCESS_GROUP_NAMES.GUEST,
      ACCESS_GROUP_NAMES.GUESTTHIRDPARTY,
      ACCESS_GROUP_NAMES.SALES,
      ACCESS_GROUP_NAMES.THIRDPARTY,
      ACCESS_GROUP_NAMES.GUESTSCHEDULER,
    ],
  },
  ONBOARDING: {
    comment: 'Show Onboarding Page',
    allowedGroups: [
      ACCESS_GROUP_NAMES.GUEST,
      ACCESS_GROUP_NAMES.GUESTTHIRDPARTY,
      ACCESS_GROUP_NAMES.GUESTSCHEDULER,
      ACCESS_GROUP_NAMES.THIRDPARTY,
    ],
  },
  TRANSACTION_URL: {
    comment: 'Allow Transaction View',
    allowedGroups: [
      ...COMMON_ACCESS,
      ACCESS_GROUP_NAMES.CUSTOMER,
      ACCESS_GROUP_NAMES.GUEST,
      ACCESS_GROUP_NAMES.GUESTSCHEDULER,
    ],
  },
  LEGAL_NAME_IN_ENGLISH_COLUMN_IN_TRANSACTIONS_TAB: {
    comment: 'Show Legal name in English Column',
    allowedGroups: [...COMMON_ACCESS],
  },
  AQUIRER_MID_MERCHANT_PRODUCT_DETAIL: {
    comment: 'Show Acquirer Mid in Merchant producat detail',
    allowedGroups: [...COMMON_ACCESS, ACCESS_GROUP_NAMES.CUSTOMER],
  },
  ACQUIRER_COLUMN_IN_TRANSACTIONS_TAB: {
    comment: 'Show Acquirer Column',
    allowedGroups: [...COMMON_ACCESS],
  },
  V2DASMID_COLUMN_IN_TRANSACTIONS_TAB: {
    comment: 'Show Acquirer Column',
    allowedGroups: [...COMMON_ACCESS],
  },
  V2ID_IN_TRANSACTION_DETAILS: {
    comment: 'Show Acquirer Column',
    allowedGroups: [...COMMON_ACCESS],
  },
  REQUEST_ID_IN_TRANSACTION_DETAILS: {
    comment: 'Show Acquirer Column',
    allowedGroups: [ACCESS_GROUP_NAMES.SUPPORT],
  },
  COMPANY_NAME_IN_ENGLISH_IN_TRANSACTION_DETAILS: {
    comment: 'Show Acquirer Column',
    allowedGroups: [...COMMON_ACCESS],
  },
  HASH_CARD_DETAILS_IN_TRANSACTION_DETAILS: {
    comment: 'Show HASH card details',
    allowedGroups: [ACCESS_GROUP_NAMES.RISK],
  },
  HASH_CARD_DETAILS_IN_TRANSACTION_DETAILS_ACCESS: {
    comment: 'Show HASH card details',
    allowedGroups: [ACCESS_GROUP_NAMES.RISK,ACCESS_GROUP_NAMES.SUPPORT,ACCESS_GROUP_NAMES.SETTLEMENT],
  },
  HASH_CARD_ADD_FROM_TRANSACTION_DETAILS_ACCESS: {
    comment: 'Show HASH card details',
    allowedGroups: [ACCESS_GROUP_NAMES.SUPPORT,ACCESS_GROUP_NAMES.SETTLEMENT],
  },
  MERCHANT_URL: {
    comment: 'Allow Merchant View',
    allowedGroups: [
      ...COMMON_ACCESS,
      ACCESS_GROUP_NAMES.GUEST,
      ACCESS_GROUP_NAMES.CUSTOMER,
      ACCESS_GROUP_NAMES.THIRDPARTY,
      ACCESS_GROUP_NAMES.GUESTSCHEDULER,
    ],
  },
  ENTITY_URL: {
    comment: 'Allow Entity View',
    allowedGroups: [
      ACCESS_GROUP_NAMES.RISK,
      ACCESS_GROUP_NAMES.FRAUD,
      ACCESS_GROUP_NAMES.COMPLIANCE,
      ACCESS_GROUP_NAMES.SUPPORT,
    ],
  },
  ACQUIRERS_URL: {
    comment: 'Allow Acquirer View',
    allowedGroups: [...COMMON_ACCESS],
  },
  STATEMENTS_URL: {
    comment: 'Allow Statements View',
    allowedGroups: [
      ...COMMON_ACCESS,
      ACCESS_GROUP_NAMES.CUSTOMER,
      ACCESS_GROUP_NAMES.GUEST,
      ACCESS_GROUP_NAMES.GUESTSCHEDULER,
    ],
  },
  STATEMENTS_DETAIL_URL: {
    comment: 'Allow Statements Detail View',
    allowedGroups: [
      ACCESS_GROUP_NAMES.SETTLEMENT,
      ACCESS_GROUP_NAMES.SUPPORT,
    ],
  },
  DISPUTE_MANAGEMENT_URL: {
    comment: 'Allow Dispute Management View',
    allowedGroups: [
      ...COMMON_ACCESS,
      ACCESS_GROUP_NAMES.CUSTOMER,
      ACCESS_GROUP_NAMES.GUEST,
      ACCESS_GROUP_NAMES.GUESTSCHEDULER
    ],
  },
  SALES_LEAD_URL: {
    comment: 'Allow Sales Lead View',
    allowedGroups: [
      ACCESS_GROUP_NAMES.SALES,
      ACCESS_GROUP_NAMES.SALESOPS,
      ACCESS_GROUP_NAMES.GUESTTHIRDPARTY,
      ACCESS_GROUP_NAMES.THIRDPARTY
    ],
  },
  PARTNER_URL: {
    comment: 'Allow Partner View',
    allowedGroups: [
      ...COMMON_ACCESS,
      ACCESS_GROUP_NAMES.GUESTTHIRDPARTY,
    ],
  },
  CONTACT_US_URL: {
    comment: 'Allow Merchant View',
    allowedGroups: [ACCESS_GROUP_NAMES.CUSTOMER],
  },
  MENU_APP_BAR: {
    comment: 'Allow Header Bar to Role base',
    allowedGroups: [...COMMON_ACCESS],
  },
  TRANSACTION_ACTION_BUTTON: {
    comment: 'Allow Button for Transactions',
    allowedGroups: TRANSACTIONS_BUTTON,
  },
  // TRANSACTION_I_ACTION_REFUND: {
  //   comment: 'Allow Refund Button for Transactions',
  //   allowedGroups: [...TRANSACTIONS_BUTTON],
  // },
  // TRANSACTION_I_ACTION_VOID: {
  //   comment: 'Allow Refund Button for Transactions',
  //   allowedGroups: [...TRANSACTIONS_BUTTON],
  // },
  EDIT_STATUS_BUTTON: {
    comment: 'Allow Refund Button for Transactions',
    allowedGroups: [...TRANSACTIONS_EDIT_BUTTON],
  },
  DISPUTE_DETAIL_EDIT_BUTTON:{
    comment: 'Allow Button for Dispute',
    allowedGroups: [...DISPUTE_EDIT_BUTTON],
  },
  TRANSACTION_SEARCH_FILTER: {
    comment: 'Allow Search Filter for Transactions',
    allowedGroups: [...COMMON_ACCESS],
  },
  TRANSACTION_DOWNLOAD_REPORT_BUTTON: {
    comment: 'Allow Download CSV access for Transactions',
    allowedGroups: [...COMMON_ACCESS],
  },
  TRANSACTION_I_ACTION_DETAILS: {
    comment: 'Allow view of details for Transactions',
    allowedGroups: [...COMMON_ACCESS],
  },
  ADD_RISK_CONTROL: {
    comment: 'Allow view of details for Transactions',
    allowedGroups: [
      ACCESS_GROUP_NAMES.RISK,
      ACCESS_GROUP_NAMES.FRAUD,
      ACCESS_GROUP_NAMES.SUPPORT,
    ],
  },
  ADD_ACQUIRER: {
    comment: 'Allow view of details for Transactions',
    allowedGroups: [
      ACCESS_GROUP_NAMES.RISK,
      ACCESS_GROUP_NAMES.FRAUD,
      ACCESS_GROUP_NAMES.SUPPORT,
    ],
  },

  // Pages
  REGISTRATION_PAGE: {
    comment: 'Allow view of Registration Page',
    allowedGroups: [ACCESS_GROUP_NAMES.GUEST],
  },
  TRANSACTION_RESULT_PAGE: {
    comment: 'Allow view of Transactions Page',
    allowedGroups: [...COMMON_ACCESS, ACCESS_GROUP_NAMES.CUSTOMER,ACCESS_GROUP_NAMES.THIRDPARTY],
  },
  MERCHANTS_PAGE: {
    comment: 'Allow view of Transactions Page',
    allowedGroups: [
      ...COMMON_ACCESS,
      ACCESS_GROUP_NAMES.CUSTOMER,
      ACCESS_GROUP_NAMES.THIRDPARTY
    ],
  },
  SALES_LEAD_ACCESS: {
    comment: 'Allow view of Sales Lead Page',
    allowedGroups: [
      ACCESS_GROUP_NAMES.SALES,
      ACCESS_GROUP_NAMES.THIRDPARTY,
      ACCESS_GROUP_NAMES.GUESTTHIRDPARTY
    ],
  },
  // =================================
  PRODUCT_RISK_ICON: {
    comment: 'Allow Risk Drawer Access',
    allowedGroups: [
      ACCESS_GROUP_NAMES.RISK,
      ACCESS_GROUP_NAMES.FRAUD,
      ACCESS_GROUP_NAMES.COMPLIANCE,
      ACCESS_GROUP_NAMES.SUPPORT,
    ],
  },
  PBL_CONTROL_ICON: {
    comment: 'Allow Risk Drawer Access',
    allowedGroups: [ACCESS_GROUP_NAMES.CUSTOMER, ACCESS_GROUP_NAMES.SUPPORT],
  },
  DISPUTE_TRANSACTION_ACCESS: {
    comment: 'Allow Dispute Button Access',
    allowedGroups: [ACCESS_GROUP_NAMES.SETTLEMENT, ACCESS_GROUP_NAMES.SUPPORT],
  },
  SUBSCRIPTION_CONTROL_ICON: {
    comment: 'Allow Subscription Drawer Access',
    allowedGroups: [ACCESS_GROUP_NAMES.CUSTOMER, ACCESS_GROUP_NAMES.SUPPORT],
  },
  SETTLEMETS_APPROVAL_BUTTON: {
    comment: 'Show approve button',
    allowedGroups: [
      ACCESS_GROUP_NAMES.SETTLEMENT,
      ACCESS_GROUP_NAMES.FINANCE,
      ACCESS_GROUP_NAMES.OPS,
      ACCESS_GROUP_NAMES.OPERATIONS,
    ],
  },
  CHARGEBACK_COMPLETED: {
    comment: 'Allow Access',
    allowedGroups: [
      ACCESS_GROUP_NAMES.SETTLEMENT,
      ACCESS_GROUP_NAMES.SUPPORT,
      ACCESS_GROUP_NAMES.OPERATIONS,
      ACCESS_GROUP_NAMES.SALES,
      ACCESS_GROUP_NAMES.SALESOPS,
      // ACCESS_GROUP_NAMES.CUSTOMER,
    ],
  },
  CHARGEBACK_CASE_INTERNAL: {
    comment: 'Allow Access',
    allowedGroups: [
      ACCESS_GROUP_NAMES.SETTLEMENT,
      ACCESS_GROUP_NAMES.SUPPORT,
      ACCESS_GROUP_NAMES.OPERATIONS,
      ACCESS_GROUP_NAMES.SALES,
      ACCESS_GROUP_NAMES.SALESOPS,
    ],
  },
  CHARGEBACK_CUST_SUBMIT_EVIDENCE: {
    comment: 'Allow Access',
    allowedGroups: [ACCESS_GROUP_NAMES.MERCHANT, ACCESS_GROUP_NAMES.CUSTOMER],
  },
  ACTION_DISPUTE_BUTTONS: {
    comment: 'Allow Access',
    allowedGroups: [
      ACCESS_GROUP_NAMES.SETTLEMENT,
      ACCESS_GROUP_NAMES.SUPPORT,
      ACCESS_GROUP_NAMES.OPERATIONS,
    ],
  },
  ACTION_IP_WHITELIST_BUTTONS: {
    comment: 'Allow Access',
    allowedGroups: [
      ACCESS_GROUP_NAMES.SALES,
      ACCESS_GROUP_NAMES.SALESOPS,
      ACCESS_GROUP_NAMES.SUPPORT,
    ],
  },
  CHARGEBACK_ACCEPT_CHALLENGE_BUTTON: {
    comment: 'Allow Access',
    allowedGroups: [ACCESS_GROUP_NAMES.MERCHANT, ACCESS_GROUP_NAMES.CUSTOMER],
  },
  PUBLIC_HOLIDAY_ACTION: {
    comment: 'Allow Access',
    allowedGroups: [
      ACCESS_GROUP_NAMES.SETTLEMENT,
      ACCESS_GROUP_NAMES.SALESOPS,
      ACCESS_GROUP_NAMES.CUSTOMER,
      ACCESS_GROUP_NAMES.RISK,
      ACCESS_GROUP_NAMES.FRAUD,
      ACCESS_GROUP_NAMES.THIRDPARTY,
      ACCESS_GROUP_NAMES.SALES,
    ],
  },
  SETTLEMETS_MERCHANT_BUTTONS: {
    comment: 'Allow Access',
    allowedGroups: [
      ACCESS_GROUP_NAMES.SETTLEMENT,
      ACCESS_GROUP_NAMES.FINANCE_OPS,
      ACCESS_GROUP_NAMES.OPERATIONS,
    ],
  },
  SUPPORT_CUSTOMER: {
    comment: 'Allow Access',
    allowedGroups: [ACCESS_GROUP_NAMES.SUPPORT, ACCESS_GROUP_NAMES.CUSTOMER],
  },
  ADMIN_EDITOR: {
    comment: 'Allow Access',
    allowedGroups: [ACCESS_GROUP_NAMES.ADMIN, ACCESS_GROUP_NAMES.EDITOR],
  },
  ADMIN: {
    comment: 'Allow Access',
    allowedGroups: [ACCESS_GROUP_NAMES.ADMIN],
  },
  ALL_USER_ACCESS:{
    comment: 'All groups access',
    allowedGroups:[...ALL_ACCESS],
  },
  VIEWER_USER_MANAGEMENT: {
    comment: 'Allow Access',
    allowedGroups: [ACCESS_GROUP_NAMES.VIEWER],
  },
  SALES_SUPPORT_SALESOPS: {
    comment: 'Allow Access',
    allowedGroups: [...SALES_ACCESS],
  },
  SALES_SUPPORT_SALESOPS_PERMISSION: {
    comment: 'Allow Access',
    allowedGroups: [ACCESS_GROUP_NAMES.SUPPORT, ACCESS_GROUP_NAMES.SALES, ACCESS_GROUP_NAMES.SALESOPS],
  },
  TRANSACTION_ACTION_BUTTONS: {
    comment: 'Allow Access',
    allowedGroups: [ACCESS_GROUP_NAMES.SUPPORT, ACCESS_GROUP_NAMES.SETTLEMENT],
  },
  SYSADMIN: {
    comment: 'Allow Access',
    allowedGroups: [ACCESS_GROUP_NAMES.SYSADMIN],
  },
  SETTLEMENT_ACCESS: {
    comment: 'Allow Access',
    allowedGroups: [ACCESS_GROUP_NAMES.SETTLEMENT],
  },
  SHOW_API_KEY_SECTION: {
    comment: 'Allow Entity View',
    allowedGroups: [
      ACCESS_GROUP_NAMES.SALES,
      ACCESS_GROUP_NAMES.SALESOPS,
      ACCESS_GROUP_NAMES.FRAUD,
      ACCESS_GROUP_NAMES.RISK,
      ACCESS_GROUP_NAMES.COMPLIANCE,
      ACCESS_GROUP_NAMES.SUPPORT,
      ACCESS_GROUP_NAMES.SETTLEMENT,
      ACCESS_GROUP_NAMES.FINANCE,
      ACCESS_GROUP_NAMES.OPERATIONS,
    ],
  },
  CUSTOMER: {
    comment: 'Allow view of Registration Page',
    allowedGroups: [ACCESS_GROUP_NAMES.CUSTOMER],
  },
  INTERNAL: {
    comment: 'Show Legal name in English Column',
    allowedGroups: [...COMMON_ACCESS],
  },
  SALES_SUPPORT_SALESOPS_CUSTOMER: {
    comment: 'Allow Access',
    allowedGroups: [...SALES_ACCESS, ACCESS_GROUP_NAMES.CUSTOMER],
  },
  THIRDPARTY: {
    comment: 'Allow Access',
    allowedGroups: [
      ACCESS_GROUP_NAMES.THIRDPARTY,
    ],
  },
  SUPPORT: {
    comment: 'Allow Access',
    allowedGroups: [
      ACCESS_GROUP_NAMES.SUPPORT,
    ],
  },
  SALES_SALEOPS: {
    comment: 'Allow Access for sales and salesops',
    allowedGroups: [
      [ACCESS_GROUP_NAMES.SALES,ACCESS_GROUP_NAMES.SALESOPS],
    ],
  },
  SALES_ACCESS_ROLE: {
    comment: 'Allow Access for sales and salesops',
    allowedGroups: 
      [ACCESS_GROUP_NAMES.SALES],
  },
  SALES_GUESTTHIRDPARTY_ACCESS_ROLE: {
    comment: 'Allow Access for sales and salesops',
    allowedGroups: 
      [ACCESS_GROUP_NAMES.SALES,ACCESS_GROUP_NAMES.GUESTTHIRDPARTY]
  },
  GUESTTHIRDPARTY_ACCESS_ROLE: {
    comment: 'Allow Access for sales and salesops',
    allowedGroups: 
      [ACCESS_GROUP_NAMES.GUESTTHIRDPARTY]
  },
  SUPPORT_AND_CUSTOMER: {
    comment: 'Allow Access Scheduler Button',
    allowedGroups: 
      [ACCESS_GROUP_NAMES.CUSTOMER, ACCESS_GROUP_NAMES.SUPPORT,]
  },
  CHARGEBACK_MISSINFO: {
    comment: 'Allow Access for charge-back and missing-info',
    allowedGroups: [
      ACCESS_GROUP_NAMES.SALES,
      ACCESS_GROUP_NAMES.SETTLEMENT,
      ACCESS_GROUP_NAMES.SALESOPS,
      ACCESS_GROUP_NAMES.RISK,
      ACCESS_GROUP_NAMES.FRAUD,
      ACCESS_GROUP_NAMES.COMPLIANCE,
      ACCESS_GROUP_NAMES.SUPPORT,
      ACCESS_GROUP_NAMES.OPS,
    ],
  },
  PARTNER_NAME_ACCESS: {
    comment: 'Allow Access for Partner name',
    allowedGroups: [
      ACCESS_GROUP_NAMES.SALES,
      ACCESS_GROUP_NAMES.SETTLEMENT,
      ACCESS_GROUP_NAMES.SALESOPS,
      ACCESS_GROUP_NAMES.RISK,
      ACCESS_GROUP_NAMES.FRAUD,
      ACCESS_GROUP_NAMES.COMPLIANCE,
      ACCESS_GROUP_NAMES.SUPPORT,
      ACCESS_GROUP_NAMES.OPS,
      ACCESS_GROUP_NAMES.CUSTOMER,
    ],
  },
};
