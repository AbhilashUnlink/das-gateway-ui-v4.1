import { useTranslation } from 'react-i18next';
import {
  componentTypes,
  FormRenderer,
} from '@data-driven-forms/react-form-renderer';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import capture_transaction_schema from './schema';
import FormTemplate from './FormTemplate';
import TextField from '@data-driven-forms/mui-component-mapper/text-field/text-field';
import Select from '@data-driven-forms/mui-component-mapper/select';

import {
  transactionDetails,
  TransactionRefID,
} from 'store/features/details';
import TEXTAREA from '@data-driven-forms/mui-component-mapper/textarea';
import CHECKBOX from '@data-driven-forms/mui-component-mapper/checkbox';

import { getAmount } from 'utils/helper';
import { useCalculateCaptureAmount, useCaptureTransaction } from 'pages/transaction/components/hooks/transaction-page-hooks';
import { DRAWER_TYPE } from 'components/constants/drawer';
import FieldMapper from 'components/form/field-mapper/FieldMapper';



const CaptureDrawer = ({ drawer, handleDrawerClose, tableApiEndPoint ,payload}: any) => {
  const drawers = useSelector((store: any) => store.drawer.drawer);
  const detailsDrawerAlsoPresent = drawers?.length > 1;
  const { t } = useTranslation();
  const [amount, setAmount] = useState(0);
  const [initialCaptureAmount, setInitialCaptureAmount] = useState(0);
  const TransactionRef = useSelector(TransactionRefID);
  let transactionDetail = useSelector(transactionDetails);
  const [initialValues, setInitialValues]: any = useState({
    Amount: '0',
    RemainingAmount: '0',
  });
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      setAmount(0);
      setInitialCaptureAmount(0);
      setInitialValues({ Amount: '0', RemainingAmount: '0' });
    };
  }, []);

  useEffect(() => {
    const calculationResult: any = useCalculateCaptureAmount(
      drawer,
      transactionDetail,
    );
    if (
      calculationResult &&
      calculationResult?.TempAmount !== undefined &&
      calculationResult &&
      calculationResult?.InitialCaptureAmount !== undefined
    ) {
      setAmount(calculationResult?.TempAmount);
      setInitialCaptureAmount(calculationResult?.InitialCaptureAmount);
    }
  }, [transactionDetail, drawer]);

  useEffect(() => {
    if (drawer.type === DRAWER_TYPE.CAPTURE) {
      setInitialValues({
        Amount: getAmount(amount, transactionDetail?.CurrencyCode),
        RemainingAmount: getAmount(
          initialCaptureAmount,
          transactionDetail?.CurrencyCode,
        ),
      });
    }
  }, [amount, initialCaptureAmount]);

  // Validator Mapper
  const ValidatorMapper = {
    'amount-comparision': () => (value: any, allValues: any) =>
      Number.parseFloat(value) > Number.parseFloat(allValues.RemainingAmount)
        ? t('TransactionCaptureDrawerBody.message.notification')
        : undefined,
  };

  const handleSubmit = async (values: any) => {
    useCaptureTransaction(TransactionRef, values, transactionDetail, dispatch, handleDrawerClose, detailsDrawerAlsoPresent, tableApiEndPoint, payload);
  };

  return (
    <>
      {drawer.type === DRAWER_TYPE.CAPTURE && (
        <div className="drawer-body capture-drawer">
          <FormRenderer
            schema={capture_transaction_schema(transactionDetail?.CurrencyCode)}
            initialValues={initialValues}
            FormTemplate={FormTemplate}
            onSubmit={handleSubmit}
            componentMapper={ComponentMapper}
            validatorMapper={ValidatorMapper}
            onCancel={handleDrawerClose}
          />
        </div>
      )}
    </>
  );
};

export default CaptureDrawer;

const ComponentMapper = {
  [componentTypes.TEXT_FIELD]: TextField,
  [componentTypes.SELECT]: Select,
  [componentTypes.TEXTAREA]: TEXTAREA,
  [componentTypes.CHECKBOX]: CHECKBOX,
  'capture-form': FieldMapper,
};
