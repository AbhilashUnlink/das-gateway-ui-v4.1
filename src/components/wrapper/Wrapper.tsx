import paymentOptionsLogo from "../../assets/logo/PO.png";
import SelectLanguage from "../language";
import DasSwiper from "../das-swiper/DasSwiper";
import "./style/style.css";
import Loader from "../loader";
import { useNavigate } from "react-router";
import { t } from "i18next";
import { BackToSignInSvgIcon } from "components/svg-icons/SvgIcons";

export default function Wrapper({
  children,
  heading,
  isLoading,
  className = "",
  headingClassName = "",
}: any) {
  const navigate = useNavigate();
  const pathname= window?.location?.pathname;
  return (
    <>
      <div className={`new-login-wrapper ${className}`}>
        <div className="new-login-box">
          <DasSwiper />
          <div className="new-log-box">
            <Loader isLoading={isLoading} />
            <img
              src={paymentOptionsLogo}
              className="new-login-logo"
              alt="Payment Options"
            />
            <h1 className={headingClassName}> {heading}</h1>
            <div className="new-log-wrap">
              <div className="flex-wrapper flex" style={{width:'100%', justifyContent:'space-between', alignItems:'center'}}>
              { pathname === "/forgot-password" || pathname === "/reset-password"?
            <button
        className="login-btn back-login"
        onClick={() => navigate('/login')}
        type="button"
      >
        <BackToSignInSvgIcon /> {t('Back To Login')}
      </button>
    :
    <div></div>  
    }
              <div className="langs-log-wrap">
                <SelectLanguage />
              </div>
              </div>
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
