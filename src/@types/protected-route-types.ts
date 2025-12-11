export type RolePermissionType = {
    component:React.FC,
    path:string,
    exact:boolean
  }
  type RoleType =
    | "GUEST"
    | "FRAUD"
    | "RISK"
    | "COMPLIANCE"
    | "SALES"
    | "SALESOPS"
    | "SUPPORT"
    | "SETTLEMENT"
    | "MERCHANT"
    | "THIRDPARTY"
    | "GUESTSCHEDULER"
    
export  type ProtectedRouteProps = {
  isAuthenticated: boolean;
  role: RoleType;
  showV2Icons?:boolean
};
