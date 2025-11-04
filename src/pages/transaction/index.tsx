/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import Loader from '../../components/loader';
import { useEffect, useMemo, useState, useRef } from 'react';
import { base64ToObject, getAmount, getFilterRequest, getInitialRowCount, uuidTestRegexExp } from '../../utils/helper';
import { useDispatch, useSelector } from 'react-redux';
import './components/style.css';
import { GET_PARAMS } from './components/constants/params';
import useGetParameter from '../../hooks/router/useGetParameter';
import { getDetails, getRefundCapture } from '../../store/features/details';
import SyncIcon from '@mui/icons-material/Sync';
// import { InfoOutlined } from '@mui/icons-material';
import { fetchTransactionStats, getTransactionTable, loadingTransactionRows, postTransactionTable } from '../../store/features/transaction-table';
import TooltipDasButton from './components/buttons/TootlipDasButton';
import { TRANSACTION } from '../../components/constants/api-paths';
import useDynamicTitle from '../../hooks/dynamic-title/useDynamicTitle';
import { hasAccess } from '../../utils/has-access';
import { columns } from './components/table/schema/TransactionTableSchema';
import TransactionTable from './components/table/TransactionTable';
// import AppTour from '../../welcome-tour/AppTour';
// import tourConfig from '../../welcome-tour/config';
import { TRANSACTION_CAPTURE, TRANSACTION_DETAILS, TRANSACTION_REFUND } from './components/constants/url';
import { DRAWER_TYPE } from '../../components/constants/drawer';
import { useTranslation } from 'react-i18next';
import { disputeManagementTableData } from '../../store/features/dispute-management-table.redux';
import NewColumnPreference from './components/additional-columns/NewColumnPreference';
import DetailsItemValue from '../../components/skeletons/DetailsItemValue';
import useDateFormatter from '../../hooks/date-preference/useDateFormatter';
import DasDrawer from 'components/das-drawer/DasDrawer';

// const DasDrawer = lazy(
//   () =>
//     import(
//       '../../components/das-drawer/DasDrawer' 
//     ),
// );

