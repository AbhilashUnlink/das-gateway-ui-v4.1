import { loadingTransactionRows, rowsCount } from '../../../../store/features/transaction-table';
import { useDispatch, useSelector } from 'react-redux';
import DataTable from '../../../../components/das-table/DataTable';
import { View_Name_Space } from '../../../../components/popper/constants/filter-constants';
// import type { GridRowParams } from '@mui/x-data-grid';
// import { getAmount } from 'utils/helper';
import { setDrawer } from 'store/features/drawer';
import { DRAWER_TITLE, DRAWER_TYPE } from 'components/constants/drawer';
import { getDetails } from 'store/features/details';

const TransactionTable = ({
  dasTableClassName,
  columnHeaders,
  take,
  skip,
  setTake,
  setSkip,
  initialRowCount,
  filteredObject,
  rightActionButtons,
  isRowSelectable,
  onRowClick
}: any) => {
  let rows = useSelector(
    (store: any) => store?.transactionTable?.transactionTable,
  );
  const dispatch = useDispatch();
  const { drawer } = useSelector((store: any) => store.drawer);
  // const transactionDetail: any = useSelector(
  //   (store: any) => store.details.details,
  // );
  let count = useSelector(rowsCount);
  let loading = useSelector(loadingTransactionRows);

  const transactionMultiFilter = [
    'status',
    'Scheme',
    'TransactionType',
    'CurrencyCode',
    'ProductType',
    'AcquirerCode',
    'ProductType',
    'AcquirerMID',
    'DASMID',
    'has3DS',
  ];

  return (
    <div className="transaction-table">
      <DataTable
        title={"Transaction List"}
        dasTableClassName={dasTableClassName}
        columns={columnHeaders}
        rows={rows}
        rowId={({ uuid }: any) => uuid}
        multiFilter={transactionMultiFilter}
        currentScreen="TransactionList"
        skip={skip}
        setSkip={setSkip}
        take={take}
        setTake={setTake}
        onRowClick={(params: any) => {
          dispatch(getDetails({ uuid:params?.row?.uuid, openDrawer: false }));
          dispatch(
            setDrawer([
              ...drawer,
              {
                data: {
                  uuid: params?.row?.uuid,
                },
                type: DRAWER_TYPE.TRANSACTION_QUICK_VIEW,
                title: DRAWER_TITLE.TRANSACTION_QUICK_VIEW,
                isDrawerOpen: true,
              },
            ])
          );
                                    }}
        initialRowCount={initialRowCount}
        count={count}
        showFilter={true}
        disableColumnSelector={false}
        showFooter={true}
        showAdditonalColumn={true}
        ns={View_Name_Space.TRANSACTION}
        rightActionButtons={rightActionButtons}
        showDownloadButton={true}
        loading={loading}
        showRightActionButtons={true}
        columnVisibilityModel={{
          TransactionType: false,
          CurrencyCode: false
        }}
        filteredObject={filteredObject}
        getRowClassName={(params: any) =>
          `super-app-theme--dastable ${params?.row?.IsWhitelisted === false
            ? 'not-highlighted'
            : 'highlighted'
          }`
        }
      />
    </div>
  );
};

export default TransactionTable;
