import '../../style.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useDetails from '../../../../../hooks/use-details/useDetails';
import { transactionInfoSchema } from './components/schema/transaction-info-schema';
import { cardHolderDetailsSchema } from './components/schema/card-holder-details-schema';
import { additionalInfoSchema } from './components/schema/additional-info-schema';
import { ModeEditOutlineOutlined, SchemaOutlined } from '@mui/icons-material';
import {
  TRANSACTION_EVENT_LABEL,
  TRANSACTION_STATUS,
  TRANSACTION_TYPE_CONSTANTS,
} from '../../constants/transaction';
import VoidAuthButton from '../../buttons/VoidAuthButton';
import CaptureButton from '../../buttons/CaptureButton';
import RefundButton from '../../buttons/RefundButton';
import TransactionEditDetailsDrawer from '../edit-status-drawer';
import { useTranslation } from 'react-i18next';
import DetailsListWrapper from '../../../../../components/wrapper/DetailsListWrapper';
import DasButton from '../../buttons/DasButton';
import { setDrawer } from '../../../../../store/features/drawer';
import { DRAWER_TITLE, DRAWER_TYPE } from '../../../../../components/constants/drawer';
// import { transactionInfoQuery } from '../../../../dispute-management/hooks/dispute-management';
import { hasAccess } from '../../../../../utils/has-access';
import NewCustom from './components/new-custom-tabs/NewCustom';
// import useLegacy from '../../../../../hooks/use-legacy/useLegacy';
import { getAmount } from '../../../../../utils/helper';
import { subscriptionInfoSchema } from './components/schema/subscription-info-schema';
import { loadingTransactionDetails } from '../../../../../store/features/details';
import { ROUTE } from 'components/constants/route';
import { GET_PARAMS } from '../../constants/params';
import { ACQUIRER_CODES } from 'config/common/acquirer-names-list';
import { xrayPaymentLoggroup } from 'store/features/gateway-config';
import { browserInfoSchema } from './components/schema/browser-info-schema';
//import { useNavigate } from 'react-router';
// import { MENU } from '../../../../../components/constants/route';

