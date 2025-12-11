import { HTTP_STATUS } from "../../../../components/constants";
import { AUTHENTICATION } from "../../../../components/constants/api-paths";
import { RESET_EMAIL } from "../../../../components/constants/constants";
import { RESET_PASSWORD } from "../../../../components/constants/route";
import DasSnackbar from "../../../../components/das-snackbar/DasSnackbar";
import { useFetchWrapper as Api } from "../../../../utils";
import i18next from "i18next";

export const useForgotSubmit = async (values: any, navigate:any) => {
  const response = await Api().post(AUTHENTICATION.FORGOT_PASSWORD_API, values);
  if ([HTTP_STATUS.OK].includes(response?.statusCode)) {
    DasSnackbar.success(i18next.t(`API_STATUS_MESSAGE.${response?.data?.customMessageObj?.code}`));
    navigate(RESET_PASSWORD);
    sessionStorage.setItem(RESET_EMAIL, values.username);
  }
  else if([HTTP_STATUS.INTERNAL_SERVER, HTTP_STATUS.BAD_REQUEST].includes(response?.status)){
    DasSnackbar.error(i18next.t(`API_STATUS_MESSAGE.${response?.messageCode}`));
  }
};
