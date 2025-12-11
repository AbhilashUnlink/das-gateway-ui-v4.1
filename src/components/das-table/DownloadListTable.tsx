import { Badge, Button, Flex, Progress, Radio } from "antd";
import i18n from "../../i18n";
import DataTable from "./DataTable";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import {
  getformatDate,
  //  getInitialRowCount
} from "../../utils/helper";
import { useTranslation } from "react-i18next";
import {
  downloadReportStatus,
  downloadReportStatusConstants,
} from "../../config/common/transaction-download-status";
import pendingDownload from "../../assets/pending-download.gif";
import failedDownload from "../../assets/transaction-icons/payment-failed.png";
import { Sync } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import {
  useEffect,
  //  useMemo,
  useState,
} from "react";
import { Popover, Tooltip } from "@mui/material";
import {
  downloadListLoading,
  downloadTransactionReportApi,
  getDownloadTransactionReportList,
  getDownloadTransactionReportListApi,
} from "../../store/features/transaction-table";
import { useDispatch, useSelector } from "react-redux";
import { DATE_TIME_FORMAT, SELECTED_TIME_ZONE } from "../constants/constants";
// import ConfirmationDialogRaw from '../confirmation-dialog/ConfirmationDialog';
import { DOWNLOAD_RECORD_COUNTS } from "../../pages/transaction/components/constants/transaction";
import useLegacy from "../../hooks/use-legacy/useLegacy";
import { TRANSACTION, TRANSACTION_LEGACY } from "../constants/api-paths";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import TooltipDasButton from "../../pages/transaction/components/buttons/TootlipDasButton";
import {
  FILE_FORMATS_VALUES,
  fileFormatOptions,
} from "pages/user-settings/file-format";
import { CsvSvgIcon, DownloadReportButtonSvgIcon, ExcelSvgIcon, InProgressSvgIcon } from "components/svg-icons/SvgIcons";
import columns from "pages/transaction/components/table/schema/TransactionTableSchema";

