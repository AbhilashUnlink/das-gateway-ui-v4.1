import { Badge, Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Tooltip } from "@mui/material";

const TooltipDasButton = ({
  title,
  placement,
  buttonClassName,
  onClick,
  icon,
  disabled = false,
  loading = false,
  badge = false
}: any) => {
  const { t } = useTranslation();
  return (
      <Tooltip
        className="tooltip-menu"
        title={t(title)}
        placement={placement}
        arrow
      >
    <Button sx={loading ? { pointerEvents: "none", opacity: ".9" } : {}} className={buttonClassName} onClick={onClick} disabled={disabled}>

        {badge ? (
            <Badge
              color="primary"
              badgeContent={typeof badge === "number" ? badge : undefined}
              variant={typeof badge === "boolean" ? "dot" : "standard"}
              overlap="circular"
              className="badge-class"
            >
              {icon}
            </Badge>
          ) : (
            icon
          )}
    </Button>
      </Tooltip>
  );
};

export default TooltipDasButton;
