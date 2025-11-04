import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";

type Confirmation_Delete_Dialog_Type = {
  open: boolean;
  onClose: () => void;
  title: string;
  heading?: string;
  content?: any;
  handleSubmit?: () => void;
  cancel?: string;
  submit?: string;
  value?: string;
  className?: string;
  disabled?: boolean;
  maxWidth?: any;
  maxHeight?: any;

};

function ConfirmationDialogRaw({
  onClose,
  handleSubmit,
  open,
  content,
  heading,
  title,
  cancel,
  submit,
  className,
  disabled = false,
  maxWidth = "xs",
  maxHeight = 435
}: Confirmation_Delete_Dialog_Type) {
  const handleCancel = () => {
    onClose();
  };

  const handleOk = () => {
    handleSubmit && handleSubmit();
    onClose();
  };

  return (
    <Dialog
      className={className}
      sx={{
        "& .MuiDialog-paper": {
          width: "80%",
          maxHeight: { maxHeight },
          borderRadius: "6px 6px 6px 6px",
        },
      }}
      maxWidth={maxWidth}
      open={open}
    >
      <DialogTitle className="confirm-heading">{title}</DialogTitle>
      <DialogContent className="confirm-popup-body" dividers>
        <h4>{heading}</h4>
        {/* <h4>{subHeading}</h4> */}
        <p>{content}</p>
      </DialogContent>
      <DialogActions className="action-buttons">
        {submit &&
          <Button className={disabled ? "submit-button disable-submit-btn" : "submit-button"} onClick={handleOk} disabled={disabled}>
            {submit}
          </Button>}
        {cancel && <Button className="cancel-button" autoFocus onClick={handleCancel}>
          {cancel}
        </Button>}
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmationDialogRaw;
