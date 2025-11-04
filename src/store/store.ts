import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "reduxjs-toolkit-persist/lib/storage"; // ✅ Correct storage import

// ✅ Import all slices
import { authSlice } from "./features/auth";
import { loaderSlice } from "./features/loader";
import { drawerSlice } from "./features/drawer";
import { dialogSlice } from "./features/dialog";
import { detailSlice } from "./features/details";
import { merchantSlice } from "./features/merchant";
import { filterSlice } from "./features/filter";
import { merchantDrawerSlice } from "./features/merchant-drawer";
import { transactionSlice } from "./features/transaction-link";
import { actionButtonSlice } from "./features/action-buttons";
import { transactionTableSlice } from "./features/transaction-table";
import { merchantTableSlice } from "./features/merchant-table";
import { riskTableSlice } from "./features/risk-table";
import { newRiskTableSlice } from "./features/risk-table-new";
import { csvDateSlice } from "./features/csvDate";
import { drawerTypeSlice } from "./features/drawer-type";
import { productRiskTableSlice } from "./features/product-risk-table";
import { payByLinkTableSlice } from "./features/pbl";
import { pblCartTableSlice } from "./features/add-pbl";
import { productsListSlice } from "./features/product-table";
import { acquirersTableSlice } from "./features/acquirers";
import { acquirerDetailsSlice } from "./features/acquirer-details";
import { merchantStatementTableSlice } from "./features/merchant-statement-details";
import { disputeManagementTableSlice } from "./features/dispute-management-table.redux";
import { disputeDrawerSlice } from "./features/chargeback-details";
import { dasConfirmationDialogBoxSlice } from "./features/das-confirmation-dialog-box";
import { partnerTableSlice } from "./features/partner";
import { productType } from "./features/contact-us";
import { onboardingSlice } from "./features/onboarding";
import { publicHolidayTableSlice } from "./features/public-holiday";
import { salesLeadSlice } from "./features/sales-lead";
import { titleSlice } from "./features/app-title";
import subscriptionsSlice from "./features/subscriptions-table";
import { configSlice } from "./features/gateway-config";
import { hashcardSlice } from "./features/hashcard";
import { catalogCategorySlice } from "./features/catalog-category";
import { catalogProductsSlice } from "./features/catalog-products";
import { ipWhitelistSlice } from "./features/ip-whitelist";
import { webhookDetailSlice } from "./features/webhook-details";
import { bridgeMiddleware } from "./middleware/bridgeMiddleware";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "config"],
};

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  title: titleSlice.reducer,
  loader: loaderSlice.reducer,
  config: configSlice.reducer,
  drawer: drawerSlice.reducer,
  dialog: dialogSlice.reducer,
  details: detailSlice.reducer,
  merchant: merchantSlice.reducer,
  filter: filterSlice.reducer,
  merchantDrawer: merchantDrawerSlice.reducer,
  transaction: transactionSlice.reducer,
  actionButton: actionButtonSlice.reducer,
  transactionTable: transactionTableSlice.reducer,
  merchantTable: merchantTableSlice.reducer,
  riskTable: riskTableSlice.reducer,
  newRiskTable: newRiskTableSlice.reducer,
  csvDate: csvDateSlice.reducer,
  drawerType: drawerTypeSlice.reducer,
  productRiskTable: productRiskTableSlice.reducer,
  payByLinkTable: payByLinkTableSlice.reducer,
  pblCartTable: pblCartTableSlice.reducer,
  productsList: productsListSlice.reducer,
  acquirersTable: acquirersTableSlice.reducer,
  acquirerDetails: acquirerDetailsSlice.reducer,
  merchantStatementTable: merchantStatementTableSlice.reducer,
  disputeManagementTable: disputeManagementTableSlice.reducer,
  disputeDrawer: disputeDrawerSlice.reducer,
  dasDialogBox: dasConfirmationDialogBoxSlice.reducer,
  partnersTable: partnerTableSlice.reducer,
  productTypeDetails: productType.reducer,
  uploadedFileData: productType.reducer,
  supportTicketInfoQuery: productType.reducer,
  onboarding: onboardingSlice.reducer,
  publicHoliday: publicHolidayTableSlice.reducer,
  salesLead: salesLeadSlice.reducer,
  subscriptionsTable: subscriptionsSlice.reducer,
  hashcard: hashcardSlice.reducer,
  catalogCategory: catalogCategorySlice.reducer,
  catalogProducts: catalogProductsSlice.reducer,
  ipWhitelist: ipWhitelistSlice.reducer,
  webhookDetails: webhookDetailSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const configStore = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(bridgeMiddleware), 
});

export const store = configStore;
export const persistor = persistStore(store);

// ✅ Type Helpers for useDispatch & useSelector
export type RootState = ReturnType<typeof configStore.getState>;
export type AppDispatch = typeof configStore.dispatch;
