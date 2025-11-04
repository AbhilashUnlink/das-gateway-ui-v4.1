// Not in use yet

// getting token data from local storage

let authDetails = localStorage?.getItem("persist:root");
let data = authDetails && JSON?.parse(authDetails);
let authData = data && JSON.parse(data?.auth);
let authProfile = authData && authData?.profile;
 export const idToken = authProfile && authProfile?.token?.idToken;
// export const accessToken = authProfile && authProfile?.token?.accessToken;
export const refreshToken = authProfile && authProfile?.token?.refreshToken;
export const Groups = authProfile && authProfile?.Groups;
export const userEmail = authProfile && authProfile?.email;
// export const tokenExp = authProfile && (authProfile?.exp - 300) * 1000;
// in use
export const subsidiaries = authProfile && authProfile?.subsidiaries;
