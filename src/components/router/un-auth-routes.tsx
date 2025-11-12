import { lazy } from 'react';
import {
  // CHOOSE_ACCOUNT_TYPE_PAGE,
  FORGOT_PASSWORD,
  LOGIN,
  RESET_PASSWORD,
  // RESET_SUCCESSFULL,
  // SIGN_UP_PAGE,
  // MFA_SETUP,
  // DASPPAY_TRANSACTION_DETAILS,
} from '../constants/route';
// import SignUp from '../../pages/authentication/sign-up';
// import CustomLayoutComponent from '../../pages/authentication/sign-up';

const Login = lazy(
  () =>
    import(
      '../../pages/authentication/login/index' /* webpackChunkName: "login" */
    ),
);
const ForgotPassword = lazy(
  () =>
    import(
      '../../pages/authentication/forgot/index' /* webpackChunkName: "forgot" */
    ),
);

const ResetPassword = lazy(
  () =>
    import(
      '../../pages/authentication/reset-password/index' /* webpackChunkName: "reset-password" */
    ),
);

export const unAuthRoutes = [
  { path: LOGIN, component: Login },
  { path: FORGOT_PASSWORD, component: ForgotPassword },
  { path: RESET_PASSWORD, component: ResetPassword },
  // { path: RESET_SUCCESSFULL, component: ResetSuccessful },
  // { path: CHOOSE_ACCOUNT_TYPE_PAGE, component: ChooseAccount },
  // { path: SIGN_UP_PAGE, component: SignUp },
  // { path: SIGN_UP_PAGE, component: CustomLayoutComponent },
  // { path: MFA_SETUP, component: MFASetup },
  // { path: DASPPAY_TRANSACTION_DETAILS, component: DaspayTransactionDetails, showAll: true },
];
