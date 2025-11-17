import { useDispatch, useSelector } from 'react-redux';
import refundImage from '../../../../assets/transaction-icons/payment-refunded.png';
import { GET_PARAMS } from '../constants/params';
import useGetParameter from '../../../../hooks/router/useGetParameter';
import usePrepareLink from '../../../../hooks/router/usePrepareLink';
import { setDrawer } from '../../../../store/features/drawer';
import { DRAWER, TRANSACTION_REFUND, UUID } from '../constants/url';
import {
  DRAWER_TITLE,
  DRAWER_TYPE,
} from '../../../../components/constants/drawer';
import DasButton from './DasButton';
import { useNavigate } from 'react-router';

const RefundButton = ({ isEnabled, uuid, setAnchorEl, hasSingleAccess = false, loading = false }: any) => {
  const dispatch = useDispatch();
  const drawer = useSelector((store: any) => store?.drawer?.drawer);
  const navigate = useNavigate();

  const queryId = useGetParameter(GET_PARAMS.uuid);
  const transactionLink = usePrepareLink({
    query: {
      [DRAWER]: TRANSACTION_REFUND,
      [UUID]: uuid || queryId,
    },
  });
  const handleRefundButtonClick = () => {
    setAnchorEl(null);
    navigate(`${transactionLink.search}`);
    dispatch(
      setDrawer([
        ...drawer,
        {
          title: DRAWER_TITLE.REFUND,
          //titleColor: '#15b9f5',
          type: DRAWER_TYPE.REFUND,
          isDrawerOpen: true,
        },
      ]),
    );
  };
  return (
    <>
      {isEnabled && (
        <DasButton
          loading={loading}
          hasSingleAccess={hasSingleAccess}
          variant={'outlined'}
          buttonClassName={'common-button'}
          handleOnClick={handleRefundButtonClick}
          imgSrc={refundImage}
          imgClassName={'table-icon-img'}
          imgAlt={'Refund'}
          buttonText={'TransactionDetail.actionButton.REFUND'}
        />
      )}
    </>
  );
};

export default RefundButton;
