import { hasAccess } from "../../../../../../../utils/has-access";



export const transactionInfoSchema =() => [
  {
    name: 'TransactionRefID',
    label: 'TransactionDetail.TransactionInfo.fields.TransactionRefID',
    showPopup:false,
    allowCopy:true
  },
  // {
  //   name: 'V2UUID',
  //   label: 'V2 ID',
  //   hide: !legacy || !hasAccess("ALL_USER_ACCESS"),

  // },
  {
    name: 'DASMID',
    label: 'TransactionDetail.TransactionInfo.fields.DASMID',
    showPopup:true,
    type:"productInfo",
    allowCopy:true
  },
  {
    name:  'Merchant',
    label: 'TransactionDetail.TransactionInfo.fields.Merchant',
    showPopup:true,
    type:"merchantInfo",
    allowCopy:true
  },
  {
    name: 'LegalNameInEnglish',
    label: 'TransactionDetail.TransactionInfo.fields.LegalNameInEnglish',
    showPopup:false,
    // hide: !hasAccess("COMPANY_NAME_IN_ENGLISH_IN_TRANSACTION_DETAILS")
  },
  {
    name: 'TransactionType',
    label: 'TransactionDetail.TransactionInfo.fields.TransactionType',
    showPopup:false
  },
  {
    name: 'Referenceremark',
    label: 'TransactionDetail.TransactionInfo.fields.ReferenceRemark',
    showPopup:false,
    showif: { TransactionType: ['REFUND', 'CAPTURE'] },
    allowCopy:true
  },
  {
    name: 'Date',
    label: 'TransactionDetail.TransactionInfo.fields.Date',
    showPopup:false
  },
  {
    name: 'UpdatedDate',
    label: 'TransactionsResult.columnDefs.UpdatedTransactionDate',
    showPopup:false
  },
  {
    name: 'Amount',
    label: 'TransactionDetail.TransactionInfo.fields.Amount',
    showPopup:false
  },

  {
    name: 'CurrencyCode',
    label: 'TransactionDetail.TransactionInfo.fields.CurrencyCode',
    showPopup:false
  },
  {
    name: 'Response',
    label: 'TransactionDetail.TransactionInfo.fields.Response',
    showPopup:false,
    allowCopy:true
  },
  {
    name: 'Status',
    label: 'TransactionDetail.TransactionInfo.fields.Status',
    showPopup:false
  },
  {
    name: 'AuthCode',
    label: 'TransactionDetail.TransactionInfo.fields.AuthCode',
    showPopup:false,
    allowCopy:true
  },
  {
    name: 'RequestID',
    label: 'TransactionDetail.TransactionInfo.fields.RequestID',
    showPopup:false,
    hide:!hasAccess("REQUEST_ID_IN_TRANSACTION_DETAILS"),
    allowCopy:true
  },
  {
    name: 'CVVResponse',
    label: 'TransactionDetail.TransactionInfo.fields.CVVResponse',
    showPopup:false
  },
  {
    name: 'GatewayError',
    label: 'TransactionDetail.TransactionInfo.fields.GatewayError',
    showPopup:false,
    allowCopy:true
  },{
    name: 'TransactionID',
    label: 'TransactionDetail.TransactionInfo.fields.TransactionID',
    showPopup:false,
    allowCopy:true
  }
];
