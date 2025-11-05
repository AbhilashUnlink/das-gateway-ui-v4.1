import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  FILTER_INPUT_TYPES,
  FILTER_POPOP_OF,
  HAS_3DS_TYPE,
  HEADER_COLUMN,
  SIDE_MENU_TABS,
  STATUS,
  SUBSCRIPTION_STATUS,
  SUBSCRIPTION_STATUS_LABELS,
  View_Name_Space,
} from './constants/filter-constants';
import { NewFilterBox } from './NewFilterBox';
import { CHARGE_BACK_TYPE } from 'config/common/charge-back-types';
import countries from 'config/common/countries';
import {
  CARD_TYPE,
  INTEGRATION_TYPE,
  TRANSACTION_PAYMENT_TYPE,
  TRANSACTION_TYPE,
} from 'pages/transaction/components/constants/transaction';
import Currency from 'config/common/currency';
import { ProductTypes } from 'config/common/product-types';
import MCC from './config/mcc';
import PRODUCT_TYPE from './constants/products';
import timezone from './config/timezone';
import {
  RECON_TYPE,
  STATEMENT_STATUS_FILTER,
  STATEMENT_WHITELISTED_STATUS,
  WIRED_TYPE,
} from 'pages/statements/components/merchant-statement/constants/statement-status';
import { REGESTRATION_TYPE } from 'components/constants/sales-lead';
import { BILLING_CYCLE } from 'config/common/billingCycle';
import useLegacy from 'hooks/use-legacy/useLegacy';
import { hasAccess } from 'utils/has-access';
import { USER_ACCESS_ROLE } from 'pages/merchants/merchant-view/components/merchant-details/constants/merchantDetails';
import useEntity from 'hooks/use-entity/useEntity';
import { useDispatch, useSelector } from 'react-redux';
import {
  allReasonCodes,
} from 'store/features/gateway-config';
import { userFilter } from 'store/features/filter';
import { setFilterPayload } from 'store/features/filter';
import { customSort, getFilterRequest, objectToBase64 } from 'utils/helper';
import { OPERATORS_VALUE } from './filterOptions';
import useGetMerchantList from 'hooks/use-get-merchant-list/useGetMerchantList';
import { useNavigate } from 'react-router';
import "./style.css";

