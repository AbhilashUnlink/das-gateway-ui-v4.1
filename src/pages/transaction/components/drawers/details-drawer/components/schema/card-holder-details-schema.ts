import { hasAccess } from "../../../../../../../utils/has-access";

export const cardHolderDetailsSchema =()=> [
  {
    name: 'PaymentType',
    label: 'TransactionDetail.CustomerDetails.field.PaymentType',
  },
  {
    name: 'CardNumber',
    label: 'TransactionDetail.CustomerDetails.field.CardNumber',
  },
  {
    name: 'Scheme',
    label: 'TransactionDetail.CustomerDetails.field.Scheme',
  },
  {
    name: 'ExpiryDate',
    label: 'TransactionDetail.CustomerDetails.field.ExpiryDate',
  },
  {
    name: 'CardHolder',
    label: 'TransactionDetail.CustomerDetails.field.CardHolder',
  },
  {
    name: 'EmailAddress',
    label: 'TransactionDetail.CustomerDetails.field.EmailAddress',
    allowCopy:true
  },
  {
    name: 'Phone',
    label: 'TransactionDetail.CustomerDetails.field.Phone',
    allowCopy:true
  },
  {
    name: 'BillingCountry',
    label: 'TransactionDetail.CustomerDetails.field.BillingCountry',
  },
  {
    name: 'BillingPostcode',
    label: 'TransactionDetail.CustomerDetails.field.BillingPostcode',
  },
  {
    name: 'BillingAddress',
    label: 'TransactionDetail.CustomerDetails.field.BillingAddress',
  },
  {
    name: "BillingCity",
    label: "TransactionDetail.CustomerDetails.field.BillingCity"
  },
  {
    name: 'ShippingCountry',
    label: 'TransactionDetail.CustomerDetails.field.ShippingCountry',
  },
  {
    name: 'ShippingPostcode',
    label: 'TransactionDetail.CustomerDetails.field.ShippingPostcode',
  },
  {
    name: 'ShippingAddress',
    label: 'TransactionDetail.CustomerDetails.field.ShippingAddress',
  },
  {
    name: "ShippingCity",
    label: "TransactionDetail.CustomerDetails.field.ShippingCity"
  },
  {
    name: 'HashCardNumber',
    label: 'TransactionDetail.CustomerDetails.field.HashCardNumber',
    hide: !hasAccess("HASH_CARD_DETAILS_IN_TRANSACTION_DETAILS_ACCESS"),
    allowCopy:true,
    showPopup: hasAccess("HASH_CARD_ADD_FROM_TRANSACTION_DETAILS_ACCESS")?true:false,
    type:"hashCardIntegration",
  },
];