const Transactions = () => {
  const timeZone = localStorage.getItem("timeZone") || "Asia/Calcutta";
  useDynamicTitle();
  const screenHeightOtherThanTableHeight = 250;
  const initialRowCount = useMemo(() => getInitialRowCount(screenHeightOtherThanTableHeight), [screenHeightOtherThanTableHeight]);
  const [take, setTake] = useState(() => initialRowCount);
  const [skip, setSkip] = useState(0);
  const filterQuery = useGetParameter('filter');
  const filterOperand = useGetParameter('operand');
  const decodedObject = filterQuery && base64ToObject(filterQuery);
  const filter = useSelector((store: any) => store.filter.filter);
  const nextGenFilter = useSelector((store: any) => store.filter.filterPayload);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { drawer } = useSelector((store: any) => store.drawer);
  const queryId = useGetParameter(GET_PARAMS.uuid);
  const path = filter ? TRANSACTION.TABLE_API : TRANSACTION.TABLE_API_V2;
  const [openTour, setOpentour] = useState(false);
  const { transactionState } = useSelector((store: any) => store.transactionTable);
  const loadingTransactionStats = useSelector((store: any) => store.transactionTable.loading);
  const isInitialRender = useRef(true);

  const drawerType = useGetParameter(GET_PARAMS.drawer);
  useEffect(() => {
    if (queryId) {
      if (uuidTestRegexExp.test(queryId)) {
        if (drawerType === TRANSACTION_DETAILS) {
          dispatch(getDetails({ uuid: queryId, openDrawer: true }));
        }
        if (drawerType === TRANSACTION_REFUND) {
          dispatch(getRefundCapture({ uuid: queryId, type: DRAWER_TYPE.REFUND }));
        }
        if (drawerType === TRANSACTION_CAPTURE) {
          dispatch(getRefundCapture({ uuid: queryId, type: DRAWER_TYPE.CAPTURE }));
        }
      } else {
        window.history.pushState({ id: '50' }, '', window.location.href);
      }
    }
  }, []);

  const handleTour = () => {
    if (localStorage.getItem("reactTourFinsihed")) {
      setOpentour(false);
    }
    else {
      setOpentour(true);
    }
  };

  useEffect(() => {
    handleTour();
  }, []);

  const onLetsGoClick = () => {
    localStorage.setItem("reactTourFinsihed", "true");
    setOpentour(false);
  };


  const tableApiEndPoint = `${path}?take=${take}&skip=${skip}${filter}&TimeZone=${timeZone}`;

  const postTable = () => {
    const decodedFilterArr = decodedObject?.length > 0 ? decodedObject?.map((item: any) => {
      return getFilterRequest(item);
    }) : [];
    const payload = {
      take: take,
      skip: skip,
      TimeZone: timeZone,
      // filter:legacy ? {...filter}: {...filter} || decodedObject
      filter: nextGenFilter ? nextGenFilter?.filter : decodedFilterArr.flat(),
      // operand: nextGenFilter?.operand ?? filterOperand ?? ''
    };
    dispatch(
      postTransactionTable({ apiPath: path, payload })
    );
  };
  const getTable = () => {
    dispatch(
      getTransactionTable(tableApiEndPoint)
    );
  };

  const transactionStats = () => {
    dispatch(fetchTransactionStats({
      apiPath: TRANSACTION.TRANSACTION_STATS, body: {
        TimeZone: timeZone,
        Currency: currencyType || 'USD'
      }
    }));
  };

  const onRefresh = () => {
    const newTake = getInitialRowCount(screenHeightOtherThanTableHeight);
    if (newTake !== take) {
      setTake(newTake);
    } else {
      if (filter) {
        getTable();
      } else {
        postTable();
        transactionStats();
      }

    }
  };

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return; // prevent first API call twice
    }
    if (nextGenFilter) {
      const newTake = getInitialRowCount(screenHeightOtherThanTableHeight);
      if (newTake !== take || skip > 0) {
        setTake(newTake);
        setSkip(0);
      } else {
        if (filter) {
          getTable()
        }
        else {
          postTable();
        }
      }
    }
  }, [nextGenFilter]);

  useEffect(() => {
    if (filter) {
      getTable()
    }
    else {
      postTable();
    }
  }, [filter]);


  const { transactionActionLoader } = useSelector((store: any) => store.details);
  const { loaderLoading } = useSelector(disputeManagementTableData);

  const tableRowsLoading = useSelector(loadingTransactionRows);


  const { filterDateFormatter } = useDateFormatter();

  const schema = columns(filterDateFormatter)?.fields;

  let hideFields = ["V2UUID"];
  const internalUser = hasAccess("INTERNAL");

  if (internalUser === false) {
    hideFields = [...hideFields, "LegalName", "LegalNameInEnglish"];
  }

  const tableColumnHeaders = schema?.filter((item: any) => !hideFields?.includes(item.field));



  const config = useSelector((store: any) => store?.config?.userPreference?.transactionList);

  const [order, setOrder] = useState([]);

  useEffect(() => {
    if (config && config?.selected) {
      setOrder(config?.list[config?.selected]?.order);
    }
  }, []);

  const reorderColumns = (columns: any[], order: string[]) => {
    const columnMap = new Map(columns.map((col) => [col.field, col]));
    if (order?.length > 0) {
      return order?.map((field) => columnMap.get(field));
    } else {
      return columns;
    }

  };

  const newOrderedList = reorderColumns(tableColumnHeaders, order)?.filter((item: any) => item);

  const { currencyType } = useSelector((store: any) => store.config.userPreference);


  useEffect(() => {
    transactionStats();
  }, []);

  return (
    <>
      {/* {hasAccess("GUEST") &&
        <AppTour setOpen={setOpentour} config={tourConfig} open={openTour} onLetsGoClick={onLetsGoClick} />
      } */}
      {/* 
      <LegacyPrompt message={"Legacy Transaction Notice"}
        isLegacyPromptMessage={isLegacyPromptMessage}
        setIsLegacyPromptMessage={setIsLegacyPromptMessage}
      /> */}

      <Loader isLoading={transactionActionLoader || loaderLoading} skeletonAdded={true} />





      <TransactionTable
        rightActionButtons={<>
          <TooltipDasButton
            title={'TransactionsResult.Refresh'}
            placement={'top'}
            buttonClassName={'common-button'}
            onClick={onRefresh}
            icon={<SyncIcon className={tableRowsLoading ? "rotating-icon" : ""} />}
            loading={tableRowsLoading}
          />
          <NewColumnPreference
            columnsWithAccess={newOrderedList?.filter((item: any) => !["action"]?.includes(item.field))}
            setOrder={setOrder}
            config={config}
            currentScreen={"transactionList"}
            columns={columns}
          />
          {hasAccess("LEGAL_NAME_IN_ENGLISH_COLUMN_IN_TRANSACTIONS_TAB") && <div className="transaction-tiles">
            <div className="tile-left">
              <h3>{t("TransactionDetail.TransactionTile.Total Sales")}</h3>
              <DetailsItemValue className='transactionStats-item' skeletonWidth={"4rem"} loading={loadingTransactionStats} value={`${transactionState.currency} ${getAmount(transactionState?.totalSales, transactionState.currency)}`} />
            </div>
            <div className="tile-left">
              <h3>{t("TransactionDetail.TransactionTile.Total Refund")}</h3>
              <DetailsItemValue className='transactionStats-item' skeletonWidth={"4rem"} loading={loadingTransactionStats} value={`${transactionState.currency} ${getAmount(transactionState?.totalRefund, transactionState.currency)}`} />
            </div>
            <div className="tile-left">
              <h3>{t("TransactionDetail.TransactionTile.Approval Ratio")}</h3>
              <DetailsItemValue loading={loadingTransactionStats} skeletonWidth={"4rem"} value={`${transactionState.approvalRatio}%`} className='transactionStats-item' />
            </div>
          </div>}


        </>}
        columnHeaders={newOrderedList}
        take={take}
        skip={skip}
        setTake={setTake}
        setSkip={setSkip}
        initialRowCount={initialRowCount}
        filteredObject={decodedObject?.length > 0 ? [...decodedObject, { operand: filterOperand }] : []}
      />
      {drawer?.map((drawer: any, index: number) => (
        <DasDrawer key={index} drawer={drawer} tableApiEndPoint={filter ? tableApiEndPoint : path} payload={{
          take: take,
          skip: skip,
          TimeZone: timeZone,
          filter: [],
          operand: nextGenFilter?.operand ?? filterOperand ?? ''
        }
        } />
      ))}

    </>
  );
};

export default Transactions;
