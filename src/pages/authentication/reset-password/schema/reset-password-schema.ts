import validatorTypes from '@data-driven-forms/react-form-renderer/validator-types';
import i18n from '../../../../i18n';
import { validatePasswordSpecialChracaterPattern } from 'utils/helper';

const commonSchema = [
  {
    component: "text-field",
    name: "Password",
    type: "password",
    startIcon: "PasswordOutlineIcon",
    placeholder: i18n.t('Enter New Password'),
    validate: [
      {
        type: validatorTypes.REQUIRED,
        message: i18n.t('Password is required'),
      },
      {
        type: 'min-length',
        threshold: 14,
        message: i18n.t('Password is too short - should be 14 characters minimum.'),
      },
      {
        type: validatorTypes.PATTERN,
        pattern:validatePasswordSpecialChracaterPattern,
        message: i18n.t('Your password must include at least one number, one special character, one uppercase letter, and one lowercase letter.'),
      },
    ],
  },
  {
    component: "text-field",
    name: 'ConfirmPassword',
    type: "password",
    startIcon: "PasswordOutlineIcon",
    placeholder: i18n.t(
      'Confirm New Password',
    ),
    validate: [
      {
        type: validatorTypes.REQUIRED,
        message: i18n.t('Required'),
      },
      {
        type: 'same-password',
      },
    ],
  },
];
export const schema = {
  submitButtonText: 'RESET PASSWORD',
  fields: commonSchema,
};
export const changePasswordSchema = {
  submitButtonText: i18n.t('MenuAppBar.UserProfileItems.Change Password'),
  fields: [
    {
      component: "text-field",
      type: "password",
      startIcon: "PasswordOutlineIcon",
      name: 'currentPassword',
      placeholder: i18n.t('Enter Current Password'),
      validate: [
        {
          type: validatorTypes.REQUIRED,
          message: i18n.t('Password is required'),
        },
        // {
        //   type: 'min-length',
        //   threshold: 14,
        //   message: i18n.t('Password is too short - should be 14 characters minimum.'),
        // },
        // {
        //   type: validatorTypes.PATTERN,
        //   pattern: /(?=.*\d)(?=.*[a-z])(?=.*[@$!%*#?&])(?=.*[A-Z]).+/,
        //   message: i18n.t( 'Your password must include at least one number, one special character, one uppercase letter, and one lowercase letter.'),
        // },
      ],
    },
    {
      component: "text-field",
      type: "password",
      startIcon: "PasswordOutlineIcon",
      name: 'newPassword',
      placeholder: i18n.t('Enter New Password'),
      validate: [
        {
          type: validatorTypes.REQUIRED,
          message: i18n.t('Password is required'),
        },
        {
          type: 'min-length',
          threshold: 14,
          message: i18n.t('Password is too short - should be 14 characters minimum.'),
        },
        {
          type: validatorTypes.PATTERN,
          pattern: validatePasswordSpecialChracaterPattern,
          message: i18n.t('Your password must include at least one number, one special character, one uppercase letter, and one lowercase letter.'),
        },
        {
          type: 'same-oldnew-password',
        },
      ],
    },
    {
      component: "text-field",
      type: "password",
      startIcon: "PasswordOutlineIcon",
      name: 'confirmNewPassword',
      placeholder: i18n.t(
        'Confirm New Password',
      ),
      validate: [
        {
          type: validatorTypes.REQUIRED,
          message: i18n.t('Required'),
        },
        {
          type: 'same-change-password',
        },
      ],
    },
  ],
};
