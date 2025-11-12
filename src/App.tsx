import { Routes, Route, Outlet } from "react-router";
import Login from "pages/authentication/login";
import PublicRoute from "./routes-wrapper/PublicRoute";
import PrivateRoute from "./routes-wrapper/PrivateRoute";
import ProtectedRoutesList from "components/router/protected-routes-list";
import PageNotFound from "pages/error";
import MenuAppBar from "components/menu-app-bar";
import SideMenu from "components/sidemenu/SideMenu";
import Sider from "antd/es/layout/Sider";
import { useState } from "react";
import { Content, Header } from "antd/es/layout/layout";
import { Layout } from "antd";
import "./index.css";
import Forgot from "pages/authentication/forgot";
import Reset from "pages/authentication/reset-password";

const App = () => {

  return (
    <Routes>
      {/* Public route */}
      <Route
        path="/"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/forgot-password"
        element={
          <PublicRoute>
            <Forgot />
          </PublicRoute>
        }
      />
      <Route
        path="/reset-password"
        element={
          <PublicRoute>
            <Reset />
          </PublicRoute>
        }
      />

      {/* Protected dynamic routes */}
      <Route
        element={
          <PrivateRoute>
            <ProtectedLayout />
          </PrivateRoute>
        }
      >
        {ProtectedRoutesList.map(({ component: Component, path }: any, index: number) => (
          <Route
            key={index}
            path={path}
            element={
              <Component />
            }
          />
        ))}
      </Route>

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default App;






const ProtectedLayout = () => {
  const [collapsed, setCollapsed] = useState(true);
  // const openSideBar = () => {
  //   setCollapsed(false);
  // }
  // const closeSideBar = () => {
  //   setCollapsed(true);
  // }
  const toggleSideBar = () => {
    setCollapsed(!collapsed);
  }

  return (
    <Layout>
      <Header
          style={{
            padding: 0,
            background: '#ffffff',
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <MenuAppBar toggleSideBar={toggleSideBar} />
        </Header>
      

      <Layout>
      <Sider
        // onMouseEnter={() => setCollapsed(false)}
        // onMouseLeave={() => setCollapsed(true)}
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{ backgroundColor: '#ffffff' }}
      >
        <SideMenu />
      </Sider>

        <Content style={{ padding: 24, minHeight: 280 }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};


