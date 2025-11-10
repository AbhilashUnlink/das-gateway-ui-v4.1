/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { DataGrid } from '@mui/x-data-grid';
import { Suspense, useEffect, useState } from 'react';
import CustomFooter from './CustomFooter';
import './style.css';
import FilterPopup from 'components/popper/filter-popup';
import { useTranslation } from 'react-i18next';
// import ConfirmationDialogRaw from '../confirmation-dialog/ConfirmationDialog';
import TooltipDasButton from '../../pages/transaction/components/buttons/TootlipDasButton';
import DownlaodDrawer from './DownlaodDrawer';
import DasDrawer from '../das-drawer/DasDrawer';
import { DRAWER_TYPE, DRAWER_WIDTH } from '../constants/drawer';
import SkeletonLoadingOverlay from './SkeletonOverlay';
import { NewFilterPopup } from 'components/popper/NewFilterPopup';
import { DownloadReportTitleSvgIcon, DownloadSvgIcon } from 'components/svg-icons/SvgIcons';

// import { resetFilter } from '../../redux/features/filter';
// import { useDispatch } from 'react-redux';

export default function DataTable({
  title = "",
  dasTableClassName = '',
  columns,
  rows = [],
  rowId,
  getRowClassName = () => `super-app-theme--dastable`,
  multiFilter,
  skip,
  setSkip,
  take,
  setTake,
  initialRowCount,
  count = 0,
  showFilter = false,
  showFooter,
  ns,
  checkboxSelection,
  isRowSelectable = () => { },
  onSelectionModelChange,
  showMonthYearPicker,
  dateFormat,
  ReleasedPastFutureDate,
  customHeaderName,
  className = 'table-icons',
  popupClassName = '',
  showDownloadButton = false,
  currentScreen = '',
  columnVisibilityModel = {},
  dynamicFilter,
  NORECORD = 'NO_RECORD_FOUND',
  loading = false,
  showRightActionButtons = false, // this is used in statement where before filter we are having approve and wired status buttons
  rightActionButtons,
  selectionModel,
  disableSelectionOnClick = false,
  filteredObject,
}: any) {
  const { t } = useTranslation();
  const [showDownloadPopup, setShowDownloadPopup] = useState(false);
  const [initialFilterData, setInitialFilterData] = useState([]);
  const [filterCount, setFilterCount] = useState(0);
  const [nxtGenfilterCount, setnextGenFilterCount] = useState(0);
  const [noRecords, setNoRecords] = useState("");

  // no records will show only after 2.5 seconds till then it'll not show it 
  useEffect(() => {
    const timer = setTimeout(() => {
      setNoRecords(NORECORD);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);


  const filterProps = {
    columns,
    multiFilter,
    ns,
    dateFormat,
    showMonthYearPicker,
    ReleasedPastFutureDate,
    customHeaderName,
    popupClassName,
    initialFilterData,
    setInitialFilterData,
    count: filterCount,
    setCount: setFilterCount,
    setSkip,
  };
  // const dispatch = useDispatch();

  return (
    <Suspense fallback={<></>}>
      <div className="new-data-table">
        <DasDrawer
          drawer={{
            isDrawerOpen: showDownloadPopup,
            type: DRAWER_TYPE.CHILDREN,
            width: DRAWER_WIDTH.FIFTY,
            icon:<DownloadReportTitleSvgIcon/>,
            title:
              'TransactionDetailDrawerBody.TransactionReportDownload.TransactionDownload',
          }}
          onClose={() => {
            setShowDownloadPopup(false);
          }}
        >
          <DownlaodDrawer {...filterProps} />
        </DasDrawer>

        <div className={className} style={{ display: "flex", width: "100%", justifyContent: "space-between", alignItems:"center" }}>
          <span style={{ fontSize: "20px", fontWeight: "600", color: "#1a1a1a" }}>
            {title}
          </span>


          {/* this is used in statement where before filter we are having approve and wired status buttons */}
          {showRightActionButtons && (
            <div style={{ display: "flex", justifyContent: "flex-end", flexDirection:'row-reverse', gap:'15px' }}>
              <>
                {showDownloadButton && (
                  <TooltipDasButton
                    title={'TransactionsResult.DownloadCSV'}
                    placement={'top'}
                    buttonClassName={'common-button'}
                    onClick={() => setShowDownloadPopup(true)}
                    icon={<DownloadSvgIcon sx={{ fontSize: '20px', padding: '2px' }} />}
                  // loading={loading}
                  />
                )}
              </>

              {rightActionButtons}</div>
          )}

          {/* <NewFilterPopup
            columns={columns}
            count={nxtGenfilterCount}
            setCount={setnextGenFilterCount}
            ns={ns}
            currentScreen={currentScreen}
            multiFilter={multiFilter}
            filteredObject={filteredObject}
          /> */}
<div style={{ display: "flex", justifyContent: "flex-end", flexDirection:'row-reverse', gap:'15px' }}>
           {showFilter &&
            (currentScreen === 'TransactionList' ? (
              <>
                <NewFilterPopup
                  columns={columns}
                  count={nxtGenfilterCount}
                  setCount={setnextGenFilterCount}
                  ns={ns}
                  currentScreen={currentScreen}
                  multiFilter={multiFilter}
                  filteredObject={filteredObject}
                />


                <FilterPopup
                  columns={columns}
                  multiFilter={multiFilter}
                  ns={ns}
                  filter=""
                  dateFormat={dateFormat}
                  showMonthYearPicker={showMonthYearPicker}
                  ReleasedPastFutureDate={ReleasedPastFutureDate}
                  customHeaderName={customHeaderName}
                  popupClassName={popupClassName}
                  removePopper={false}
                  currentScreen={currentScreen}
                  dynamicFilter={dynamicFilter}
                  setSkip={setSkip}
                  initialFilterData={initialFilterData}
                  setInitialFilterData={setInitialFilterData}
                  count={filterCount}
                  setCount={setFilterCount}
                />
              </>
            ) : (
              <FilterPopup
                columns={columns}
                multiFilter={multiFilter}
                ns={ns}
                filter=""
                dateFormat={dateFormat}
                showMonthYearPicker={showMonthYearPicker}
                ReleasedPastFutureDate={ReleasedPastFutureDate}
                customHeaderName={customHeaderName}
                popupClassName={popupClassName}
                removePopper={false}
                currentScreen={currentScreen}
                dynamicFilter={dynamicFilter}
                setSkip={setSkip}
                initialFilterData={initialFilterData}
                setInitialFilterData={setInitialFilterData}
                count={filterCount}
                setCount={setFilterCount}
              />
            ))}
        </div>
        </div>
        <div className={`das-table ${dasTableClassName}`}>
          <div
            className="data-gird-table-wrapper"
            style={{
              display: 'block',
              overflow: 'auto',
              width: '100%',
            }}
          >
            <DataGrid
              sx={
                loading
                  ? {
                    '& .MuiDataGrid-cell': {
                      display: 'none',
                    },
                    '& .MuiDataGrid-columnHeaders': {
                      minHeight: 42,
                      height: 42,
                      lineHeight: '42px',
                    }
                  }
                  : {}
              }
              checkboxSelection={checkboxSelection}
              isRowSelectable={isRowSelectable}
              onRowSelectionModelChange={onSelectionModelChange}
              getRowClassName={getRowClassName}
              getRowHeight={() => "auto"}
              rowHeight={52}
              localeText={{ noRowsLabel: t(noRecords) }}
              disableColumnMenu
              rows={rows}
              columns={columns}
              autoHeight
              getRowId={rowId}
              rowSelectionModel={selectionModel}
              columnVisibilityModel={columnVisibilityModel}
              loading={loading}
              disableRowSelectionOnClick={disableSelectionOnClick}
              slots={{
                pagination: CustomFooter, // ✅ Changed
                loadingOverlay: SkeletonLoadingOverlay,
              }}
              slotProps={{
                pagination: { // ✅ Changed
                  count,
                  take,
                  setTake,
                  skip,
                  setSkip,
                  initialRowCount,
                  showFooter,
                  loading,
                },
              }}
            />


          </div>
        </div>
      </div>
    </Suspense>
  );
}
