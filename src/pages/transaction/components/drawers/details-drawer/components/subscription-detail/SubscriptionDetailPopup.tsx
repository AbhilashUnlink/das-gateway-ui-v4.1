import React from 'react';
import {
  TRANSACTION_STATUS,
  TRANSACTION_STATUS_LABEL,
} from '../../../../constants/transaction';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
// import { TRANSACTION_DETAILS_LINK } from '../../../../constants/url';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { getDetails } from '../../../../../../../store/features/details';
import useDateFormatter from 'hooks/date-preference/useDateFormatter';

const SubscriptionDetailPopup = ({ SubscriptionDetails, currentTransactionId }: any) => {
  const { t } = useTranslation();
  const isCurrentTransactionIdSelected = (id: any) => {
    if (id === currentTransactionId) {
      return 'is-selected';
    }
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { filterDateFormatter } = useDateFormatter();
  return (
    <div className='pop-up-wrapper'>
      <h4 className='h-time-heading'>{t('TransactionDetailDrawerBody.SubscriptionDetails.Heading')}</h4>
      <div className="popup-scroll-box subs-popupbox">
        {SubscriptionDetails?.map((item: any, index: number) => (
          <div className={`popup-lists ${isCurrentTransactionIdSelected}`} key={index}>
            <div className="subscription-status">
              <h4
                className={
                  item.TransactionStatus === TRANSACTION_STATUS.SUCCESSFUL
                    ? 'subscription-successfull'
                    : 'subscription-not-successful'
                }
              >
                {TRANSACTION_STATUS_LABEL[item.TransactionStatus]}
              </h4>
              <div className="billing-cycle">
                {t(
                  'TransactionDetailDrawerBody.SubscriptionDetails.BillingCycle',
                )}{' '}
                <strong>{item.Cycle}</strong>
              </div>
            </div>
            <div className="subs-id">
              <Button
                className="token-id-button"
                key={index}
                onClick={() => {
                  dispatch(getDetails({ uuid: item.TransactionID, history }));
                }}
              >
                <h5>{item.TransactionID}</h5>
              </Button>
            </div>

            <div className="billing-date">
              {item.CreatedAt && filterDateFormatter(item.CreatedAt)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionDetailPopup;
