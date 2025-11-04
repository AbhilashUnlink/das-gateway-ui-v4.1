import { Navigate } from "react-router";
import { useAuth } from "./useAuth";
import type { ReactNode } from "react";

interface PublicRouteProps {
    children: ReactNode;
}

const PublicRoute = ({ children }: PublicRouteProps) => {
    const isAuthenticated = useAuth();
    return !isAuthenticated ? children : <Navigate to="/transactions" replace />;
};

export default PublicRoute;
