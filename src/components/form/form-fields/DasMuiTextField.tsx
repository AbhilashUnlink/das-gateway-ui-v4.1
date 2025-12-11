import { useState } from "react";
import TextField from "@mui/material/TextField";
import useFieldApi from "@data-driven-forms/react-form-renderer/use-field-api";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { EmailSvgIcon, PasswordSvgIcon } from "components/svg-icons/SvgIcons";

function DasMuiTextField(rawProps: any) {
  const { input, meta } = useFieldApi(rawProps);
  const [showPassword, setShowPassword] = useState(false);

  const {
    placeholder,
    startIcon,
    fullWidth = true,
    variant = "outlined",
    type = "text",
    name,
    ...rest
  } = rawProps;

  const icon =
    name === "username" ? (
      <EmailSvgIcon className="login-f-icons" />
    ) : name === "password" || name === "Password" || name === "ConfirmPassword" || name === "newPassword" || name === "currentPassword" || name === "confirmNewPassword"  ? (
      <PasswordSvgIcon className="login-f-icons" />
    ) : null;

  const isPassword = type === "password";

  return (
    <><div className="form-group relative">
      <label>{placeholder}</label>

      <TextField
        {...input}
        {...rest}
        fullWidth={fullWidth}
        variant={variant}
        placeholder={placeholder}
        type={isPassword && !showPassword ? "password" : "text"}
   error={false}
        // helperText={meta.error && meta.touched ? meta.error : ""}
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
        {<span style={{color:'#fe3030', fontSize:'13px', position:'relative', top:'4px'}}>{Boolean(meta.error && meta.touched)? meta.error :""}</span>}
      </div>
    </>
  );
}

export default DasMuiTextField;
