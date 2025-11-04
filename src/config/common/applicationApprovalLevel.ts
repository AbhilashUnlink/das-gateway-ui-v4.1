import i18n from "i18n";

interface IApplicationApprovalLevel {
  "0": string;
  "1": string;
  "10": string;
  "20": string;
  "30": string;
  "40": string;
  "50": string;
  "60": string;
}

export type ApprovalLevelType =
  | "0"
  | "1"
  | "10"
  | "20"
  | "30"
  | "40"
  | "50"
  | "60";

export const applicationApprovalLevel: IApplicationApprovalLevel = {
  "0": "",
  "1": i18n.t("applicationApprovalLevel.1"),
  "10": i18n.t("applicationApprovalLevel.10"),
  "20": i18n.t("applicationApprovalLevel.20"),
  "30": i18n.t("applicationApprovalLevel.30"),
  "40": i18n.t("applicationApprovalLevel.40"),
  "50": i18n.t("applicationApprovalLevel.50"),
  "60": i18n.t("applicationApprovalLevel.60"),
};
