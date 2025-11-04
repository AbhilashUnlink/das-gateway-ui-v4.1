import i18n from "i18n";

const PRODUCT_STATUS_VALUE: any = {
  ACTIVE: 'ACTIVE',
  TERMINATE: 'TERMINATE',
  PENDING: 'PENDING',
};
const PRODUCT_STATUS_LABEL: any = {
  ACTIVE: i18n.t('MerchantList.EnableDisableMID.Active'),
  TERMINATE: i18n.t('MerchantList.EnableDisableMID.Terminate'),
  PENDING: i18n.t('MerchantList.EnableDisableMID.Pending'),
};
const PRODUCT_STATUS: any = [
  {
    label: PRODUCT_STATUS_LABEL.ACTIVE,
    value: PRODUCT_STATUS_VALUE.ACTIVE,
    disabled: false,
  },
  {
    label: PRODUCT_STATUS_LABEL.TERMINATE,
    value: PRODUCT_STATUS_VALUE.TERMINATE,
    disabled: false,
  },
  {
    label: PRODUCT_STATUS_LABEL.PENDING,
    value: PRODUCT_STATUS_VALUE.PENDING,
    disabled: true,
  },
];
export { PRODUCT_STATUS, PRODUCT_STATUS_VALUE, PRODUCT_STATUS_LABEL };
