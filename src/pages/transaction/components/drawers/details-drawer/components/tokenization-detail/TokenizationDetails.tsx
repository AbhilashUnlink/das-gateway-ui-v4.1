
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import {
  TRANSACTION_STATUS,
  TRANSACTION_STATUS_LABEL,
} from '../../../../constants/transaction';
import { Button } from 'antd';
import { getDetails } from '../../../../../../../store/features/details';
import { getAmount, getAmountWithCurrency, getCurrency } from '../../../../../../../utils/helper';
import useDateFormatter from 'hooks/date-preference/useDateFormatter';

const TokenizationDetails = ({
  TokenizedTransactionHistory,
  currentTransactionId,
}: any) => {
  const isCurrentTransactionIdSelected = (id: any) => {
    if (id === currentTransactionId) {
      return 'is-selected';
    }
  };
  const { filterDateFormatter } = useDateFormatter();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  return (
    <div className='pop-up-wrapper'>
      <h4 className='h-time-heading'>{t('TransactionDetail.TransactionTabList.Tokenization History')}</h4>
      <div className="popup-scroll-box token-popup-scroll-box">
        {TokenizedTransactionHistory?.map((item: any, index: number) => (
          <div
            className={`popup-lists ${isCurrentTransactionIdSelected}`}
            key={index}
          >
            <div className="subscription-status">
              <h4 className={item?.status === TRANSACTION_STATUS.SUCCESSFUL ? "subscription-successfull" : "subscription-not-successful"}>{TRANSACTION_STATUS_LABEL[item?.status]}</h4>
            </div>
            <div className="subs-id">
              <Button
                className="token-id-button"
                key={index}
                onClick={() => {
                  dispatch(getDetails({ uuid: item.uuid, openDrawer: false, history }));
                }}
              >
                <h5>{item.uuid}</h5>
              </Button>
            </div>

            <div className="billing-date">
              {item.CreatedAt && filterDateFormatter(item.CreatedAt)}
            </div>
            <p className="transaction-history-amonut">
              {getAmountWithCurrency(getAmount(item.amount, item.CurrencyCode), getCurrency(item.CurrencyCode))}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TokenizationDetails;
