import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { resetDasConfirmationDialogBox } from '../../redux/features/das-confirmation-dialog-box';
import { updateDASMIDStatus } from '../../redux/features/product-table';
import {
  deleteUserRecord,
  setActiveUserManagementRecord,
  updateDASMIDStatusFromMerchantDetails,
} from '../../redux/features/merchant';
import { deletePublicHoliday } from '../../redux/features/public-holiday';
import {
  acceptDisputeDetails,
  caseCloseDetails,
  sendToAcquirerDetails,
} from '../../redux/features/dispute-management-table.redux';
import { CONFIRMATION_DIALOG_CASES } from '../../config/common/acquirer-names-list';
import { approveStatement } from '../../redux/features/merchant-statement-details';
import {
  cancelSubscription,
  deleteSubscriptionPlan,
  pauseSubscription,
} from '../../redux/features/subscriptions-table';
import { deleteRow } from '../../redux/features/add-pbl';
import { setDrawer } from '../../redux/features/drawer';
import { deactivatePBLLink } from '../../redux/features/pbl';

function DasConfirmationDialogBox(props: any) {
  const {
    className,
    open,
    content,
    heading,
    title,
    cancelButtonText,
    submitButtonText,
    type,
    payload,
    subHeading
  } = useSelector((store: any) => store.dasDialogBox);
  //   {
  //     "Holiday": "New Year’s Day3",
  //     "HolidayType": "PH",
  //     "Date": "01 January 2023",
  //     "CountryCode": "MY",
  //     "IsActive": 0,
  //     "ID": 33
  // }
  const dispatch = useDispatch();
  const handleCancel = () => {
    dispatch(resetDasConfirmationDialogBox());
  };
  const handleOk = () => {
    switch (type) {
      case CONFIRMATION_DIALOG_CASES.enableDisableDASMID:
        dispatch(updateDASMIDStatus(payload));
        break;
      case CONFIRMATION_DIALOG_CASES.enableDisableDASMIDFromMerchantDetails:
        dispatch(updateDASMIDStatusFromMerchantDetails(payload));
        break;
      case CONFIRMATION_DIALOG_CASES.deletePublicHolidayRecord:
        dispatch(deletePublicHoliday(payload));
        break;
      case CONFIRMATION_DIALOG_CASES.approveStatement:
        dispatch(approveStatement(payload));
        break;
      case CONFIRMATION_DIALOG_CASES.sendToAcquirerDrawer:
        dispatch(sendToAcquirerDetails({
          values: payload,
          handleDrawerClose: props.handleDrawerClose,
          TransactionID: props.TransactionID,
          ChargeBackID: props.ChargeBackID

        }));
        break;
      case CONFIRMATION_DIALOG_CASES.caseClosedDrawer:
        dispatch(caseCloseDetails({
          values: payload,
          handleDrawerClose: props.handleDrawerClose,
          TransactionID: props.TransactionID,
          ChargeBackID: props.ChargeBackID
        }));
        break;
      case CONFIRMATION_DIALOG_CASES.acceptDisputeDrawer:
        dispatch(acceptDisputeDetails(payload));
        break;
      case CONFIRMATION_DIALOG_CASES.deleteSubscriptionPlanRecord:
        dispatch(deleteSubscriptionPlan(payload));
        break;
      case CONFIRMATION_DIALOG_CASES.cancelSubscriptionRecord:
        dispatch(cancelSubscription(payload));
        break;
      case CONFIRMATION_DIALOG_CASES.pauseSubscriptionRecord:
        dispatch(pauseSubscription(payload));
        break;
      case CONFIRMATION_DIALOG_CASES.deletePBLRecord:
        dispatch(deleteRow(payload));
        break;
      case CONFIRMATION_DIALOG_CASES.backToPBLRecords:
        dispatch(setDrawer([payload]));
        break;
      case CONFIRMATION_DIALOG_CASES.activeUserManagementRecord:
        dispatch(setActiveUserManagementRecord(payload));
        break;
      case CONFIRMATION_DIALOG_CASES.inActiveUserManagementRecord:
        dispatch(setActiveUserManagementRecord(payload));
        break;
      case CONFIRMATION_DIALOG_CASES.deleteUserManagementRecord:
        dispatch(deleteUserRecord(payload));
        break;
      case CONFIRMATION_DIALOG_CASES.deactivateLink:
        dispatch(deactivatePBLLink(payload));
        break;
      default:
        dispatch(resetDasConfirmationDialogBox());
    }
    dispatch(resetDasConfirmationDialogBox());
  };
  const { t } = useTranslation();
  return (
    <Dialog
      className={className}
      sx={{
        '& .MuiDialog-paper': {
          width: '80%',
          maxHeight: 435,
          borderRadius: '6px',
        },
      }}
      maxWidth="xs"
      open={open}
    >
      <DialogTitle className="confirm-heading">{t(title)}</DialogTitle>
      <DialogContent className="confirm-popup-body" dividers>
        <h4>{t(heading)}</h4>
        <h4>{t(subHeading)}</h4>
        <p>{t(content)}</p>
      </DialogContent>
      <DialogActions className="action-buttons">
        <Button className="submit-button" onClick={handleOk}>
          {t(submitButtonText)}
        </Button>
        <Button className="cancel-button" autoFocus onClick={handleCancel}>
          {t(cancelButtonText)}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DasConfirmationDialogBox;
