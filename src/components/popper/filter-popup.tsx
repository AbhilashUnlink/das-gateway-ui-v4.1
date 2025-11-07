import { useEffect } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import Fade from '@mui/material/Fade';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import CloseIcon from '@mui/icons-material/Close';
import {
  endOfDay,
  format,
  getMonth,
  getYear,
  startOfDay,
  subDays,
} from 'date-fns';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import FilterPopupData from './config/FilterPopupData';

import { useDispatch, useSelector } from 'react-redux';
import { resetFilter, setFilterPayload, userFilter } from 'store/features/filter';
import countries from '../../config/common/countries';
import MCC from './config/mcc';
import PRODUCT_TYPE from './constants/products';
import timezone from './config/timezone';
import './style.css';
import { Tooltip } from '@mui/material';
import {
  CARD_TYPE,
  INTEGRATION_TYPE,
  TRANSACTION_PAYMENT_TYPE,
  TRANSACTION_TYPE,
} from '../../pages/transaction/components/constants/transaction';

import {
  FILTER_POPOP_OF,
  HAS_3DS_TYPE,
  HEADER_COLUMN,
  HTML_ELEMENT,
  SALES_LEAD_FILTER_POPOP_OF,
  SIDE_MENU_TABS,
  STATUS,
  SUBSCRIPTION_STATUS,
  SUBSCRIPTION_STATUS_LABELS,
  View_Name_Space,
} from './constants/filter-constants';
import { CHARGE_BACK_TYPE } from '../../config/common/charge-back-types';
// import { ACQUIRER_NAMES_LIST } from '../../config/common/acquirer-names-list';
import Currency from '../../config/common/currency';
import { ProductTypes } from '../../config/common/product-types';
import {
  RECON_TYPE,
  STATEMENT_FILTER,
  // STATEMENT_STATUS,
  STATEMENT_STATUS_FILTER,
  STATEMENT_WHITELISTED_STATUS,
  WIRED_TYPE,
} from '../../pages/statements/components/merchant-statement/constants/statement-status';
import DasSnackbar from '../das-snackbar/DasSnackbar';
import { BILLING_CYCLE } from '../../config/common/billingCycle';
// import { setMerchantDetailsProductList } from '../../redux/features/merchant';
import FitlerBox from './FitlerBox';
import { MONTH_FORMAT } from '../constants/constants';
// import { User_Management_Access } from '../../pages/merchants/merchant-view/components/merchant-details/constants/userManagementAccessLevel';
import { USER_ACCESS_ROLE } from '../../pages/merchants/merchant-view/components/merchant-details/constants/merchantDetails';
import useLegacy from '../../hooks/use-legacy/useLegacy';
import { hasAccess } from '../../utils/has-access';
import { allReasonCodes } from '../../store/features/gateway-config';
import { setFilteredDASMID } from '../../store/features/merchant';
import useEntity from '../../hooks/use-entity/useEntity';
import { REGESTRATION_TYPE, SALES_LEAD_FILTER_DATA } from 'components/constants/sales-lead';
import { CHARGEBACK_FILTER, FILTER_HEADERS } from 'components/constants/dispute-dates';
import { customSort, filterDateFormatterNoTimeZone, trimToSingleSpace } from 'utils/helper';
import { CATALOG_CATEGORY_STATUS } from 'pages/merchants/merchant-view/components/merchant-details/merchant-catalogs/constants/status';
import useGetMerchantList from 'hooks/use-get-merchant-list/useGetMerchantList';
import useGetAcquirerList from 'hooks/use-get-acquirer-list/useGetAcquirerList';
import { assignmentTypeOptions } from 'pages/rules/schemas/assignmentsSchema';
import { RULE_TYPE_OPTIONS } from 'pages/rules/constants/rule-type';
import type { FilterPopupPropsType, FilterPropsType, HeaderNameType } from '../../@types/filter.type';
//import { HASH_CARD_STATUS } from '../../pages/hash-card/constants/hashcard';

