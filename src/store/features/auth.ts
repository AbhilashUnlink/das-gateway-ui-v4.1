import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getUserProfile,
  getUserMFA,
  getVerifyUserMFA,
  getVerifyUserMFAFirstTime,
} from "../../pages/authentication/login/components/api";
import { AUTHENTICATION } from "../../components/constants/api-paths";
import { useFetchWrapper as Api } from "../../utils";
import { jwtDecode } from "jwt-decode";
import { decryptString, encryptString } from "utils/helper";
import { HTTP_STATUS } from "components/constants";
import { setDasmidOptions, setMerchantData, setPaymentLoggroup, setReasonCodeList, setSalesLeadFilterMerchant, setSalesLeadFilterPartner, setUserPreference } from "./gateway-config";
import { startLoader, stopLoader } from "./loader";
import { handleAfterSignIn } from "utils/auth-helpers";

export const saveProfile: any = createAsyncThunk<any, any>(
  "auth/saveProfile",
  async (values, { dispatch, rejectWithValue }) => {
    try {
      dispatch(startLoader());

      const signInData = await getUserProfile(values);

      // pure helper returns preference + das options
      const { userPreference, dasOptions } = await handleAfterSignIn(
        signInData
      );

      // Dispatch user preference (if available)
      if (userPreference) {
        dispatch(setUserPreference(userPreference));
      }

      // Dispatch das/gateway options (if available)
      if (dasOptions) {
        const {
          reasonCodeData,
          merchantData,
          dasmidList,
          v2dasmidList,
          isV2MerchantFlag,
          acquirerCode,
          acquirerMIDData,
          paymentLoggroup,
          salesLeadData,
        } = dasOptions;

        if (reasonCodeData) dispatch(setReasonCodeList(reasonCodeData));
        if (merchantData) dispatch(setMerchantData(merchantData));
        if (dasmidList) dispatch(setDasmidOptions(dasmidList));
        if (acquirerCode) localStorage.setItem("acquirerCode", acquirerCode);
        if (acquirerMIDData)
          localStorage.setItem("acquirerMIDData", acquirerMIDData);
        if (paymentLoggroup) dispatch(setPaymentLoggroup(paymentLoggroup));
        if (salesLeadData?.Merchant)
          dispatch(setSalesLeadFilterMerchant(salesLeadData?.Merchant));
        if (salesLeadData?.Partner)
          dispatch(setSalesLeadFilterPartner(salesLeadData?.Partner));

        // v2 merchant flag logic
        if (isV2MerchantFlag) {
          const logginInAsMerchant = (signInData?.Groups || []).includes(
            "CUSTOMER"
          );
          if (logginInAsMerchant && signInData?.accessLevel === "ADMIN") {
            dispatch(setIsV2Merchant(true));
          } else if (!logginInAsMerchant) {
            dispatch(setIsV2Merchant(true));
          } else {
            dispatch(setIsV2Merchant(false));
          }

          // persist v2 list as string/array depending on original usage
          localStorage.setItem("v2DasmidOptions", JSON.stringify(v2dasmidList));
        }
      }

      // clear credentials stored in slice
      dispatch(resetUserCredentials());

      return signInData;
    } catch (err: any) {
      return rejectWithValue(err?.message ?? "Sign-in failed");
    } finally {
      dispatch(stopLoader());
    }
  }
);

async function generateMFA(email: any, password: string) {
  const payload = {
    Email: email,
    Password: password,
    path: "DASPOS",
  };

  try {
    const response = await Api().post(AUTHENTICATION.MFA_GENERATE_URL, payload);
    const mfaData = response.data;
    const QRCode = mfaData ? mfaData.qrcode : "";
    const MFAKEY = mfaData ? mfaData.secret : "No secret available";
    localStorage.setItem("QRCode", QRCode);
    localStorage.setItem("PrivateKey", MFAKEY);
    return { QRCode, MFAKEY };
  } catch (error) {
    console.error("API error:", error);
  }
}

export const checkMFA: any = createAsyncThunk(
  "auth/checkMFA",
  async ({ values, navigate }: any, { dispatch, getState }: any) => {
    const store = getState();
    const password = values?.password || decryptString(store?.auth?.password);
    const response = await getUserMFA(values);
    const data = response?.data;
    if (!data) {
      return;
    }
    const internvalUser = values.username?.includes("@paymentoptions.com");

    //Generate MFA QR
    const MFAData =
      !data?.IsMFA && (await generateMFA(values.username, password));

    function callLoginApi() {
      if ([HTTP_STATUS.OK].includes(response.statusCode)) {
        dispatch(saveProfile(values));
      } else {
        return;
      }
    }
    if (data?.IsMFA === 0) {
      if (internvalUser) {
        navigate("/mfa-setup");
      } else {
        callLoginApi();
      }
    } else if (data?.IsMFAEnabled === 1 && data?.IsMFA === 1) {
      navigate("/mfa-setup");
    } else {
      callLoginApi();
    }

    const result = {
      ...data,
      ...values,
      ...MFAData,
    };
    return result;
  }
);

export const verifyUserMFA: any = createAsyncThunk(
  "auth/verifyUserMFA",
  async (values: any) => {
    const data = await getVerifyUserMFA(values);
    return data;
  }
);

