import React from "react";
import { Button, Tooltip } from "@mui/material";
import { useTranslation } from "react-i18next";
import { hasAccess } from "../../../../utils/has-access";

const DasButton = ({
  accessKey = "TRANSACTION_ACTION_BUTTON",
  variant,
  buttonClassName,
  handleOnClick,
  imgSrc,
  imgClassName,
  imgAlt,
  buttonText,
  startAdornment,
  adminEditor = 'ADMIN_EDITOR',
  hasSingleAccess = false,
  disabled = false,
  loading = false,
  title
}: any) => {
  const { t } = useTranslation();
  const accessGranted = hasSingleAccess ? hasAccess(accessKey) : hasAccess(accessKey, adminEditor);
  return accessGranted ? (
    <Tooltip title={title} arrow placement="left">
    <Button
      sx={loading ? {
        pointerEvents: "none",
        opacity: ".9"
      } : {}}
      variant={variant}
      className={buttonClassName}
      onClick={handleOnClick}
      disabled={disabled}
    >
      {startAdornment}
      <img src={imgSrc} className={imgClassName} alt={imgAlt} />
      <strong>{t(buttonText)}</strong>
    </Button>
    </Tooltip>
  ) : (
    <></>
  );
};

export default DasButton;
