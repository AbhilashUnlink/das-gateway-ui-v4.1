import { Suspense } from 'react';
import TextField from '@data-driven-forms/mui-component-mapper/text-field';
import Select from '@data-driven-forms/mui-component-mapper/select/select';
import TEXTAREA from '@data-driven-forms/mui-component-mapper/textarea';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
  transactionDetails,
  TransactionRefID,
} from '../../../../../store/features/details';
import { getAmount } from '../../../../../utils/helper';
import FieldMapper from '../../../../../components/form/field-mapper/FieldMapper';

import {
  componentTypes,
  FormRenderer,
} from '@data-driven-forms/react-form-renderer';

import refund_transaction_schema from './schema';
import RefundFormTemplate from './FormTemplate';
import './styles.css';
import CHECKBOX from '@data-driven-forms/mui-component-mapper/checkbox';
import {
  useCalculateRefundAmount,
  useRefundTransaction,
} from '../../hooks/transaction-page-hooks';
import { DRAWER_TYPE } from '../../../../../components/constants/drawer';

const RefundDetails = ({ drawer, handleDrawerClose, tableApiEndPoint, payload }: any) => {
  const drawers = useSelector((store: any) => store.drawer.drawer);
  const detailsDrawerAlsoPresent = drawers?.length > 1;
  // const { isDrawerOpen } = drawer?.isDrawerOpen;
  const { t } = useTranslation();

  const TransactionRef = useSelector(TransactionRefID);

  let transactionDetail = useSelector(transactionDetails);
  const dispatch = useDispatch();

  const [amount, setAmount] = useState(0);
  const [initialRefundAmount, setInitialRefundAmount] = useState(0);

  const [initialValues, setInitialValues]: any = useState({
    Amount: '0',
    RemainingAmount: '0',
  });

  useEffect(() => {
    return () => {
      setAmount(0);
      setInitialRefundAmount(0);
      setInitialValues({ Amount: '0', RemainingAmount: '0' });
    };
  }, []);

  // Refund Amount Calculations

  useEffect(() => {
    const calculationResult: any = useCalculateRefundAmount(
      transactionDetail,
      drawer,
    );
    if (
      calculationResult &&
      calculationResult?.TempAmount !== undefined &&
      calculationResult?.InitialRefundAmount !== undefined
    ) {
      setAmount(calculationResult?.TempAmount);
      setInitialRefundAmount(calculationResult?.InitialRefundAmount);
    }
  }, [transactionDetail, drawer]);
  useEffect(() => {
    if (drawer.type === DRAWER_TYPE.REFUND) {
      setInitialValues({
        Amount: getAmount(amount, transactionDetail?.CurrencyCode),
        RemainingAmount: getAmount(
          initialRefundAmount,
          transactionDetail.CurrencyCode,
        ),
      });
    }
  }, [amount, initialRefundAmount]);

  const handleSubmit = async (values: any) => {
    useRefundTransaction(
      TransactionRef,
      values,
      transactionDetail,
      dispatch,
      handleDrawerClose,
      detailsDrawerAlsoPresent,
      tableApiEndPoint,
      payload
    );
  };
  // Validator mapper
  const ValidatorMapper = {
    'amount-comparision': () => (value: any, allValues: any) =>
      Number.parseFloat(value) > Number.parseFloat(allValues.RemainingAmount)
        ? t('TransactionRefundDrawerBody.notification')
        : undefined,
  };
  return (
    <Suspense fallback={<></>}>
      {drawer.type === DRAWER_TYPE.REFUND && (
        <div className="drawer-body refund-drawer">
          <FormRenderer
            schema={refund_transaction_schema(transactionDetail?.CurrencyCode)}
            initialValues={initialValues}
            FormTemplate={RefundFormTemplate}
            onSubmit={handleSubmit}
            componentMapper={ComponentMapper}
            validatorMapper={ValidatorMapper}
            onCancel={handleDrawerClose}
          />
        </div>
      )}
    </Suspense>
  );
};

export default RefundDetails;

// Component Mapper

const ComponentMapper = {
  [componentTypes.TEXT_FIELD]: TextField,
  [componentTypes.SELECT]: Select,
  [componentTypes.TEXTAREA]: TEXTAREA,
  [componentTypes.CHECKBOX]: CHECKBOX,
  'refund-form': FieldMapper,
};
