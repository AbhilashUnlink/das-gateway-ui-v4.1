import { STATUS } from "components/popper/constants/filter-constants";

export const CHARGEBACK_FILTER: any = {
  IssuedDate: 'IssuedDate',
  DueDate: 'DueDate',
};

export const FILTER_HEADERS:any = {
  Statement: 'Statement',
  Released: 'Released',
  Payout: 'Payout',
  Transaction: 'Transaction',
  createdAt: 'createdAt',
  DueDate: 'DueDate',
  Updated: 'Updated',
};

export const TRANSACTION_DRAWER_TYPE: any = {
  ChallengeDispute: 'ChallengeDispute',
  MissingInformation: 'MissingInformation',
  SubmitEvidence: 'SubmitEvidence',
};

export const CASE_INFO_HEADERS: any = {
  AuthCode:'AuthCode',
  Status:'Status',
  IssuedDate:'IssuedDate',
  DueDate:'DueDate',
  Date:'Date',
  CaseType:'CaseType',
  IsClosed:'IsClosed',
  Amount:'Amount',
  Currency:'Currency',
  AcquirerCode:'Acquirer',
};


export const DISPUTE_STATUS_TYPE = [
  {
    label:STATUS.CHARGEBACK.OPEN,
    value:STATUS.CHARGEBACK.OPEN,
  },
  {
    label:STATUS.CHARGEBACK.CLOSED,
    value:STATUS.CHARGEBACK.CLOSED,
  }
];