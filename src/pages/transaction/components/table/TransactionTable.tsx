import { loadingTransactionRows, rowsCount } from '../../../../store/features/transaction-table';
import { useSelector } from 'react-redux';
import DataTable from '../../../../components/das-table/DataTable';
import { View_Name_Space } from '../../../../components/popper/constants/filter-constants';

const TransactionTable = ({
  dasTableClassName,
  columnHeaders,
  take,
  skip,
  setTake,
  setSkip,
  initialRowCount,
  filteredObject,
  rightActionButtons
}: any) => {
  let rows = useSelector(
    (store: any) => store?.transactionTable?.transactionTable,
  );
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
