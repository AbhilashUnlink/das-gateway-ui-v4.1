import LoginForm from './components/LoginForm';
import { useTranslation } from 'react-i18next';
import { CHOOSE_ACCOUNT_TYPE_PAGE } from '../../../components/constants/route';
import { useNavigate } from 'react-router';
import Wrapper from '../../../components/wrapper/Wrapper';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
export default function Login() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  function CreateAccount() {
    navigate(CHOOSE_ACCOUNT_TYPE_PAGE);
  }
  function forgotPassword(): void {
    navigate("/forgot-password");
  }

  const token = useSelector((store: any) => store?.auth?.profile?.token?.idToken);
  useEffect(() => {
    if (token) {
      navigate("/transactions");
    }
  }, [token]);

  return (
    <Wrapper isLoading={false}>
      <h1>
        {' '}
        {t('Sign in to')}{' '}
        <span>{t('Payment Options')}</span>
      </h1>
      <LoginForm />
      <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
        {/* {t('Not registered yet?')}{' '} */}
        <button
          className="forgot-password n-f-password"
          onClick={forgotPassword}
          type="button"
        >
          {t("Forgot Password?")}
        </button>
        <button
          onClick={CreateAccount}
          className="forgot-password"
          type="button"
        >
          {t('Create an Account')}
        </button>
      </div>
    </Wrapper>
  );
}
