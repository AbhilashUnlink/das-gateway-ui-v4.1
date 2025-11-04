import i18n from "../../i18n";

export const CHARGEBACK_STATUS_WITH_REFUND = [
  {
    label: i18n.t('DisputeManagement.CaseHistory.RetrievalRequest'),
    value: 'RetrievalRequest',
  },
  {
    label: i18n.t('DisputeManagement.CaseHistory.FirstChargeback'),
    value: 'FirstChargeback',
  },
  {
    label: i18n.t('DisputeManagement.CaseHistory.SecondChargeback'),
    value: 'SecondChargeback',
  },
  // {
  //   label: i18n.t('DisputeManagement.CaseHistory.InternalDispute'),
  //   value: 'InternalDispute',
  // },
  {
    label: i18n.t('DisputeManagement.CaseHistory.AutoRepresentment'),
    value: 'AutoRepresentment',
  },
  {
    label: i18n.t('DisputeManagement.CaseHistory.ChargebackReversal'),
    value: 'ChargebackReversal',
  },
  {
    label: i18n.t('DisputeManagement.CaseHistory.EvidenceUnderReview'),
    value: 'EvidenceUnderReview',
  },
];
export default CHARGEBACK_STATUS_WITH_REFUND;
