import { createSlice } from "@reduxjs/toolkit";
import { endOfDay, format, startOfDay, subDays } from "date-fns";
import { customSort } from "../../utils/helper";
import { FILE_FORMATS_VALUES } from "pages/user-settings/file-format";
// import { CURRENCY_FORMATS_OPTIONS } from "pages/user-settings/currency-type";
import { DATE_FORMATS_OPTIONS } from "components/constants/date-formats";

const initialState: any = {
  merchantData: [],
  legalNamesList: [],
  merchantIDList: [],
  reasonCodeList: [],
  allReasonCodes: [],
  dasmidOptions: [],
  initialFilter: "",
  unCheckedArray: [],
  userPreference: {
    formatType: FILE_FORMATS_VALUES.EXCEL,
    dateFormatType: DATE_FORMATS_OPTIONS.DATE_TIME_AM_PM,
    currencyType: "USD",
    emailNotifications: {
      chargeback: true,
      statement: true,
      emergencyHoliday: true,
      monthlyPublicHoliday: true,
    },
    transactionList: {
      selected: "default",
      list: {
        default: {
          order: [],
          unChecked: [],
        },
      },
    },
    statementList: {
      selected: "default",
      list: {
        default: {
          order: [],
          unChecked: [],
        },
      },
    },
  },
  subsidiaryList: [],
  deepLink: "",
  paymentLoggroup: null,
  salesLeadFilterMerchantData: [],
  salesLeadFilterPartnerData: [],
};
// createSlice
export const configSlice: any = createSlice({
  name: "config",
  initialState,
  reducers: {
    setDasmidOptions: (state, action) => {
      state.dasmidOptions = action.payload;
    },
    setDeepLink: (state, action) => {
      state.deepLink = action.payload;
    },
    setUnCheckedArray: (state, action) => {
      state.unCheckedArray = action.payload;
    },
    setUserPreference: (state, action) => {
      state.userPreference = action.payload;
    },
    setPaymentLoggroup: (state, action) => {
      state.paymentLoggroup = action.payload;
    },
    setMerchantData: (state, action) => {
      state.merchantData = action.payload;

      const legalNameList = action.payload?.map(({ LegalName }: any) => {
        return LegalName;
      });
      state.legalNamesList = customSort(legalNameList);

      const merchantIDList = action.payload?.map(({ MerchantID }: any) => {
        return MerchantID;
      });
      state.merchantIDList = merchantIDList;
    },
    setSalesLeadFilterMerchant: (state, action) => {
      state.salesLeadFilterMerchantData = action?.payload;
    },
    setSalesLeadFilterPartner: (state, action) => {
      state.salesLeadFilterPartnerData = action?.payload;
    },
    setReasonCodeList: (state, action) => {
      state.reasonCodeList = action.payload;
      state.allReasonCodes = Object.values(action.payload)?.flat(1);
    },
    setSubsidiaryList: (state, action) => {
      state.subsidiaryList = action.payload;
    },
    resetConfigData: (state) => {
      state.merchantData = [];
      state.legalNamesList = [];
      state.merchantIDList = [];
      state.reasonCodeList = [];
      state.allReasonCodes = [];
      state.dasmidOptions = [];
      state.paymentLoggroup = {};
      state.initialFilter = "";
      state.deepLink = "";
      state.unCheckedArray = [];
      state.listViewConfiguration = [];
      state.subsidiaryList = [];
    },
    setInitialFilter: (state) => {
      if (state.initialFilter) {
        return;
      } else {
        const startDate = format(
          startOfDay(subDays(new Date(), 6)),
          "yyyy/MM/dd HH:mm:ss"
        );
        const endDate = format(endOfDay(new Date()), "yyyy/MM/dd HH:mm:ss");
        state.initialFilter = `&StartDate=${startDate}&EndDate=${endDate}`;
      }
    },
    resetInitialFilter: (state) => {
      state.initialFilter = "";
    },
  },
});
export const reasonCodeList = (state: any) => state?.config?.reasonCodeList;
export const allReasonCodes = (state: any) => state?.config?.allReasonCodes;
export const xrayPaymentLoggroup = (state: any) =>
  state?.config?.paymentLoggroup;
export const {
  setDeepLink,
  setUnCheckedArray,
  setDasmidOptions,
  setMerchantData,
  setSalesLeadFilterMerchant,
  setReasonCodeList,
  resetConfigData,
  setInitialFilter,
  resetInitialFilter,
  setSubsidiaryList,
  setPaymentLoggroup,
  setSalesLeadFilterPartner,
  setUserPreference,
} = configSlice.actions;
export default configSlice.reducer;
