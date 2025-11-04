
import i18n from '../../i18n';

export const CHARGE_BACK_TYPE: any = {
  RetrievalRequest: i18n.t('DisputeManagement.CaseHistory.RetrievalRequest'),
  FirstChargeback: i18n.t('DisputeManagement.CaseHistory.FirstChargeback'),
  SecondChargeback: i18n.t('DisputeManagement.CaseHistory.SecondChargeback'),
  InternalDispute: i18n.t('DisputeManagement.CaseHistory.InternalDispute'),
  AutoRepresentment: i18n.t('DisputeManagement.CaseHistory.AutoRepresentment'),
  ChargebackReversal: i18n.t('DisputeManagement.CaseHistory.ChargebackReversal'),
  EvidenceUnderReview: i18n.t('DisputeManagement.CaseHistory.EvidenceUnderReview'),
};

export const CASE_TYPE = {
  RetrievalRequest: i18n.t('DisputeManagement.CaseHistory.RetrievalRequest'),
  FirstChargeback: i18n.t('DisputeManagement.CaseHistory.FirstChargeback'),
  SecondChargeback: i18n.t('DisputeManagement.CaseHistory.SecondChargeback'),
};

export const CASE_CREATED_TYPE = {
  CaseCreated: i18n.t('DisputeManagement.CaseHistory.CaseCreated'),
};
export const CASE_CREATED_BY_USER = {
  sp_UpdateChargebackStatus: "System_User",
};

export const CHARGE_BACK_CASE_TYPE_STATUS: any = {
  RetrievalRequest: i18n.t('DisputeManagement.CaseHistory.RetrievalRequest'),
  FirstChargeback: i18n.t('DisputeManagement.CaseHistory.FirstChargeback'),
  SecondChargeback: i18n.t('DisputeManagement.CaseHistory.SecondChargeback'),
  SubmitEvidence: i18n.t('DisputeManagement.DisputeListButtons.Evidence'),
  MissingInformation: i18n.t(
    'DisputeManagement.DisputeListButtons.Missing Info',
  ),
  AcceptDispute: i18n.t('DisputeManagement.DisputeListButtons.Accept'),
  SentToAcquirer: i18n.t('DisputeManagement.SentToAcquirer'),
  ChallengeDispute: i18n.t('DisputeManagement.ChallangeDispute'),
  Reversal: i18n.t('DisputeManagement.CaseHistory.Reversal'),
  LostFund: i18n.t('DisputeManagement.CaseHistory.LostFund'),
  CaseClosed: i18n.t('DisputeManagement.CaseHistory.CaseClosed'),
  InternalDispute: i18n.t('DisputeManagement.CaseHistory.InternalDispute'),
  AutoRepresentment: i18n.t('DisputeManagement.CaseHistory.AutoRepresentment'),
  ChargebackReversal: i18n.t('DisputeManagement.CaseHistory.ChargebackReversal'),
  EvidenceUnderReview: i18n.t('DisputeManagement.CaseHistory.EvidenceUnderReview'),
  CaseReOpened: i18n.t('DisputeManagement.CaseHistory.CaseReOpened'),
  CaseUpdated: i18n.t('DisputeManagement.CaseHistory.CaseUpdated'),
};

export const CHARGE_BACK_STATUS = {
  Open: 'Open',
  Closed: 'Closed',
};

export const REASON_CODE: any = [
  {
    label: i18n.t('DisputeManagement.CaseHistory.ChargebackReversal'),
    value: 'Reversal',
  },
  {
    label: i18n.t('DisputeManagement.CaseHistory.LostFund'),
    value: 'LostFund',
  },
];