const DownloadListTable = ({
  disableRequestDownloadButton,
  setDisableRequestDownloadButton,
  initialFilterData
}: any) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [filterAppliedPopover, setOpenFilterAppliedPopover] = useState(false);
  const [filterPopupData, setFilterPopupData] = useState({});
  // const screenHeightOtherThanTableHeight = 550;
  // const initialRowCount = useMemo(() => getInitialRowCount(screenHeightOtherThanTableHeight), [screenHeightOtherThanTableHeight]);
  // const [take, setTake] = useState(() => initialRowCount);
  const [take, setTake] = useState(5);
  const [skip, setSkip] = useState(0);
  const [showMaxLimitReachedPopup, setShowMaxLimitReachedPopup] =
    useState(false);
  const tableTotalCount = useSelector(
    (store: any) => store.transactionTable.count
  );
  const selectedFormatType = useSelector(
    (store: any) => store?.config?.userPreference?.formatType
  );

  const updateText: any = {
    HPP: "HOSTED PAYMENT PAGE",
    SERVERTOSERVERAPI: "SERVER TO SERVER (API)",
    NOTSUCCESSFUL: "Not Successful",
    VOIDAUTHORISATION: "VOID AUTHORISATION",
    PROCESSING: "Pending",
    SUCCESSFUL: "Successful",
    CARDPAYMENT: "CARD PAYMENT",
    paypay: "PAYPAY",
    gcash: "GCASH",
    konbini: "KONBINI",
    payeasy: "PAYEASY",
    CAPTURE: "CAPTURE",
    PURCHASE: "PURCHASE",
    AUTHORISATION: "AUTHORISATION",
    REFUND: "REFUND",
  };
  const handleClick = (event: any, values: any) => {
    const availableKeys = [
      "Status",
      "Integration Type",
      "Transaction Type",
      "Payment Type",
    ].filter((key) => key in values);
    if (availableKeys?.length > 0) {
      const newObject = availableKeys.reduce((acc: any, key: any) => {
        const hasMultipleValues = values[key]?.includes(",");
        if (hasMultipleValues) {
          const multiVal = values[key]
            .split(",")
            .map((str: any) => updateText[str.trim()] || str.trim());
          acc[key] = multiVal?.join(", ");
        } else {
          acc[key] = updateText[values[key]];
        }
        return acc;
      }, {});
      let data = { ...values, ...newObject };
      setFilterPopupData(data);
    } else {
      setFilterPopupData(values);
    }
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };
  const handleFilterPopoverClose = () => {
    setAnchorEl(null);
    setOpenFilterAppliedPopover(false);
  };
  const handleOpen = (event: any) => {
    setAnchorEl(event.currentTarget);
    setOpenFilterAppliedPopover(true);
  };

  const id = open ? "transaction-filter-popover" : undefined;
  const idfilter = filterAppliedPopover ? "transaction-filter-popover" : undefined;
  const { t } = useTranslation();
  // const columns: any = [
  //   {
  //     field: "action",
  //     headerName: i18n.t("TransactionsResult.columnDefs.Action"),
  //     sortable: false,
  //     headerClassName: "super-app-theme--header",
  //     width: 80,
  //     renderCell: function ({ row }: any) {
  //       const { status, id, CreatedAt } = row;
  //       return (
  //         <>
  //           {downloadReportStatus[status] ===
  //           downloadReportStatusConstants.Ready ? (
  //             <Button
  //               onClick={() => {
  //                 const values = {
  //                   id,
  //                   CreatedAt,
  //                 };
  //                 dispatch(downloadTransactionReportApi(values));
  //               }}
  //               className="table-btn view-settings"
  //             >
  //               <Tooltip
  //                 placement="top"
  //                 title={t(
  //                   "TransactionDetailDrawerBody.TransactionReportDownload.DownloadReport"
  //                 )}
  //               >
  //                 <DownloadForOfflineIcon />
  //               </Tooltip>
  //             </Button>
  //           ) : downloadReportStatus[status] ===
  //             downloadReportStatusConstants.Failure ? (
  //             <>
  //               <img
  //                 src={failedDownload}
  //                 className="pending-download failed-download"
  //                 alt="Failed Download"
  //               />
  //             </>
  //           ) : (
  //             <>
  //               <img
  //                 src={pendingDownload}
  //                 className="pending-download"
  //                 alt="Pending Download"
  //               />
  //             </>
  //           )}
  //         </>
  //       );
  //     },
  //   },

  //   {
  //     field: "fileName",
  //     headerClassName: "super-app-theme--header",
  //     suppressMenu: true,
  //     headerName: i18n.t(
  //       "TransactionDetailDrawerBody.TransactionReportDownload.ColumsnDefs.FileName"
  //     ),
  //     minWidth: 300,
  //     renderCell: function ({ row }: any) {
  //       return (
  //         <>
  //           <span>
  //             {t(
  //               "TransactionDetailDrawerBody.TransactionReportDownload.DownloadReportTitle"
  //             )}
  //           </span>{" "}
  //           &nbsp;{getformatDate(row.CreatedAt, DATE_TIME_FORMAT)}
  //         </>
  //       );
  //     },
  //   },
  //   {
  //     field: "Format",
  //     headerClassName: "super-app-theme--header",
  //     suppressMenu: true,
  //     headerName: i18n.t(
  //       "TransactionDetailDrawerBody.TransactionReportDownload.ColumsnDefs.FileFormat"
  //     ),
  //     minWidth: 130,
  //     renderCell: function ({ row }: any) {
  //       return (
  //         <>
  //           {row?.filter?.Format === FILE_FORMATS_VALUES.CSV ? (
  //             <CsvSvgIcon className={row?.filter?.Format} />
  //           ) : (
  //             <ExcelSvgIcon className={row?.filter?.Format} />
  //           )}
  //         </>
  //       );
  //     },
  //   },
  //   {
  //     field: "filter",
  //     suppressMenu: true,
  //     headerClassName: "super-app-theme--header",
  //     headerName: i18n.t(
  //       "TransactionDetailDrawerBody.TransactionReportDownload.ColumsnDefs.Filter"
  //     ),
  //     minWidth: 130,
  //     maxWidth: 130,
  //     renderCell: function ({ row }: any) {
  //       return (
  //         <>
  //           <div className="filters-wrapper">
  //             <Tooltip placement="top" arrow title={"Applied Filters"}>
  //               <Button
  //                 className="filtered-items"
  //                 aria-describedby={id}
  //                 onClick={(e) => handleClick(e, row.filter)}
  //               >
  //                 <FilterAltOutlinedIcon />
  //                 <Badge className="app-filter-count">
  //                   {Object.keys(row?.filter)?.length}
  //                 </Badge>
  //               </Button>
  //             </Tooltip>
  //           </div>
  //         </>
  //       );
  //     },
  //   },
  //   {
  //     field: "status",
  //     suppressMenu: true,
  //     headerClassName: "super-app-theme--header",
  //     headerName: i18n.t(
  //       "TransactionDetailDrawerBody.TransactionReportDownload.ColumsnDefs.Status"
  //     ),
  //     minWidth: 100,
  //     maxWidth: 130,
  //     cellClass: ({ row }: any) => downloadReportStatus[row.status],
  //     renderCell: function ({ row }: any) {
  //       return (
  //         <div className={downloadReportStatus[row.status]}>
  //           {downloadReportStatus[row.status]}
  //         </div>
  //       );
  //     },
  //   },
  // ];
  const rows = useSelector(
    (store: any) => store.transactionTable.downloadTransactionReportList
  );
  const { reportListCount } = useSelector(
    (store: any) => store.transactionTable
  );
  let timeZone = localStorage.getItem(SELECTED_TIME_ZONE);
  const dispatch = useDispatch();
  const { filter } = useSelector((store: any) => store.filter);
  const legacy = useLegacy();
  const apiPath = legacy
    ? `${TRANSACTION_LEGACY.REPORT_DOWNLOAD_API}?take=${take}&skip=${skip}&TimeZone=${timeZone}`
    : `${TRANSACTION.REPORT_DOWNLOAD_API}?take=${take}&skip=${skip}&TimeZone=${timeZone}`;
  //const apiPath = `reports/transactions/download-req-list?take=${take}&skip=${skip}`;
  const [fileFormatType, setFileFormatType] = useState(selectedFormatType);

  useEffect(() => {
    dispatch(getDownloadTransactionReportList(apiPath));
  }, [take, skip]);

  const loading = useSelector(downloadListLoading);
  return (
    <>
      <div className={`ag-theme-alpine w-100 t-download-list-filter`}>
        <div className="filter-wrap-cont">
          <Popover
            className="action-button-popover"
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <>
              <h3>
                {t(
                  "TransactionDetailDrawerBody.TransactionReportDownload.AppliedFilters"
                )}
              </h3>
              <button className="close-filter-popper" onClick={handleClose}>
                <CloseIcon />
              </button>
              <div>
                {Object.entries(filterPopupData).map(
                  ([key, value]: any, index) => {
                    return (
                      <div key={index} className="filt-listing">
                        <h4>
                          {key.toUpperCase()}:{" "}
                          <span>{decodeURIComponent(value)}</span>
                        </h4>
                      </div>
                    );
                  }
                )}
              </div>
            </>
          </Popover>
        </div>
        <div
          className="flex"
          style={{ alignItems: "center", justifyContent: "space-between" }}
        >
          <h5 className="total-records-found">
            Total Records: <strong>{tableTotalCount}</strong>
          </h5>
          <Button
            className="view-filter-applied"
            aria-describedby={id}
            onClick={handleOpen}
            style={{
              background: "transparent",
              padding: "0",
              border: "0px",
              textDecoration: "underline",
              boxShadow: "none",
            }}
          >
            View Applied Filters
          </Button>
          <Popover
            className="action-button-popover"
            id={idfilter}
            open={filterAppliedPopover}
            anchorEl={anchorEl}
            onClose={handleFilterPopoverClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <>
              <h3>
                {t(
                  "TransactionDetailDrawerBody.TransactionReportDownload.AppliedFilters"
                )}
              </h3>
              <button className="close-filter-popper" onClick={handleFilterPopoverClose}>
                <CloseIcon />
              </button>
              <div>
              <div>
              {initialFilterData?.map((item: any, index: number) => {
              const key= columns()?.fields?.find((i:any)=>i.field===item.HeaderColumn)?.headerName;
                return(
                <div key={index} className="filt-listing">
                  <h4>
                    {key.toUpperCase()}:{" "}
                    <span>
                      {Array.isArray(item.Name)
                        ? item.Name.join(", ")
                        : item.Name}
                    </span>
                  </h4>
                </div>
              )})}       
</div>

              </div>
            </>
          </Popover>
        </div>
        {/* )} */}
        <div className="btn-wrapper">
          <div className="tggle-das-switch">
            <label>
              {t(
                t(
                  "TransactionDetailDrawerBody.TransactionReportDownload.ReportType"
                )
              )}
            </label>
            <Flex vertical gap="middle">
            <Radio.Group 
            block
            onChange={(val: any) => {
              setFileFormatType(val?.target?.value);
              if (
                tableTotalCount > DOWNLOAD_RECORD_COUNTS.min &&
                tableTotalCount < DOWNLOAD_RECORD_COUNTS.max
              )
                setDisableRequestDownloadButton(false);
            }}
            options={fileFormatOptions} 
            defaultValue={selectedFormatType} />
            </Flex>
            {/* <Space direction="vertical">
              <Select
                defaultValue={selectedFormatType}
                size="small"
                style={{ width: 100 }}
                onChange={(val: any) => {
                  setFileFormatType(val);
                  if (
                    tableTotalCount > DOWNLOAD_RECORD_COUNTS.min &&
                    tableTotalCount < DOWNLOAD_RECORD_COUNTS.max
                  )
                    setDisableRequestDownloadButton(false);
                }}
                options={fileFormatOptions}
              />
            </Space> */}
          </div>
          <button
            type="button"
            disabled={
              tableTotalCount === DOWNLOAD_RECORD_COUNTS.min ||
              disableRequestDownloadButton
            }
            className="requestbtn"
            onClick={() => {
              setDisableRequestDownloadButton(true);
              if (tableTotalCount > DOWNLOAD_RECORD_COUNTS.max) {
                setShowMaxLimitReachedPopup(true);
              } else {
                dispatch(
                  getDownloadTransactionReportListApi({
                    filter: filter,
                    apiPath: apiPath,
                    selectedFormatType: fileFormatType,
                  })
                );
              }
            }}
          >
            {t(
              "TransactionDetailDrawerBody.TransactionReportDownload.RequestDownload"
            )}
          </button>
        </div>
        <h3>
          {t(
            "TransactionDetailDrawerBody.TransactionReportDownload.PleaseDownload"
          )}
          <Tooltip
            title={`${i18n.t(
              "TransactionDetailDrawerBody.TransactionReportDownload.FileTimeLimit"
            )}`}
            arrow
          >
            <InfoOutlined />
          </Tooltip>{" "}
        </h3>


        <div className="download-list-wrapper">
        {rows?.map((item:any, index:any) => (
        <div key={index} className="download-item-lists">
          <Progress percent={item?.status === 1? 25 : item?.status === 2 ?50 : item?.status === 3?100 : 0} showInfo={false} />
          <div className="flex"
          style={{ alignItems: "center", justifyContent: "space-between" }}
          >
           <div className={`report-status ${downloadReportStatus[item?.status]}`}>
           {item?.status === 2 && (
    <InProgressSvgIcon/>
  )}
  {downloadReportStatus[item?.status]}
          </div>
          <Button
            className="view-filter-applied"
            aria-describedby={id}
            onClick={(e) => handleClick(e, item?.filter)}
            style={{
              background: "transparent",
              padding: "0",
              border: "0px",
              textDecoration: "underline",
              boxShadow: "none",
            }}
          >
            View Applied Filters
          </Button>
          </div>
          <div className="flex"
          style={{ alignItems: "center", justifyContent: "space-between" }}
          >
            <div className="flex download-list-name"
            style={{ alignItems: "center", justifyContent: "flex-start", gap:'5px' }}
            >
          <span className="flex" style={{ alignItems: "center", justifyContent: "space-between" }}>
          {item?.filter?.Format === FILE_FORMATS_VALUES.CSV ? (
              <CsvSvgIcon className={item?.filter?.Format} />
            ) : (
              <ExcelSvgIcon className={item?.filter?.Format} />
            )}
              {t(
                "TransactionDetailDrawerBody.TransactionReportDownload.DownloadReportTitle"
              )}
            </span>{getformatDate(item?.CreatedAt, DATE_TIME_FORMAT)}
            </div>

           <div className="download-btn-wrap">
            {downloadReportStatus[item?.status] ===
            downloadReportStatusConstants.Ready ? (
              <Button
                onClick={() => {
                  const values = {
                    id,
                    CreatedAt:item?.CreatedAt,
                  };
                  dispatch(downloadTransactionReportApi(values));
                }}
                className="dwnld-rep-btn"
              >
                <Tooltip
                  placement="top"
                  title={t(
                    "TransactionDetailDrawerBody.TransactionReportDownload.DownloadReport"
                  )}
                >
                  <DownloadReportButtonSvgIcon />
                </Tooltip>
              </Button>
            ) : downloadReportStatus[item?.status] ===
              downloadReportStatusConstants.Failure ? (
              <>
                <img
                  src={failedDownload}
                  className="pending-download failed-download"
                  alt="Failed Download"
                />
              </>
            ) : (
              <>
                <DownloadReportButtonSvgIcon
                  className="pending-download"
                  alt="Pending Download"
                />
              </>
            )}
            </div> 
          </div>
          </div>
        ))}
        </div>
        
        {/* <ConfirmationDialogRaw
          className="show-max-limit-reached-popup"
          open={showMaxLimitReachedPopup}
          title={t(
            'TransactionDetailDrawerBody.TransactionReportDownload.MaxLimitReachedTitle',
          )}
          onClose={() => setShowMaxLimitReachedPopup(false)}
          content={
            <div>
              {t(
                'TransactionDetailDrawerBody.TransactionReportDownload.MaxLimitReachedMessage',
              )}
              <button
                className="download-limit-ok"
                onClick={() => setShowMaxLimitReachedPopup(false)}
              >
                OK
              </button>
            </div>
          }
        /> */}
      </div>
    </>
  );
};

export default DownloadListTable;
