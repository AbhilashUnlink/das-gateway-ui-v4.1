import { MENU } from "../../components/constants/route";

const useLegacy =  () => {
  const path = window.location.pathname;
  if([MENU.LEGACY_TRANSACTIONS,MENU.LEGACY_STATEMENTS,MENU.LEGACY_DISPUTE].includes(path)){
      return true;
  }else{
    return false;
  }
};
export default useLegacy;
