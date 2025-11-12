import { useState } from 'react';
import ResetPassword from './components/ResetForm';
import useHandleChange from './components/use-handle-change';
import { useTranslation } from 'react-i18next';
import Wrapper from '../../../components/wrapper/Wrapper';
// import DasPopup from '../../../components/das-popup/DasPopup';
import { AUTHENTICATION } from '../../../components/constants/api-paths';
import DasSnackbar from '../../../components/das-snackbar/DasSnackbar';
import { HTTP_STATUS } from '../../../components/constants';
import { useFetchWrapper as Api } from '../../../utils';
import { RESET_EMAIL } from '../../../components/constants/constants';
export default function Reset() {
  const otpLength = [1, 2, 3, 4, 5, 6];

  const [otpError, setOtpError] = useState<string>('');

  const { t } = useTranslation();

  const [otpValue, setOtpValue] = useState<any>({
    otp1: '',
    otp2: '',
    otp3: '',
    otp4: '',
    otp5: '',
    otp6: '',
  });
  const [otp, setOtp] = useState('');
  const [openPopup, setOpenPopup] = useState<any>(true);
  const onVerifyOtp = () => {
    setOpenPopup(false);
    setOtp(Object.values(otpValue).join().replaceAll(',', ''));
  };
  const onResendOtp = async () => {
    let resetEmail = sessionStorage.getItem(RESET_EMAIL);
    const response = await Api().post(AUTHENTICATION.FORGOT_PASSWORD_API, {
      username: resetEmail,
    });
    if (response.statusCode === HTTP_STATUS.OK) {
      DasSnackbar.success(t('API_STATUS_MESSAGE.INFO_AB_0003'));
    } else {
      DasSnackbar.error(t(`API_STATUS_MESSAGE.${response.messageCode}`));
    }
  };
  return (
    <>
     <Wrapper isLoading={false}>
     {!openPopup ? (
      <>
      <h1>
          {t('Reset Password')}
          </h1>
          <p className="forgot-password-description">{t('We will send you help, just enter your email below to receive password instructions.')}</p>
          <ResetPassword
        otp={otp}
        setOtpError={setOtpError}
        setOpenPopup={setOpenPopup}
        setOtpValue={setOtpValue}
      />
      </>
     )
     :
          <>
          <h1>{t('Please enter OTP to verify your account')}</h1>
          <p className="forgot-password-description">
            {t('Please check your email account for the verification code we just sent you and enter that code in the box below')}
          </p>
          <div className="otp-field">
            {otpLength.map((itm: number, id: number) => (
              <input
                key={id}
                name={`otp-${itm}`}
                className="reset-otp-input"
                type="number"
                maxLength={1}
                inputMode="numeric"
                value={otpValue[`otp${itm}`]}
                onChange={e => {
                  useHandleChange(e, setOtpValue, otpValue);
                }}
              />
            ))}
          </div>
          <button
            onClick={onVerifyOtp}
            className={'verify-button login-btn'
            }
            disabled={Object.values(otpValue).some(
              value => value === '' || value === undefined,
            )}
          >
            {t('VERIFY')}
          </button>
          <h5 className="didnt-recieved">
            {t( 'Didn’t receive code?')}
          <div
            onClick={() => onResendOtp()}
            className={'resend-button'}
          >
            {t('Resend OTP')}
          </div>
          </h5>
          {otpError && (
          <div className="m-10 otp-errors">
            <div className="login-errors">{otpError}</div>
          </div>
        )}
          </>
}
        </Wrapper>
    {/* <Wrapper
      headingClassName="reset-password-heading"
      heading={t('Reset Password')}
    >
      <div className="form-fields">
        {!openPopup && (
          <label className="otp-label">
            {t('OTP')} : {otp}
          </label>
        )}
        <DasPopup open={openPopup}>
          <h3>{t('Please enter OTP to verify your account')}</h3>
          <div className={styles['description-text']}>
            {t('Please check your email account for the verification code we just sent you and enter that code in the box below')}
          </div>
          <div className="otp-field">
            {otpLength.map((itm: number, id: number) => (
              <input
                key={id}
                name={`otp-${itm}`}
                className="reset-otp-input"
                type="number"
                maxLength={1}
                inputMode="numeric"
                value={otpValue[`otp${itm}`]}
                onChange={e => {
                  useHandleChange(e, setOtpValue, otpValue);
                }}
              />
            ))}
          </div>
          <button
            onClick={onVerifyOtp}
            className={styles['verify-button']
            }
            disabled={Object.values(otpValue).some(
              value => value === '' || value === undefined,
            )}
          >
            {t('VERIFY')}
          </button>
          <h5 className="didnt-recieved">
            {t( 'Didn’t receive code?')}
          </h5>
          <div
            onClick={() => onResendOtp()}
            className={styles['resend-button']}
          >
            {t('Resend OTP')}
          </div>
        </DasPopup>

        {otpError && (
          <div className="m-10 otp-errors">
            <div className="login-errors">{otpError}</div>
          </div>
        )}
      </div>
      <ResetPassword
        otp={otp}
        setOtpError={setOtpError}
        setOpenPopup={setOpenPopup}
        setOtpValue={setOtpValue}
      />
    </Wrapper> */}
    </>
  );
}
