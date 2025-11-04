import { InputAdornment } from "@mui/material";

export const CurrencyAdornment = ({ currency }: any) => {
  return (
    <InputAdornment position="end" className="timeframecss">
      {currency}
    </InputAdornment>
  );
};

 