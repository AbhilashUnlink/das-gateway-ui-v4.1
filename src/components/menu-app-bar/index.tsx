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
      <div className="menu-buttons-new">
        <div style={{ width: "10%" }}>
          <Menu onClick={toggleSideBar} />
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
