import componentTypes from '@data-driven-forms/react-form-renderer/component-types';
import validatorTypes from '@data-driven-forms/react-form-renderer/validator-types';
import i18n from '../../../../../i18n';
import { t } from 'i18next';
import { CurrencyAdornment } from '../../../../../components/currency-adornment/CurrencyAdornment';
import { CURRENCY_DATA_TYPE_FORMAT } from '../../../../../components/constants/constants';
import { CurrencyType } from '../../../../../config/common/currency';
import { FILTER_INPUT_TYPES } from 'components/popper/constants/filter-constants';

const refund_transaction_schema = (currency:any) => {
  const data = {
    fields: [
      {
        name: 'refundform',
        component: 'refund-form',
        fields: [
          {
            component: componentTypes.TEXT_FIELD,
            name: 'Amount',
            label: i18n.t('RefundTransaction.Amount'),
            type: FILTER_INPUT_TYPES.NUMBER,
            isRequired: true,
            FormFieldGridProps: { xs: 4 },
            isReadOnly: true,
            className: 'field_threshold_attempts',
            InputProps: {
              endAdornment: <CurrencyAdornment currency={currency} />,
            },
          },
          {
            component: componentTypes.TEXT_FIELD,
            name: 'RemainingAmount',
            label: i18n.t('RefundTransaction.RemainingAmount'),
            type: FILTER_INPUT_TYPES.NUMBER,
            initializeOnMount: true,
            FormFieldGridProps: { xs: 4 },
            isRequired: true,
            isReadOnly: true,
            className: 'field_threshold_attempts',
            InputProps: {
              endAdornment: <CurrencyAdornment currency={currency} />,
            },
          },
          {
            component: componentTypes.TEXT_FIELD,
            name: 'RefundAmount',
            label: i18n.t('RefundTransaction.RefundAmount'),
            type: FILTER_INPUT_TYPES.NUMBER,
            initializeOnMount: true,
            FormFieldGridProps: { xs: 4 },
            isRequired: true,
            className: 'field_threshold_attempts',
            helperText: currency === CurrencyType.JPY?i18n.t(
              'RefundTransaction.helperText.RefundAmount_helperTxt_JP')
              : 
              i18n.t(
                'RefundTransaction.helperText.RefundAmount_helperTxt'
            ),
            dataType: CURRENCY_DATA_TYPE_FORMAT[currency]
              ? CURRENCY_DATA_TYPE_FORMAT[currency]
              : 'float',
            validate: [
            
              {
                type: validatorTypes.MIN_NUMBER_VALUE,
                includeThreshold: true,
                message: currency === CurrencyType.JPY?t('validation.MIN_NUMBER_VALUE'):t('validation.CHARGEBACK_MIN_NUMBER_VALUE'),
                value: currency === CurrencyType.JPY ? 1: 0.01, //Need to update for SG
              },
              {
                type: validatorTypes.REQUIRED,
                message: t('validation.Required'),
              },
              { type: 'amount-comparision' },
            ],
            InputProps: {
              endAdornment: <CurrencyAdornment currency={currency} />,
            },
          },
          {
            component: componentTypes.TEXTAREA,
            name: 'notes',
            label: i18n.t('RefundTransaction.Reference'),
            type: 'string',
            className: 'field_threshold_attempts',
            initializeOnMount: true,
            maxRows: 2,
            helperText: i18n.t('RefundTransaction.helperText.OptionalMessage'),
            validate: [
              {
                type: validatorTypes.MAX_LENGTH,
                threshold: 128,
                message: i18n.t('RefundTransaction.message.ref_max_Character'),
              },
            ],
          },
          {
            component: componentTypes.CHECKBOX,
            name: 'ConfirmRefundCheckbox',
            label: i18n.t('RefundTransaction.ConfirmRefundCheckbox'),
            type: 'boolean',
            initializeOnMount: true,
            isRequired: true,
            className: 'confirm_refund_checkbox',
            validate: [
              {
                type: validatorTypes.REQUIRED,
              },
            ],
          },
        ],
      },
    ],
  };
  return data;
};

export default refund_transaction_schema;
