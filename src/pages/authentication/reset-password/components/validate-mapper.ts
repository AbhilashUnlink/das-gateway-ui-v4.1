
import i18n from "i18n";

// export const validatorMapper = {
//   required:
//     ({ message }: any) =>
//     (value: any) =>
//       value ? undefined : message || i18n.t("Required"),

//   custom_email: () => (value: string) => {
//     if (!value) return undefined;
//     const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return regex.test(String(value).toLowerCase())
//       ? undefined
//       : i18n.t("Invalid email");
//   },
// };


export const validatorMapper: any = {
  'same-password':
    () =>
    (value: any, { Password }: Record<string, string>): string | undefined =>
      value !== Password
        ? i18n.t('Passwords must match')
        : undefined,

        'same-change-password':
        () =>
        (value: any, { newPassword }: Record<string, string>) =>{
        return  value !== newPassword
            ? i18n.t('Passwords must match')
            : undefined;
          },

        'same-oldnew-password':
        () =>
          (value: any, { currentPassword }: Record<string, string>) =>{
          return  value === currentPassword
              ? i18n.t('API_STATUS_MESSAGE.ERR_AUTH_0016')
              : undefined;
            }
};