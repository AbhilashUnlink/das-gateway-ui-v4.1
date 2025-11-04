import FormSpy from "@data-driven-forms/react-form-renderer/form-spy";
import useFormApi from "@data-driven-forms/react-form-renderer/use-form-api";
import Button from "@mui/material/Button";
import { useTranslation } from "react-i18next";
const FormTemplate = ({ formFields }: any) => {
  const { handleSubmit, onCancel, getState } = useFormApi();
  const { submitting, valid } = getState();
  const { t } = useTranslation();
  return (
    <form
      className="detail-form refund-form"
      onSubmit={handleSubmit}
      noValidate
    >
      <div className="detail-list">
        <div className="inner-details">
          <div className="risk-statement">
            {formFields}
            <FormSpy subscription={{ pristine: true }}>
              {() => (
                <div className="action-buttons">
                  <Button
                    disabled={submitting || !valid}
                    type="submit"
                    className="submit-button"
                    variant="contained"
                  >
                    {t("TransactionCaptureDrawerBody.button.Submit")}
                  </Button>
                  <Button
                    variant="contained"
                    className="cancel-button"
                    onClick={onCancel}
                  >
                    {t("TransactionCaptureDrawerBody.button.Cancel")}
                  </Button>
                </div>
              )}
            </FormSpy>
          </div>
        </div>
      </div>
    </form>
  );
};

export default FormTemplate;
