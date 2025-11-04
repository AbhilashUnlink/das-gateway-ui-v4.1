import { Button, Popover } from 'antd';
import { useSelector } from 'react-redux';
import { 
  // dateComparisionFunction, 
  getformatDate } from '../../utils/helper';
// import { DateComparisionOperators } from '../../pages/statements/components/holiday-list/constants/holiday';
import { MENU } from '../constants/route';
import i18n from '../../i18n';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

const Content = ({
  remainingDays,
  getPasswordExpiry,
  changePassword,
  t,
}: any) => {
  if (remainingDays <= 0) {
    let translatedString = `${i18n.t('Your password has expired')}. ${i18n.t(
      'To change your password',
    )}`;
    return (
      <div className="notification-child-wrap">
        <p>
          {translatedString}{' '}
          <button className="change-password-link" onClick={changePassword}>
            {t('Click Here')}
          </button>
          .
        </p>
      </div>
    );
  } else {
    return (
      <div className="notification-child-wrap">
        <p>
          {i18n.t('Your password is going to expire in')} {remainingDays}{' '}
          {i18n.t('days on')} {getformatDate(getPasswordExpiry, 'dd/MM/yyyy')}.{' '}
          {i18n.t('To change your password')}{' '}
          <button className="change-password-link" onClick={changePassword}>
            {t('Click Here')}
          </button>
          .
        </p>
      </div>
    );
  }
};

const NotificationPopper = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const getPasswordExpiry = useSelector(
    (store: any) => store?.auth?.profile?.passwordExpiry,
  );
  const changePassword = () => {
    navigate(MENU.CHANGEPASSWORD);
  };
  function subtractDays(date: any, days: any) {
    const result = new Date(date);
    result.setDate(result.getDate() - days);
    return result;
  }
  function daysLeft(specificExpiryDate: any) {
    const today: any = new Date();
    const targetDate: any = new Date(specificExpiryDate);

    // Calculate the difference in milliseconds
    const difference = targetDate - today;

    // Convert milliseconds to days
    const daysLeft = Math.ceil(difference / (1000 * 60 * 60 * 24));

    return daysLeft;
  }
  const targetDate = getPasswordExpiry; // Replace with your specific date
  const remainingDays = daysLeft(targetDate);
  const specificDate = getPasswordExpiry; // Replace with your specific date
  const newDate = subtractDays(specificDate, 7);
  return (
    <div className="notification-popover-wrap">
      <Popover
        id="notify-popper"
        placement="bottom"
        content={
          // dateComparisionFunction(
          //   DateComparisionOperators.LessThanOrEqualsToToday,
          //   newDate,
          // ) ? (
          //   <Content
          //     remainingDays={remainingDays}
          //     getPasswordExpiry={getPasswordExpiry}
          //     t={t}
          //     changePassword={changePassword}
          //   />
          // ) : 
          (
            <>{i18n.t('No updates yet')}</>
          )
        }
        title={t('Notifications')}
        trigger="click"
        className="notification-popover"
      >
        <Button>
          {/* <NotificationsNoneIcon/> */}
          <svg
            width="20"
            height="22"
            viewBox="0 0 20 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.0005 21.9999C11.8116 21.9999 13.3267 20.7089 13.6746 18.9999H6.32654C6.67462 20.7089 8.18964 21.9999 10.0005 21.9999Z"
              fill="#D3CABA"
            />
            <path
              d="M17.0126 9.99902C17.0086 9.99902 17.0045 9.99994 17.0005 9.99994C13.1416 9.99994 10.0006 6.85986 10.0006 3C10.0006 1.9389 10.2446 0.935852 10.6696 0.0338745C10.4495 0.0130005 10.2265 0 10.0006 0C6.13466 0 3.00062 3.13385 3.00062 6.99994V9.7879C3.00062 11.7669 2.13362 13.6349 0.612561 14.9209C0.105542 15.3539 -0.119494 16.0439 0.0625123 16.717C0.274548 17.4999 1.04854 18 1.86061 18H18.1356C18.9876 18 19.7907 17.4479 19.9635 16.613C20.0975 15.967 19.8676 15.3219 19.3666 14.9009C17.9125 13.682 17.0715 11.8909 17.0126 9.99902Z"
              fill="#D3CABA"
            />
          </svg>
          <span className="badge">
            {
            // dateComparisionFunction(
            //   DateComparisionOperators.LessThanOrEqualsToToday,
            //   newDate,
            // ) &&
            // dateComparisionFunction(
            //   DateComparisionOperators.LessThanOrEqualsToToday,
            //   newDate,
            // )
            //   ? 1
            //   : 
              0}
          </span>
        </Button>
      </Popover>
    </div>
  );
};

export default NotificationPopper;
