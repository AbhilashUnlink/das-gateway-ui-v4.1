import componentTypes from "@data-driven-forms/react-form-renderer/component-types";
import validatorTypes from "@data-driven-forms/react-form-renderer/validator-types";
import { t } from "i18next";
import { TRANSACTION_STATUS_TYPE } from "../../constants/transaction";

const editDetailSchema = {
  fields: [
    {
      name: 'editTransactionForm',
      component: 'support-form',
      fields: [
        {
          component: componentTypes.SELECT,
          name: 'Status',
          label: t('TransactionDetail.TransactionInfo.fields.Status'),
          isRequired: true,
          FormFieldGridProps: { xs: 12 },
          className: 'support-fields',
          validate: [{ type: validatorTypes.REQUIRED, message: t("validation.Required") }],
          options: TRANSACTION_STATUS_TYPE,
        },
        {
          component: componentTypes.TEXT_FIELD,
          name: 'AuthCode',
          label: t('TransactionDetail.TransactionInfo.fields.AuthCode'),
          FormFieldGridProps: { xs: 12 },
          className: 'support-fields new-support-fields',
          validate: [
            {
              type: validatorTypes.EXACT_LENGTH,
              threshold: 6,
              message: t("TransactionDetailDrawerBody.Should be 6 characters long")
            },
          ],
        },
        {
          component: componentTypes.TEXTAREA,
          name: 'Comment',
          label: t('ContactUs.SupportForm.fields.Description'),
          isRequired: true,
          FormFieldGridProps: { xs: 12 },
          className: 'support-fields',
          maxRows: 5,
          validate: [
            {
              type: validatorTypes.REQUIRED,
              message: t("validation.Required")
            },
            {
              type: validatorTypes.MAX_LENGTH,
              threshold: 250,
              message: t(
                'SubmitEvidenceDrawer.fields.helperText.OptionalMessage',
              ),
            },
          ],
        },
      ],
    },
  ],
};

export default editDetailSchema;
