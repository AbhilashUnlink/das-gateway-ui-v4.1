import React from "react";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Tooltip } from "@mui/material";

const TooltipDasButton = ({
  title,
  placement,
  buttonClassName,
  onClick,
  icon,
  disabled = false,
  loading = false
}: any) => {
  const { t } = useTranslation();
  return (
    <Button sx={loading ? { pointerEvents: "none", opacity: ".9" } : {}} className={buttonClassName} onClick={onClick} disabled={disabled}>

      <Tooltip
        className="tooltip-menu"
        title={t(title)}
        placement={placement}
        arrow
      >
        {icon}
      </Tooltip>
    </Button>
  );
};

export default TooltipDasButton;
