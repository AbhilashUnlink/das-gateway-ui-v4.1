export const AUTHENTICATION = {
  LOGIN_API: 'auth/signIn/',
  FORGOT_PASSWORD_API: 'auth/forgotPassword',
  RESET_PASSWORD_API: 'auth/forgotPasswordVerify',
  SIGN_OUT: 'auth/signOut/',
  FIRST_LOGIN_RESET_PASSWORD_API: 'auth/reset/',
  MFA_GENERATE_URL: 'auth/mfa/generate',
  MFA_VERIFY_OTP_FIRST_URL: 'auth/mfa/verify/gateway/registration/otp',
  MFA_VERIFY_OTP_URL: 'auth/mfa/verify/gateway/otp',
  CHECK_MFA_EXIST_URL: 'auth/check-mfa-exist',
  RESET_MFA_PRIVATE_URL: 'auth/mfa/reset-mfa',
  RESET_MFA_SEND_OTP: 'auth/mfa/email/verify',
};

export const CONFIGURATION_API = 'dasconfig/gateway-configuration';
export const DASCONFIG_SUBSIDARY_LIST = "dasconfig/subsidiary-list";

export const VERIFY_EMAIL_API = 'onboarding/verify-email';
export const RESEND_OTP_API = 'onboarding/resent-otp';
export const VERIFY_OTP_API = 'onboarding/verify-otp';
export const REGISTER_API = 'onboarding/register';
export const REGISTER_DETAIL_API = 'onboarding/application';
export const SUBMIT_API = 'onboarding/application/submit';
export const DELETE_API = 'onboarding/application/disagree';
export const DOWNLOAD_URL = 'onboarding/download';
export const ADDITIONAL_INFO_REQUEST_API_URL = "onboarding/application/addtl-info-req";
export const ADDITIONAL_INFO_API_URL = "onboarding/application/addtl-info-fulfil";
export const KYC_WEBHOOK_API_URL = "onboarding/webhook-update-kyc-status";
export const RETRY_KYC_API_URL = "onboarding/application/retry-kyc";

export const DASPPAY_TRANSACTION_DETAILS_API = 'pb-daspay';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const SALES_LEAD_DETAIL_API = (id: any) =>
  `onboarding/application/${id}`;

export const GET_ADDRESS_API = "onboarding/get-address";

export const TRANSACTION = {
  TABLE_API: 'transactions/list',
  TABLE_API_V2: 'transactions/listv2',
  CAPTURE_API: 'transactions/capture',
  REFUND_API: 'transactions/refund',
  TRANSACTION_INFO_QUERY: 'transactions',
  VOID_TRANSACTION: 'transactions/void',
  UPDATE_STATUS: 'transactions/update-status',
  REPORT_DOWNLOAD_API: 'reports/transactions/download-req-list',
  REQUEST_DOWNLOAD_API: 'reports/transactions/download-req',
  DOWNLOAD_URL_API: 'reports/transactions/get-file',
  TRANSACTION_STATS: 'transactions/stats'
};
export const TRANSACTION_LEGACY = {
  TABLE_API: 'transactions/legacy/list',
  REPORT_DOWNLOAD_API: 'reports/legacy/transactions/download-req-list',
  REQUEST_DOWNLOAD_API: 'reports/legacy/transactions/download-req',
  REFUND_API: 'transactions/legacy/refund',
  TRANSACTION_INFO_QUERY: 'transactions/legacy',
  UPDATE_STATUS: 'transactions/update-status',
  DOWNLOAD_URL_API: 'reports/legacy/transactions/get-file'
};
export const RISK = {
  TABLE_API: 'dasconfig/rules/subsidiary',
  DELETE_RECOERD: 'dasconfig/rules',
  ADD_RULES: 'dasconfig/rules/upsert',
  GET_REFUND_DATA: 'dasconfig/rules/refundRuleDetails',
};
export const PRODUCT_RISK = {
  TABLE_API: 'dasconfig/rules/',
  SUBMIT: 'dasconfig/rules/upsert',
  UPDATE_DASMID_STATUS: 'entities/product/updateDASMIDStatus',
  IMAGE_UPLOAD: 'paybylink/image/upload',
};
export const MERCHANT_DETAILS = {
  PBL_TABLE_API: 'paybylink/order/list/DASMID',
  MERCHANT_LIST: 'entities/merchant/',
  PRODUCT_DETAILS: 'entities/product',
  GENERATE_LINK: 'paybylink/add/DASMID',
  REGENERATE_LINK: 'paybylink/DASMID',
  PBL_CART_TABLE: 'paybylink/order/DASMID',
  MERCHANT_CATALOG_CATEGORY_LIST: 'entities/merchant/catalog/all-categories/',
  ADD_MERCHANT_CATALOG_CATEGORY: 'entities/merchant/catalog/categories',
  MERCHANT_CATALOG_PRODUCTS_LIST: 'entities/merchant/catalog/all-products/',
  ADD_MERCHANT_CATALOG_PRODUCTS: 'entities/merchant/catalog/products',
  UPLOAD_MERCHANT_CATALOG_PRODUCTS: 'entities/merchant/catalog/upload-products-images',
  MERCHANT_IP_WHITELIST_LIST: 'entities/merchant/merchant-ip/',
  ADD_EDIT_DELETE_MERCHANT_IP_WHITELIST_LIST: 'entities/merchant/merchant-ip',
  MERCHANT_IP_WHITELIST_COMMENTS: 'entities/merchant/merchant-ip/info',
  MERCHANT_WEBHOOK_LIST: 'entities/merchant/webhook',
};

