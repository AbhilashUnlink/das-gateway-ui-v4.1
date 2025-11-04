import { useTranslation } from 'react-i18next';
import voidImage from '../../../../assets/transaction-icons/voided-authorization.png';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFetchWrapper as Api } from '../../../../utils';
import {
  FAILURE,
  HTTP_STATUS,
  SUCCESS,
} from '../../../../components/constants';
import { clearDrawerType } from '../../../../store/features/drawer-type';
import DasButton from './DasButton';
import { TRANSACTION, TRANSACTION_LEGACY } from '../../../../components/constants/api-paths';
import DasSnackbar from '../../../../components/das-snackbar/DasSnackbar';
import { getTransactionTable, postTransactionTable } from '../../../../store/features/transaction-table';
import { getDetails, startTransactionActionLoader, stopTransactionActionLoader } from '../../../../store/features/details';
import useLegacy from '../../../../hooks/use-legacy/useLegacy';
import ConfirmationDialogRaw from 'components/confirmation-dialog/ConfirmationDialog';

const VoidAuthButton = ({ isEnabled,
  //  uuid,
  hasSingleAccess = false, setAnchorEl = null, loading = false }: any) => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const { t } = useTranslation();
  // const queryId = useGetParameter(GET_PARAMS.uuid);
  const transactionData = useSelector((store: any) => store?.details?.details);
  const TransactionRef = useSelector(
    (store: any) => store?.details?.details?.TransactionRefID,
  );
  const drawer = useSelector((store: any) => store.drawer.drawer);
  const transactionDetailsDrawerOpen = drawer?.length > 0;
  const filter = useSelector((store: any) => store.filter.filter);
  const dispatch = useDispatch();

  const { transactionTable } = useSelector((store: any) => store.transactionTable);
  const take =
    transactionTable?.length || 10;

  const handleVoidAuthQuery = async () => {
    setAnchorEl && setAnchorEl(null);
    let queryData = {
      id: TransactionRef,
      merchant_id: transactionData.DASMID,
      secretKey: transactionData.SecretKey,
    };
    const payload = {
      id: queryData.id,
      merchant_id: queryData.merchant_id,
    };
    const legacy = useLegacy();

    const path = legacy ? TRANSACTION_LEGACY.TABLE_API : filter ? TRANSACTION.TABLE_API : TRANSACTION.TABLE_API_V2;
    try {
      dispatch(startTransactionActionLoader());

      let apiData = await Api().post(TRANSACTION.VOID_TRANSACTION, payload, {
        'X-Authorization': `${queryData.secretKey}`,
      });
      dispatch(stopTransactionActionLoader());
      const timeZone = localStorage.getItem("timeZone") || "Asia/Calcutta";
      if (![HTTP_STATUS.CREATED].includes(apiData.statusCode)) {
        DasSnackbar.error(FAILURE.ACTION_VOID_AUTHORIZATION);
      } else {
        DasSnackbar.success(t(SUCCESS.ACTION_VOID_AUTHORIZATION));
        if (filter) {
          dispatch(
            getTransactionTable(
              `${path}?take=${take}&skip=${0}&TimeZone=${timeZone}`,
            ),
          );
        } else {
          const payload = {
            take: take,
            skip: 0,
            TimeZone: timeZone,
            filter: [],
            operand: ''
          };
          dispatch(postTransactionTable({ apiPath: path, payload }));
        }
        if (transactionDetailsDrawerOpen) {
          dispatch(getDetails({ uuid: TransactionRef, openDrawer: true }));
        }
      }
    } catch (e) {
      dispatch(stopTransactionActionLoader());
      console.log('e', e);
    }
  };

  const onClickVoid = () => {
    setDialogOpen(true);
  };
  const handleCloseDialog = () => {
    dispatch(clearDrawerType());
    setDialogOpen(false);
  };

  return (
    <>
      <ConfirmationDialogRaw
        className="confirm-popup"
        open={isDialogOpen}
        onClose={handleCloseDialog}
        title={t('ConfirmationDialogRaw.voidButton.title')}
        heading={t('ConfirmationDialogRaw.voidButton.heading')}
        content={t('ConfirmationDialogRaw.voidButton.content')}
        handleSubmit={handleVoidAuthQuery}
        cancel={t('ConfirmationDialogRaw.voidButton.Cancel')}
        submit={t('ConfirmationDialogRaw.voidButton.Submit')}
      />
      {isEnabled && (
        <DasButton
          loading={loading}
          hasSingleAccess={hasSingleAccess}
          variant={'outlined'}
          buttonClassName={'table-btn list-btn list-void-btn'}
          handleOnClick={onClickVoid}
          imgSrc={voidImage}
          imgClassName={'table-icon-img'}
          imgAlt={'Void'}
          buttonText={'TransactionDetail.voidButton'}
        />
      )}
    </>
  );
};

export default VoidAuthButton;
