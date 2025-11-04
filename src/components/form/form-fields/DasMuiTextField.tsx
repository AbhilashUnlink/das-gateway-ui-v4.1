import { useState } from "react";
import TextField from "@mui/material/TextField";
import useFieldApi from "@data-driven-forms/react-form-renderer/use-field-api";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

function DasMuiTextField(rawProps: any) {
  const { input, meta } = useFieldApi(rawProps);
  const [showPassword, setShowPassword] = useState(false);

  const {
    placeholder,
    startIcon,
    fullWidth = true,
    variant = "outlined",
    type = "text",
    ...rest
  } = rawProps;

  const icon =
    startIcon === "PersonOutlineIcon" ? (
      <PersonOutlineIcon className="login-f-icons" />
    ) : startIcon === "AlternateEmailIcon" ? (
      <AlternateEmailIcon className="login-f-icons" />
    ) : null;

  const isPassword = type === "password";

  return (
    <>
      <label>{placeholder}</label>

      <TextField
        {...input}
        {...rest}
        fullWidth={fullWidth}
        variant={variant}
        placeholder={placeholder}
        type={isPassword && !showPassword ? "password" : "text"}
        error={Boolean(meta.error && meta.touched)}
        helperText={meta.error && meta.touched ? meta.error : ""}
        slotProps={{
          input: {
            startAdornment: icon ? (
              <InputAdornment position="start">{icon}</InputAdornment>
            ) : undefined,
            endAdornment: isPassword ? (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ) : undefined,
          },
        }}
      />
    </>
  );
}

export default DasMuiTextField;
