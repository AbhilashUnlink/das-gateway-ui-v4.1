import React from "react";
import FormRenderer from "@data-driven-forms/react-form-renderer/form-renderer";
import { FormTemplate } from "../../../../components/form/reset-form-template/form-template";
import { changePasswordSchema, schema } from "../schema/reset-password-schema";
import { validatorMapper } from "./validate-mapper";
import { useResetFirstTimeLoginSubmit, useResetSubmit } from "./api";
import { useDispatch, useSelector } from "react-redux";
import { hasAccess } from "utils/has-access";
import { useNavigate } from "react-router";
import { ComponentMapper } from "./ComponentMapper";
import type { Props } from "../../../../@types/reset-type";

const ResetForm: React.FC<Props> = ({ setOtpError, otp, setOpenPopup, setOtpValue, changePassword=false }) => {
  const dispatch = useDispatch();
  const firstLogin = useSelector((store: any) => store.auth.firstTimeLogin);
  const navigate = useNavigate();
  const partnerUser = hasAccess("THIRDPARTY");
  return (
    <FormRenderer
      schema={changePassword || firstLogin ?changePasswordSchema:schema}
      FormTemplate={FormTemplate}
      validatorMapper={validatorMapper}
      componentMapper={ComponentMapper}
      onSubmit={(formData) => {
        if (firstLogin || changePassword) {
          useResetFirstTimeLoginSubmit(formData, dispatch, navigate,partnerUser);
          return;
        }
        else {
          useResetSubmit(formData, otp, setOtpError, setOpenPopup, setOtpValue, navigate);
          return;
        }
      }}
    />
  );
};

export default ResetForm;
