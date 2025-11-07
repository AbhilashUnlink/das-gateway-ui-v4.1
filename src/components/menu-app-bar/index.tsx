import Das from '../../assets/logo/logo.png';
import { Suspense } from "react";
import "./style.css";
import { lazy } from "react";
import SelectTime from "../time/SelectTime";
import NotificationPopper from "../notification";
import LayoutSwitcher from "components/layout-switcher/LayoutSwitcher";
import { Menu } from "@mui/icons-material";
const SelectLanguage = lazy(() => import("../language"));
const UserProfile = lazy(() => import("../user-profile/UserProfile"));

const MenuAppBar = ({ toggleSideBar }: { toggleSideBar: any }) => {
  return (
    <Suspense fallback={<></>}>
      <img
            src={Das}
            className={'das-logo-big'}
            alt="Payment Options"
          />
      <div className="menu-buttons-new">
        <div style={{ width: "10%", display:'flex', alignItems:'center', padding: '5px 10px' }}>
          <Menu onClick={toggleSideBar} style={{cursor:'pointer'}} />
        </div>
        <div style={{ width: "90%", display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
          <SelectTime />
          <LayoutSwitcher />
          <SelectLanguage />
          <NotificationPopper />
          <UserProfile />
        </div>
      </div>
    </Suspense>
  );
};

export default MenuAppBar;
