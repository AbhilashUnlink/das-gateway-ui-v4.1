import { useSelector } from "react-redux";
import { User_Management_Access } from "pages/merchants/merchant-view/components/merchant-details/constants/userManagementAccessLevel";

const useIsViewerAccess =  () => {
  const accessLevel = useSelector((store: any) => store?.auth?.profile?.accessLevel);
  const isViewer = accessLevel === User_Management_Access["VIEWER"] ?true :false;
  return isViewer; 
};
export default useIsViewerAccess;
