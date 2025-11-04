import { useState } from 'react';
import { Menu, MenuItem } from '@mui/material';
// import User from '../../assets/faces/default-user.png';
// import LogoutIcon from '@mui/icons-material/Logout';
import {
  // applicationApprovalLevel,
  // ApprovalLevelType,
} from '../../config/common/applicationApprovalLevel';
import {
  type subsidaryType,
  subsidaryLevel,
} from '../../config/common/subsidaryLevel';
import { useTranslation } from 'react-i18next';
import { useFetchWrapper as Api } from '../../utils';
import { hasAccess } from '../../utils/has-access';
import { useDispatch, useSelector } from 'react-redux';
import {
  // authAppLevel,
  authEmail,
  authGroups,
  authLastLogin,
  authName,
  authProfile,
  authSubsidiaries,
  authToken,
  resetProfile,
} from 'store/features/auth';
import { AUTHENTICATION } from '../constants/api-paths';
import { ACCESS_GROUP_NAMES } from '../constants/access-group-name';
import { setAppTitle } from 'store/features/app-title';
import { onStepClick } from 'store/features/onboarding';
//import useDynamicTitle from '../../hooks/dynamic-title/useDynamicTitle';
// import PasswordOutlinedIcon from '@mui/icons-material/PasswordOutlined';
import { resetConfigData } from 'store/features/gateway-config';
// import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import SignInAsMerchant from './SignInAsMerchant';
import { setDrawer } from 'store/features/drawer';
import useDateFormatter from 'hooks/date-preference/useDateFormatter';
import { setFilterPayload } from 'store/features/filter';
import { useNavigate } from 'react-router';
// import clearLocalStorage from 'utils/clear-local-storage';
// import Loader from 'components/loader';
import "./style.css";

