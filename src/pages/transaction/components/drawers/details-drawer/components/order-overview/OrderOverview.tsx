
import { useTranslation } from 'react-i18next';
import proImg from "../../../../../../../assets/default.jpg";
import { getCurrency } from '../../../../../../../utils/helper';

const OrderOverView = ({OrderOverviewData='', currency}: any) => {
  const { t } = useTranslation();
  const calculateTotal = () => {
    const data= OrderOverviewData?.reduce((acc:any, item:any) => acc + item.TotalPrice, 0);
    return data.toFixed(2);
  };
  return (
    <div className='pop-up-wrapper case-history-wrapper'>
      <h4 className='h-time-heading'>{t('TransactionDetail.TransactionTabList.Order Overview')}</h4>
      <div className="popup-scroll-box order-overview-popupbox">
      {OrderOverviewData &&
          OrderOverviewData?.map((key: any, index: number) => (
      <div className="order-listing" key={index}>
        <div className="order-l-left">
        <div className="pro-over-img">
          <img src={key.Image || proImg} className='pro-img' alt={"pro img"} />
        </div>
        <div className="pro-order-h">
          <h5>{key.Name}</h5>
          <h6><span>{key.Quantity}</span> x <span>{getCurrency(key.Currency)}{key.Price}</span></h6>
        </div>
        </div>
        <div className="order-l-right">
          <h5><strong>{getCurrency(key.Currency)}</strong><strong>{key.TotalPrice}</strong></h5>
        </div>
      </div>
          ))}
      <div className="order-total-ov">
        <h5>{t('PayByLinkConfiguration.PblProduct_ColumnDefs.totalPrice')}</h5>
        <h5>{getCurrency(currency)}{calculateTotal() || 0}</h5>
      </div>
      </div>
    </div>
  );
};

export default OrderOverView;