const TransactionDetails = () => {
  const { t } = useTranslation();
  // const legacy = useLegacy();
  //const navigate = useNavigate();
  const {
    isCaptureButtonEnabled,
    isVoidAuthorizationButtonEnabled,
    isRefundButtonEnabled,
    transactionEvent,
  } = useSelector((store: any) => store.details);

  const [openStatusDrawer, setOpenStatusDrawer] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [anchorEl, setAnchorEl] = useState(null);

  const onEditTransactionClick = () => {
    setOpenStatusDrawer(true);
  };
  // Date format not working properly so for fix we used split method and will change it once proper solution will get
  const openXrayPage = (val: any) => {
    return window.open(`${ROUTE.TRANSACTION_XRAY}?${GET_PARAMS.requestID}=${val}&${GET_PARAMS.transactionDate}=${transactionDetail.Date?.split('T')[0]}&${GET_PARAMS.acquirerCode}=${transactionDetail.AcquirerCode}`, '_blank');
  };

  const onTransactionXrayClick = () => {
    if (transactionDetail?.AcquirerCode?.toLowerCase() === ACQUIRER_CODES.WORLDPAY) {
      openXrayPage(transactionDetail?.TransactionRefID);
    } else {
      openXrayPage(transactionDetail?.RequestID);
    }
  };

  const handleDrawerClose = () => {
    setOpenStatusDrawer(false);
  };

  // const handleCurrentTime = (time: any) => {
  //   //setCurrentTime(time);
  //   console.log(anchorEl, time);
  // };
  // const updateStatusData = (data: any) => {
  //   setStatusData([...statusData, data]);
  // };

  const transactionDetail: any = useSelector(
    (store: any) => store.details.details,
  );
  const loading = useSelector(loadingTransactionDetails);
  // const subscriptionInfoDetail: any = useSelector(
  //   (store: any) => store?.details?.details?.SubscriptionDetails,
  // );
  const DetailsSchema = useDetails(transactionInfoSchema(), transactionDetail);
  const ContactSchema = useDetails(cardHolderDetailsSchema(), transactionDetail);
  const rawSubscriptionData = transactionDetail?.SubscriptionDetails
    ? {
      ...transactionDetail.SubscriptionDetails,
      SubscriptionStatus: transactionDetail.SubscriptionDetails.Status,
    }
    : null;

  const SubscriptionSchema = useDetails(subscriptionInfoSchema, rawSubscriptionData);
  const AdditionalInfoSchema = useDetails(
    additionalInfoSchema(),
    transactionDetail,
  );
  const BrowserInfoSchema = useDetails(
    browserInfoSchema(),
    { ...transactionDetail?.browser_info },
  );

  const sections = [
    { title: 'TransactionInfo', data: DetailsSchema.filter((item: any) => !item.hide), heading: t('TransactionDetail.TransactionInfo.label') },
    { ...(rawSubscriptionData && { title: 'SubscriptionDetails', data: SubscriptionSchema?.length > 0 ? SubscriptionSchema.filter((item: any) => !item.hide) : null, heading: t('TransactionDetail.SubscriptionDetails.label') }) },
    { title: 'CustomerDetails', data: ContactSchema.filter((item: any) => !item.hide), heading: t('TransactionDetail.CustomerDetails.label') },
    { title: 'AdditionalInformation', data: AdditionalInfoSchema.filter((item: any) => !item.hide), heading: t('TransactionDetail.AdditionalInformation.label') },
    { title: 'BrowserInformation', data: BrowserInfoSchema.filter((item: any) => !item.hide), heading: t('TransactionDetail.BrowserInformation.label') },
  ];

  const dispatch = useDispatch();
  const { drawer } = useSelector((store: any) => store.drawer);
  const getAccess = hasAccess('EDIT_STATUS_BUTTON');
  const paymentLoggroup: any = useSelector(xrayPaymentLoggroup) || false;
  return (
    <>
      <div className="drawer-body transaction-detail-drawer">
        <div className="detail-form info-container transaction-detail-container">
          <div className="detail-left-co">
            {
              getAccess && paymentLoggroup &&
              <DasButton
                //accessKey={'EDIT_STATUS_BUTTON'}
                buttonClassName={'transaction-xray-button'}
                handleOnClick={onTransactionXrayClick}
                startAdornment={<SchemaOutlined />}
                buttonText={'Transaction_Xray.Transaction X-Ray'}
              />
            }
            {([
              TRANSACTION_STATUS.NOTSUCCESSFUL,
              TRANSACTION_STATUS.PENDING,
            ].includes(transactionDetail?.Status) ||
              transactionDetail?.TransactionLog?.length > 0) &&
              getAccess &&
              (
                <>
                  <DasButton
                    //accessKey={'EDIT_STATUS_BUTTON'}
                    buttonClassName={'edit-button'}
                    handleOnClick={onEditTransactionClick}
                    startAdornment={<ModeEditOutlineOutlined />}
                    buttonText={'TransactionDetail.Edit_button'}
                  />
                </>
              )}
            {sections?.filter(i => i.data)?.map((section, index) => (
              <DetailsListWrapper
                key={index}
                title={`TransactionDetail.${section.title}.label`}
                content={section.data}
                transactionDetail={transactionDetail}
                heading={section.heading}
                loading={loading}
              />
            ))}
          </div>
        </div>
        <div className="bg-history-container">
          <NewCustom transactionDetail={transactionDetail}
            loading={loading}
          />
        </div>
        <div className="fixed-status-btns">
          <div className="transaction-overlay">
            <div className="transaction-status-box">
              <h4 className="trans-status">
                <span> {t('ActionButtons.TransactionEvent')}:</span>
                {transactionEvent
                  ? t(
                    `ActionButtons.${TRANSACTION_EVENT_LABEL[transactionEvent]}`,
                  )
                  : ''}
              </h4>
            </div>
            <div className="status-btns">
              {<VoidAuthButton
                loading={loading}
                isEnabled={isVoidAuthorizationButtonEnabled} />}

              <CaptureButton
                loading={loading}
                isEnabled={
                  isCaptureButtonEnabled ? isCaptureButtonEnabled : false
                }
                setAnchorEl={setAnchorEl}
              />

              <RefundButton
                loading={loading}
                isEnabled={
                  isRefundButtonEnabled ? isRefundButtonEnabled : false
                }
                setAnchorEl={setAnchorEl}
              />
              {((isRefundButtonEnabled && (transactionDetail.TransactionType !== TRANSACTION_TYPE_CONSTANTS.AUTHORISATION) && (transactionDetail.TransactionType !== TRANSACTION_TYPE_CONSTANTS.REFUND)) || (transactionDetail.Status === TRANSACTION_STATUS.SUCCESSFUL && transactionDetail.TransactionType === TRANSACTION_TYPE_CONSTANTS.PURCHASE
              ) || (transactionDetail.Status === TRANSACTION_STATUS.SUCCESSFUL && transactionDetail.TransactionType === TRANSACTION_TYPE_CONSTANTS.CAPTURE)) &&
                <DasButton
                  loading={loading}
                  accessKey={'DISPUTE_TRANSACTION_ACCESS'}
                  hasSingleAccess={true}
                  variant={'outlined'}
                  buttonClassName={'table-btn list-btn view-details list-dispute-btn'}
                  handleOnClick={() => {
                    // navigate(MENU.TRANSACTIONS);
                    const amount = getAmount(transactionDetail.Amount, transactionDetail.CurrencyCode);
                    dispatch(
                      setDrawer([...drawer,
                      {
                        data: {
                          uuid: transactionDetail.TransactionRefID,
                          amount,
                          AcquirerName: transactionDetail.Acquirer,
                          ...transactionDetail
                        },
                        type: DRAWER_TYPE.DISPUTE_EDIT_DRAWER,
                        title: DRAWER_TITLE.DISPUTE_EDIT_DRAWER,
                        isDrawerOpen: true,
                      },
                      ]),
                    );
                    // dispatch(transactionInfoQuery(transactionDetail?.uuid));
                  }}
                  // imgSrc={refundImage}
                  imgClassName={'table-icon-img'}
                  imgAlt={'Refund'}
                  buttonText={t('TransactionDetail.actionButton.DISPUTE')}
                />
              }


            </div>
          </div>
        </div>
      </div>
      <TransactionEditDetailsDrawer
        openStatusDrawer={openStatusDrawer}
        handleDrawerClose={handleDrawerClose}
        uuid={transactionDetail.TransactionRefID}
      />
    </>
  );
};

export default TransactionDetails;
