/* eslint-disable no-unused-vars */
import das from '../../assets/logo/PO-Logo.svg';
import Das from '../../assets/logo/logo.png';
import './style.css';
import { hasAccess } from 'utils/has-access';
import { FooterMenuItems, MenuItems } from './components/menu-items';
import { Menu } from 'antd';
import { MenuSVGIcon } from './components/MenuSvgIcons';
import { useNavigate } from 'react-router';

const SideMenu = ({ collapsed }: any) => {
  const navigate = useNavigate();
  
  const onSelect = (e: any) => {
    navigate(e.key);
  };

  return (
    <div className={'side-menu-new'}>
      <div className="top-section">
        <div className="toggle-menu-btn">
          <img
            src={collapsed ? das : Das}
            className={collapsed ? 'das-logo' : 'das-logo-big'}
            alt="Payment Options"
          />
        </div>
      </div>
      <div className="s-menu-flex">
        <Menu
          theme="light"
          mode="inline"
          onSelect={onSelect}
          defaultSelectedKeys={['1']}
          items={MenuItems()
            ?.filter((item: any) => {
              return hasAccess(item.accessKey);
            })
            ?.map((item: any, id: number) => {
              const IconCompponent = MenuSVGIcon[item.iconClassName];
              return {
                key: item.to,
                icon: IconCompponent && <IconCompponent />,
                label: item.name,
              };
            })}
        />
        <Menu
          theme="light"
          mode="inline"
          onSelect={onSelect}
          defaultSelectedKeys={['1']}
          items={FooterMenuItems()
            ?.filter((item: any) => {
              return hasAccess(item.accessKey);
            })
            ?.map((item: any, id: number) => {
              const IconCompponent = MenuSVGIcon[item.iconClassName];
              return {
                key: item.to,
                icon: IconCompponent && <IconCompponent />,
                label: item.name,
              };
            })}
        />
      </div>
    </div>
  );
};

export default SideMenu;

export type IMenuItemType = {
  name: string;
  exact: boolean;
  to: string;
  iconClassName: string;
  accessKey: any;
};
