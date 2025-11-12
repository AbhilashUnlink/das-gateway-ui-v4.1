import validatorTypes from "@data-driven-forms/react-form-renderer/validator-types";
import i18n from "../../../../i18n";
import { t } from "i18next";
import { FILTER_INPUT_TYPES } from "components/popper/constants/filter-constants";
import { emailValidationRegexPattern } from "utils/helper";

export const schema = {
  title: 'SUBMIT',
  fields: [
    {
      component: "text-field",
      name: "username",
      startIcon: "PersonOutlineIcon",
      placeholder: i18n.t("Email Address"),
      type: FILTER_INPUT_TYPES.TEXT,
      autoComplete: "on",
      validate: [
        {
          type: "required",
        },
        {
          type: "custom_email",
        },
        {
          type: validatorTypes.PATTERN,
          pattern: emailValidationRegexPattern,
          message: t('Invalid email'),
        }
      ],
    },
    // {
    //   component: 'Das_Mui_Textfield',
    //   name: 'username',
    //   placeholder: i18n.t('Email Address'),
    //   type: 'email',
    //   startIcon: 'AlternateEmailIcon',
    //   autoComplete: 'off',
    //   className: 'forgot-form-fields',
    //   validate: [
    //     {
    //       type: validatorTypes.REQUIRED,
    //       message: i18n.t('Required'),
    //     },
    //     {
    //       type: 'email',
    //     },
    //     {
    //       type: validatorTypes.REQUIRED,
    //       message: t("OnBoarding.CREATE_ACCOUNT.ValidationMessages.Please input your email"),
          
    //     },
    //     {
    //       type: validatorTypes.PATTERN,
    //       pattern: emailValidationRegexPattern,
    //       message: t('Invalid email'),
    //     }
    //   ],
    // },
  ],
};