export const SUBSCRIPTIONS = {
  SUBSCRIPTIONS_PLANS_LIST: 'entities/recurring/plan/list',
  SUBSCRIPTIONS_LIST: 'entities/recurring/subscription/list',
  SUBSCRIBERS_LIST: 'entities/recurring/subscriber/list',
  CREATE_SUBSCRIPTION_PLAN: 'entities/recurring/plan/createPlan',
  VIEW_SUBSCRIPTION_PLAN_DETAILS: 'entities/recurring/plan',
  VIEW_SUBSCRIBER_DETAILS: 'entities/recurring/subscriber',
  EDIT_SUBSCRIBER: 'entities/recurring/subscriber/edit',
  VIEW_SUBSCRIPTION_DETAILS: 'entities/recurring/subscription',
  DELETE_SUBSCRIPTION_PLAN: 'entities/recurring/plan/deletePlan',
  CANCEL_SUBSCRIPTION: 'entities/recurring/subscription/cancel',
  PAUSE_SUBSCRIPTION: 'entities/recurring/subscription/pause',
  EDIT_SUBSCRIPTION_PLAN: 'entities/recurring/plan/editPlan',
  CREATE_SUBSCRIPTION: 'entities/recurring/subscription/create',
  RESUME_SUBSCRIPTION: 'entities/recurring/subscription/resume',
  EDIT_SUBSCRIPTION: 'entities/recurring/subscription/edit',
};

//Contact Us
export const SUPPORT_TICKET = {
  SUPPOR_TICKET_PRODUCT_TYPE: 'entities/merchant/support-ticket/productType',
};
export const ADD_SUPPORT_TICKET = {
  ADD_SUPPORT_TICKET_INFOQUERY: 'entities/merchant/support-ticket',
};
export const SHARE_FEEDBACK_TICKET = {
  SHARE_FEEDBACK_TICKET_INFOQUERY: 'contact-us',
};
//Partner
export const PARTNER = {
  PARTNER_LIST_API: 'entities/reseller/list',
  PARTNER_DETAILS_API: 'entities/reseller/get',
  REFERRAL_MERCHANT_DETAILS: 'entities/reseller/get-referred-merchant/',
  SEND_REFERRAL_EMAIL: 'entities/reseller/sendReferralEmail',
  REFERRAL_CODE_DETAILS: 'entities/reseller/referral-code',
};

