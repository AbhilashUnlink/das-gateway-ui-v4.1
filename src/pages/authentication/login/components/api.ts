
import { t } from 'i18next';
import { HTTP_STATUS } from '../../../../components/constants';
import { AUTHENTICATION } from '../../../../components/constants/api-paths';
import DasSnackbar from '../../../../components/das-snackbar/DasSnackbar';
import { useFetchWrapper as Api } from '../../../../utils';

export const getUserProfile = async (values: any) => {

  const loginDetails = await Api().post(AUTHENTICATION.LOGIN_API, values);
  if([HTTP_STATUS.INTERNAL_SERVER].includes(loginDetails.status)) {
    DasSnackbar.error(t(`API_STATUS_MESSAGE.${loginDetails.messageCode}`));
  }
  return loginDetails?.data;
};

export const getUserMFA = async (values: any) => {

  const userMFA = await Api().post(AUTHENTICATION.CHECK_MFA_EXIST_URL, values);
  if([HTTP_STATUS.INTERNAL_SERVER].includes(userMFA.status)) {
    DasSnackbar.error(t(`API_STATUS_MESSAGE.${userMFA.messageCode}`));
  }
  return userMFA;
};

export const getVerifyUserMFA = async (values: any) => {

  const payload = {
    otp1: values.otp,
    username: values.username,
    password: values.password
  };

  const verifyMFAOTP = await Api().post(AUTHENTICATION.MFA_VERIFY_OTP_URL, payload);
  if([HTTP_STATUS.INTERNAL_SERVER].includes(verifyMFAOTP.status)) {
    DasSnackbar.error(t(`API_STATUS_MESSAGE.${verifyMFAOTP.messageCode}`));
  }
  return verifyMFAOTP;
};

export const getVerifyUserMFAFirstTime = async (values: any) => {

  const payload = {
    email: values.email,
    password: values.password,
    otp1: values.otp1,
    otp2: values.otp2,
    secret: values.secret,
    emailOtp: values.emailOtp,
  };

  let verifyMFAOTP;

  // const resetMFA = await Api().post(AUTHENTICATION.RESET_MFA_PRIVATE_URL, payload);
  // if([HTTP_STATUS.CREATED].includes(resetMFA.statusCode)) {
    verifyMFAOTP = await Api().post(AUTHENTICATION.MFA_VERIFY_OTP_FIRST_URL, payload);
    if([HTTP_STATUS.INTERNAL_SERVER].includes(verifyMFAOTP.status)) {
      DasSnackbar.error(t(`API_STATUS_MESSAGE.${verifyMFAOTP.messageCode}`));
    // }
  }

  return verifyMFAOTP;
};
