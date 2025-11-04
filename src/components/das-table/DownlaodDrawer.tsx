import { useTranslation } from 'react-i18next';
// import FilterPopup from '../popper/filter-popup';
import DownloadListTable from './DownloadListTable';
import { useEffect, useState } from 'react';

const DownlaodDrawer = ({
  columns,
  multiFilter,
  ns,
  dateFormat,
  showMonthYearPicker,
  ReleasedPastFutureDate,
  customHeaderName,
  popupClassName,
  currentScreen,
  initialFilterData,
  setInitialFilterData,
  count,
  setCount,
  setSkip
}: any) => {
  const { t } = useTranslation();
  
  const [disableRequestDownloadButton, setDisableRequestDownloadButton] = useState(false);

  useEffect(() => {
    if (initialFilterData?.length > 0) {
      setDisableRequestDownloadButton(false);
    }
  }, []);

  return (
    <>
      <div className="transaction-popper-drawer">
        <h4>{t("TransactionDetailDrawerBody.TransactionReportDownload.PleaseApply")}</h4>
        {/* <FilterPopup
          columns={columns}
          multiFilter={multiFilter}
          ns={ns}
          filter=""
          dateFormat={dateFormat}
          showMonthYearPicker={showMonthYearPicker}
          ReleasedPastFutureDate={ReleasedPastFutureDate}
          customHeaderName={customHeaderName}
          popupClassName={popupClassName}
          removePopper={true}
          setDisableRequestDownloadButton={setDisableRequestDownloadButton}
          currentScreen={currentScreen}
          setSkip={setSkip}
          initialFilterData={initialFilterData}
          setInitialFilterData={setInitialFilterData}
          count={count}
          setCount={setCount}
        /> */}
        <DownloadListTable disableRequestDownloadButton={disableRequestDownloadButton} setDisableRequestDownloadButton={setDisableRequestDownloadButton} />
      </div>
    </>
  );
};

export default DownlaodDrawer;
