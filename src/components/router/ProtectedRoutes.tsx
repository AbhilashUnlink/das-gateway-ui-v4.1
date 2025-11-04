import MenuAppBar from 'components/menu-app-bar'
import SideMenu from 'components/sidemenu/SideMenu'
import { Route } from 'react-router'
import PrivateRoute from '../../routes-wrapper/PrivateRoute'
import ProtectedRoutesList from './protected-routes-list'
import { hasAccess } from 'utils/has-access'
import PageNotFound from 'pages/error'

const ProtectedRoutes = () => {
  return (
    <>
      {ProtectedRoutesList?.map(
        (
          {
            component: Component,
            path,
            accessKey,
          }: any,
          index: number,
        ) => {
          if (hasAccess(accessKey)) {
            return (
              <Route
                key={index}
                path={`/${path}`}
                element={
                  <PrivateRoute>
                    <MenuAppBar />
                    <SideMenu />
                    <Component />
                  </PrivateRoute>
                }
              />
            )
          } else {
            return <Route
              key={index}
              path={`/${path}`}
              element={
                <>
                  <PageNotFound />
                </>
              }
            />
          }
        },
      )}
    </>
  )
}

export default ProtectedRoutes