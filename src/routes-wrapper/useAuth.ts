import { getSignInDataFromLocalStorage } from "utils/helper";

export const useAuth = () => {
  const profile = getSignInDataFromLocalStorage();
  if (profile?.token?.idToken) {
    return true;
  } else {
    return false;
  }
};