const FilterPopup = ({
  columns,
  multiFilter,
  ns,
  filter,
  dateFormat,
  showMonthYearPicker,
  ReleasedPastFutureDate,
  customHeaderName,
  popupClassName,
  removePopper = false,
  setDisableRequestDownloadButton,
  currentScreen,
  dynamicFilter = true,
  setSkip,
  initialFilterData = [],
  setInitialFilterData = undefined,
  count = 0,
  setCount,
}: FilterPopupPropsType) => {
  const AllSchemeReasonCodeList = useSelector(allReasonCodes);
  // const dasmidOptionsList = useSelector(
  //   (store: any) => store.config.dasmidOptions,
  // );

  const { dasmidOptions, legalNamesList } = useGetMerchantList();
  const { AcquirerMIDFilterOptions, AcquirerFilterOptions } = useGetAcquirerList();

  const { t } = useTranslation();
  const { drawer } = useSelector((store: any) => store?.drawer);
  let subscriptionPlanCurrency = drawer[0]?.data?.TransactionCCY;
  // const productInfo = useSelector(
  //   (store: any) => store?.merchant?.merchantDetailsProductList,
  // );

  // const { merchantDetailsProductList } = useSelector(
  //   (store: any) => store?.merchant,
  // );

  // const merchantDetailsDASMIDList = merchantDetailsProductList?.map(
  //   (item: any) => item.DASMID,
  // );

  // const AcquirerMIDOptions = useSelector(
  //   (store: any) => store?.acquirerDetails?.AcquirerMIDOptions,
  // );
  // const merchantDetailsProductInfo = useSelector(
  //   (store: any) => store?.merchant?.merchantDetails,
  // );
  const {
    // legalNamesList, 
    salesLeadFilterMerchantData, salesLeadFilterPartnerData } = useSelector((store: any) => store?.config);

  const INTERNAL = hasAccess(
    'LEGAL_NAME_IN_ENGLISH_COLUMN_IN_TRANSACTIONS_TAB',
  );
  const ADVANCED_FITLER = t('Filter.AdvancedFilters');
  // const RESET = t('Filter.button.Reset');
  // const APPLY = t('Filter.button.Apply');
  const TRANSLATED_VALUE = t('Filter.Value');

  // screen name : filter options
  const REDUCE = {
    [FILTER_POPOP_OF.PRODUCT_INFO_ON_MERCHANT_DETAILS]: [
      t('MerchantList.Product_View_ColumnDefs.AcquirerCode'),
    ],
  };
  const CONDITIONAL_FILTER_OPTIONS = REDUCE[currentScreen]
    ? REDUCE[currentScreen]
    : [];

  const REDUCED_HEADER_COLUMNS = [
    ...CONDITIONAL_FILTER_OPTIONS,
    ...[
      t('TransactionsResult.columnDefs.Action'),
      t('TransactionsResult.columnDefs.StartDate'),
      t('TransactionsResult.columnDefs.EndDate'),
      // t('TransactionsResult.columnDefs.MerchantRefID'),
      // t('TransactionsResult.columnDefs.AcquirerMID'),
      // t('TransactionsResult.columnDefs.AuthCode'),
      // t('TransactionsResult.columnDefs.trackID'),
      t('MerchantList.Merchants_View_ColumnDefs.Products'),
      t('MerchantList.Merchants_View_ColumnDefs.CreatedDate'),
      t('DisputeManagement.columnDefs.UpdatedAt'),
      t('ResellerAccount.columnDefs.ReferredMerchants'),
      t('StatementList.Statements_View_ColumnDefs.TotalPayout'),
      t('StatementList.Statements_View_ColumnDefs.RollingReserveAmount'),
      t('StatementList.Statements_View_ColumnDefs.CumulativeReserves'),
      t('StatementList.Statements_View_ColumnDefs.TransactionEndDate'),
      t('Holiday.ColumnDefs.Type'),
      t('Holiday.ColumnDefs.Day'),
      t('Acquirer_Details.AcquirerMID.fields.Description'),
      t('Merchant_Detail.Subscription.columnDefs.trialPeriod'),
      t('Merchant_Detail.Subscription.columnDefs.discount'),
      t('Merchant_Detail.Subscription.columnDefs.Subscribers'),
      t('Merchant_Detail.Product_Information.columnDefs.Name'),
      "Rule",
      "IsActive",
      "Rule Actions",
      t('Merchant_Detail.Product_Information.columnDefs.Type'),
      // t('Merchant_Detail.Product_Information.columnDefs.MCC'),
      t('Merchant_Detail.Product_Information.columnDefs.V2DASMID'),
      t('Enable / Disable MID'),
      t('FinanceStatements.Statement_ColumnDefs.amount'),
      t('FinanceStatements.Statement_ColumnDefs.ROLLING_RESERVE_HELD_AMOUNT'),
      t('FinanceStatements.Statement_ColumnDefs.CUMULATIVE_RESERVES'),
      t('FinanceStatements.Statement_ColumnDefs.TRANSACTION_END_DATE'),
      t('Merchant_Detail.User_Management.columnDefs.Products'),
      t('Merchant_Detail.User_Management.columnDefs.Join_Date'),
      t('Merchant_Detail.MerchantDetail.MCC'),
      t('HashCard.Column_Def.Updated Date'),
      t('HashCard.Column_Def.Created Date'),
      t('HashCard.Column_Def.Updated By'),
      t('HashCard.Column_Def.Created By'),
      t('HashCard.Form_Fields.Comments'),
      t('MerchantList.MerchantCatalogs.MerchantCategory.ColumnsDefs.CreatedAt'),
      t('MerchantList.MerchantCatalogs.MerchantCategory.ColumnsDefs.UpdatedAt'),
      t('MerchantList.MerchantCatalogs.MerchantCategory.ColumnsDefs.CategoryDesc'),
      t('MerchantList.MerchantCatalogs.MerchantCategoryProducts.ColumnsDefs.ProductImage'),
      t('MerchantList.MerchantCatalogs.MerchantCategoryProducts.ColumnsDefs.CreatedAt'),
      t('MerchantList.MerchantCatalogs.MerchantCategoryProducts.ColumnsDefs.UpdatedAt'),
      t('MerchantList.MerchantCatalogs.MerchantCategoryProducts.ColumnsDefs.ProductDesc'),
      t('MerchantList.MerchantCatalogs.MerchantCategoryProducts.ColumnsDefs.ProductID'),
      t('MerchantList.MerchantSettingsTabs.IP_Whitelisting.Column_Def.Created By'),
      t('MerchantList.MerchantSettingsTabs.IP_Whitelisting.Column_Def.Created Date'),
      t('MerchantList.MerchantSettingsTabs.IP_Whitelisting.Column_Def.Updated By'),
      t('MerchantList.MerchantSettingsTabs.IP_Whitelisting.Column_Def.Updated Date'),
      t('MerchantList.MerchantSettingsTabs.IP_Whitelisting.Form_Fields.Comments'),
    ],
  ];

  // const REDUCED_HEADER_COLUMNS : Array<String> = common.MerchantList.Merchants_View_ColumnDefs.FilterColumns;
  const [open, setOpen] = useState(false);
  const [disableApplyButton, setDisableApplyButton] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);

  const [filterData, setFilterData] = useState<any>(initialFilterData);
  // useEffect(() => {
  // }, [ns]);
  const [headerName, setHeaderName] = useState<HeaderNameType>([]);
  const legacy = useLegacy();
  const applyFilterFunction = (event: any) => {
    // if ([FILTER_POPOP_OF.ACQUIRER_MID_DETAIL_TABLE].includes(currentScreen)) {
    //   handleResetFilter();
    // }
    setAnchorEl(event.currentTarget);
    setOpen(previousOpen => !previousOpen);
    dispatch(setFilterPayload(null));
    ns === View_Name_Space.TRANSACTION &&
      initialFilterData?.length > 0 &&
      setFilterData(initialFilterData);
  };

  const canBeOpen = open && Boolean(anchorEl);
  const id = canBeOpen ? 'transition-popper' : undefined;

  const dispatch = useDispatch();

  const { entityOptions } = useEntity();

  const getFilterProps = (i: number, items: FilterPropsType) => {
    let filterProps: any = items;
    filterProps.options = headerName.filter(
      (option: any) =>
        !filterData?.find(
          (filterItem: any, indx: number) =>
            option.value === filterItem.HeaderColumn && indx !== i,
        ),
    );
    const items_label = t(items.label);
    if (
      filterData.length > 0 &&
      filterData[i] &&
      items_label === TRANSLATED_VALUE
    ) {
      if (
        filterData[i].HeaderColumn === HEADER_COLUMN.COUNTRY ||
        filterData[i].HeaderColumn === HEADER_COLUMN.COUNTRY_ID ||
        filterData[i].HeaderColumn === HEADER_COLUMN.CTC_COUNTRY ||
        filterData[i].HeaderColumn === HEADER_COLUMN.COUNTRY_CODE ||
        filterData[i].HeaderColumn === HEADER_COLUMN.BUSINESS_LOCATION ||
        filterData[i].HeaderColumn === HEADER_COLUMN.BILLING_COUNTRY
      ) {
        if (currentScreen === SIDE_MENU_TABS.HOLIDAY) {
          filterProps.options = entityOptions;
        } else {
          filterProps.options = countries?.map(({ name, value }) => {
            return { headerName: name, value };
          });
        }
        filterProps.html_element = HTML_ELEMENT.SELECT;

        filterProps.multiple = multiFilter.includes(filterData[i].HeaderColumn);
      } else if (filterData[i].HeaderColumn === HEADER_COLUMN.CASE_TYPE) {
        filterProps.options = Object.keys(CHARGE_BACK_TYPE)
          .filter(type => type !== 'InternalDispute') // This line filters out InternalDispute
          .map(type => {
            return { headerName: CHARGE_BACK_TYPE[type], value: type };
          });
        filterProps.html_element = HTML_ELEMENT.SELECT;
        filterProps.multiple = multiFilter.includes(filterData[i].HeaderColumn);
      } else if (filterData[i].HeaderColumn === HEADER_COLUMN.REASON_CODE) {
        filterProps.options = AllSchemeReasonCodeList?.map((data: any) => {
          const value = data.value;
          return {
            headerName: data.label,
            value: value.replaceAll(' ', '%20'),
          };
        });
        filterProps.html_element = HTML_ELEMENT.SELECT;
      } else if (filterData[i]?.HeaderColumn === HEADER_COLUMN.AMOUNT) {
        filterProps.type = 'number';
        filterProps.name = 'Name';
        filterProps.html_element = HTML_ELEMENT.TEXT_FIELD;
      } else if (
        filterData[i]?.HeaderColumn === HEADER_COLUMN.SUBSIDIARY_ID ||
        filterData[i]?.HeaderColumn === HEADER_COLUMN.POENTITY
      ) {
        filterProps.name = HEADER_COLUMN.SUBSIDIARY_ID;
        filterProps.html_element = HTML_ELEMENT.SELECT;
        filterProps.multiple = multiFilter.includes(
          filterData[i]?.HeaderColumn,
        );
      } else if (
        filterData[i]?.HeaderColumn?.toLowerCase() === HEADER_COLUMN.STATUS
      ) {
        const STATUS_COLUMN: any = STATUS[ns];
        filterProps.options = Object.keys(STATUS_COLUMN).map(status => {
          if (ns === View_Name_Space.SUBSCRIPTION_STATUS) {
            return {
              headerName:
                status === SUBSCRIPTION_STATUS_LABELS.INITIATED
                  ? SUBSCRIPTION_STATUS_LABELS.PENDING
                  : SUBSCRIPTION_STATUS_LABELS[status],
              value: status,
            };
          } else if (ns === View_Name_Space.TRANSACTION) {
            return { headerName: STATUS_COLUMN[status], value: status };
          } else if (ns === View_Name_Space.SALESLEAD) {
            return { headerName: STATUS_COLUMN[status], value: status };
          } else if (ns === View_Name_Space.CHARGEBACK) {
            return { headerName: STATUS_COLUMN[status], value: status };
          } else if (ns === View_Name_Space.ACQUIRERS) {
            return { headerName: STATUS_COLUMN[status], value: status };
          } else if (ns === View_Name_Space.MERCHANT) {
            return { headerName: STATUS_COLUMN[status], value: status };
          } else if (ns === View_Name_Space.IP_WHITELISTING) {
            return { headerName: STATUS_COLUMN[status], value: status };
          } else if (ns === View_Name_Space.HASH_CARD_NUMBER) {
            return {
              headerName: STATUS.HASH_CARD_STATUS[status],
              value: STATUS_COLUMN[status],
            };
          }
          else {
            let statusItem = { headerName: status, value: status };
            return statusItem;
          }
        });
        filterProps.html_element = HTML_ELEMENT.SELECT;
        filterProps.multiple = multiFilter?.includes(
          filterData[i]?.HeaderColumn,
        );
      } else if (
        filterData[i]?.HeaderColumn === HEADER_COLUMN.PARTNER_ISACTIVE
      ) {
        const STATUS_COLUMN: any = STATUS[ns];
        if (ns === View_Name_Space.SUBSCRIPTION) {
          filterProps.options = Object.keys(STATUS_COLUMN).map(status => {
            let statusItem = {
              headerName: t(`SUBSCRIPTION_STATUS.${status}`),
              value: STATUS_COLUMN[status],
            };
            return statusItem;
          });
        } else if (ns === View_Name_Space.PARTNER) {
          filterProps.options = Object.keys(STATUS_COLUMN).map(status => {
            let statusItem = {
              headerName: STATUS.PARTNER_STATUS[status],
              value: STATUS_COLUMN[status],
            };
            return statusItem;
          });
        }

        filterProps.html_element = HTML_ELEMENT.SELECT;
        filterProps.multiple = multiFilter?.includes(
          filterData[i]?.HeaderColumn,
        );
      } else if (
        // filterData[i].HeaderColumn === HEADER_COLUMN.ACQUIRER_NAME ||
        filterData[i].HeaderColumn === HEADER_COLUMN.ACQUIRER ||
        filterData[i].HeaderColumn === HEADER_COLUMN.ACQUIRER_CODE
      ) {
        // filterProps.options = ACQUIRER_NAMES_LIST.map((type: any) => {
        //   return { headerName: type.label, value: type.value };
        // });
        filterProps.options = AcquirerFilterOptions
        // localStorage.getItem('acquirerCode')
        //   ? localStorage.getItem('acquirerCode')?.split(',')
        //   : [];
        filterProps.html_element = HTML_ELEMENT.SELECT_WITH_SEARCH;
        filterProps.name = 'Name';
        filterProps.multiple = true;
        // filterProps.default_value = '';
        // filterProps.multiple = multiFilter?.includes(
        //   filterData[i].HeaderColumn,
        // );
      } else if (
        filterData[i]?.HeaderColumn === HEADER_COLUMN.TRANSACTION_TYPE
      ) {
        filterProps.options = Object.keys(TRANSACTION_TYPE).map((type: any) => {
          let statusItem = {
            headerName: TRANSACTION_TYPE[type].toUpperCase(),
            value: type,
          };
          return statusItem;
        });
        filterProps.html_element = HTML_ELEMENT.SELECT;
        filterProps.default_value = '';
        filterProps.multiple = multiFilter?.includes(
          filterData[i]?.HeaderColumn,
        );
      }
      else if (
        filterData[i]?.HeaderColumn === HEADER_COLUMN.INTEGRATION_TYPE
      ) {
        filterProps.options = Object.keys(INTEGRATION_TYPE).map((type: any) => {
          let statusItem = { headerName: INTEGRATION_TYPE[type].toUpperCase(), value: type };
          return statusItem;
        });
        filterProps.html_element = HTML_ELEMENT.SELECT;
        filterProps.default_value = '';
        filterProps.multiple = multiFilter?.includes(
          filterData[i]?.HeaderColumn,
        );
      }
      else if (filterData[i].HeaderColumn === HEADER_COLUMN.CURRENCY_CODE) {
        filterProps.options = Currency?.map(({ value }: any) => {
          let currencyItem = { headerName: value, value };
          return currencyItem;
        });
        filterProps.html_element = HTML_ELEMENT.SELECT;
        filterProps.default_value = '';
        filterProps.multiple = multiFilter.includes(filterData[i].HeaderColumn);
      }
      else if (filterData[i].HeaderColumn === HEADER_COLUMN.assignmentType) {
        filterProps.options = assignmentTypeOptions?.map(({ label, value }: any) => {
          let currencyItem = { headerName: label, value };
          return currencyItem;
        });
        filterProps.html_element = HTML_ELEMENT.SELECT;
        filterProps.default_value = '';
      }
      else if (filterData[i].HeaderColumn === HEADER_COLUMN.CATALOG_CATEGORY_STATUS) {
        filterProps.options = CATALOG_CATEGORY_STATUS?.map(({ label, value }: any) => {
          let categoryStatus = { headerName: label, value };
          return categoryStatus;
        });
        filterProps.html_element = HTML_ELEMENT.SELECT;
        filterProps.default_value = '';
        filterProps.multiple = multiFilter.includes(filterData[i].HeaderColumn);
      }
      else if (filterData[i].HeaderColumn === HEADER_COLUMN.CATALOG_PRODUCT_STATUS) {
        filterProps.options = CATALOG_CATEGORY_STATUS?.map(({ label, value }: any) => {
          let categoryStatus = { headerName: label, value };
          return categoryStatus;
        });
        filterProps.html_element = HTML_ELEMENT.SELECT;
        filterProps.default_value = '';
        filterProps.multiple = multiFilter.includes(filterData[i].HeaderColumn);
      }
      else if (
        filterData[i].HeaderColumn === HEADER_COLUMN.PRODUCT_TYPE ||
        filterData[i].HeaderColumn === HEADER_COLUMN.TYPE
      ) {
        filterProps.options = ProductTypes?.map(({ value }: any) => {
          return { headerName: value, value };
        });
        filterProps.html_element = HTML_ELEMENT.SELECT;
        filterProps.multiple = multiFilter.includes(filterData[i].HeaderColumn);
      }
      else if (filterData[i]?.HeaderColumn === HEADER_COLUMN.SCHEME) {
        filterProps.options = Object.keys(CARD_TYPE).map((type: any) => {
          let schema = {
            headerName: CARD_TYPE[type].toUpperCase(),
            value: type,
          };
          return schema;
        });
        filterProps.html_element = HTML_ELEMENT.SELECT;
        filterProps.default_value = '';
        filterProps.multiple = multiFilter.includes(
          filterData[i]?.HeaderColumn,
        );
      } else if (filterData[i]?.HeaderColumn === HEADER_COLUMN.MCC) {
        filterProps.options = MCC?.map((item: any) => {
          let mccItem = { headerName: item.d, value: item.value };
          return mccItem;
        });
        filterProps.html_element = HTML_ELEMENT.SELECT;
        filterProps.default_value = '';
        filterProps.multiple = multiFilter?.includes(
          filterData[i]?.HeaderColumn,
        );
      } else if (
        filterData[i]?.HeaderColumn === HEADER_COLUMN.TYPE &&
        ns === View_Name_Space.PRODUCTS
      ) {
        filterProps.options = Object.keys(PRODUCT_TYPE).map(type => {
          let productItem = { label: PRODUCT_TYPE[type], value: type };
          return productItem;
        });
        filterProps.html_element = HTML_ELEMENT.SELECT;
        filterProps.default_value = '';
        filterProps.multiple = multiFilter.includes(filterData[i].HeaderColumn);
      } else if (filterData[i]?.HeaderColumn === HEADER_COLUMN.TIME_ZOME) {
        filterProps.options = timezone?.map(({ label, value }: any) => {
          let timeZoneObj = { label, value };
          return timeZoneObj;
        });
        filterProps.html_element = HTML_ELEMENT.SELECT;
        filterProps.multiple = multiFilter.includes(
          filterData[i]?.HeaderColumn,
        );
      } else if (
        filterData[i].HeaderColumn === HEADER_COLUMN.SUBSCRIBER_CARD_EXP ||
        (ns === View_Name_Space.PUBLIC_HOLIDAY &&
          filterData[i].HeaderColumn === HEADER_COLUMN.HOLIDAY_DATE) ||
        (ns === View_Name_Space.STATEMENTS &&
          filterData[i].HeaderColumn === HEADER_COLUMN.DATE) ||
        (currentScreen === 'StatementTransactions' &&
          filterData[i].HeaderColumn === HEADER_COLUMN.DATE) ||
        (currentScreen === 'StatementTransactions' &&
          filterData[i].HeaderColumn === HEADER_COLUMN.UPDATED_DATE) ||
        filterData[i]?.HeaderColumn === HEADER_COLUMN.CREATED_AT ||
        filterData[i].HeaderColumn === HEADER_COLUMN.ISSUED_DATE ||
        filterData[i].HeaderColumn === HEADER_COLUMN.DUE_DATE ||
        filterData[i].HeaderColumn === HEADER_COLUMN.RELEASED_DATE ||
        filterData[i].HeaderColumn === HEADER_COLUMN.PAYOUT_DATE ||
        filterData[i].HeaderColumn === HEADER_COLUMN.TRANSACTION_START_DATE ||
        filterData[i].HeaderColumn === HEADER_COLUMN.TRANSACTION_END_DATE ||
        filterData[i].HeaderColumn === HEADER_COLUMN.SALESLEAD_CREATED_AT ||
        filterData[i].HeaderColumn === HEADER_COLUMN.SUBSCRIPTION_STARTS_AT ||
        filterData[i].HeaderColumn === HEADER_COLUMN.SUBSCRIPTION_ENDS_AT ||
        filterData[i].HeaderColumn === HEADER_COLUMN.NEXT_PAYMENT_DATE
      ) {
        filterProps.html_element = HTML_ELEMENT.DATE_RANGE_PICKER;
      } else if (
        (ns === View_Name_Space.TRANSACTION &&
          filterData[i]?.HeaderColumn === HEADER_COLUMN.DATE) ||
        filterData[i]?.HeaderColumn === HEADER_COLUMN.UPDATED_DATE
      ) {
        filterProps.html_element = HTML_ELEMENT.NEW_DATE_RANGE_PICKER;
      } else if (filterData[i].HeaderColumn === HEADER_COLUMN.RECON_STATUS) {
        filterProps.options = Object.values(RECON_TYPE).map((type: any) => {
          return { headerName: type, value: type };
        });
        filterProps.html_element = HTML_ELEMENT.SELECT;
        filterProps.default_value = '';
        filterProps.multiple = multiFilter?.includes(
          filterData[i].HeaderColumn,
        );
      }
      else if (filterData[i].HeaderColumn === HEADER_COLUMN.STATEMENT_STATUS) {
        filterProps.options = STATEMENT_STATUS_FILTER(INTERNAL).map(
          (type: any) => {
            return { headerName: type.label, value: type.value };
          },
        );
        filterProps.html_element = HTML_ELEMENT.SELECT;
        filterProps.default_value = '';
        filterProps.multiple = multiFilter?.includes(
          filterData[i].HeaderColumn,
        );
      } else if (filterData[i].HeaderColumn === HEADER_COLUMN.WIRED_STATUS) {
        filterProps.options = Object.keys(WIRED_TYPE).map((type: any) => {
          return { headerName: WIRED_TYPE[type], value: type };
        });
        filterProps.html_element = HTML_ELEMENT.SELECT;
        filterProps.default_value = '';
        filterProps.multiple = multiFilter?.includes(
          filterData[i].HeaderColumn,
        );
      } else if (
        filterData[i].HeaderColumn === HEADER_COLUMN.STATEMENT_WHITELISTED
      ) {
        filterProps.options = STATEMENT_WHITELISTED_STATUS.map((type: any) => {
          return { headerName: type.label, value: type.value };
        });
        filterProps.html_element = HTML_ELEMENT.SELECT;
        filterProps.default_value = '';
        filterProps.multiple = multiFilter?.includes(
          filterData[i].HeaderColumn,
        );
      } else if (
        filterData[i].HeaderColumn === HEADER_COLUMN.REGISTRATION_TYPE
      ) {
        filterProps.options = Object.keys(REGESTRATION_TYPE).map(
          (type: any) => {
            return { headerName: REGESTRATION_TYPE[type], value: type };
          },
        );
        filterProps.html_element = HTML_ELEMENT.SELECT;
        filterProps.default_value = '';
        filterProps.multiple = multiFilter?.includes(
          filterData[i].HeaderColumn,
        );
      } else if (filterData[i].HeaderColumn === HEADER_COLUMN.HAS_3DS) {
        filterProps.options = Object.keys(HAS_3DS_TYPE).map((type: any) => {
          return { headerName: HAS_3DS_TYPE[type], value: type };
        });
        filterProps.html_element = HTML_ELEMENT.SELECT;
        filterProps.default_value = '';
        filterProps.multiple = multiFilter?.includes(
          filterData[i].HeaderColumn,
        );
      }
      else if (filterData[i].HeaderColumn === HEADER_COLUMN.PAYMENT_TYPE) {
        filterProps.options = TRANSACTION_PAYMENT_TYPE.map((type: any) => {
          return { headerName: type.label, value: type.value };
        });
        filterProps.html_element = HTML_ELEMENT.SELECT;
        filterProps.default_value = '';
        filterProps.multiple = multiFilter?.includes(
          filterData[i].HeaderColumn,
        );
      }
      else if (
        filterData[i].HeaderColumn === HEADER_COLUMN.BILLING_CYCLE_TYPE
      ) {
        filterProps.options = BILLING_CYCLE.map((type: any) => {
          return { headerName: type.label, value: type.value };
        });
        filterProps.html_element = HTML_ELEMENT.SELECT;
        filterProps.default_value = '';
        filterProps.multiple = multiFilter?.includes(
          filterData[i].HeaderColumn,
        );
      } else if (
        filterData[i].HeaderColumn === HEADER_COLUMN.ROLLING_RESERVE_HELD ||
        filterData[i].HeaderColumn === HEADER_COLUMN.ROLLING_RESERVE_RELEASED ||
        filterData[i].HeaderColumn ===
        HEADER_COLUMN.FIXED_DEPOSITE_HELD_YTD_AMOUNT ||
        filterData[i].HeaderColumn === HEADER_COLUMN.ADJUSTMENTS_AMOUNT ||
        filterData[i].HeaderColumn === HEADER_COLUMN.NET_SALES ||
        filterData[i].HeaderColumn === HEADER_COLUMN.TOTAL_FEES
      ) {
        filterProps.type = 'number';
        filterProps.name = 'Name';
        filterProps.html_element = HTML_ELEMENT.TEXT_FIELD;
      } else if (
        filterData[i].HeaderColumn === HEADER_COLUMN.AMOUNT ||
        filterData[i].HeaderColumn === HEADER_COLUMN.DISPUTE_AMOUNT ||
        filterData[i].HeaderColumn === HEADER_COLUMN.COMPLETED_PAYMENT_CYCLE ||
        filterData[i].HeaderColumn === HEADER_COLUMN.SUBSCRIPTION_PLAN_AMOUNT
      ) {
        filterProps.type = 'number';
        filterProps.name = 'Name';
        filterProps.html_element = HTML_ELEMENT.TEXT_FIELD;
      } else if (
        filterData[i].HeaderColumn === HEADER_COLUMN.CCY ||
        filterData[i].HeaderColumn === HEADER_COLUMN.SUBSCRIPTION_PLAN_CCY
      ) {
        filterProps.options = subscriptionPlanCurrency?.map((item: any) => {
          return { headerName: item, value: item };
        });
        filterProps.html_element = HTML_ELEMENT.SELECT;
        filterProps.default_value = '';
        filterProps.multiple = multiFilter.includes(filterData[i].HeaderColumn);
      } else if (
        filterData[i].HeaderColumn === HEADER_COLUMN.DASMID ||
        filterData[i].HeaderColumn === HEADER_COLUMN.DAS_MID
      ) {

        // if (legacy) {
        //   dasmidOptions = localStorage.getItem('v2DasmidOptions')
        //     ? localStorage.getItem('v2DasmidOptions')?.split(',')
        //     : [];
        // }
        filterProps.name = 'Name';
        filterProps.html_element = HTML_ELEMENT.SELECT_WITH_SEARCH;
        filterProps.multiple = true;
        filterProps.options = dasmidOptions
        // currentScreen === FILTER_POPOP_OF.PRODUCT_INFO_ON_MERCHANT_DETAILS
        //   ? merchantDetailsDASMIDList
        //   : dasmidOptions;
      } else if (
        filterData[i].HeaderColumn === HEADER_COLUMN.LEGAL_NAME ||
        filterData[i].HeaderColumn === HEADER_COLUMN.COMPANY_NAME
      ) {

        const accountsList = currentScreen === SALES_LEAD_FILTER_POPOP_OF.SALES_LEAD_MERCHANT ? salesLeadFilterMerchantData : salesLeadFilterPartnerData;

        const salesLeadAccountsList = accountsList && Array.isArray(accountsList) ? accountsList?.map(({ business }: any) => {
          return business?.companyName;
        }) : [];

        const legalNamesOptions = ns == View_Name_Space.SALESLEAD ? customSort([...salesLeadAccountsList]) : [...legalNamesList];

        filterProps.name = 'Name';
        filterProps.html_element = HTML_ELEMENT.SELECT_WITH_SEARCH;
        filterProps.multiple = false;
        filterProps.options = legalNamesOptions;
      } else if (filterData[i].HeaderColumn === HEADER_COLUMN.ACQUIRER_MID) {
        // const acquirerMIDData = localStorage.getItem('acquirerMIDData')
        //   ? localStorage.getItem('acquirerMIDData')?.split(',')
        //   : [];
        filterProps.name = 'Name';
        filterProps.html_element = HTML_ELEMENT.SELECT_WITH_SEARCH;
        filterProps.multiple = true;

        filterProps.options = AcquirerMIDFilterOptions
        // currentScreen === FILTER_POPOP_OF.ACQUIRER_MID_DETAIL_TABLE
        // ? AcquirerMIDFilterOptions
        //   : acquirerMIDData;
      } else if (
        filterData[i].HeaderColumn === HEADER_COLUMN.SUBSCRIPTION_STATUS ||
        filterData[i].HeaderColumn === HEADER_COLUMN.SUBSCRIBER_STATUS
      ) {
        filterProps.options = Object.keys(SUBSCRIPTION_STATUS).map(
          (type: any) => {
            return { headerName: SUBSCRIPTION_STATUS[type], value: type };
          },
        );
        filterProps.html_element = HTML_ELEMENT.SELECT;
        filterProps.default_value = '';
        filterProps.multiple = multiFilter?.includes(
          filterData[i].HeaderColumn,
        );
      } else if (filterData[i].HeaderColumn === HEADER_COLUMN.ACCESS_LEVEL) {
        filterProps.options = USER_ACCESS_ROLE.map((type: any) => {
          return { headerName: type.label, value: type.value };
        });
        filterProps.html_element = HTML_ELEMENT.SELECT;
        filterProps.default_value = '';
        filterProps.multiple = multiFilter?.includes(
          filterData[i].HeaderColumn,
        );
      } else if (filterData[i].HeaderColumn === HEADER_COLUMN.IsActive) {
        filterProps.options = Object.entries(STATUS[ns]).map(([key, value]: any) => {
          return {
            headerName: key,
            value
          }
        });
        filterProps.html_element = HTML_ELEMENT.SELECT;
        filterProps.default_value = '';
      }
      else if (filterData[i].HeaderColumn === "RuleType") {
        filterProps.options = RULE_TYPE_OPTIONS?.map(({ label, value }: any) => {
          return {
            headerName: label,
            value
          }
        });
        filterProps.html_element = HTML_ELEMENT.SELECT;
        filterProps.default_value = '';
      }
      else {
        filterProps.name = 'Name';
        filterProps.html_element = HTML_ELEMENT.TEXT_FIELD;
        filterProps.type = 'text';
      }
    } else if (items_label === TRANSLATED_VALUE) {
      filterProps.name = 'Name';
      filterProps.html_element = HTML_ELEMENT.TEXT_FIELD;
    }
    return filterProps;
  };

  const getDateFormat = (date: Date) => {
    return format(date, 'yyyy/MM/dd');
  };

  const onHandleChange = (key: string, value: any, index: number) => {
    setDisableRequestDownloadButton && setDisableRequestDownloadButton(true);
    setDisableApplyButton && setDisableApplyButton(false);
    let data = filterData;
    if (key === 'HeaderColumn') {
      data[index].Name = '';
    }

    if (data[index]) {
      data[index] = { ...data[index], [key]: value };
    } else {
      data[index] = { [key]: value };
    }
    if (setFilterData) {
      setFilterData([...data]);
    }
  };

  useEffect(() => {
    setHeaderName(
      columns.reduce((c: any, i: any) => {
        if (
          !REDUCED_HEADER_COLUMNS.includes(i.headerName) &&
          (i.visible == undefined || i.visible == true)
        ) {
          const columnName = i.headerName?.split('/');
          // changeing label from DAS MID to Phantom MID
          return [...c, { headerName: columnName[0] === "DAS MID" ? "Phantom MID" : columnName[0], value: i.field }];
        } else {
          return c;
        }
      }, []),
    );
  }, [columns]);
  const handleApplyFilter = () => {
    setInitialFilterData && setInitialFilterData(filterData);
    setSkip && setSkip(0);
    let filterDateColumn = filterData.filter(
      (itm: any) =>
        (itm.HeaderColumn === HEADER_COLUMN.DATE &&
          currentScreen !== SIDE_MENU_TABS.HOLIDAY) ||
        itm.HeaderColumn === HEADER_COLUMN.CREATED_AT ||
        itm.HeaderColumn === HEADER_COLUMN.UPDATED_DATE ||
        itm.HeaderColumn === HEADER_COLUMN.RELEASED_DATE ||
        itm.HeaderColumn === HEADER_COLUMN.PAYOUT_DATE ||
        itm.HeaderColumn === HEADER_COLUMN.TRANSACTION_START_DATE ||
        itm.HeaderColumn === HEADER_COLUMN.SALESLEAD_CREATED_AT ||
        itm.HeaderColumn === HEADER_COLUMN.ISSUED_DATE ||
        itm.HeaderColumn === HEADER_COLUMN.DUE_DATE ||
        itm.HeaderColumn === HEADER_COLUMN.SUBSCRIPTION_STARTS_AT ||
        itm.HeaderColumn === HEADER_COLUMN.SUBSCRIPTION_ENDS_AT ||
        itm.HeaderColumn === HEADER_COLUMN.NEXT_PAYMENT_DATE,
    );
    let filterPayload = filterData.filter(
      (itm: any) =>
        itm.HeaderColumn !== HEADER_COLUMN.CREATED_AT &&
        itm.HeaderColumn !== HEADER_COLUMN.START_DATE &&
        itm.HeaderColumn !== HEADER_COLUMN.END_DATE &&
        itm.HeaderColumn !== HEADER_COLUMN.SALESLEAD_CREATED_AT &&
        // itm.HeaderColumn !== HEADER_COLUMN.ISSUED_DATE &&
        // itm.HeaderColumn !== HEADER_COLUMN.DUE_DATE &&
        itm.HeaderColumn !== HEADER_COLUMN.SUBSCRIPTION_STARTS_AT &&
        itm.HeaderColumn !== HEADER_COLUMN.SUBSCRIPTION_ENDS_AT &&
        itm.HeaderColumn !== HEADER_COLUMN.NEXT_PAYMENT_DATE,
    );
    for (let date_col_index in filterDateColumn) {
      const date_cloumn = filterDateColumn[date_col_index];
      if (date_cloumn && date_cloumn?.Name?.length > 0) {
        let startDate = getDateFormat(date_cloumn.Name[0]);
        let endDate = getDateFormat(
          date_cloumn.Name[1] !== null
            ? date_cloumn.Name[1]
            : date_cloumn.Name[0],
        );
        if (
          (ns === View_Name_Space.TRANSACTION &&
            date_cloumn?.HeaderColumn === HEADER_COLUMN.DATE) ||
          date_cloumn?.HeaderColumn === HEADER_COLUMN.UPDATED_DATE
        ) {
          startDate = filterDateFormatterNoTimeZone(
            date_cloumn.Name[0],
            'yyyy/MM/dd HH:mm:ss',
          );
          endDate = filterDateFormatterNoTimeZone(
            date_cloumn.Name[1] !== null
              ? date_cloumn.Name[1]
              : date_cloumn.Name[0],
            'yyyy/MM/dd HH:mm:ss',
          );
        }
        let startDateName = 'StartDate';
        let endDateName = 'EndDate';
        let newKey;
        if (
          customHeaderName ||
          date_cloumn?.HeaderColumn ===
          STATEMENT_FILTER.TRANSACTION_UPDATED_DATE
          // location.pathname === '/finance/statements' ||
          // location.pathname === '/salesLead' ||
          // location.pathname === '/dispute-management/list'
        ) {
          switch (date_cloumn?.HeaderColumn) {
            case STATEMENT_FILTER.Date:
              newKey = FILTER_HEADERS.Statement;
              break;
            case STATEMENT_FILTER.ReleasedDate:
              newKey = FILTER_HEADERS.Released;
              break;
            case STATEMENT_FILTER.Payout_Date:
              newKey = FILTER_HEADERS.Payout;
              break;
            case STATEMENT_FILTER.TRANSACTION_START_DATE:
              newKey = FILTER_HEADERS.Transaction;
              break;
            case STATEMENT_FILTER.TRANSACTION_UPDATED_DATE:
              newKey = FILTER_HEADERS.Updated;
              break;
            case SALES_LEAD_FILTER_DATA.filterData:
              newKey = FILTER_HEADERS.createdAt;
              break;
            case CHARGEBACK_FILTER.IssuedDate:
              newKey = '';
              break;
            case CHARGEBACK_FILTER.DueDate:
              newKey = FILTER_HEADERS.DueDate;
              break;
            default:
              newKey = date_cloumn?.HeaderColumn;
          }
          /*filterPayload = [
            { HeaderColumn: `${newKey}${startDateName}`, Name: `"${startDate}"` },
            { HeaderColumn: `${newKey}${endDateName}`, Name: `"${endDate}"` },
          ];*/

          filterPayload = filterPayload.filter(
            (item: any) => item.HeaderColumn != date_cloumn?.HeaderColumn,
          );
          let startDateValue = startDate;
          let endDateValue = endDate;
          // if ([FILTER_HEADERS.Updated, HEADER_COLUMN.DUE_DATE, ""]?.includes(newKey)) {
          //   startDateValue = `${startDate}`;
          //   endDateValue = `${endDate}`;
          // }
          if (!endDateValue) {
            filterPayload = [
              ...filterPayload,
              {
                HeaderColumn: `${newKey}${startDateName}`,
                Name: startDateValue,
              },
              { HeaderColumn: `${newKey}${endDateName}`, Name: startDateValue },
            ];
          } else {
            filterPayload = [
              ...filterPayload,
              {
                HeaderColumn: `${newKey}${startDateName}`,
                Name: startDateValue,
              },
              { HeaderColumn: `${newKey}${endDateName}`, Name: endDateValue },
            ];
          }
        } else if (
          date_cloumn.HeaderColumn === HEADER_COLUMN.SUBSCRIBER_CARD_EXP
        ) {
          filterPayload = [
            ...filterPayload,
            { HeaderColumn: startDateName, Name: startDate },
          ];
        } else if (
          date_cloumn.HeaderColumn === HEADER_COLUMN.SUBSCRIBER_CARD_EXP ||
          (date_cloumn.HeaderColumn === HEADER_COLUMN.HOLIDAY_DATE &&
            currentScreen == SIDE_MENU_TABS.HOLIDAY)
        ) {
          filterPayload = [
            ...filterPayload,
            { HeaderColumn: startDateName, Name: startDate },
          ];
        } else {
          filterPayload = [
            ...filterPayload,
            { HeaderColumn: startDateName, Name: startDate },
            { HeaderColumn: endDateName, Name: endDate },
          ];
        }
      }
    }

    for (let index in filterPayload) {
      if (filterPayload[index].Name !== '') {
        let filterSelectedValue = filterPayload[index].Name;
        if (
          [HEADER_COLUMN.STATEMENT_ID, HEADER_COLUMN.HOLIDAY].includes(
            filterPayload[index].HeaderColumn,
          )
        ) {
          filterSelectedValue = `"${filterSelectedValue}"`;
          filter = `${filter}&${filterPayload[index].HeaderColumn}=${filterSelectedValue}`;
        } 
        else if (
          ["RuleType"].includes(
            filterPayload[index].HeaderColumn,
          )
        ) {
          filter = `${filter}&ruleType=${filterSelectedValue}`;
        } 
        else if (
          ["IsActive"].includes(
            filterPayload[index].HeaderColumn,
          )
        ) {
          filter = `${filter}&isActive=${filterSelectedValue}`;
        } 
        else if (
          [HEADER_COLUMN.SUBSCRIBER_CARD_EXP].includes(
            filterPayload[index].HeaderColumn,
          )
        ) {
          filter = `${filter}&${filterPayload[index].HeaderColumn
            }=${filterDateFormatterNoTimeZone(
              new Date(filterSelectedValue),
              MONTH_FORMAT,
            )}`;
        } else if (filterPayload[index].HeaderColumn === 'ctcFirstName') {
          const trimmedContactPersonPayload =
            trimToSingleSpace(filterSelectedValue);
          const isSingleWord =
            trimmedContactPersonPayload.split(' ')?.length > 1 ? false : true;
          let contactPersonPayload = '';
          if (isSingleWord) {
            contactPersonPayload = `${filterPayload[index].HeaderColumn}=${trimmedContactPersonPayload}`;
          } else {
            const [ctcFirstName, ...rest] =
              trimmedContactPersonPayload?.split(' ');
            contactPersonPayload = `${filterPayload[index].HeaderColumn}=${ctcFirstName}&ctcLastName=${rest}`;
          }
          filter = `${filter}&${contactPersonPayload}`;
        } else if (filterPayload[index].HeaderColumn === 'LegalNameInEnglish') {
          const emcodedLegalNameInEnglish =
            encodeURIComponent(filterSelectedValue);
          filter = `${filter}&${filterPayload[index].HeaderColumn}=${emcodedLegalNameInEnglish}`;
        }

        else if (
          [HEADER_COLUMN.HOLIDAY_DATE].includes(
            filterPayload[index].HeaderColumn,
          ) &&
          currentScreen == SIDE_MENU_TABS.HOLIDAY
        ) {
          const startMonth = `${(getMonth(filterSelectedValue[0]) + 1)
            .toString()
            .padStart(2, '0')}/${getYear(filterSelectedValue[0])}`;
          const endMonth = `${(getMonth(filterSelectedValue[1]) + 1)
            .toString()
            .padStart(2, '0')}/${getYear(filterSelectedValue[1])}`;
          if (filterSelectedValue[1]) {
            filter = `${filter}&HolidayStartMonthDate=${startMonth}&HolidayEndMonthDate=${endMonth}`;
          } else {
            filter = `${filter}&HolidayStartMonthDate=${startMonth}&HolidayEndMonthDate=${startMonth}`;
          }
        } else {
          filter = `${filter}&${filterPayload[index].HeaderColumn}=${filterSelectedValue}`;
        }
      }
    }
    let emptyFilterPayload = filterPayload?.find(
      (item: any) =>
        item.HeaderColumn === '' ||
        item.Name === '' ||
        (Array.isArray(item.Name) &&
          item.Name.every((val: any) => val === null)),
    );
    if (emptyFilterPayload) {
      DasSnackbar.error(t('API_STATUS_MESSAGE.' + 'ADD_NEW_FILTER_ERROR'));
    } else {
      if (dynamicFilter) {
        dispatch(userFilter(filter));
      }
      setDisableRequestDownloadButton && setDisableRequestDownloadButton(false);
      setOpen(false);
    }
    if (
      currentScreen === FILTER_POPOP_OF.PRODUCT_INFO_ON_MERCHANT_DETAILS &&
      filterData[0].Name !== ''
    ) {
      let filteredDasMid = filter?.split('=')[1]?.split(',');
      dispatch(setFilteredDASMID(filteredDasMid));
      // dispatch(
      //   setMerchantDetailsProductList(
      //     productInfo?.filter((item: any) => filteredProductList?.includes(item.DASMID))
      //   ),
      // );
    }
  };

  const addNewFilterRule = (ind: any) => {
    setDisableRequestDownloadButton && setDisableRequestDownloadButton(true);
    if (filterData[ind].HeaderColumn !== '' && filterData[ind].Name !== '') {
      setFilterData([...filterData, { HeaderColumn: '', Name: '' }]);
    } else {
      DasSnackbar.error(t('API_STATUS_MESSAGE.' + 'ADD_NEW_FILTER_ERROR'));
    }
  };

  const handleRemoveClick = (index: any) => {
    setDisableRequestDownloadButton && setDisableRequestDownloadButton(true);
    setDisableApplyButton && setDisableApplyButton(false);
    let filterItems = [...filterData];
    let newFilterItems = filterItems.filter(
      (item: any, i) => i !== index && item,
    );
    setFilterData([...newFilterItems]);
    setAnchorEl(anchorEl);
  };
  const { initialFilter } = useSelector((store: any) => store.config);

  useEffect(() => {
    const totalFilters = filterData?.filter(
      (item: any) => item.HeaderColumn && item.Name,
    )?.length;
    setCount(totalFilters);
    if (filterData.length === 0 && initialFilterData?.length === 0) {
      if (!legacy && ns === View_Name_Space.TRANSACTION && initialFilter) {
        setFilterData([
          {
            HeaderColumn: 'Date',
            Name: [startOfDay(subDays(new Date(), 6)), endOfDay(new Date())],
          },
        ]);
      } else {
        setFilterData([{ HeaderColumn: '', Name: '' }]);
      }
    } else {
      return;
    }
  }, [filterData]);

  const handleResetFilter = () => {
    setInitialFilterData && setInitialFilterData([]);
    setFilterData([{ HeaderColumn: '', Name: '' }]);
    setCount(0);
    dispatch(resetFilter());
    setDisableRequestDownloadButton && setDisableRequestDownloadButton(true);
    if (currentScreen === FILTER_POPOP_OF.PRODUCT_INFO_ON_MERCHANT_DETAILS) {
      // dispatch(
      //   setMerchantDetailsProductList(merchantDetailsProductInfo?.Products),
      // );
      dispatch(setFilteredDASMID([]));
    }
    setOpen(false);
  };

  const props = {
    filterData,
    FilterPopupData,
    getFilterProps,
    onHandleChange,
    dateFormat,
    showMonthYearPicker,
    ReleasedPastFutureDate,
    handleRemoveClick,
    headerName,
    addNewFilterRule,
    handleResetFilter,
    handleApplyFilter,
    disableApplyButton,
    setDisableApplyButton,
    ns,
  };
  if (removePopper) {
    return (
      <div className="transaction-download-form">
        <FitlerBox {...props} />
      </div>
    );
  } else {
    return (
      <div>
        <Tooltip
          className="tooltip-menu"
          title={t('FilterPopup.button.Filter')}
          placement="left"
          arrow
        >
          <Button
            className="download-csv-button filter-btn"
            aria-describedby={id}
            onClick={applyFilterFunction}
          >
            <FilterAltOutlinedIcon />
            <div className="badge">{count}</div>
          </Button>
        </Tooltip>
        <Popper
          id={id}
          open={open}
          anchorEl={anchorEl}
          transition
          className={`${popupClassName} popover-box`}
        >
          {({ TransitionProps }: any) => (
            <Fade
              {...TransitionProps}
              timeout={350}
              className="popover-box-div"
            >
              <Box sx={{ bgcolor: 'background.paper' }}>
                <form>
                  <h3>
                    {ADVANCED_FITLER}
                    <Button
                      className="close-filter"
                      onClick={() => setOpen(false)}
                    >
                      <CloseIcon />
                    </Button>
                  </h3>
                  <FitlerBox {...props} />
                </form>
              </Box>
            </Fade>
          )}
        </Popper>
      </div>
    );
  }
};
export default FilterPopup;
