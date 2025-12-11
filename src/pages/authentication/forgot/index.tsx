import ForgotPassword from "./components/ForgotForm";
import { useTranslation } from "react-i18next";
import Wrapper from "../../../components/wrapper/Wrapper";
// import { ArrowBack } from "@mui/icons-material";
// import { useNavigate } from "react-router";

export default function Forgot() {
  const { t } = useTranslation();
  // const navigate = useNavigate();

  return (
    <Wrapper isLoading={false}>
      <h1>
      {t('Forgot Your Password')}
      </h1>
      <p className="forgot-password-description">{t('We will send you help, just enter your email below to receive password instructions.')}</p>
      <ForgotPassword />
      <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
        {/* {t('Not registered yet?')}{' '} */}
      </div>
    </Wrapper>
    // <Wrapper>
    //   <div className="new-forgot-wrap">
    //   <button
    //     className="login-btn back-login"
    //     onClick={() => navigate('/login')}
    //     type="button"
    //   >
    //     <ArrowBack /> {t('Back To Login')}
    //   </button>
    //   <h1 className="forgot-password-title">{t('Forgot Your Password')}</h1>
    //   <p className="forgot-password-description">{t('We will send you help, just enter your email below to receive password instructions.')}</p>
    //   <ForgotPassword />
    //   </div>
    // </Wrapper>
  );
}
