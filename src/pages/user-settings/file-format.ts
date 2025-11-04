import i18n from "i18n";
export const fileFormatOptions: any = [
  {
    label: i18n.t("User_Settings.fileFormat.CSV"),
    value: "CSV",
  },
  {
    label: i18n.t("User_Settings.fileFormat.EXCEL"),
    value: "excel",
  },
];
export const FILE_FORMATS_OPTIONS: any = {
  CSV: i18n.t("User_Settings.fileFormat.CSV"),
  EXCEL: i18n.t("User_Settings.fileFormat.EXCEL"),
};
export const FILE_FORMATS_VALUES: any = {
  CSV: "CSV",
  EXCEL: "excel",
};
