import i18n from "../../../../i18n";
import { FILTER_INPUT_TYPES } from "components/popper/constants/filter-constants";

export const schema = {
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
      ],
    },
    {
      component: "text-field",
      name: "password",
      type: "password",
      startIcon: "PasswordOutlineIcon",
      placeholder: i18n.t("Password"),
      validate: [
        {
          type: "required",
        },
      ],
    },
  ],
};
