import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useFetchWrapper as Api } from "../../utils";
import { DRAWER_TITLE, DRAWER_TYPE } from "../../components/constants/drawer";
import { setDrawer } from "./drawer";
import useLegacy from "../../hooks/use-legacy/useLegacy";
import { CHARGEBACK, CHARGEBACK_LEGACY, TRANSACTION, TRANSACTION_LEGACY } from "../../components/constants/api-paths";
import { HTTP_STATUS } from "../../components/constants";

// createAsyncThunk

// const openDetails = (dispatch: any) => {

// };

export const getChargeBackDetails: any = createAsyncThunk(
    "dispute/getChargeBackDetails",
    async (apiPath) => {
        let data = await Api().get(apiPath);
        return data;
    }
);
export const getTransactionDetails: any = createAsyncThunk(
    "dispute/getTransactionDetails",
    async (apiPath) => {
        let data = await Api().get(apiPath);

        return data;
    }
);

export const getDisputeDetails: any = createAsyncThunk(
    "dispute/getDisputeDetails",
    async ({ ChargeBackID, TransactionID, openDrawer = true }: any, { dispatch }) => {
        const legacy = useLegacy();
        if (openDrawer) {
            dispatch(
                setDrawer([
                    {
                        type: DRAWER_TYPE.DISPUTE_DRAWER,
                        isDrawerOpen: true,
                        title: DRAWER_TITLE.DISPUTE_DRAWER,
                    },
                ]),
            );
        }
        const chargebackDetailPath = legacy ? CHARGEBACK_LEGACY.CHARGEBACK_DETAILS : CHARGEBACK.CHARGEBACK_DETAILS;

        const chargeBackPath = `${chargebackDetailPath}/${ChargeBackID}`;
        const chargeBackResponse = await Api().get(chargeBackPath);

        const transactionDetailPath = legacy ? TRANSACTION_LEGACY.TRANSACTION_INFO_QUERY : TRANSACTION.TRANSACTION_INFO_QUERY;

        if ([HTTP_STATUS.OK]?.includes(chargeBackResponse.statusCode)) {
            const transactionPath = `${transactionDetailPath}/${TransactionID}`;
            const transactionResponse = await Api().get(transactionPath);
            if ([HTTP_STATUS.OK]?.includes(transactionResponse.statusCode)) {
                // both api success only then open drawer

                return {
                    chargeBackDetails: chargeBackResponse.data,
                    transactionDetails: transactionResponse.data
                };
            }

        }



        return;
    }
);

// createSlice
export const disputeDrawerSlice = createSlice({
    name: "disputeDrawer",
    initialState: {
        chargeBackDetails: null,
        transactionDetails: null,
        loading: false,
        caseType: false,
        chargebackBtnName: '',
        chagebackHistoryStatus: ""
    },
    reducers: {
        setDisputeDetailsLoading: (state, action) => {
            state.loading = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getDisputeDetails.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getDisputeDetails.fulfilled, (state, action) => {
            state.loading = false;
            state.chargeBackDetails = action?.payload?.chargeBackDetails;
            state.chagebackHistoryStatus = action?.payload?.chargeBackDetails?.tblChargebackStatus[0]?.Status;
            state.transactionDetails = action?.payload?.transactionDetails;
            state.caseType = action?.payload?.chargeBackDetails?.CaseType === "FirstChargeback" ? true : action?.payload?.chargeBackDetails?.CaseType === "SecondChargeback" ? true : false;

        });
        builder.addCase(getDisputeDetails.rejected, (state) => {
            state.loading = false;
        });


        builder.addCase(getChargeBackDetails.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getChargeBackDetails.fulfilled, (state, action) => {
            state.loading = false;
            state.chargeBackDetails = action?.payload?.data;
            state.caseType = action?.payload?.data?.CaseType === "FirstChargeback" ? true : action?.payload?.data?.CaseType === "SecondChargeback" ? true : false;

        });
        builder.addCase(getChargeBackDetails.rejected, (state) => {
            state.loading = false;
        });

        // for Transaction Details Api

        builder.addCase(getTransactionDetails.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getTransactionDetails.fulfilled, (state, action) => {
            state.loading = false;
            state.transactionDetails = action?.payload?.data;
        });
        builder.addCase(getTransactionDetails.rejected, (state) => {
            state.loading = false;
        });
    },
});

export const { setDisputeDetailsLoading } = disputeDrawerSlice.actions;

export const chargeBackDetails = (state: any) =>
    state?.chargeBackDetails?.chargeBackDetails;

// export const {  } = disputeDrawerSlice.actions;

export default disputeDrawerSlice.reducer;