//Statement
export const STATEMENT = {
  STATEMENT_LIST: 'statements/list/',
  VIEW_MERCHANT_STATEMENT: 'statements/statement/reconcile-report/view',
  DOWNLOAD_STATEMENT: 'statements/statement/download',
  DOWNLOAD_MULTIPLE_STATEMENT: 'statements/statement/multiple-download',
  GENERATE_STATEMENT: 'statements/statement/regenerate',
  APPROVE_STATEMENT: 'statements/statement/approve',
  PUBLIC_HOLIDAY_LIST: 'statements/statement/holiday-list',
  UPLOAD_PUBLIC_HOLIDAY_LIST: 'statements/s3/upload-xlsx',
  STATEMENT_TRANSACTIONS: 'statements/statement/transactions-list',
  STATEMENT_TRANSACTION_SYNC: 'statements/statement/transaction-sync',
  STATEMENT_WHITELIST: 'statements/statement/transaction-whitelist'
};
export const STATEMENT_LEGACY = {
  STATEMENT_LIST: 'statements/legacy/list/',
  DOWNLOAD_STATEMENT: 'statements/legacy/statement/download',
  GENERATE_STATEMENT: 'statements/legacy/statement/regenerate',
  APPROVE_STATEMENT: 'statements/legacy/statement/approve',

};

//Acquirers
export const ACQUIRER = {
  ACQUIRER: 'acquirers',
  ACQUIRER_LIST: 'acquirers/list',
  ADD_ACQUIRER: 'acquirers/add',
  EDIT_ACQUIRER_MID: 'acquirers/acquirerMID',
  ACQUIRER_MID_DETAILS: 'acquirers/acquirer-mid',
};

//Sales Lead
export const SALESLEAD = {
  MERCHANT_APPLICATION_LIST: 'onboarding/application/list',
};

// Chargeback
export const CHARGEBACK = {
  TABLE_API: 'chargeback/transactions/list',
  CHARGEBACK_LIST: 'chargeback/list/',
  DOWNLOAD_CHARGEBACK: 'chargeback/download',
  ADD_CHARGEBACK: 'chargeback/add',
  UPLOAD_DOCUMENTS: 'chargeback/updateChargebackStatus',
  MISSING_INFO_UPLOAD: 'chargeback/uploadFile',
  MISSING_INFO_MSG: 'chargeback/message',
  CHARGEBACK_TRANSACTION_ID: 'chargeback/transactionId',
  CHARGEBACK_DETAILS: 'chargeback/ticket',
  CHARGEBACK_DETAILS_EDIT:'chargeback/update'
};
export const CHARGEBACK_LEGACY = {
  CHARGEBACK_LIST: 'chargeback/legacy/list/',
  DOWNLOAD_CHARGEBACK: 'chargeback/legacy/download',
  ADD_CHARGEBACK: 'chargeback/legacy/add',
  UPLOAD_DOCUMENTS: 'chargeback/legacy/updateChargebackStatus',
  MISSING_INFO_UPLOAD: 'chargeback/legacy/uploadFile',
  MISSING_INFO_MSG: 'chargeback/legacy/message',
  CHARGEBACK_TRANSACTION_ID: 'chargeback/legacy/transactionId',
  CHARGEBACK_DETAILS: 'chargeback/legacy/ticket',
};

// User Management

export const USER_MANAGEMENT = {
  USER_MANAGEMENT_LIST: 'entities/user-management/user',
  RESET_PASSWORD:'entities/user-management/user/resetPassword/',
  USER_STATUS:'entities/user-management/user/toggleUserStatus',
  ADD_USER_INFO_QUERY:'entities/user-management/user/add',
  UPDATE_PRIMARY_USER_PREFERENCES:'entities/user-management/user/primary-user-preferences'
};

export const HASH_CARD_NUMBER ={
  HASH_CARD: "hashcard/list",
  ADD_HASH_CARD: "hashcard/add",
};

//Transaction Workflow
export const DIRECT_API = {
  SERVICE_DIRECT_PAYMENT: 'logs/insights',
};