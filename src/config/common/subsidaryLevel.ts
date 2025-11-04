interface ISubsidaryLevel {
  SG: string;
  JP: string;
  MU: string;
  LT: string;
  MY: string;
  HK: string;
  EU: string;
  CN: string;
}
export type subsidaryType = "SG" | "JP" | "MU" | "LT" | "MY" | "HK" | "EU" | "CN";
export const subsidaryLevel: ISubsidaryLevel = {
  SG: "Singapore",
  JP: "Japan",
  MU: "Mauritius",
  LT: "Lithuania",
  MY: "Malaysia",
  HK:"Hong Kong",
  EU:"Europe",
  CN: "China"
};
export const subsidaryID = [
  {
    label: "PO Singapore",
    value: "SG",
  },
  {
    label: "PO Japan",
    value: "JP",
  },
  {
    label: "PO Mauritius",
    value: "MU",
  },
  {
    label: "PO Lithuania",
    value: "LT",
  },
  {
    label: "PO Malaysia",
    value: "MY",
  },
  {
    label: "PO Hong Kong",
    value: "HK",
  },
  {
    label: "PO Europe",
    value: "EU",
  },
  {
    label: "PO China",
    value: "CN",
  },
];
