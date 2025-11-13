import { HTTP_STATUS } from '../../../../components/constants';
import { AUTHENTICATION } from '../../../../components/constants/api-paths';
import { useFetchWrapper as Api } from '../../../../utils';
import { LOGIN, MENU } from '../../../../components/constants/route';
import DasSnackbar from '../../../../components/das-snackbar/DasSnackbar';
import i18next from 'i18next';
import { RESET_EMAIL } from '../../../../components/constants/constants';
import { setFirstTimeLogin, setLoginDetails } from '../../../../store/features/auth';
import type { formDataType } from '../../../../@types/reset-type';
import { Navigate } from 'react-router';

export const useResetSubmit = async (
  formData: formDataType,
  Code: any,
  setOtpError: any,
  setOpenPopup: any,
  setOtpValue: any,
  navigate: any
): Promise<void> => {
    try {
      if (Code.length === 6) {
        const username = sessionStorage.getItem(RESET_EMAIL);
        const payload = {
          username,
          Code,
          ...formData,
        };
        const response = await Api().post(
          AUTHENTICATION.RESET_PASSWORD_API,
          payload,
        );
        if ([HTTP_STATUS.OK].includes(response?.statusCode)) {
          DasSnackbar.success(
            i18next.t(`API_STATUS_MESSAGE.${response.messageCode}`),
          );
          sessionStorage.removeItem(RESET_EMAIL);
          navigate(LOGIN);
        } else if ([HTTP_STATUS.INTERNAL_SERVER].includes(response?.status)) {
          DasSnackbar.error(
            i18next.t(`API_STATUS_MESSAGE.${response.messageCode}`),
          );
          setOpenPopup(true);
          setOtpValue({
            otp1: '',
            otp2: '',
            otp3: '',
            otp4: '',
            otp5: '',
            otp6: '',
          });
        }
      } else {
        setOtpError(i18next.t(`API_STATUS_MESSAGE.VAL_AB_0005`));
      }
    } catch (e:any) {
      console.log('ERROR', e);
      DasSnackbar.error(
            i18next.t(`API_STATUS_MESSAGE.${e?.messageCode}`),
          );
    }

};
export const useResetFirstTimeLoginSubmit = async (
  formData: formDataType,
  dispatch: any,
  history: any,
  partnerUser:any
): Promise<void> => {
    try {
      const response = await Api().post(
       "auth/change-password",
        formData,
      );
      if([HTTP_STATUS.OK].includes(response?.statusCode)) {
        dispatch(setLoginDetails(response.data));
        dispatch(setFirstTimeLogin(false));
        DasSnackbar.success(
          i18next.t(`API_STATUS_MESSAGE.${response.messageCode}`),
        );
        if(partnerUser){
          history.push(MENU.RESELLER);
        }
        else{
        history.push(MENU.TRANSACTIONS);
        }

      } 
      else if([HTTP_STATUS.INTERNAL_SERVER].includes(response?.status)) {
        DasSnackbar.error(
          i18next.t(`API_STATUS_MESSAGE.${response.messageCode}`),
        );
      }
    } catch (e) {
      console.log('ERROR', e);
    }

};
