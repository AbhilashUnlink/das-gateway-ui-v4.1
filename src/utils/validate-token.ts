import { HTTP_STATUS } from "../components/constants";
// import { setLoginDetails } from "../store/features/auth";
// import { store } from "../store/store";
// import { clearLocalStorage } from "./clear-local-storage";

export async function validateTokenExpiryAndGetToken(
  authData: any,
  request: any
): Promise<string | boolean> {
  const { idToken, accessToken, refreshToken } = authData.token;
  const tokenExp = authData && (authData?.exp - 30) * 1000;
  const email = authData && authData?.email;
  if (!refreshToken) {
    return false;
  }
  let currentTimeStamp = new Date().getTime();
  const currentExpiry = parseInt(tokenExp);
  if (
    currentExpiry < currentTimeStamp ||
    !accessToken ||
    isNaN(currentExpiry)
  ) {
    try {
      let api = request("POST");
      let newData = await api(`auth/refreshToken`, {
        username: email,
        refreshToken,
      });
      if ([HTTP_STATUS.OK].includes(newData?.statusCode)) {
        // store.dispatch(setLoginDetails(newData?.data));
        return newData?.data?.token?.idToken;
      } else {
        // clearLocalStorage();
        window.location.reload();
        return false;
      }
    } catch (e) {
      // clearLocalStorage();
      localStorage.clear();
      window.location.reload();
      return false;
    }
  }
  return idToken;
}
