
import { hasAccess } from "../../../../../../../utils/has-access";

export const additionalInfoSchema =() => [
  {
    name: "IssuingBank",
    label: "TransactionDetail.AdditionalInformation.fields.IssuingBank",
    showPopup:false
  },
  {
    name: "IssuingCountry",
    label: "TransactionDetail.AdditionalInformation.fields.IssuingCountry",
    showPopup:false
  },
  {
    name: "BIN",
    label: "TransactionDetail.AdditionalInformation.fields.BIN",
    showPopup:false,
    allowCopy:true
  },
  {
    name: "TransactionTimezone",
    label: "TransactionDetail.AdditionalInformation.fields.TransactionTimezone",
    showPopup:false
  },
  {
    name: "MerchantCategoryCode",
    label:
      "TransactionDetail.AdditionalInformation.fields.MerchantCategoryCode",
      showPopup:false,
      allowCopy:true
  },
  {
    name: "MerchantIP",
    label: "TransactionDetail.AdditionalInformation.fields.MerchantIP",
    showPopup:false,
    allowCopy:true
  },
  {
    name: "CustomerIP",
    label: "TransactionDetail.AdditionalInformation.fields.CustomerIP",
    showPopup:false,
    allowCopy:true
  },
  {
    name: "MerchantRefNumber",
    label: "TransactionDetail.AdditionalInformation.fields.MerchantRefNumber",
    showPopup:false,
    allowCopy:true
  },
  {
    name: "AcquirerCode",
    label: "TransactionDetail.AdditionalInformation.fields.Acquirer",
    showPopup:false
  },
  {
    name: "AcquirerMID",
    label: "TransactionDetail.AdditionalInformation.fields.AcquirerMID",
    showPopup:hasAccess('CUSTOMER')?false: true,
    type:"acquirerInfo",
    // hide: hasAccess('CUSTOMER'),
    allowCopy:true
  },
  {
    name: "AcquirerReferenceNumber",
    label:
      "TransactionDetail.AdditionalInformation.fields.AcquirerReferenceNumber",
      showPopup:false,
      allowCopy:true
  },
  // {
  //   name: "ACQError",
  //   label: "TransactionDetail.AdditionalInformation.fields.ACQError",
  //   showPopup:false,
  //   allowCopy:true
  // },
  {
    name: "Memo",
    label: "TransactionDetail.AdditionalInformation.fields.Memo",
    showPopup:false,
    allowCopy:true
  },
];
