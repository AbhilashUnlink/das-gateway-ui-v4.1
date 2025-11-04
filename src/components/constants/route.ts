
export const LOGIN = '/login';
export const FORGOT_PASSWORD = '/forgot-password';
export const RESET_PASSWORD = '/reset-password';
export const RESET_SUCCESSFULL = '/reset-password-successfull';
export const CHOOSE_ACCOUNT_TYPE_PAGE = '/onboarding/choose-account';
export const SIGN_UP_PAGE = '/onboarding/sign-up';
export const MFA_SETUP = '/mfa-setup';
export const DASPPAY_TRANSACTION_DETAILS = '/daspay-transaction-details/:id';

export const ROUTE = {
  DASHBOARD: "dashboard",
  ONBOARDING: "onboarding",
  TRANSACTIONS: "transactions",
  MERCHANTS: "accounts/merchants",
  RISK: "rules/risk-management",
  ACQUIRERS: "accounts/acquirers",
  STATEMENTS: "finance/statements",
  DISPUTE: "dispute-management/list",
  SALES_LEAD: "onboarding/applications",
  PARTNER: "partner",
  CONTACT_US: "contact-us",
  RESELLER: 'reseller',
  LEGACY_TRANSACTIONS: "legacy-transactions",
  LEGACY_DISPUTE: "legacy-dispute-management/list",
  LEGACY_STATEMENTS: "finance/legacy/statements",
  RESET: "reset",
  CHANGEPASSWORD: "change-password",
  // STATEMENT_TRANSACTIONS: "statement-transactions",
  HASH_CARD: "hashcard",
  TRANSACTION_XRAY: "transaction-xray",
  USER_PREFERENCE: "user-settings",
  RULES: "rules",
  DASPPAY_TRANSACTION_DETAILS: "daspay-transaction-details",
};

export const MENU = {
  DASHBOARD: `/${ROUTE.DASHBOARD}`,
  ONBOARDING: `/${ROUTE.ONBOARDING}`,
  TRANSACTIONS: `/${ROUTE.TRANSACTIONS}`,
  MERCHANTS: `/${ROUTE.MERCHANTS}`,
  RISK: `/${ROUTE.RISK}`,
  ACQUIRERS: `/${ROUTE.ACQUIRERS}`,
  STATEMENTS: `/${ROUTE.STATEMENTS}`,
  DISPUTE: `/${ROUTE.DISPUTE}`,
  SALES_LEAD: `/${ROUTE.SALES_LEAD}`,
  PARTNER: `/${ROUTE.PARTNER}`,
  CONTACT_US: `/${ROUTE.CONTACT_US}`,
  RESELLER: `/${ROUTE.RESELLER}`,
  LEGACY_TRANSACTIONS: `/${ROUTE.LEGACY_TRANSACTIONS}`,
  LEGACY_DISPUTE: `/${ROUTE.LEGACY_DISPUTE}`,
  LEGACY_STATEMENTS: `/${ROUTE.LEGACY_STATEMENTS}`,
  RESET: `/${ROUTE.RESET}`,
  CHANGEPASSWORD: `/${ROUTE.CHANGEPASSWORD}`,
  USER_PREFERENCE: `/${ROUTE.USER_PREFERENCE}`,
  // STATEMENT_TRANSACTIONS: `/${ROUTE.STATEMENT_TRANSACTIONS}`,
  HASH_CARD: `/${ROUTE.HASH_CARD}`,
  RULES: `/${ROUTE.RULES}`,
};


