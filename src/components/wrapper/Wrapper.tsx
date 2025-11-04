import paymentOptionsLogo from "../../assets/logo/PO.png";
import SelectLanguage from "../language";
import DasSwiper from "../das-swiper/DasSwiper";
import "./style/style.css";
import Loader from "../loader";

export default function Wrapper({
  children,
  heading,
  isLoading,
  className = "",
  headingClassName = "",
}: any) {
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
              <div className="langs-log-wrap">
                <SelectLanguage />
              </div>
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
