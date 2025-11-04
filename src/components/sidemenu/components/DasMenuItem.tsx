import { Link, useLocation } from "react-router";
import "../style.css";
import { useDispatch, useSelector } from "react-redux";
import { setAppTitle } from "store/features/app-title";
import { onStepClick } from "store/features/onboarding";
import { resetFilter } from "store/features/filter";
import { MENU } from "../../constants/route";
import { useEffect, useState } from "react";

const DasMenuItem = ({ name, iconClassName, to }: any) => {
  const dispatch = useDispatch();
  const firstLogin = useSelector((store: any) => store.auth.firstTimeLogin);
  const [currentPath, setCurrentPath] = useState("");
  const location = useLocation();

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location]);

  return (
    <div className="link-wrap" onClick={() => {
      dispatch(onStepClick(0));
      dispatch(resetFilter());

    }}>
      <Link
        to={firstLogin ? MENU.RESET : to}
        onClick={() => {
          dispatch(setAppTitle(name));
        }}
        className={`menu-item ${([MENU.ONBOARDING, MENU.SALES_LEAD].includes(to) ? currentPath === to : currentPath.includes(to)) ? "active" : ""
          }`}
      >
        <div className="menu-icon">
          <i className={iconClassName} />
        </div>
      </Link>
      <div className="name-link">{name}</div>
    </div>
  );
};

export default DasMenuItem;
