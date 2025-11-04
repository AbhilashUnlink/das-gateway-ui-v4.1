import { createSlice } from '@reduxjs/toolkit';

export const dasConfirmationDialogBoxSlice = createSlice({
  name: 'dasDialogBox',
  initialState: {
    className: '',
    open: false,
    title: '',
    heading: '',
    content: '',
    cancelButtonText: '',
    submitButtonText: '',
    payload: {},
    type: '',
    response: {},
    subHeading: ''
  },
  reducers: {
    enableDasMID: (state, action) => {
      state.open = true;
      state.title = 'MerchantList.DeclinePopup.title';
      state.heading = 'MerchantList.DeclinePopup.heading';
      state.subHeading = '';
      state.content = 'MerchantList.DeclinePopup.content';
      state.className = 'blue-theme';
      state.cancelButtonText = 'MerchantList.DeclinePopup.button.cancel';
      state.submitButtonText = 'MerchantList.DeclinePopup.button.submit';
      state.payload = {
        ...action.payload.payload,
      };
      state.type = action.payload.type;
    },

    disableDasMID: (state, action) => {
      state.open = true;
      state.title = 'MerchantList.ApprovePopup.title';
      state.heading = 'MerchantList.ApprovePopup.heading';
      state.subHeading = '';
      state.content = 'MerchantList.ApprovePopup.content';
      state.className = 'red-theme';
      state.cancelButtonText = 'MerchantList.ApprovePopup.button.cancel';
      state.submitButtonText = 'MerchantList.ApprovePopup.button.submit';
      state.payload = {
        ...action.payload.payload,
      };
      state.type = action.payload.type;
    },
    deletePublicHolidayRecord: (state, action) => {
      state.open = true;
      state.title = 'Holiday.DeletePopup.title';
      state.heading = 'Holiday.DeletePopup.heading';
      state.subHeading = '';
      state.content = 'Holiday.DeletePopup.content';
      state.className = 'red-theme';
      state.cancelButtonText = 'MerchantList.ApprovePopup.button.cancel';
      state.submitButtonText = 'Holiday.DeletePopup.button.submit';
      state.payload = {
        ...action.payload.payload,
      };
      state.type = action.payload.type;
    },
    resetDasConfirmationDialogBox: state => {
      state.className = '';
      state.open = false;
      state.title = '';
      state.heading = '';
      state.subHeading = '';
      state.content = '';
      state.cancelButtonText = '';
      state.submitButtonText = '';
      state.payload = {};
    },
    approveStatement: (state, action) => {
      state.open = true;
      state.title = 'Holiday.DeletePopup.title';
      state.heading = 'Holiday.DeletePopup.heading';
      state.subHeading = '';
      state.content = 'Holiday.DeletePopup.content';
      state.className = 'red-theme';
      state.cancelButtonText = 'MerchantList.ApprovePopup.button.cancel';
      state.submitButtonText = 'Holiday.DeletePopup.button.submit';
      state.payload = {
        ...action.payload.payload,
      };
      state.type = action.payload.type;
    },
    sendToAcquirerDrawer: (state, action) => {
      state.open = true;
      state.title = 'IssueChargebackDrawer.ApprovePopup.title';
      state.heading = 'IssueChargebackDrawer.ApprovePopup.heading';
      state.subHeading = '';
      state.content = 'IssueChargebackDrawer.ApprovePopup.content';
      state.className = 'red-theme';
      state.cancelButtonText = 'MerchantList.ApprovePopup.button.cancel';
      state.submitButtonText = 'Holiday.DeletePopup.button.submit';
      state.payload = {
        ...action.payload.payload,
      };
      state.type = action.payload.type;
    },
    caseClosedDrawer: (state, action) => {
      state.open = true;
      state.title = 'IssueChargebackDrawer.CaseClosePopup.title';
      state.heading = 'IssueChargebackDrawer.CaseClosePopup.heading';
      state.subHeading = '';
      state.content = 'IssueChargebackDrawer.CaseClosePopup.content';
      state.className = 'red-theme';
      state.cancelButtonText = 'MerchantList.ApprovePopup.button.cancel';
      state.submitButtonText = 'Holiday.DeletePopup.button.submit';
      state.payload = {
        ...action.payload.payload,
      };
      state.type = action.payload.type;
    },
    acceptDisputeDrawer: (state, action) => {
      state.open = true;
      state.title = 'IssueChargebackDrawer.AcceptDisputePopup.title';
      state.heading = 'IssueChargebackDrawer.AcceptDisputePopup.heading';
      state.subHeading = '';
      state.content = 'IssueChargebackDrawer.AcceptDisputePopup.content';
      state.className = 'red-theme';
      state.cancelButtonText =
        'IssueChargebackDrawer.AcceptDisputePopup.button.cancel';
      state.submitButtonText = 'Holiday.DeletePopup.button.submit';
      state.payload = {
        ...action.payload.payload,
      };
      state.type = action.payload.type;
    },
    deleteSubscriptionPlanRecord: (state, action) => {
      state.open = true;
      state.title =
        'Merchant_Detail.Subscription.deletePopup.deleteSubscriptionPlan';
      state.heading = 'Merchant_Detail.Subscription.deletePopup.warningMsg';
      state.subHeading = '';
      state.content =
        'Merchant_Detail.Subscription.deletePopup.subscriptionPlanContent';
      state.className = 'red-theme';
      state.cancelButtonText = 'Merchant_Detail.Subscription.buttons.cancel';
      state.submitButtonText = 'Holiday.DeletePopup.button.submit';
      state.payload = {
        ...action.payload.payload,
      };
      state.type = action.payload.type;
    },
    cancelSubscriptionRecord: (state, action) => {
      state.open = true;
      state.title =
        'Merchant_Detail.Subscription.deletePopup.deleteSubscription';
      state.heading = 'Merchant_Detail.Subscription.deletePopup.warningMsg';
      state.subHeading = '';
      state.content =
        'Merchant_Detail.Subscription.deletePopup.subscriptionContent';
      state.className = 'red-theme';
      state.cancelButtonText = 'Merchant_Detail.Subscription.buttons.cancel';
      state.submitButtonText = 'Holiday.DeletePopup.button.submit';
      state.payload = {
        ...action.payload.payload,
      };
      state.type = action.payload.type;
    },
    pauseSubscriptionRecord: (state, action) => {
      state.open = true;
      state.title =
        'Merchant_Detail.Subscription.deletePopup.pauseSubscription';
      state.content =
        'Merchant_Detail.Subscription.deletePopup.pauseSubscriptionMsg';
      state.className = 'red-theme';
      state.cancelButtonText = 'MerchantList.ApprovePopup.button.cancel';
      state.submitButtonText = 'Holiday.DeletePopup.button.submit';
      state.payload = {
        ...action.payload.payload,
      };
      state.type = action.payload.type;
    },
    deletePBLRecord: (state, action) => {
      state.open = true;
      state.title = 'PayByLinkConfiguration.Confirmation_Delete_Dialog.Delete';
      state.heading =
        'PayByLinkConfiguration.Confirmation_Delete_Dialog.Are you sure';
      state.subHeading = '';
      state.content =
        'PayByLinkConfiguration.Confirmation_Delete_Dialog.content';
      state.className = 'red-theme';
      state.cancelButtonText =
        'PayByLinkConfiguration.Confirmation_Delete_Dialog.cancel';
      state.submitButtonText =
        'PayByLinkConfiguration.Confirmation_Delete_Dialog.submit';
      state.payload = {
        ...action.payload.payload,
      };
      state.type = action.payload.type;
    },
    backToPBLRecords: (state, action) => {
      state.open = true;
      state.title = 'PayByLinkConfiguration.Confirmation_Dialog.LEAVE PAGE';
      state.heading = 'PayByLinkConfiguration.Confirmation_Dialog.Are you sure';
      state.subHeading =
        'PayByLinkConfiguration.Confirmation_Dialog.you want to leave this page';
      state.content = 'PayByLinkConfiguration.Confirmation_Dialog.content';
      state.className = 'red-theme';
      state.cancelButtonText =
        'PayByLinkConfiguration.Confirmation_Dialog.STAY';
      state.submitButtonText =
        'PayByLinkConfiguration.Confirmation_Dialog.EXIT';
      state.payload = {
        ...action.payload.payload,
      };
      state.type = action.payload.type;
    },
    activeUserManagementRecord: (state, action) => {
      state.open = true;
      state.title = 'Merchant_Detail.User_Management.ActivatePopup.title';
      state.heading = 'Merchant_Detail.User_Management.ActivatePopup.heading';
      state.subHeading = '';
      state.content = 'Merchant_Detail.User_Management.ActivatePopup.content';
      state.className = 'red-theme';
      state.cancelButtonText = 'Merchant_Detail.User_Management.button.cancel';
      state.submitButtonText = 'Merchant_Detail.User_Management.button.submit';
      state.payload = {
        ...action.payload.payload,
      };
      state.type = action.payload.type;
    },
    inActiveUserManagementRecord: (state, action) => {
      state.open = true;
      state.title = 'Merchant_Detail.User_Management.DeactivatePopup.title';
      state.heading = 'Merchant_Detail.User_Management.DeactivatePopup.heading';
      state.subHeading = '';
      state.content = 'Merchant_Detail.User_Management.DeactivatePopup.content';
      state.className = 'red-theme';
      state.cancelButtonText = 'Merchant_Detail.User_Management.button.cancel';
      state.submitButtonText = 'Merchant_Detail.User_Management.button.submit';
      state.payload = {
        ...action.payload.payload,
      };
      state.type = action.payload.type;
    },
    deleteUserManagementRecord: (state, action) => {
      state.open = true;
      state.title = 'Merchant_Detail.User_Management.DeletePopup.title';
      state.heading = 'Merchant_Detail.User_Management.DeletePopup.heading';
      state.subHeading = '';
      state.content = 'Merchant_Detail.User_Management.DeletePopup.content';
      state.className = 'red-theme';
      state.cancelButtonText = 'Merchant_Detail.User_Management.button.cancel';
      state.submitButtonText = 'Merchant_Detail.User_Management.button.submit';
      state.payload = {
        ...action.payload.payload,
      };
      state.type = action.payload.type;
    },
    deactivateLink: (state, action) => {
      state.open = true;
      state.title = 'PayByLinkConfiguration.Confirmation_Deactivate_Dialog.title';
      state.heading = 'Merchant_Detail.User_Management.DeletePopup.heading';
      state.subHeading = '';
      state.content = 'PayByLinkConfiguration.Confirmation_Deactivate_Dialog.content';
      state.className = 'red-theme';
      state.cancelButtonText = 'Merchant_Detail.User_Management.button.cancel';
      state.submitButtonText = 'Merchant_Detail.User_Management.button.submit';
      state.payload = {
        ...action.payload.payload,
      };
      state.type = action.payload.type;
    },
  },
});
export const {
  enableDasMID,
  disableDasMID,
  resetDasConfirmationDialogBox,
  deletePublicHolidayRecord,
  approveStatement,
  sendToAcquirerDrawer,
  caseClosedDrawer,
  acceptDisputeDrawer,
  deleteSubscriptionPlanRecord,
  cancelSubscriptionRecord,
  pauseSubscriptionRecord,
  deletePBLRecord,
  backToPBLRecords,
  activeUserManagementRecord,
  inActiveUserManagementRecord,
  deleteUserManagementRecord,
  deactivateLink
} = dasConfirmationDialogBoxSlice.actions;
export default dasConfirmationDialogBoxSlice.reducer;
