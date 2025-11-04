import { Box, Button, Popover } from '@mui/material';
import viewImage from '../../../../assets/transaction-icons/payment-details.png';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { setDrawer } from '../../../../redux/features/drawer';
import usePrepareLink from '../../../../hooks/router/usePrepareLink';
import RefundButton from './RefundButton';
import CaptureButton from './CaptureButton';
import VoidAuthButton from './VoidAuthButton';
// import useGetParameter from '../../../../hooks/router/useGetParameter';
import {
  DRAWER,
  // TRANSACTION_CAPTURE,
  TRANSACTION_DETAILS,
  // TRANSACTION_REFUND,
  UUID,
} from '../constants/url';
// import {
//   DRAWER_TITLE,
//   DRAWER_TYPE,
// } from '../../../../components/constants/drawer';
import DasInfo from '../../../../components/buttons/DasInfo';
import { clearDetails, getDetails, handleDetailsDrawer, loadingTransactionDetails } from '../../../../store/features/details';
import TableActionButtonSkeleton from '../../../../components/skeletons/TableActionButtonSkeleton';
import { useNavigate } from 'react-router';
// import { GET_PARAMS } from '../constants/params';

const ActionButton = ({ data }: any) => {
  const { uuid } = data;
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const open = Boolean(anchorEl);
  const popid = open ? 'simple-popover' : undefined;


  //Creating a Transaction Link

  const transactionLink = usePrepareLink({
    query: {
      [DRAWER]: TRANSACTION_DETAILS,
      [UUID]: uuid,
    },
  });

  //  custom hook for getting the status of transaction buttons like which one will will be shown
  const {
    isCaptureButtonEnabled,
    isVoidAuthorizationButtonEnabled,
    isRefundButtonEnabled,
  } = useSelector((store: any) => store.details);

  // fetch Details will change the status of the buttons like which one will be shown and which will be disabled

  const handlePopover = (event: any, uuid: any) => {
    setAnchorEl(event.currentTarget);
    dispatch(getDetails({ uuid, openDrawer: false }));
  };
  const handleClose = () => {
    setAnchorEl(null);
    dispatch(clearDetails());
  };


  const openDetails = () => {
    setAnchorEl(null);
    navigate(transactionLink.search);
    handleDetailsDrawer(uuid, dispatch, true);
  };
  const loading = useSelector(loadingTransactionDetails);
  return (
    <>
      <DasInfo onClick={(e: any) => handlePopover(e, uuid)} />

      <Popover
        id={popid}
        open={open}
        className='action-button-popover'
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        onClose={handleClose}
      >
        <Box className="popover-box">
          {
            loading ? <div style={{ width: "11rem", display: "flex", flexDirection: "column", gap: "10px" }}>
              <TableActionButtonSkeleton />
              <TableActionButtonSkeleton />
              <TableActionButtonSkeleton />
            </div> :

              <Button
                variant="outlined"
                className="table-btn list-btn view-details view-details-btn"
                onClick={openDetails}
              >
                <img src={viewImage} className="table-icon-img " alt="Details" />
                <strong>
                  {t(
                    'TransactionDetail.TransactionListButtonPopper.button.Details',
                  )}
                </strong>
              </Button>
          }
          {!loading && isRefundButtonEnabled && (
            <RefundButton
              isEnabled={isRefundButtonEnabled}
              uuid={uuid}
              setAnchorEl={setAnchorEl}
              hasSingleAccess={false}
            />
          )}
          {!loading && isVoidAuthorizationButtonEnabled && (
            <VoidAuthButton
              isEnabled={isVoidAuthorizationButtonEnabled}
              uuid={uuid}
              hasSingleAccess={false}
              setAnchorEl={setAnchorEl}
            />
          )}
          {!loading && isCaptureButtonEnabled && (
            <CaptureButton
              isEnabled={isCaptureButtonEnabled}
              uuid={uuid}
              setAnchorEl={setAnchorEl}
              hasSingleAccess={false}
            />
          )}

        </Box>
      </Popover>
    </>
  );
};

export default ActionButton;

export const InfoIconStyle = {
  color: '#e77236',
  fontSize: '20px',
  marginLeft: '12px',
  cursor: 'pointer',
  marginRight: '11px'
};
