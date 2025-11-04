import { useDispatch, useSelector } from 'react-redux';
import captureImage from '../../../../assets/transaction-icons/payment-captured.png';
import { GET_PARAMS } from '../constants/params';
import useGetParameter from '../../../../hooks/router/useGetParameter';
import usePrepareLink from '../../../../hooks/router/usePrepareLink';
import { setDrawer } from '../../../../store/features/drawer';
import {
  DRAWER_TITLE,
  DRAWER_TYPE,
} from '../../../../components/constants/drawer';
import { DRAWER, TRANSACTION_CAPTURE, UUID } from '../constants/url';
import DasButton from './DasButton';
import { useNavigate } from 'react-router';

const CaptureButton = ({ isEnabled, uuid, setAnchorEl, hasSingleAccess = false, loading = false }: any) => {
  const dispatch = useDispatch();
  const drawer = useSelector((store: any) => store?.drawer?.drawer);
  const navigate = useNavigate();

  const queryID = useGetParameter(GET_PARAMS.uuid);
  const transactionLink = usePrepareLink({
    query: {
      [DRAWER]: TRANSACTION_CAPTURE,
      [UUID]: uuid || queryID,
    },
  });

  const handleCaptureButtonClick = () => {
    navigate(`${transactionLink.search}`);
    setAnchorEl(null);
    dispatch(
      setDrawer([
        ...drawer,
        {
          title: DRAWER_TITLE.CAPTURE,
          //titleColor: '#019a4c',
          type: DRAWER_TYPE.CAPTURE,
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
          buttonClassName={'table-btn list-btn list-capture-btn'}
          handleOnClick={handleCaptureButtonClick}
          imgSrc={captureImage}
          imgClassName={'table-icon-img'}
          imgAlt={'Capture'}
          buttonText={'TransactionDetail.actionButton.CAPTURE'}

        />
      )}
    </>
  );
};

export default CaptureButton;
