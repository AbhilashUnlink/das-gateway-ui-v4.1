import useFormApi from "@data-driven-forms/react-form-renderer/use-form-api";
import FormSpy from "@data-driven-forms/react-form-renderer/form-spy";
import { useTranslation } from "react-i18next";

export function FormTemplate(props:Record<any,any>) {

    const { handleSubmit } = useFormApi();
    const {t} = useTranslation();
    return (
      <form style={{ display: "flex", flexDirection: "column", gap: "1rem" }} onSubmit={handleSubmit}>
        {props.formFields}

        <FormSpy>
          {() => (
            <button className="login-btn" type="submit">
              {t(props.schema.submitButtonText)}
            </button>
          )}
        </FormSpy>
      </form>
    );

}
