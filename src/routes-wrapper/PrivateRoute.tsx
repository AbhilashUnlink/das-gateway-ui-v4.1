import { Navigate } from "react-router";
import { useAuth } from "./useAuth";
import type { ReactNode } from "react";


interface PrivateRouteProps {
    children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
    const isAuthenticated = useAuth();
    return isAuthenticated ? children : <Navigate to="/" replace />;
};

export default PrivateRoute;
