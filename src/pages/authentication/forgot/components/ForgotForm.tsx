
import FormRenderer from "@data-driven-forms/react-form-renderer/form-renderer";
import { FormTemplate } from "../../../../components/form/forget-form-template/form-template";
import { schema } from "../schema/forgot-schema";
import { validatorMapper } from "./validator-mapper";
import { useForgotSubmit } from "./api";
import { useNavigate } from "react-router";
import { ComponentMapper } from "./ComponentMapper";
const ForgotForm = () => {
  const navigate = useNavigate();
  return (
    <FormRenderer
      schema={schema}
      FormTemplate={FormTemplate}
      validatorMapper={validatorMapper}
      componentMapper={ComponentMapper}
      onSubmit={(values) => useForgotSubmit(values, navigate)}
    />
  );
};

export default ForgotForm;
