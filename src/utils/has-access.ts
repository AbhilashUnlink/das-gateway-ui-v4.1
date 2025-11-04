import { PERMISSION } from "../components/constants/permission";
import { ACCESS_GROUP_NAMES } from "../components/constants/access-group-name";
import { store } from "../store/store";

export const hasAccess = (accessKey: IAccessKey, customerAccessKey?: any) => {
  let isAccess = false;
  const Profile = store.getState()?.auth?.profile;
  const role = Profile?.Groups;
  const accessLevel = Profile?.accessLevel;

  if (accessKey && customerAccessKey) {
    role?.forEach((roleItem: IRole) => {
      if (
        PERMISSION[accessKey]?.allowedGroups?.includes(roleItem) ||
        ([ACCESS_GROUP_NAMES.CUSTOMER].includes(roleItem) &&
          PERMISSION[customerAccessKey]?.allowedGroups?.includes(accessLevel))
      ) {
        isAccess = true;
      }
    });
    return isAccess;
  } else {
    if (role) {
      role?.forEach((roleItem: IRole) => {
        if (PERMISSION[accessKey]?.allowedGroups?.includes(roleItem)) {
          isAccess = true;
        }
      });
    }
    return isAccess;
  }
};

// User roles types are defined here
type IRole =
  | "SALES"
  | "SALESOPS"
  | "RISK"
  | "FRAUD"
  | "COMPLIANCE"
  | "SUPPORT"
  | "SETTLEMENT"
  | "FINANCE"
  | "OPS"
  | "GUEST"
  | "CUSTOMER"
  | "OPERATIONS"
  | "GUESTSCHEDULER";

// URL, buttons and pages access are defined here
export type IAccessKey =
  | "GUEST"
  | "REGISTRATION_URL"
  | "MISSING_INFO_UPLOAD_BUTTON"
  | "TRANSACTION_PAGE"
  | "TRANSACTION_URL"
  | "LEGAL_NAME_IN_ENGLISH_COLUMN_IN_TRANSACTIONS_TAB"
  | "AQUIRER_MID_MERCHANT_PRODUCT_DETAIL"
  | "ACQUIRER_COLUMN_IN_TRANSACTIONS_TAB"
  | "V2DASMID_COLUMN_IN_TRANSACTIONS_TAB"
  | "V2ID_IN_TRANSACTION_DETAILS"
  | "REQUEST_ID_IN_TRANSACTION_DETAILS"
  | "COMPANY_NAME_IN_ENGLISH_IN_TRANSACTION_DETAILS"
  | "HASH_CARD_DETAILS_IN_TRANSACTION_DETAILS"
  | "HASH_CARD_DETAILS_IN_TRANSACTION_DETAILS_ACCESS"
  | "ENTITY_URL"
  | "ACQUIRERS_URL"
  | "STATEMENTS_URL"
  | "DISPUTE_MANAGEMENT_URL"
  | "SALES_LEAD_URL"
  | "MENU_APP_BAR"
  | "TRANSACTION_ACTION_BUTTON"
  | "TRANSACTION_SEARCH_FILTER"
  | "TRANSACTION_DOWNLOAD_REPORT_BUTTON"
  | "EDIT_STATUS_BUTTON"
  | "TRANSACTION_I_ACTION_DETAILS"
  | "ADD_RISK_CONTROL"
  | "ADD_ACQUIRER"
  | "TRANSACTION_RESULT_PAGE"
  | "MERCHANTS_PAGE"
  | "PRODUCT_RISK_ICON"
  | "PBL_CONTROL_ICON"
  | "SETTLEMETS_APPROVAL_BUTTON"
  | "ONBOARDING_PAGE"
  | "PBL_CONTROL_ICON"
  | "CHARGEBACK_COMPLETED"
  | "CHARGEBACK_CASE_INTERNAL"
  | "CHARGEBACK_CUST_SUBMIT_EVIDENCE"
  | "ACTION_DISPUTE_BUTTONS"
  | "CHARGEBACK_ACCEPT_CHALLENGE_BUTTON"
  | "SUBSCRIPTION_CONTROL_ICON"
  | "SETTLEMETS_MERCHANT_BUTTONS"
  | "CONTACT_US_URL"
  | "VIEWER_USER_MANAGEMENT"
  | "ADMIN_EDITOR"
  | "TRANSACTION_ACTION_BUTTONS"
  | "SHOW_API_KEY_SECTION"
  | "CUSTOMER"
  | "INTERNAL"
  | "SALES_SUPPORT_SALESOPS"
  | "ADMIN"
  | "SALES_SUPPORT_SALESOPS_CUSTOMER"
  | "THIRDPARTY"
  | "SUPPORT"
  | "SALES_SALEOPS"
  | "ALL_USER_ACCESS"
  | "SYSADMIN"
  | "SUPPORT_CUSTOMER"
  | "SETTLEMENT_ACCESS"
  | "SALES_SUPPORT_SALESOPS_PERMISSION"
  | "PARTNER_NAME_ACCESS"
  | "SALES_LEAD_ACCESS"
  | "SALES_ACCESS_ROLE"
  | "PUBLIC_HOLIDAY_ACTION"
  | "SALES_GUESTTHIRDPARTY_ACCESS_ROLE"
  | "GUESTTHIRDPARTY_ACCESS_ROLE"
  | "SUPPORT_AND_CUSTOMER"
  | "ALL_GUEST_ROLES"
  | "HASH_CARD_ADD_FROM_TRANSACTION_DETAILS_ACCESS"
  | "ACTION_IP_WHITELIST_BUTTONS";
