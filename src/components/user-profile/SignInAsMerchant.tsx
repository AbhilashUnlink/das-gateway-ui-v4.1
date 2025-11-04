import { Box, MenuItem, Typography, Modal } from '@mui/material';
import { Form, Input } from 'antd';
import { HTTP_STATUS } from 'components/constants';
// import DasSnackbar from 'components/das-snackbar/DasSnackbar';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useFetchWrapper as Api } from 'utils';
import { GroupAddOutlined, GroupRemove } from '@mui/icons-material';
import { setLoginDetails } from 'store/features/auth';
import { useDispatch, useSelector } from 'react-redux';
import { handleAfterSignIn } from 'utils/auth-helpers';
import { startLoader, stopLoader } from 'store/features/loader';
// import clearLocalStorage from 'utils/clear-local-storage';
import "./style.css";
import { useNavigate } from 'react-router';
const signInAsMerchantApi = 'entities/user-management/user/linkAccount';
const signOutAsMerchantApi = `entities/user-management/user/unlinkAccount`;

const emailValidationRegexPattern = new RegExp(
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
);

const style = {
  position: 'absolute' as 'absolute',
  top: '30%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #fff',
  boxShadow: 24,
  borderRadius: 5,
  p: 2,
};
const SignInAsMerchant = ({ ghost, show, handleClose }: any) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const loggedInUser = useSelector((state: any) => state?.auth?.profile);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      let newData = await Api().post(`auth/refreshToken`, {
        username: loggedInUser?.email,
        refreshToken: loggedInUser?.token?.refreshToken,
      });
      if ([HTTP_STATUS.OK].includes(newData?.statusCode)) {
        const signInData = newData?.data;

        localStorage.clear();
        let defaultTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        localStorage.setItem('timeZone', defaultTimeZone);
        navigate('/transactions');

        await handleAfterSignIn(signInData);

        dispatch(setLoginDetails(signInData));

        setTimeout(() => {
          dispatch(stopLoader());
        }, 0);
      } else {
        // clearLocalStorage();
        window.location.reload();
        return false;
      }
    } catch (e) {
      // clearLocalStorage();
      // localStorage.removeItem('persist:root');
      return false;
    }
  };

  const handleOk = async () => {
    try {
      dispatch(startLoader());
      const res = await Api().post(signInAsMerchantApi, {
        email,
      });
      if ([HTTP_STATUS.OK]?.includes(res?.statusCode)) {
        // DasSnackbar.success(t(`API_STATUS_MESSAGE.${res?.messageCode}`));
        setIsModalOpen(false);
        handleLogin();
      } else {
        setIsModalOpen(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Handle input change with email validation
  const isOkDisabled = !email || emailError !== '';
  const handleEmailChange = (e: any) => {
    const value = e.target.value;
    setEmail(value);
    // Validate email format
    if (!emailValidationRegexPattern.test(value)) {
      setEmailError(t('Invalid email'));
    } else {
      setEmailError('');
    }
  };

  const handleCancel = () => {
    setEmail(''); // Clear input value
    setEmailError(''); // Clear any validation error
    setIsModalOpen(false);
  };

  const handleSignOutAsMerchant = async () => {
    try {
      dispatch(startLoader());
      const unlinkAccountResponse = await Api().post(signOutAsMerchantApi, {});
      if ([HTTP_STATUS.OK].includes(unlinkAccountResponse.statusCode)) {
        handleLogin();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSignInOrOutButton = () => {
    if (ghost) {
      handleSignOutAsMerchant();
    } else {
      showModal();
    }
    // closing the user popup
    handleClose();
  };

  const Icon = ghost ? GroupRemove : GroupAddOutlined;

  const label = ghost
    ? t('MenuAppBar.UserProfileItems.Sign Out as Merchant')
    : t('MenuAppBar.UserProfileItems.Sign In As A Merchant');

  if (show) {
    return (
      <>
        <Modal
          open={isModalOpen}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className="modal-header">
              <svg
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="28" height="28" rx="14" fill="white" />
                <path
                  d="M11 14.6667C10.4067 14.6667 9.82664 14.4907 9.33329 14.1611C8.83994 13.8314 8.45542 13.3629 8.22836 12.8147C8.0013 12.2665 7.94189 11.6633 8.05764 11.0814C8.1734 10.4995 8.45912 9.9649 8.87868 9.54535C9.29824 9.12579 9.83279 8.84007 10.4147 8.72431C10.9967 8.60856 11.5999 8.66797 12.1481 8.89503C12.6962 9.12209 13.1648 9.50661 13.4944 9.99996C13.8241 10.4933 14 11.0733 14 11.6667C13.9991 12.462 13.6828 13.2246 13.1203 13.787C12.5579 14.3494 11.7954 14.6658 11 14.6667ZM16 19.3333C15.9989 18.4496 15.6474 17.6024 15.0225 16.9775C14.3976 16.3526 13.5504 16.0011 12.6667 16H9.33333C8.4496 16.0011 7.60237 16.3526 6.97748 16.9775C6.35259 17.6024 6.00106 18.4496 6 19.3333L6 22H16V19.3333ZM17.6667 12C17.0733 12 16.4933 11.8241 16 11.4944C15.5066 11.1648 15.1221 10.6962 14.895 10.1481C14.668 9.59987 14.6086 8.99667 14.7243 8.41473C14.8401 7.83279 15.1258 7.29824 15.5453 6.87868C15.9649 6.45912 16.4995 6.1734 17.0814 6.05765C17.6633 5.94189 18.2665 6.0013 18.8147 6.22836C19.3629 6.45543 19.8314 6.83994 20.1611 7.33329C20.4907 7.82664 20.6667 8.40666 20.6667 9C20.6658 9.79538 20.3494 10.5579 19.787 11.1203C19.2246 11.6828 18.462 11.9991 17.6667 12ZM18.6667 13.3333H15.3333C15.2163 13.3387 15.0997 13.3505 14.984 13.3687C14.7416 13.9295 14.3836 14.433 13.9333 14.846C14.9109 15.1226 15.7716 15.7103 16.3852 16.52C16.9987 17.3298 17.3316 18.3174 17.3333 19.3333H22V16.6667C21.9989 15.7829 21.6474 14.9357 21.0225 14.3108C20.3976 13.6859 19.5504 13.3344 18.6667 13.3333Z"
                  fill="#1A1A1A"
                />
              </svg>

              <Typography id="modal-modal-title" variant="h6" component="h2">
                {t('MenuAppBar.UserProfileItems.Sign In As A Merchant')}
              </Typography>
            </div>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <Form.Item
                validateStatus={emailError ? 'error' : ''}
                help={emailError || ''}
              >
                <Input
                  value={email}
                  onChange={handleEmailChange}
                  placeholder={t('Merchant Email Address')}
                  className='h-49'
                />
              </Form.Item>
            </Typography>
            <div className="modal-fotter">
              <button
                className="footer-modal-button submit"
                disabled={isOkDisabled}
                onClick={handleOk}
              >
                {t('Submit')}
              </button>
              <button
                className="footer-modal-button cancel"
                onClick={handleCancel}
              >
                {t('Cancel')}
              </button>

            </div>
          </Box>
        </Modal>
        <MenuItem onClick={handleSignInOrOutButton}>
          <Icon className="dropdown-icons" />
          {label}
        </MenuItem>
      </>
    );
  } else {
    return <></>;
  }
};

export default SignInAsMerchant;