export const NewFilterPopup = ({
  columns,
  count = 0,
  setCount,
  ns,
  currentScreen,
  multiFilter,
  filteredObject = null,
}: any) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const canBeOpen = open && Boolean(anchorEl);
  const id = canBeOpen ? 'transition-popper' : undefined;
  const [filters, setFilters] = useState<any>(null);
  const [allFilters, setAllFilters] = useState<any>([]);
  const [fieldOptions, setFieldOptions] = useState<any>([]);
  const [selectedFilter, setSelectedFilter] = useState<any>('AND');
  const { entityOptions } = useEntity();
  const AllSchemeReasonCodeList = useSelector(allReasonCodes);
  const INTERNAL = hasAccess(
    'LEGAL_NAME_IN_ENGLISH_COLUMN_IN_TRANSACTIONS_TAB',
  );
  const legacy = useLegacy();

  const { dasmidOptions } = useGetMerchantList();

  const { merchantDetailsProductList } = useSelector(
    (store: any) => store?.merchant,
  );

  const dasmidOptionsList = dasmidOptions;

  // const dasmidOptionsList = useSelector(
  //   (store: any) => store.config.dasmidOptions,
  // );
  const merchantDetailsDASMIDList = merchantDetailsProductList?.map(
    (item: any) => item.DASMID,
  );
  const { drawer } = useSelector((store: any) => store?.drawer);
  let subscriptionPlanCurrency = drawer[0]?.data?.TransactionCCY;
  const { salesLeadFilterMerchantData, merchantData } = useSelector((store: any) => store?.config);
  const AcquirerMIDOptions = useSelector(
    (store: any) => store?.acquirerDetails?.AcquirerMIDOptions,
  );

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
    ],
  ];

  useEffect(() => {
    if (allFilters?.length === 0 && filteredObject != null) {
      const filtered = filteredObject.filter((item: any) =>
        item.field && item.operator && item.value
      );
      const operandsOnly = filteredObject.find((item: any) =>
        Object.keys(item).length === 1 && item.operand
      );
      setSelectedFilter(operandsOnly?.operand ?? 'AND');
      setAllFilters(filtered);
      setCount(filtered?.length);
    }
  }, [filteredObject]);

  useEffect(() => {
    const op = columns.reduce((c: any, i: any) => {
      if (
        !REDUCED_HEADER_COLUMNS.includes(i.headerName) &&
        (i.visible == undefined || i.visible == true)
      ) {
        const columnName = i.headerName?.split('/');
        const multiple = multiFilter.includes(i.field ?? false);
        return [
          ...c,
          {
            label: columnName[0],
            value: i.field,
            type: i.type,
            options: [],
            multiple,
          },
        ];
      } else {
        return c;
      }
    }, []);
    setFieldOptions(op);
  }, [columns]);

  const applyFilterFunction = (event: any) => {
    if ([FILTER_POPOP_OF.ACQUIRER_MID_DETAIL_TABLE].includes(currentScreen)) {
      handleResetFilter();
    }
    setAnchorEl(event.currentTarget);
    setOpen(previousOpen => !previousOpen);
    dispatch(userFilter(''));
    setFilters({
      field: null,
      operator: null,
      value: '',
      fieldLabel: null,
      operatorLabel: null,
      valueLabel: '',
      id: '',
      selectFilterType: 'text',
    });
    // ns === View_Name_Space.TRANSACTION &&  setFilters({ HeaderColumn: '', Operators:'', Name: '' });
  };

  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();
      if (filters?.value?.length > 0) {
        handlePlusClick(); // Example: Apply filter on Enter
      }
    } else if (e.key === 'Backspace') {
      handleBackClick(); // Example: Handle backspace logic
    }
  };
  const handlePlusClick = () => {
    if (filters?.id) {
      const temp = allFilters?.map((item: any) => {
        if (item.id === filters?.id) {
          return filters;
        } else {
          return item;
        }
      });
      setAllFilters(temp);
    } else {
      setAllFilters((prev: any) => {
        return [...prev, { ...filters, id: new Date().getTime(), ...(allFilters?.length >= 1 && { operand: selectedFilter }) }];
      });
      setCount(allFilters?.length + 1);
    }
    setFilters({
      field: null,
      operator: null,
      value: '',
      fieldLabel: null,
      operatorLabel: null,
      valueLabel: '',
      id: '',
      selectFilterType: 'text',
    });
  };

  const handleField = () => {
    setFilters({
      ...filters,
      field: null,
      operator: null,
      value: '',
      fieldLabel: null,
      operatorLabel: null,
      valueLabel: '',
      selectFilterType: 'text',
    });
  };
  const handleOperator = () => {
    setFilters({
      ...filters,
      operator: null,
      operatorLabel: null,
    });
  };
  const handleBackClick = () => {
    if (filters.value && filters?.operator == 'isnull' || filters?.operator == 'notnull') {
      setFilters({
        ...filters,
        field: filters.field,
        operator: null,
        value: '',
        fieldLabel: filters.fieldLabel,
        operatorLabel: null,
        valueLabel: '',
      });
    } else if (filters.value && (filters.selectFilterType !== FILTER_INPUT_TYPES.NUMBER && filters.selectFilterType !== FILTER_INPUT_TYPES.TEXT)) {
      setFilters({
        ...filters,
        field: filters.field,
        value: '',
        fieldLabel: filters.fieldLabel,
        valueLabel: '',
      });
    } else if (filters?.value1 && !filters?.value?.[1]) {
      setFilters({
        ...filters,
        value: '',
        valueLabel: '',
      });
      document.getElementById('value1-input')?.focus();
    }
    else if (!filters.value && filters?.operator) {
      setFilters({
        ...filters,
        field: filters.field,
        operator: null,
        value: '',
        fieldLabel: filters.fieldLabel,
        operatorLabel: null,
        valueLabel: '',
      });
    } else if (!filters.value && !filters?.operator) {
      setFilters({
        ...filters,
        field: null,
        operator: null,
        value: '',
        fieldLabel: null,
        operatorLabel: null,
        valueLabel: '',
      });
    }
  };

  const handleChange = (
    name: any,
    value: any,
    label: any,
    filterType: string,
  ) => {
    const keyName = `${name}Label`;
    setFilters((prev: any) => {
      return {
        ...prev,
        [name]: value,
        [keyName]: label,
        ...((value == OPERATORS_VALUE.IS_NULL || value == OPERATORS_VALUE.IS_NOT_NULL) && { 'value': 'N/A', 'valueLabel': 'N/A' }),
        ...(filterType && { selectFilterType: filterType }),
      };
    });
  };

  const handleRemove = (ind: number) => {
    setCount(allFilters?.length - 1);
    setAllFilters(allFilters.filter((_: any, i: number) => i !== ind));
  };

  const handleResetFilter = () => {
    setCount(0);
    setFilters(null);
    setAllFilters([]);
    const body = {
      filter: [],
      // operand:'',
    };
    dispatch(setFilterPayload(body));
    navigate(`/transactions`);
    dispatch(userFilter(''));
  };


  const handleApplyFilter = () => {
    let filterReq: any = null;
    let base64String;
    if (filters?.field && filters?.operator && filters?.value) {
      if (filters?.id) {
        const temp = allFilters?.map((item: any) => {
          if (item.id === filters?.id) {
            return filters;
          } else {
            return item;
          }
        });
        filterReq = temp?.map((item: any) => {
          return getFilterRequest(item);
        });
        setAllFilters(temp);
        base64String = objectToBase64(temp);
      } else {
        filterReq = [...allFilters, { ...filters, ...(allFilters?.length >= 1 && { operand: selectedFilter }) }]?.map((item: any) => {
          return getFilterRequest(item);
        });
        setAllFilters([...allFilters, { ...filters, id: new Date().getTime(), ...(allFilters?.length >= 1 && { operand: selectedFilter }) }]);
        setCount(allFilters?.length + 1);
        base64String = objectToBase64([...allFilters, { ...filters, ...(allFilters?.length >= 1 && { operand: selectedFilter }) }]);
      }

      setFilters({
        field: null,
        operator: null,
        value: '',
        fieldLabel: null,
        operatorLabel: null,
        valueLabel: '',
        id: '',
        selectFilterType: 'text',
      });

    } else {
      filterReq = allFilters?.map((item: any) => {
        return getFilterRequest(item);
      });
      base64String = objectToBase64(allFilters);
    }
    navigate(
      `/transactions?filter=${base64String}`,
    );
    const body = {
      filter: filterReq.flat(),
      // operand:selectedFilter,
    };
    dispatch(setFilterPayload(body));
    setOpen(false);
  };

  const handleEditChip = (filter: any) => {
    // setOpen(false);
    setFilters(filter);
  };

  const handleSelectFilter = (filterType: string) => {
    setSelectedFilter(filterType);
  };

  const getOptions = (field: string) => {
    if (
      field === HEADER_COLUMN.COUNTRY ||
      field === HEADER_COLUMN.COUNTRY_ID ||
      field === HEADER_COLUMN.CTC_COUNTRY ||
      field === HEADER_COLUMN.COUNTRY_CODE ||
      field === HEADER_COLUMN.BUSINESS_LOCATION ||
      field === HEADER_COLUMN.BILLING_COUNTRY
    ) {
      if (currentScreen === SIDE_MENU_TABS.HOLIDAY) {
        return entityOptions;
      } else {
        return countries?.map(({ name, value }) => {
          return { headerName: name, value };
        });
      }
    }

    if (field === HEADER_COLUMN.CASE_TYPE) {
      return Object.keys(CHARGE_BACK_TYPE).map(type => {
        return { headerName: CHARGE_BACK_TYPE[type], value: type };
      });
    }

    if (field === HEADER_COLUMN.REASON_CODE) {
      return AllSchemeReasonCodeList?.map((data: any) => {
        const value = data.value;
        return {
          headerName: data.label,
          value: value.replaceAll(' ', '%20'),
        };
      });
    }

    if (field?.toLowerCase() === HEADER_COLUMN.STATUS) {
      const STATUS_COLUMN: any = STATUS[ns];
      return Object.keys(STATUS_COLUMN).map(status => {
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
        } else if (ns === View_Name_Space.HASH_CARD_NUMBER) {
          return {
            headerName: STATUS.HASH_CARD_STATUS[status],
            value: STATUS_COLUMN[status],
          };
        } else {
          let statusItem = { headerName: status, value: status };
          return statusItem;
        }
      });
    }

    if (field === HEADER_COLUMN.PARTNER_ISACTIVE) {
      const STATUS_COLUMN: any = STATUS[ns];
      if (ns === View_Name_Space.SUBSCRIPTION) {
        return Object.keys(STATUS_COLUMN).map(status => {
          let statusItem = {
            headerName: t(`SUBSCRIPTION_STATUS.${status}`),
            value: STATUS_COLUMN[status],
          };
          return statusItem;
        });
      } else if (ns === View_Name_Space.PARTNER) {
        return Object.keys(STATUS_COLUMN).map(status => {
          let statusItem = {
            headerName: STATUS.PARTNER_STATUS[status],
            value: STATUS_COLUMN[status],
          };
          return statusItem;
        });
      }
    }

    if (
      field === HEADER_COLUMN.ACQUIRER ||
      field === HEADER_COLUMN.ACQUIRER_CODE
    ) {
      return localStorage.getItem('acquirerCode')
        ? localStorage
          .getItem('acquirerCode')
          ?.split(',')
          ?.map((i: string) => {
            return { headerName: i, value: i };
          })
        : [];
    }

    if (field === HEADER_COLUMN.TRANSACTION_TYPE) {
      return Object.keys(TRANSACTION_TYPE).map((type: any) => {
        let statusItem = {
          headerName: TRANSACTION_TYPE[type].toUpperCase(),
          value: type,
        };
        return statusItem;
      });
    }

    if (field === HEADER_COLUMN.INTEGRATION_TYPE) {
      return Object.keys(INTEGRATION_TYPE).map((type: any) => {
        let statusItem = {
          headerName: INTEGRATION_TYPE[type].toUpperCase(),
          value: type,
        };
        return statusItem;
      });
    }

    if (field === HEADER_COLUMN.CURRENCY_CODE) {
      return Currency?.map(({ value }: any) => {
        let currencyItem = { headerName: value, value };
        return currencyItem;
      });
    }
    if (field === HEADER_COLUMN.PAYMENT_TYPE) {
      return TRANSACTION_PAYMENT_TYPE?.map(({ label, value }: any) => {
        return { headerName: label, value };
      });
    }

    if (field === HEADER_COLUMN.PRODUCT_TYPE || field === HEADER_COLUMN.TYPE) {
      return ProductTypes?.map(({ value }: any) => {
        return { headerName: value, value };
      });
    }

    if (field === HEADER_COLUMN.SCHEME) {
      return Object.keys(CARD_TYPE).map((type: any) => {
        let schema = {
          headerName: CARD_TYPE[type].toUpperCase(),
          value: type,
        };
        return schema;
      });
    }

    if (field === HEADER_COLUMN.MCC) {
      return MCC?.map((item: any) => {
        let mccItem = { headerName: item.d, value: item.value };
        return mccItem;
      });
    }

    if (field === HEADER_COLUMN.TYPE && ns === View_Name_Space.PRODUCTS) {
      return Object.keys(PRODUCT_TYPE).map(type => {
        let productItem = { label: PRODUCT_TYPE[type], value: type };
        return productItem;
      });
    }
    if (field === HEADER_COLUMN.TIME_ZOME) {
      return timezone?.map(({ label, value }: any) => {
        let timeZoneObj = { label, value };
        return timeZoneObj;
      });
    }

    if (field === HEADER_COLUMN.RECON_STATUS) {
      return Object.values(RECON_TYPE).map((type: any) => {
        return { headerName: type, value: type };
      });
    }

    if (field === HEADER_COLUMN.STATEMENT_STATUS) {
      return STATEMENT_STATUS_FILTER(INTERNAL).map((type: any) => {
        return { headerName: type.label, value: type.value };
      });
    }

    if (field === HEADER_COLUMN.WIRED_STATUS) {
      return Object.keys(WIRED_TYPE).map((type: any) => {
        return { headerName: WIRED_TYPE[type], value: type };
      });
    }

    if (field === HEADER_COLUMN.WIRED_STATUS) {
      return Object.keys(WIRED_TYPE).map((type: any) => {
        return { headerName: WIRED_TYPE[type], value: type };
      });
    }

    if (field === HEADER_COLUMN.STATEMENT_WHITELISTED) {
      return STATEMENT_WHITELISTED_STATUS.map((type: any) => {
        return { headerName: type.label, value: type.value };
      });
    }

    if (field === HEADER_COLUMN.REGISTRATION_TYPE) {
      return Object.keys(REGESTRATION_TYPE).map((type: any) => {
        return { headerName: REGESTRATION_TYPE[type], value: type };
      });
    }

    if (field === HEADER_COLUMN.HAS_3DS) {
      return Object.keys(HAS_3DS_TYPE).map((type: any) => {
        return { headerName: HAS_3DS_TYPE[type], value: type };
      });
    }

    if (field === HEADER_COLUMN.BILLING_CYCLE_TYPE) {
      return BILLING_CYCLE.map((type: any) => {
        return { headerName: type.label, value: type.value };
      });
    }

    if (
      field === HEADER_COLUMN.CCY ||
      field === HEADER_COLUMN.SUBSCRIPTION_PLAN_CCY
    ) {
      return subscriptionPlanCurrency?.map((item: any) => {
        return { headerName: item, value: item };
      });
    }

    if (field === HEADER_COLUMN.DASMID || field === HEADER_COLUMN.DAS_MID) {
      let dasmidOptions: any = dasmidOptionsList;
      if (legacy) {
        dasmidOptions = localStorage.getItem('v2DasmidOptions')
          ? localStorage.getItem('v2DasmidOptions')?.split(',')
          : [];
      }
      return currentScreen === FILTER_POPOP_OF.PRODUCT_INFO_ON_MERCHANT_DETAILS
        ? merchantDetailsDASMIDList
        : dasmidOptions?.map((i: string) => {
          return { headerName: i, value: i };
        });
    }

    if (
      field === HEADER_COLUMN.LEGAL_NAME ||
      field === HEADER_COLUMN.COMPANY_NAME
    ) {
      const salesLeadMerchant = salesLeadFilterMerchantData?.map(({ business }: any) => {
        return business?.companyName;
      });

      const seen = new Set();
      const options = merchantData ?
        merchantData?.filter((item: any) => !seen?.has(item?.MerchantID) && seen?.add(item?.MerchantID))?.map((item: any, index: any) => ({
          key: index,
          headerName: `${item?.LegalName} (${item?.MerchantID})`,
          value: item?.MerchantID,
          showValue: `${item?.LegalName} (${item?.MerchantID})`
        })) : [];

      const legalNamesOptions = ns == View_Name_Space.SALESLEAD
        ? salesLeadMerchant ? customSort(salesLeadMerchant) : []
        : options;
      return legalNamesOptions;
    }

    if (field === HEADER_COLUMN.ACQUIRER_MID) {
      const acquirerMIDData = localStorage.getItem('acquirerMIDData')
        ? localStorage
          .getItem('acquirerMIDData')
          ?.split(',')
          ?.map((i: string) => {
            return { headerName: i, value: i };
          })
        : [];
      return currentScreen === FILTER_POPOP_OF.ACQUIRER_MID_DETAIL_TABLE
        ? AcquirerMIDOptions
        : acquirerMIDData;
    }

    if (
      field === HEADER_COLUMN.SUBSCRIPTION_STATUS ||
      field === HEADER_COLUMN.SUBSCRIBER_STATUS
    ) {
      return Object.keys(SUBSCRIPTION_STATUS).map((type: any) => {
        return { headerName: SUBSCRIPTION_STATUS[type], value: type };
      });
    }

    if (field === HEADER_COLUMN.ACCESS_LEVEL) {
      return USER_ACCESS_ROLE.map((type: any) => {
        return { headerName: type.label, value: type.value };
      });
    }
    // if (items_label === TRANSLATED_VALUE) {
    // }

    // if (items_label === OPERATOR_FIELD){
    // }
    // amount subsidiary id
    // if (
    //   field === HEADER_COLUMN.SUBSCRIBER_CARD_EXP ||
    //   (ns === View_Name_Space.PUBLIC_HOLIDAY && field === HEADER_COLUMN.HOLIDAY_DATE) ||
    //   (ns === View_Name_Space.STATEMENTS && field === HEADER_COLUMN.DATE) ||
    //   (currentScreen === "StatementTransactions" && field === HEADER_COLUMN.DATE) ||
    //   (currentScreen === "StatementTransactions" && field === HEADER_COLUMN.UPDATED_DATE) ||
    //   field === HEADER_COLUMN.CREATED_AT ||
    //   field === HEADER_COLUMN.ISSUED_DATE ||
    //   field === HEADER_COLUMN.DUE_DATE ||
    //   field === HEADER_COLUMN.RELEASED_DATE ||
    //   field === HEADER_COLUMN.PAYOUT_DATE ||
    //   field === HEADER_COLUMN.TRANSACTION_START_DATE ||
    //   field === HEADER_COLUMN.TRANSACTION_END_DATE ||
    //   field === HEADER_COLUMN.SALESLEAD_CREATED_AT ||
    //   field === HEADER_COLUMN.SUBSCRIPTION_STARTS_AT ||
    //   field === HEADER_COLUMN.SUBSCRIPTION_ENDS_AT ||
    //   field === HEADER_COLUMN.NEXT_PAYMENT_DATE
    // )

    // if (
    //   (ns === View_Name_Space.TRANSACTION && field === HEADER_COLUMN.DATE) ||
    //   filterData[i]?.HeaderColumn === HEADER_COLUMN.UPDATED_DATE
    // )

    // if (
    //   field === HEADER_COLUMN.ROLLING_RESERVE_HELD ||
    //   field === HEADER_COLUMN.ROLLING_RESERVE_RELEASED ||
    //   field ===
    //   HEADER_COLUMN.FIXED_DEPOSITE_HELD_YTD_AMOUNT ||
    //   field === HEADER_COLUMN.ADJUSTMENTS_AMOUNT ||
    //   field === HEADER_COLUMN.NET_SALES ||
    //   field === HEADER_COLUMN.TOTAL_FEES
    // )

    // if (
    //   field === HEADER_COLUMN.AMOUNT ||
    //   field === HEADER_COLUMN.DISPUTE_AMOUNT ||
    //   field === HEADER_COLUMN.COMPLETED_PAYMENT_CYCLE ||
    //   field === HEADER_COLUMN.SUBSCRIPTION_PLAN_AMOUNT
    // )

    return [];
  };

  return (
    <div>
      <NewFilterBox
        filters={filters}
        handleKeyDown={handleKeyDown}
        handleChange={handleChange}
        handlePlusClick={handlePlusClick}
        options={fieldOptions ?? []}
        allFilters={allFilters}
        handleRemove={handleRemove}
        handleResetFilter={handleResetFilter}
        handleApplyFilter={handleApplyFilter}
        handleSelectFilter={handleSelectFilter}
        selectedFilter={selectedFilter}
        getOptions={getOptions}
        ns={ns}
        handleEditChip={handleEditChip}
        handleBackClick={handleBackClick}
        handleOperator={handleOperator}
        handleField={handleField}
      />
      {/* <Tooltip
        className="tooltip-menu"
        title={t('FilterPopup.button.NextGenFilter')}
        placement="left"
        arrow
      >
        <Button
          className="download-csv-button filter-btn nx-gen-filter-btn"
          aria-describedby={id}
          onClick={applyFilterFunction}
        >
          <TuneIcon />
          <div className="badge">{count}</div>
        </Button>
      </Tooltip>
      <Popper
        id={id}
        open={open}
        anchorEl={anchorEl}
        transition
        className={`popover-box`}
      >
        {({ TransitionProps }: any) => (
          <Fade {...TransitionProps} timeout={350} className="popover-box-div">
            <Box sx={{ bgcolor: 'background.paper' }}>
              <form>
                <h3>
                  {t('Filter.AdvancedNextGenFilters')}
                  <Button
                    className="close-filter"
                    onClick={() => setOpen(false)}
                  >
                    <CloseIcon />
                  </Button>
                </h3>
                <NewFilterBox
                  filters={filters}
                  handleKeyDown={handleKeyDown}
                  handleChange={handleChange}
                  handlePlusClick={handlePlusClick}
                  options={fieldOptions ?? []}
                  allFilters={allFilters}
                  handleRemove={handleRemove}
                  handleResetFilter={handleResetFilter}
                  handleApplyFilter={handleApplyFilter}
                  handleSelectFilter={handleSelectFilter}
                  selectedFilter={selectedFilter}
                  getOptions={getOptions}
                  ns={ns}
                  handleEditChip={handleEditChip}
                  handleBackClick={handleBackClick}
                  handleOperator={handleOperator}
                  handleField={handleField}
                />
              </form>
            </Box>
          </Fade>
        )}
      </Popper> */}
    </div>
  );
};
