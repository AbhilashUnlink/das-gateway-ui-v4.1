import componentTypes from "@data-driven-forms/react-form-renderer/component-types";
import validatorTypes from "@data-driven-forms/react-form-renderer/validator-types";
import { t } from "i18next";
import i18n from "i18n";
import { CurrencyAdornment } from "components/currency-adornment/CurrencyAdornment";
import { CURRENCY_DATA_TYPE_FORMAT } from "components/constants/constants";
import { CurrencyType } from "config/common/currency";

const capture_transaction_schema = (currency: any) => {
  const data = {
    fields: [
      {
        name: "captureform",
        component: "capture-form",
        fields: [
          {
            component: componentTypes.TEXT_FIELD,
            name: "Amount",
            label: t("TransactionCaptureDrawerBody.fields.Original_Amount"),
            type: "number",
            isRequired: true,
            FormFieldGridProps: { xs: 4 },
            isReadOnly: true,
            className: "field_threshold_attempts",
            InputProps: {
              endAdornment: <CurrencyAdornment currency={currency} />,
            },
          },
          {
            component: componentTypes.TEXT_FIELD,
            name: "RemainingAmount",
            label: t("TransactionCaptureDrawerBody.fields.Remaining"),
            type: "number",
            initializeOnMount: true,
            FormFieldGridProps: { xs: 4 },
            isRequired: true,
            isReadOnly: true,
            className: "field_threshold_attempts",
            InputProps: {
              endAdornment: <CurrencyAdornment currency={currency} />,
            },
          },
          {
            component: componentTypes.TEXT_FIELD,
            name: "CaptureAmount",
            label: t("TransactionCaptureDrawerBody.fields.CaptureAmount"),
            type: "number",
            initializeOnMount: true,
            FormFieldGridProps: { xs: 4 },
            isRequired: true,
            className: "field_threshold_attempts",
            helperText: currency === CurrencyType.JPY ? t(
              "TransactionCaptureDrawerBody.helperText.CaptureAmountJP"
            )
              :
              t(
                "TransactionCaptureDrawerBody.helperText.CaptureAmount"
              ),
            dataType: CURRENCY_DATA_TYPE_FORMAT[currency]
              ? CURRENCY_DATA_TYPE_FORMAT[currency]
              : 'float',
            validate: [
              {
                type: validatorTypes.MIN_NUMBER_VALUE,
                includeThreshold: true,
                message: currency === CurrencyType.JPY ? t('validation.MIN_NUMBER_VALUE') : t('validation.CHARGEBACK_MIN_NUMBER_VALUE'),
                value: currency === CurrencyType.JPY ? 1 : 0.01, //Need to update for SG
              },
              {
                type: validatorTypes.REQUIRED,
                message: t("validation.Required"),
              },
              { type: "amount-comparision" },
              /*{
            type: validatorTypes.PATTERN,
            pattern: /^(\d{1,5}|\d{0,5}\.\d{1,2})$/,
            message: t('TransactionCaptureDrawerBody.message.CaptureAmount')
          }*/
            ],
            InputProps: {
              endAdornment: <CurrencyAdornment currency={currency} />,
            },
          },
          {
            component: componentTypes.TEXTAREA,
            name: "notes",
            label: t("TransactionCaptureDrawerBody.fields.Reference"),
            type: "string",
            className: "field_threshold_attempts",
            initializeOnMount: true,
            helperText: t(
              "TransactionCaptureDrawerBody.helperText.OptionalMessage"
            ),
            maxRows: 2,
            validate: [
              {
                type: validatorTypes.MAX_LENGTH,
                threshold: 128,
                message: i18n.t(
                  "TransactionCaptureDrawerBody.message.ref_max_Character"
                ),
              },
            ],
          },
          {
            component: componentTypes.CHECKBOX,
            name: "ConfirmCaptureCheckbox",
            label: t(
              "TransactionCaptureDrawerBody.fields.ConfirmCaptureCheckbox"
            ),
            type: "boolean",
            initializeOnMount: true,
            isRequired: true,
            className: "confirm_capture_checkbox",
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

export default capture_transaction_schema;
