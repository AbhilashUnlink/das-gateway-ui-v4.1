import { subsidaryID } from "../../config/common/subsidaryLevel";
import { HEADERS } from "../../pages/merchants/merchant-view/components/merchant-details/constants/merchantDetails";
import {
  CARD_TYPE,
  PAYMENT_TYPE,
  TRANSACTION_STATUS_LABEL,
  TRANSACTION_SUBSCRIPTION_STATUS,
  TRANSACTION_TYPE_LABEL,
} from "../../pages/transaction/components/constants/transaction";
import {
  getAmount,
  getCountry,
  getCurrency,
  getCustomDate,
  getformatDate,
  getMCC,
} from "../../utils/helper";
import { DATE_FORMAT } from "../../components/constants/constants";
import { HEADER_COLUMN } from "../../components/popper/constants/filter-constants";
import { BILLING_CYCLE_VALUES } from "config/common/billingCycle";
import TimeZone from "config/common/timezone";
import useDateFormatter from "hooks/date-preference/useDateFormatter";

export default (schema: any, details: any) => {
  let newSchema = schema;
  let updatedDetails: any = [];
  const { filterDateFormatter } = useDateFormatter();
  newSchema.map((item: any) => {
    let { name } = item;
    // let response is equal to the value field in the schema
    let value =
      name == "billingCycleType"
        ? BILLING_CYCLE_VALUES[details?.[name]]
        : name == "isActive"
        ? TRANSACTION_SUBSCRIPTION_STATUS[details?.[name]]
        : details?.[name];
    //console.log(name,value, 'adsfkljadsfkl', [null, 'null', '', undefined, 'N/A'].includes(value));
    // if the api response value is null or undefined then return N/A

    // console.log(name,value,"value");
    switch (name) {
      case HEADERS.SubsidiaryID:
        value = subsidaryID.find(
          (item: any) => item.value === details?.[name]
        )?.label;
        break;
      case HEADERS.MerchantCategoryCode:
        value = getMCC(details?.[name]);
        break;
      case HEADERS.Country:
        value = getCountry(details?.[name])?.name;
        break;
      case HEADERS.country:
        value = getCountry(details?.[name])?.name;
        break;
      case HEADERS.TimeZone:
        value = TimeZone.find((id: any) => id.value === details?.[name])?.label;
        break;
      case HEADERS.CountryID:
        value = getCountry(details?.[name])?.name;
        break;
      case HEADERS.SettlementOffset:
        value = details?.SettlementOffset?.split("T")[0];
        break;
      case HEADERS.ShippingCountry:
        value = getCountry(details?.[name])?.name;
        break;
      case HEADERS.BillingCountry:
        value = getCountry(details?.[name])?.name;
        break;
      case HEADERS.IssuingCountry:
        value = getCountry(details?.[name])?.name;
        break;
      case HEADERS.Amount:
        value = `${getCurrency(details?.CurrencyCode)} ${getAmount(
          details?.Amount,
          details?.CurrencyCode
        )}`;
        break;
      case HEADERS.Date:
        value = details?.[name] && filterDateFormatter(details?.[name]);
        break;
      case HEADERS.UpdatedDate:
        value = details?.[name] && filterDateFormatter(details?.[name]);
        break;
      case HEADERS.NextPaymentDate:
        value =
          details?.[name] &&
          (details?.[name] == "N/A"
            ? details?.[name]
            : getformatDate(details?.[name], DATE_FORMAT));
        break;
      case HEADERS.DueDate:
        value = details?.[name] && getCustomDate(details?.[name]);
        break;
      case HEADERS.Status:
        value = TRANSACTION_STATUS_LABEL[details?.[name]];
        break;
      case HEADER_COLUMN.SubscriptionStatus:
        value = TRANSACTION_SUBSCRIPTION_STATUS[details?.[name]];
        break;
      case HEADERS.TransactionType:
        value = TRANSACTION_TYPE_LABEL[details?.[name]];
        break;
      case HEADERS.Reseller:
        value = details?.[name]?.legalName;
        break;
      case HEADERS.JavaEnabled:
        value =
          details?.[name] === true
            ? "Yes"
            : details?.[name] === false
            ? "No"
            : "N/A";
        break;
      case HEADERS.AcquirerCode:
        value = details?.[name]?.toUpperCase();
        break;
      case HEADERS.PaymentType:
        value = PAYMENT_TYPE[details?.PaymentType]?.toUpperCase();
        break;
      case HEADERS.acceptHeader:
        value = details[name] ? JSON.stringify(details[name]) : "";
        break;
      case HEADERS.Scheme: {
        let NEW_CARD_TYPE = {
          ...CARD_TYPE,
          daspay: "DASPAY",
        };
        value = NEW_CARD_TYPE[details?.Scheme]?.toUpperCase();
        break;
      }
      default:
        value;
    }
    if ([null, "null", "", undefined, "N/A"].includes(value)) {
      value = "N/A";
    }
    let newItem = { ...item, value };

    return (updatedDetails = [...updatedDetails, newItem]);
  });
  return updatedDetails;
};