export const verifyMFAFirst: any = createAsyncThunk(
  "auth/verifyMFAFirstTime",
  async (values: any) => {
    const data = await getVerifyUserMFAFirstTime(values);
    return data;
  }
);

const initialState: any = {
  profile: undefined,
  userType: "",
  isMerchant: false,
  isReseller: false,
  isV2Merchant: false,
  firstTimeLogin: false,
  dasmidOptions: [],
  username: "",
  password: "",
  emailOtpOfResetMfa: "",
  isMFAEnabled: false,
  isMFASetup: false,
  loggedInMerchant: false,
  QRCode: "",
  SecretKey: "",
};

// createSlice
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoginDetails: (state, action) => {
      state.profile = action?.payload;
      if (action?.payload?.Groups?.includes("GUEST")) {
        state.userType = "MERCHANT";
        state.isMerchant = true;
      } else if (action?.payload?.Groups?.includes("GUESTTHIRDPARTY")) {
        state.userType = "RESELLER";
        state.isReseller = true;
      } else {
        state.userType = "";
      }
    },
    resetProfile: (state) => {
      state.profile = undefined;
      state.userType = "";
      state.isMerchant = false;
      state.isReseller = false;
      state.isV2Merchant = false;
      state.firstTimeLogin = false;
      state.isMFAEnabled = undefined;
      state.isMFASetup = undefined;
      state.username = "";
      state.emailOtpOfResetMfa = "";
      state.password = "";
      state.loggedInMerchant = false;
      state.QRCode = "";
      state.SecretKey = "";
    },
    setIsV2Merchant: (state, action) => {
      state.isV2Merchant = action.payload;
    },
    setFirstTimeLogin: (state, action) => {
      state.firstTimeLogin = action.payload;
    },
    resetMFA: (state) => {
      state.isMFAEnabled = undefined;
      state.isMFASetup = undefined;
      state.QRCode = "";
      state.SecretKey = "";
    },
    setEmailOtpOfResetMfa: (state, action) => {
      state.emailOtpOfResetMfa = action.payload;
    },
    resetUserCredentials: (state) => {
      state.username = "";
      state.password = "";
      state.loggedInMerchant = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(saveProfile.fulfilled, (state, action) => {
      let jwtdecodeData: any = jwtDecode(action.payload.token.idToken);
      let merchantID: any = jwtdecodeData["custom:MerchantID"] || "";
      state.profile = { ...action.payload, merchantId: merchantID };
      state.firstTimeLogin = action.payload?.reset || false;
      if (action?.payload?.Groups?.includes("GUEST")) {
        state.userType = "MERCHANT";
        state.isMerchant = true;
      } else if (action?.payload?.Groups?.includes("GUESTTHIRDPARTY")) {
        state.userType = "RESELLER";
        state.isReseller = true;
      } else {
        state.userType = "";
      }
      if (
        action?.payload?.Groups?.includes("GUEST") ||
        action?.payload?.Groups?.includes("GUESTTHIRDPARTY") ||
        action?.payload?.Groups?.includes("CUSTOMER") ||
        action?.payload?.Groups?.includes("GUESTSCHEDULER") ||
        action?.payload?.Groups?.includes("THIRDPARTY")
      ) {
        state.loggedInMerchant = true;
      }
    });

    builder.addCase(checkMFA.fulfilled, (state, action) => {
      let isMFAEnabled: any = action.payload.IsMFAEnabled;
      let isMFASetup: any = action.payload.IsMFA;
      state.username = action.payload.username;
      state.password = encryptString(action.payload.password);
      state.isMFAEnabled = isMFAEnabled;
      state.isMFASetup = isMFASetup;
      state.QRCode = action.payload.QRCode;
      state.SecretKey = action.payload.SecretKey;
    });
  },
});
export const authProfile = (state: any) => state?.auth?.profile;
export const authToken = (state: any) => state?.auth?.profile?.token;
export const isV2Merchant = (state: any) => state?.auth?.isV2Merchant;
export const firstTimeLogin = (state: any) => state?.auth?.firstTimeLogin;
export const authGroups = (state: any) => state?.auth?.profile?.Groups;
export const authEmail = (state: any) => state?.auth?.profile?.email;
export const authName = (state: any) => state?.auth?.profile?.name;
export const authAppLevel = (state: any) => state?.auth?.profile?.appLevel;
export const authUserRole = (state: any) => state?.auth?.profile?.accessLevel;
export const isMFAEnabled = (state: any) => state?.auth?.isMFAEnabled;
export const isMFASetup = (state: any) => state?.auth?.isMFASetup;
export const isMFAUsername = (state: any) => state?.auth?.username;
export const isMFAPassword = (state: any) => state?.auth?.password;
export const getEmailOtpOfResetMfa = (state: any) =>
  state?.auth?.emailOtpOfResetMfa;
export const authSubsidiaries = (state: any) =>
  state?.auth?.profile?.subsidiaries;
export const authLastLogin = (state: any) =>
  state?.auth?.profile?.auth_time * 1000;
export const {
  resetProfile,
  setLoginDetails,
  setIsV2Merchant,
  setFirstTimeLogin,
  resetMFA,
  setEmailOtpOfResetMfa,
  resetUserCredentials,
} = authSlice.actions;
