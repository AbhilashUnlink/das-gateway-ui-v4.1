import i18n from "i18n";

export const validatorMapper = {
  required:
    ({ message }: any) =>
    (value: any) =>
      value ? undefined : message || i18n.t("Required"),

  custom_email: () => (value: string) => {
    if (!value) return undefined;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(String(value).toLowerCase())
      ? undefined
      : i18n.t("Invalid email");
  },
};
