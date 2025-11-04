// src/utils/auth-helpers.ts
import { HTTP_STATUS } from "components/constants";
import { CONFIGURATION_API } from "components/constants/api-paths";
import {
  extraStatementList,
  extraTransactionList,
} from "components/constants/preference.c";
import { FILE_FORMATS_VALUES } from "pages/user-settings/file-format";
import { quickSort } from "./helper";
import { DATE_FORMATS_OPTIONS } from "components/constants/date-formats";

const guestGroups = ["GUEST", "GUESTSCHEDULER", "GUESTTHIRDPARTY"];

const baseUrl = `${
  import.meta.env.VITE_APP_API_URL || import.meta.env.VITE_API_URL
}`;

async function fetchWithAuth(endpoint: string, token: string) {
  const res = await fetch(`${baseUrl}/${endpoint}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-api-key":
        import.meta.env.VITE_X_API_KEY ||
        import.meta.env.REACT_APP_X_API_KEY ||
        "",
      Authorization: token,
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch ${endpoint}: ${res.statusText}`);
  }

  return res.json();
}

/**
 * Fetch user preference (returns the configuration object or defaults)
 */
export async function fetchUserPreference(idToken: string) {
  const response = await fetchWithAuth("dasconfig/user-preferences", idToken);
  const hasValidPreferences =
    response?.data?.[0]?.configuration?.formatType &&
    response?.data?.[0]?.configuration?.transactionList?.list?.default &&
    response?.data?.[0]?.configuration?.statementList?.list?.default;

  if (hasValidPreferences) {
    const { configuration } = response.data[0];
    const { transactionList, statementList } = configuration;

    return {
      userPreference: {
        ...configuration,
        transactionList: {
          ...transactionList,
          list: { ...transactionList.list, ...extraTransactionList },
        },
        statementList: {
          ...statementList,
          list: { ...statementList.list, ...extraStatementList },
        },
      },
    };
  }

  // defaults
  return {
    userPreference: {
      transactionList: {
        selected: "default",
        list: {
          default: { order: [], unChecked: [] },
          ...extraTransactionList,
        },
      },
      statementList: {
        selected: "default",
        list: {
          default: { order: [], unChecked: [] },
          ...extraStatementList,
        },
      },
      dateFormatType: DATE_FORMATS_OPTIONS.DATE_TIME_AM_PM,
      formatType: FILE_FORMATS_VALUES.EXCEL,
      currencyType: "USD",
    },
  };
}

/**
 * Fetch gateway / merchant config (returns an object with all data)
 */
export async function fetchDasMidOptions(
  idToken: string,
  groups: any,
  accessLevel: any
) {
  const response = await fetchWithAuth(CONFIGURATION_API, idToken);

  if (![HTTP_STATUS.OK].includes(response?.statusCode)) {
    return { ok: false, raw: response };
  }

  const responseData = response.data;
  const transformChargebackReasonCode = (input: any) => {
    const output: any = {};
    for (const key in input) {
      output[key] = input[key].map((item: any) => {
        const labelValue = `${item.ReasonCode} ${item.ReasonCodeDescription}`;
        return { label: labelValue, value: labelValue };
      });
    }
    return output;
  };

  const reasonCodeData = transformChargebackReasonCode(
    responseData?.chargebackReasonCode
  );

  const merchantData = responseData?.merchantData;
  const dasmidOptions = merchantData
    ? merchantData.map(({ DASMID }: any) => DASMID).flat(1)
    : [];
  const dasmidList =
    dasmidOptions && dasmidOptions.length > 0
      ? quickSort([...new Set(dasmidOptions)])
      : [];

  const v2DasmidOptions =
    merchantData
      ?.map(({ V2DASMID }: any) => V2DASMID)
      ?.flat(1)
      ?.filter(Boolean) || [];
  const IsV2Merchant = merchantData?.find((item: any) => item.IsV2Merchant);

  const v2dasmidList =
    v2DasmidOptions && v2DasmidOptions.length > 0
      ? [...new Set(v2DasmidOptions)]
      : [];

  const acquirerCode: any = responseData?.acquirers;
  const acquirerMIDData: any = quickSort(
    Object.values(responseData?.acquirerMIDData)?.flat(1) || []
  );

  const salesLeadData = responseData?.salesLeadData;

  return {
    ok: true,
    reasonCodeData,
    merchantData,
    dasmidList,
    v2dasmidList,
    isV2MerchantFlag: !!(v2dasmidList.length > 0 && IsV2Merchant),
    acquirerCode,
    acquirerMIDData,
    paymentLoggroup: responseData?.configData?.payment_loggroup,
    salesLeadData,
    raw: responseData,
  };
}

/**
 * Main helper used by the thunk — pure function, no redux imports.
 * Returns combined info to be dispatched by the thunk.
 */
export async function handleAfterSignIn(signInData: any) {
  const idToken = signInData?.token?.idToken;
  if (!idToken) throw new Error("Authentication failed: No token received");

  const groups = signInData?.Groups || [];
  const accessLevel = signInData?.accessLevel;

  // guest -> short-circuit (no further server calls)
  if (groups.some((g: string) => guestGroups.includes(g))) {
    return { signInData, userPreference: null, dasOptions: null };
  }

  // fetch data in parallel
  const [prefResult, dasResult] = await Promise.allSettled([
    fetchUserPreference(idToken),
    fetchDasMidOptions(idToken, groups, accessLevel),
  ]);

  const userPreference =
    prefResult.status === "fulfilled"
      ? prefResult.value.userPreference ?? null
      : null;
  const dasOptions =
    dasResult.status === "fulfilled" && dasResult.value.ok
      ? dasResult.value
      : null;

  return { signInData, userPreference, dasOptions };
}
