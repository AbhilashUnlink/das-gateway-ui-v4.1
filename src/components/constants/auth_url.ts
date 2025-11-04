const AUTH_URL:string[] = [
    "onboarding/verify-email",
    "onboarding/verify-otp",
    "onboarding/resent-otp",
    "onboarding/register",
    "auth/signIn",
    "auth/refreshToken",
    "auth/forgotPassword",
    "contact-us",
    "auth/mfa-setup",
    "auth/mfa/generate",
    "verify/gateway/otp",
    "auth/check-mfa-exist",
    'auth/mfa/reset-mfa',
    'auth/mfa/verify/gateway/registration/otp',
    'auth/mfa/email/verify',
    'pb-daspay'

];

export const AUTH_URL_VALIDATE = (url: any):boolean => {

    let value = 0;
    AUTH_URL.forEach((urlStr:string):void => {

        value += url.includes(urlStr);

    });
    return value === 1;

};