const Logout = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [userGroupAccess, setUserGroupAccess] = useState<String[]>([]);
  const [userAccessLevel, setUserAccessLevel] = useState<String[]>([]);
  // const [approvalLevel, setApprovalLevel] = useState<ApprovalLevelType>('0');
  const [poEntity, setPoEntity] = useState([]);
  const [lastLogin, setLastLogin] = useState('');
  const { filterDateFormatter } = useDateFormatter();
  // const loading = useSelector((state:any) => state.loader.isLoaderActive);
  const { t } = useTranslation();
  const { accessToken, idToken, refreshToken } = useSelector(authToken);
  const userName = useSelector(authName);
  const Groups = useSelector(authGroups);
  const Email = useSelector(authEmail);
  // const AppLevel = useSelector(authAppLevel);
  const subsidiaries = useSelector(authSubsidiaries);
  const lastlogin = useSelector(authLastLogin);
  const Profile = useSelector(authProfile);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const changePassword = () => {
    navigate('/change-password');
  };
  const userPrefferenceSettings = () => {
    navigate('/user-settings');
  };
  const useLogout = async () => {
    dispatch(onStepClick(0));
    try {
      // clearLocalStorage();
      const token = { accessToken, idToken, refreshToken };
      if (accessToken && idToken && refreshToken) {
        const tokenData = {
          username: Email,
          token,
        };
        await Api().post(AUTHENTICATION.SIGN_OUT, tokenData);
        dispatch(setFilterPayload({ filter: [] }));
        dispatch(setAppTitle('Payment Options'));
        dispatch(resetProfile());
        dispatch(resetConfigData());
        dispatch(setDrawer([]));
        // clearLocalStorage();
        navigate('login');
      }
    } catch (e) {
      console.error(e);
      navigate('login');

    }
  };

  const handleMenu = (event: any) => {
    setAnchorEl(event.currentTarget);

    let userGroupAccess = [];
    try {
      userGroupAccess = Groups;
    } catch (e) {
      userGroupAccess = [];
    }
    if (userGroupAccess) {
      setUserGroupAccess(userGroupAccess);
    }

    let userAccessLevel = [];
    try {
      userAccessLevel = Profile.accessLevel;
    } catch (e) {
      userAccessLevel = [];
    }
    if (userAccessLevel) {
      setUserAccessLevel(userAccessLevel);
    }
    // setApprovalLevel(AppLevel || '0');
    let Subsidiaries = [];
    try {
      Subsidiaries = subsidiaries;
    } catch (e) {
      Subsidiaries = [];
    }
    const data = Subsidiaries.map((item: subsidaryType) => {
      return subsidaryLevel[item] && `PO ${subsidaryLevel[item]}`;
    }).filter((item: any) => item);
    setPoEntity(data);

    if (!isNaN(lastlogin)) {
      setLastLogin(filterDateFormatter(new Date(lastlogin)));
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const { signInAsMerchant, ghost } = useSelector(
    (store: any) => store?.auth?.profile,
  );
  return (
    <>
      <div className="profile-button">
        <button onClick={handleMenu}>
          {/* <AccountCircle /> */}
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_2943_114)">
              <path
                d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z"
                fill="#D3CABA"
              />
              <path
                d="M20.7315 19.017C20.2095 18.6045 19.5735 18.3075 18.8835 18.1635L15.594 17.5035C15.249 17.4375 15 17.1285 15 16.7685V16.014C15.2115 15.717 15.411 15.3225 15.6195 14.91C15.7815 14.5905 16.026 14.109 16.1475 13.9845C16.8135 13.3155 17.457 12.564 17.6565 11.595C17.8425 10.686 17.6595 10.209 17.445 9.825C17.445 8.8665 17.415 7.6665 17.1885 6.7935C17.1615 5.6115 16.947 4.947 16.407 4.365C16.026 3.9525 15.465 3.8565 15.0135 3.78C14.8365 3.75 14.592 3.708 14.502 3.66C13.7025 3.228 12.912 3.0165 11.9685 3C9.993 3.081 7.5645 4.338 6.7515 6.579C6.4995 7.2615 6.525 8.382 6.546 9.282L6.5265 9.8235C6.333 10.2015 6.1425 10.6815 6.33 11.5935C6.528 12.564 7.1715 13.317 7.8495 13.995C7.9605 14.109 8.211 14.595 8.376 14.916C8.5875 15.327 8.7885 15.72 9 16.0155V16.77C9 17.1285 8.7495 17.4375 8.403 17.505L5.1105 18.165C4.425 18.3105 3.789 18.6045 3.2685 19.017C3.1065 19.1475 3.0045 19.338 2.988 19.545C2.9715 19.752 3.0405 19.9545 3.18 20.109C5.421 22.581 8.6355 24 12 24C15.3645 24 18.5805 22.5825 20.82 20.109C20.9595 19.9545 21.03 19.7505 21.012 19.5435C20.9955 19.3365 20.8935 19.146 20.7315 19.017Z"
                fill="white"
              />
            </g>
            <defs>
              <clipPath id="clip0_2943_114">
                <rect width="24" height="24" fill="white" />
              </clipPath>
            </defs>
          </svg>

          <div className="user-name">
            {userName}
            <span>
              <svg
                width="12"
                height="7"
                viewBox="0 0 12 7"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.75 0.75L5.75 5.75L10.75 0.75"
                  stroke="#1A1A1A"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>
        </button>
      </div>
      <Menu
        id="menu-appbar"
        className="dropdown_menu"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem>
          <div className="user-profile-wrap">
            <div className="user-profile-head">
              {/* <img src={User} className="user-image" alt="user" /> */}
              <svg
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_618_189286)">
                  <path
                    d="M14 28C21.732 28 28 21.732 28 14C28 6.26801 21.732 0 14 0C6.26801 0 0 6.26801 0 14C0 21.732 6.26801 28 14 28Z"
                    fill="#D3CABA"
                  />
                  <path
                    d="M24.187 22.1865C23.578 21.7053 22.836 21.3588 22.031 21.1908L18.1932 20.4207C17.7907 20.3438 17.5002 19.9832 17.5002 19.5632V18.683C17.747 18.3365 17.9797 17.8762 18.223 17.395C18.412 17.0222 18.6972 16.4605 18.839 16.3153C19.616 15.5347 20.3667 14.658 20.5995 13.5275C20.8165 12.467 20.603 11.9105 20.3527 11.4625C20.3527 10.3443 20.3177 8.94425 20.0535 7.92575C20.0219 6.54675 19.7717 5.7715 19.1417 5.0925C18.6972 4.61125 18.0427 4.49925 17.516 4.41C17.3095 4.375 17.0242 4.326 16.9192 4.27C15.9865 3.766 15.0642 3.51925 13.9635 3.5C11.6587 3.5945 8.82545 5.061 7.87695 7.6755C7.58295 8.47175 7.6127 9.779 7.6372 10.829L7.61445 11.4607C7.3887 11.9017 7.16645 12.4618 7.3852 13.5258C7.6162 14.658 8.36695 15.5365 9.15795 16.3275C9.28745 16.4605 9.5797 17.0275 9.7722 17.402C10.019 17.8815 10.2535 18.34 10.5002 18.6847V19.565C10.5002 19.9832 10.208 20.3438 9.8037 20.4225L5.96245 21.1925C5.1627 21.3622 4.4207 21.7053 3.81345 22.1865C3.62445 22.3388 3.50545 22.561 3.4862 22.8025C3.46695 23.044 3.54745 23.2803 3.7102 23.4605C6.3247 26.3445 10.075 28 14.0002 28C17.9255 28 21.6775 26.3463 24.2902 23.4605C24.453 23.2803 24.5352 23.0422 24.5142 22.8008C24.495 22.5592 24.376 22.337 24.187 22.1865Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_618_189286">
                    <rect width="28" height="28" fill="white" />
                  </clipPath>
                </defs>
              </svg>

              <strong>
                {userName}
                <h5>
                  {t('MenuAppBar.UserProfileItems.LastLogin')}
                  <span> {lastLogin.toString()}</span>
                </h5>
                {/* {hasAccess('MENU_APP_BAR') && (
                  <span>{applicationApprovalLevel[approvalLevel]}</span>
                )} */}
              </strong>
              {hasAccess('CONTACT_US_URL') && Profile?.merchantId && (
                <div className="user-merchant-id">
                  <strong>
                    {t('MenuAppBar.UserProfileItems.Merchant Id')}:{' '}
                    {Profile?.merchantId}
                  </strong>
                </div>
              )}

              <div className="clear"></div>
            </div>
            <div className="user-profile-body">
              {/* <h5>
                {t('MenuAppBar.UserProfileItems.LastLogin')}
                <span> {lastLogin.toString()}</span>
              </h5> */}
              <div className="user-listings">
                <h6>
                  <strong>{t('MenuAppBar.UserProfileItems.Entity')}</strong>
                  <span className="user-info-group">
                    {poEntity?.map((item: subsidaryType, index: number) => (
                      <span key={index} className="user-infos">
                        {/* {!userGroupAccess.includes(
                          ACCESS_GROUP_NAMES.CUSTOMER,
                        ) && item} */}
                        {item}
                      </span>
                    ))}
                  </span>
                </h6>
              </div>
              {hasAccess('MENU_APP_BAR') && (
                <div className="user-listings">
                  <h6>
                    <strong>{t('MenuAppBar.UserProfileItems.Access')}</strong>
                    <span className="user-info-group">
                      {userGroupAccess?.map((groups: any, index: number) => (
                        <span key={index} className="user-infos">
                          {groups}
                        </span>
                      ))}
                    </span>
                  </h6>
                </div>
              )}
              {userAccessLevel && !hasAccess('INTERNAL') && (
                <div className="user-listings">
                  <h6>
                    {t('MenuAppBar.UserProfileItems.Access')}
                    <span className="user-info-group">
                      <span className="user-infos">
                        {ACCESS_GROUP_NAMES.CUSTOMER}
                      </span>
                    </span>
                  </h6>
                </div>
              )}
            </div>
          </div>
        </MenuItem>

        <SignInAsMerchant
          ghost={ghost}
          show={signInAsMerchant || ghost ? true : false}
          handleClose={handleClose}
        />
        {!ghost && (
          <MenuItem onClick={changePassword}>
            <svg className="dropdown-icons" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M8.4 5.6V4C8.4 1.79086 10.1909 0 12.4 0C14.6091 0 16.4 1.79086 16.4 4V5.6C17.7255 5.6 18.8 6.67452 18.8 8V12.8H20.8C22.5673 12.8 24 14.2327 24 16V20.8C24 22.5673 22.5673 24 20.8 24H3.2C1.43269 24 0 22.5673 0 20.8V16C0 14.2327 1.43269 12.8 3.2 12.8H6V8C6 6.67452 7.07452 5.6 8.4 5.6ZM14.8 5.6V4C14.8 2.67452 13.7255 1.6 12.4 1.6C11.0745 1.6 10 2.67452 10 4V5.6H14.8ZM17.2 8V12.8H7.6V8C7.6 7.55816 7.95816 7.2 8.4 7.2H16.4C16.8418 7.2 17.2 7.55816 17.2 8Z" fill="#1A1A1A" />
              <path d="M7.1999 19.2001C7.64174 19.2001 7.9999 18.8419 7.9999 18.4001C7.9999 17.9583 7.64174 17.6001 7.1999 17.6001C6.75806 17.6001 6.3999 17.9583 6.3999 18.4001C6.3999 18.8419 6.75806 19.2001 7.1999 19.2001Z" fill="white" />
              <path d="M12.8002 18.4001C12.8002 18.8419 12.442 19.2001 12.0002 19.2001C11.5584 19.2001 11.2002 18.8419 11.2002 18.4001C11.2002 17.9583 11.5584 17.6001 12.0002 17.6001C12.442 17.6001 12.8002 17.9583 12.8002 18.4001Z" fill="white" />
              <path d="M16.8 19.2001C17.2418 19.2001 17.6 18.8419 17.6 18.4001C17.6 17.9583 17.2418 17.6001 16.8 17.6001C16.3582 17.6001 16 17.9583 16 18.4001C16 18.8419 16.3582 19.2001 16.8 19.2001Z" fill="white" />
            </svg>

            {t('MenuAppBar.UserProfileItems.Change Password')}
          </MenuItem>
        )}
        <MenuItem onClick={userPrefferenceSettings}>
          <svg className="dropdown-icons" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20.2721 15.9231H19.6182C19.5336 15.5668 19.3837 15.2345 19.1833 14.9354L19.6464 14.4951C19.9316 14.2246 19.9316 13.7862 19.6464 13.5157C19.3613 13.2452 18.8991 13.2452 18.614 13.5157L18.1508 13.956C17.8346 13.7658 17.4852 13.6237 17.1096 13.5434V12.9231C17.1096 12.5409 16.7827 12.2308 16.3798 12.2308C15.977 12.2308 15.65 12.5409 15.65 12.9231V13.5434C15.2744 13.6237 14.9251 13.7658 14.6088 13.956L14.1456 13.5157C13.8605 13.2452 13.3983 13.2452 13.1132 13.5157C12.8281 13.7862 12.8281 14.2246 13.1132 14.4951L13.5764 14.9354C13.3759 15.2354 13.2261 15.5668 13.1414 15.9231H12.4875C12.0847 15.9231 11.7577 16.2332 11.7577 16.6154C11.7577 16.9975 12.0847 17.3077 12.4875 17.3077H13.1414C13.2261 17.664 13.3759 17.9963 13.5764 18.2954L13.1132 18.7357C12.8281 19.0062 12.8281 19.4446 13.1132 19.7151C13.2553 19.8498 13.4421 19.9182 13.6289 19.9182C13.8158 19.9182 14.0026 19.8508 14.1447 19.7151L14.6079 19.2748C14.9241 19.4649 15.2734 19.6071 15.649 19.6874V20.3077C15.649 20.6898 15.976 21 16.3789 21C16.7817 21 17.1087 20.6898 17.1087 20.3077V19.6874C17.4843 19.6071 17.8336 19.4649 18.1499 19.2748L18.613 19.7151C18.7551 19.8498 18.9419 19.9182 19.1288 19.9182C19.3156 19.9182 19.5024 19.8508 19.6445 19.7151C19.9296 19.4446 19.9296 19.0062 19.6445 18.7357L19.1813 18.2954C19.3818 17.9954 19.5316 17.664 19.6163 17.3077H20.2702C20.673 17.3077 21 16.9975 21 16.6154C21 16.2332 20.673 15.9231 20.2702 15.9231H20.2721ZM17.7129 17.8486C17.7071 17.8542 17.6993 17.8551 17.6935 17.8606C17.6876 17.8662 17.6857 17.8735 17.6808 17.8791C17.3441 18.1902 16.8868 18.384 16.3808 18.384C15.8748 18.384 15.4165 18.1902 15.0808 17.8791C15.0749 17.8735 15.073 17.8662 15.0681 17.8606C15.0633 17.8551 15.0545 17.8532 15.0487 17.8486C14.7207 17.5292 14.5164 17.0945 14.5164 16.6154C14.5164 16.1363 14.7207 15.7015 15.0487 15.3822C15.0545 15.3766 15.0623 15.3757 15.0681 15.3702C15.074 15.3646 15.0759 15.3572 15.0808 15.3517C15.4175 15.0406 15.8748 14.8468 16.3808 14.8468C16.8868 14.8468 17.3451 15.0406 17.6808 15.3517C17.6867 15.3572 17.6886 15.3646 17.6935 15.3702C17.6983 15.3757 17.7071 15.3775 17.7129 15.3822C18.0409 15.7015 18.2452 16.1354 18.2452 16.6154C18.2452 17.0954 18.0409 17.5302 17.7129 17.8486ZM6.89231 7.38462C6.89231 4.96708 8.96594 3 11.5144 3C14.0629 3 16.1366 4.96708 16.1366 7.38462C16.1366 9.80215 14.0629 11.7692 11.5144 11.7692C8.96594 11.7692 6.89231 9.80215 6.89231 7.38462ZM12.0788 20.6954C12.2053 20.8154 12.3416 20.9169 12.4972 21H5.67597C4.19689 21 3 19.8646 3 18.4615C3 15.5354 5.51054 13.1538 8.5952 13.1538H11.6312C11.3977 13.6523 11.3782 14.2154 11.5728 14.7231C10.8235 15.0554 10.2981 15.7754 10.2981 16.6154C10.2981 17.4554 10.8235 18.1754 11.5728 18.4985C11.4852 18.7292 11.4366 18.9785 11.4366 19.2277C11.4366 19.7815 11.6701 20.2985 12.0788 20.6954Z" fill="#1A1A1A" />
          </svg>

          {t('MenuAppBar.UserProfileItems.User Settings')}
        </MenuItem>
        <MenuItem onClick={useLogout}>
          <svg className="dropdown-icons" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M11.8555 18.8146V19.8113C11.8555 20.6106 11.4543 21.3007 10.7572 21.7003C10.4219 21.8925 10.0475 21.9998 9.65945 22C9.271 22.0002 8.89679 21.8927 8.56118 21.7003L4.09823 19.1415C3.40107 18.7418 3 18.052 3 17.2526V4.18117C3 2.9784 3.9853 2 5.19646 2H15.0255C16.2367 2 17.2221 2.97832 17.2221 4.18117V6.93659C17.2221 7.33186 16.8989 7.6528 16.5009 7.6528C16.1027 7.6528 15.7798 7.3319 15.7798 6.93659V4.18117C15.7798 3.76816 15.4414 3.43211 15.0255 3.43211H6.4127L10.7572 5.92339C11.4541 6.323 11.8555 7.01284 11.8555 7.81194V17.3824H15.0255C15.4413 17.3824 15.7798 17.0465 15.7798 16.6334V14.218C15.7798 13.8224 16.1025 13.5018 16.5009 13.5018C16.8991 13.5018 17.2221 13.8225 17.2221 14.218V16.6334C17.2221 17.8363 16.2367 18.8146 15.0255 18.8146H11.8555ZM18.5381 11.1233L17.7438 11.9121C17.4622 12.1917 17.4623 12.6451 17.7438 12.9247C17.8794 13.0594 18.062 13.1343 18.2537 13.1343C18.4456 13.1343 18.6281 13.0596 18.7638 12.9247L20.7888 10.9135C21.0704 10.6339 21.0704 10.1808 20.7888 9.90116L18.7638 7.89022C18.4822 7.61054 18.0256 7.61065 17.7439 7.89018C17.4623 8.16956 17.4624 8.62311 17.7439 8.90256L18.5381 9.69108H13.2174C12.819 9.69108 12.4963 10.0117 12.4963 10.4073C12.4963 10.803 12.819 11.1234 13.2174 11.1234H18.5381V11.1233Z" fill="#1A1A1A" />
          </svg>
          {t('MenuAppBar.UserProfileItems.Logout')}
        </MenuItem>
      </Menu>
      {/* <Loader isLoading={loading} /> */}
    </>
  );
};

export default Logout;
