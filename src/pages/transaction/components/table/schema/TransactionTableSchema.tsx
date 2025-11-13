/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  getAmount,
  getAmountWithCurrency,
  getCardType,
  // getStatusIcon,
} from '../../../../../utils/helper';
import { INTEGRATION_TYPE, PAYMENT_TYPE, TRANSACTION_TYPE_LABEL } from '../../constants/transaction';
import ActionButton from '../../buttons/ActionButton';
// import { Tooltip } from '@mui/material';
import i18n from 'i18n';
import { FILTER_INPUT_TYPES } from 'components/popper/constants/filter-constants';
import DasCopyComponent from 'components/das-copy/DasCopyComponent';
import CustomHeaderDispaly from 'components/das-table/CustomHeaderDispaly';
import DateTimeComparison from 'components/date-comparison/DateTimeComparison';
import CustomBodyRowDisplay from 'components/das-table/CustomBodyRowDisplay';
import { BookMarkSvgIcon, DownloadStatementSvgIcon } from 'components/svg-icons/SvgIcons';
import { useState } from 'react';


export const columns: any = () => {
  const [taggedRows, setTaggedRows] = useState<Record<string, boolean>>({});
  const [taggedData, setTaggedData] = useState<string[]>([]); // store multiple uuids

  const toggleTagged = (rowId: string) => {
    setTaggedRows((prev) => {
      const updated = { ...prev, [rowId]: !prev[rowId] };

      // update taggedData array accordingly
      const updatedTaggedData = Object.keys(updated).filter((key) => updated[key]);
      setTaggedData(updatedTaggedData);

      return updated;
    });
  };
  const data = {
    fields: [
      {
        field: 'action',
        headerName: i18n.t('TransactionsResult.columnDefs.Action'),
        renderHeader: () => (
          <div style={{ marginLeft: "10px", color: "orange" }}>
            <BookMarkSvgIcon
              className="header-tag-bookmark"
              style={{ cursor: "pointer" }}
              onClick={() => {
                console.log("Tagged Rows UUIDs:", taggedData);
              }}
            />
          </div>
        ),
        translation: "TransactionsResult.columnDefs.Action",
        sortable: false,
        headerClassName: 'super-app-theme--header',
        width: 80,
        renderCell: (params: any) => {
          const rowId = params?.row?.uuid;
          const isTagged = taggedRows[rowId] || false;
          
          return (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "0 10px",
              }}
            >
              <BookMarkSvgIcon
                style={{ cursor: "pointer" }}
                className={`row-mark-tag ${isTagged ? "active-tagged" : ""}`}
                onClick={() => {
                  console.log("Clicked row:", params?.row);
                  toggleTagged(rowId);
                  setTaggedData(rowId)
                }}
              />
            </div>
          );
        },
        // renderCell: (params: any) => {
        //   const isTagged = taggedRows[params.row.id] || false;
  
        //   return (
        //     // <ActionButton data={params.row} />
        //     <div
        //       className="flex"
        //       style={{
        //         justifyContent: "center",
        //         alignItems: "center",
        //         padding: "0 12px",
        //       }}
        //     >
        //       <BookMarkSvgIcon
        //         style={{ cursor: "pointer" }}
        //         className={`row-mark-tag ${isTagged ? "active-tagged" : ""}`}
        //         onClick={() => {
        //           console.log("bookmarked", params.row);
        //           toggleTagged(params.row.id);
        //         }}
        //       />
        //     </div>
        //   );
        // },
        hide: false,
        showInAdditionalColumn: false,
        defaultSelectedInAdditionalColumn: true,
        nonSelectableField: true,
        pinned: 'left',
      },
      {
        field: 'TransactionID',
        headerName: i18n.t('TransactionsResult.columnDefs.TransactionID'),
        sortable: false,
        headerClassName: 'super-app-theme--header',
        width: 200,
        hideable: false,
        renderCell: (params: any) => (
          <div style={{ display: "flex", flexDirection: "column", height: "50px", justifyContent: "center" }}>
            <CustomBodyRowDisplay rowTopValue={<DasCopyComponent text={params.row?.uuid} truncate={true} />} rowBottomValue={<DasCopyComponent text={params.row?.TransactionID} />} rowTopClassName="uuid-top-label-value" rowBottomClassName="transaction-id-copy-value"/>
          </div>
        ),
        renderHeader: () => (
          <CustomHeaderDispaly
          headingTop={i18n.t('TransactionsResult.columnDefs.TransactionRefID')}
          headingBottom={i18n.t('TransactionsResult.columnDefs.TransactionID')}
          />
        ),
      },
      // {
      //   field: 'uuid',
      //   headerName: i18n.t('TransactionsResult.columnDefs.TransactionRefID'),
      //   translation: "TransactionsResult.columnDefs.TransactionRefID",
      //   sortable: false,
      //   headerClassName: 'super-app-theme--header',
      //   width: 260,
      //   hide: false,
      //   showInAdditionalColumn: true,
      //   defaultSelectedInAdditionalColumn: true,
      //   nonSelectableField: true,
      //   pinnable: true,
      //   showInStatementTransaction: true,
      //   type: FILTER_INPUT_TYPES.TEXT,
      // },
      {
        field: 'status',
        headerName: i18n.t('TransactionsResult.columnDefs.status'),
        type: FILTER_INPUT_TYPES.SELECT,
        translation: "TransactionsResult.columnDefs.status",
        renderCell: (params: any) => {
          const transactionStatus = params?.row?.status || params?.row?.Status;
          // console.log(transactionStatus,"transactionStatus");
          const colors: any = {
            SUCCESSFUL: {
              color: "#1e8f20",       // dark green text
              bgcolor: "#c6f3da",     // light green background
            },
            NOTSUCCESSFUL: {
              color: "#ff4443",       // dark red text
              bgcolor: "#ffe2e2",     // light red background
            },
            PENDING: {
              color: "#ae7f15",       // dark amber text
              bgcolor: "#ffe8b5",     // light amber background
            },
          };

          return (
            <div style={{ display: "flex", flexDirection: "column", height: "50px", justifyContent: "center" }}>
              <div className="table-header-top-label value"
                style={{
                  color: colors[transactionStatus].color,
                  backgroundColor: colors[transactionStatus].bgcolor,
                  borderRadius: "4px",
                  padding: "2px 6px",
                  width: "fit-content",
                  fontWeight: 500,
                }}
              >{TRANSACTION_TYPE_LABEL[params.row.TransactionType]?.toUpperCase()}</div>
            </div>
          )
        },
        renderHeader: () => (
          <CustomHeaderDispaly
          headingTop={i18n.t('TransactionsResult.columnDefs.TransactionType')}
          headingBottom={i18n.t('TransactionsResult.columnDefs.status')}
          />
        ),
        // renderCell: (params: any) => {
        //   const transactionStatus = params?.row?.status || params?.row?.Status;
        //   const GatewayError = i18n.t('TransactionsResult.columnDefs.GatewayError');
        //   const ResponseCode = i18n.t('TransactionsResult.columnDefs.ResponseCode');
        //   return (
        //     <>
        //       {transactionStatus === 'NOTSUCCESSFUL' ?
        //         <Tooltip title={
        //           <>
        //             <ol>
        //               <li className="products-names"><strong>{ResponseCode}:</strong> {params.row?.ResponseCode}</li>
        //               <li className="products-names"><strong>{GatewayError}:</strong> {params.row?.GatewayResponse}</li>
        //             </ol>
        //           </>
        //         } arrow>
        //           <img
        //             src={getStatusIcon(transactionStatus)}
        //             className="transaction-status-icons"
        //             alt={transactionStatus}
        //           />
        //         </Tooltip>
        //         : <img
        //           src={getStatusIcon(transactionStatus)}
        //           className="transaction-status-icons"
        //           alt={transactionStatus}
        //         />
        //       }
        //       {params.row
        //         ? TRANSACTION_TYPE_LABEL[params.row.TransactionType]?.toUpperCase()
        //         : ''}
        //     </>
        //   );
        // },
        sortable: false,
        headerClassName: 'super-app-theme--header',
        width: 180,
        align: 'left',
        hide: false,
        showInAdditionalColumn: true,
        nonSelectableField: true,
        defaultSelectedInAdditionalColumn: true,
        showInStatementTransaction: true,
      },
      {
        field: 'amount',
        headerName: i18n.t('TransactionsResult.columnDefs.Amount'),
        translation: "TransactionsResult.columnDefs.Amount",
        sortable: false,
        headerClassName: 'super-app-theme--header',
        width: 120,
        align: 'left',
        hide: false,
        showInAdditionalColumn: true,
        nonSelectableField: true,
        defaultSelectedInAdditionalColumn: true,
        showInStatementTransaction: true,
        type: FILTER_INPUT_TYPES.NUMBER,
        renderHeader: () => (
          <CustomHeaderDispaly
          headingTop={i18n.t('TransactionsResult.columnDefs.Amount')}
          headingBottom={i18n.t('TransactionsResult.columnDefs.Fees')}
          />
        ),
        renderCell: (params: any) => {
          const transactionAmount = params?.row?.amount || params?.row?.Amount;
          const fees =
            getAmountWithCurrency(getAmount(transactionAmount, params?.row?.CurrencyCode), params?.row?.CurrencyCode);

          return (
            <>
            <CustomBodyRowDisplay rowTopValue={getAmountWithCurrency(getAmount(transactionAmount, params?.row?.CurrencyCode), params?.row?.CurrencyCode)} rowBottomValue={fees} rowTopClassName="amount-top-label-value"/>
            </>
          )
        },

      },
      {
        field: 'Date',
        headerName: i18n.t('TransactionsResult.columnDefs.Date'),
        translation: "TransactionsResult.columnDefs.Date",
        sortable: false,
        headerClassName: 'super-app-theme--header',
        minWidth: 220,
        hide: false,
        showInAdditionalColumn: true,
        nonSelectableField: true,
        defaultSelectedInAdditionalColumn: true,
        showInStatementTransaction: true,
        type: FILTER_INPUT_TYPES.NEWDATERANGEPICKER,
        renderHeader: () => (
          <CustomHeaderDispaly
          headingTop={i18n.t('TransactionsResult.columnDefs.Date')}
          headingBottom={i18n.t('TransactionsResult.columnDefs.UpdatedTransactionDate')}
          />
        ),
        renderCell: (params: any) => (
          <DateTimeComparison
          transactionDateStr={params?.row?.Date}
          updatedDateStr={params?.row?.UpdatedDate}
          // filterDateFormatter={filterDateFormatter}
        />
        ),
          // const transactionDateStr = params?.row?.Date;
          // const updatedDateStr = params?.row?.UpdatedDate;
        
          // if (!transactionDateStr || !updatedDateStr) return null;
        
          // // Parse actual Date objects
          // const transaction = new Date(transactionDateStr);
          // const updated = new Date(updatedDateStr);
        
          // const isDifferent =
          //   transaction.getHours() !== updated.getHours() ||
          //   transaction.getMinutes() !== updated.getMinutes() ||
          //   transaction.getSeconds() !== updated.getSeconds();
        
          // // Use your existing date formatter
          // const transactionDate = filterDateFormatter(transactionDateStr);
          // const updatedDate = filterDateFormatter(updatedDateStr);
        
          // // Extract the time portion (HH:MM:SS)
          // const timeMatch = updatedDate.match(/(\d{2}:\d{2}:\d{2})/);
        
          // let updatedTimeElement: JSX.Element | string = updatedDate;
        
          // if (timeMatch) {
          //   const [hours, minutes, seconds] = timeMatch[0].split(":");
        
          //   // Replace the original HH:MM:SS with a JSX span
          //   const before = updatedDate.split(timeMatch[0])[0]; // part before time
          //   const after = updatedDate.split(timeMatch[0])[1]; // part after time (like ' PM')
        
          //   updatedTimeElement = (
          //     <span>
          //       {before}
          //       {hours}:{minutes}:
          //       <span style={{ color: isDifferent ? "red" : "inherit" }}>{seconds}</span>
          //       {after}
          //     </span>
          //   );
          // }
        
          // return (
          //   <div
          //     style={{
          //       display: "flex",
          //       flexDirection: "column",
          //       height: "50px",
          //       justifyContent: "center",
          //     }}
          //   >
          //     <div className="table-header-top-label value">{transactionDate}</div>
          //     <div>{updatedTimeElement}</div>
          //   </div>
          // );
        //},
        
        
        // renderCell: (params: any) => {
        //   const transactionDate = params?.row?.Date && filterDateFormatter(params?.row?.Date);
        //   const updatedDate = params?.row?.Date && filterDateFormatter(params?.row?.UpdatedDate);
        //   return (
        //     <div style={{ display: "flex", flexDirection: "column", height: "50px", justifyContent: "center" }}>
        //       <div className="table-header-top-label value">
        //         {transactionDate}
        //       </div>
        //       <div>
        //         {updatedDate}
        //       </div>
        //     </div>
        //   )
        // },
      },
      // {
      //   field: 'UpdatedDate',
      //   headerName: i18n.t('TransactionsResult.columnDefs.UpdatedTransactionDate'),
      //   translation: "TransactionsResult.columnDefs.UpdatedTransactionDate",
      //   sortable: false,
      //   headerClassName: 'super-app-theme--header',
      //   minWidth: 220,
      //   hide: false,
      //   valueGetter: (_params: any, row: any) =>
      //     row?.UpdatedDate &&
      //     filterDateFormatter(row?.UpdatedDate),
      //   nonSelectableField: true,
      //   defaultSelectedInAdditionalColumn: true,
      //   showInStatementTransaction: true,
      //   showInAdditionalColumn: true,
      //   type: FILTER_INPUT_TYPES.NEWDATERANGEPICKER,
      // },

      {
        field: 'PaymentType',
        headerName: i18n.t('TransactionsResult.columnDefs.PaymentType'),
        renderHeader: () => (
          <CustomHeaderDispaly
          headingTop={i18n.t('TransactionsResult.columnDefs.PaymentType')}
          headingBottom={i18n.t('TransactionsResult.columnDefs.Scheme')}
          headingBottomRight={i18n.t('TransactionsResult.columnDefs.CardNumber')}
          />
        ),
        translation: "TransactionsResult.columnDefs.PaymentType",
        sortable: false,
        headerClassName: 'super-app-theme--header',
        width: 220,
        align: 'left',
        hide: false,
        showInAdditionalColumn: true,
        renderCell: (params: any) => {
          return <>
            <div style={{ display: "flex", gap: "8px", alignItems: "center", justifyContent: "flex-start", height: "50px" }}>
              <div style={{ background: "white", borderRadius: "4px", display: "flex", justifyContent: "center", alignItems: "center", objectFit: "contain", padding: "0px", boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px", gap: '10px',width: '44px',
              height: '36px', border: '1px solid #E5E5E5' }}>
                <img
                  src={getCardType(params?.row?.Scheme)}
                  className="transaction-scheme-icons"
                  style={{ width: "24px" }}
                  alt=""
                />
              </div>
              <div>
                <div className='small-text'>
                  {params?.row?.PaymentType ? PAYMENT_TYPE[(params?.row?.PaymentType)].toUpperCase() : 'N/A'}
                </div>
                <div>
                  {params?.row?.CardNumber}
                </div>
              </div>
            </div>

          </>
        },
        nonSelectableField: true,
        showInStatementTransaction: true,
        defaultSelectedInAdditionalColumn: true,
        type: FILTER_INPUT_TYPES.AUTOSELECT,
      },

      // {
      //   field: 'Scheme',
      //   headerName: i18n.t('TransactionsResult.columnDefs.Scheme'),
      //   translation: "TransactionsResult.columnDefs.Scheme",
      //   sortable: false,
      //   headerClassName: 'super-app-theme--header',
      //   width: 80,
      //   hide: false,
      //   renderCell: function (params: any) {
      //     return (
      //       <>
      //         <img
      //           src={getCardType(params.row.Scheme)}
      //           className="transaction-scheme-icons"
      //           alt=""
      //         />
      //       </>
      //     );
      //   },
      //   showInAdditionalColumn: true,
      //   nonSelectableField: true,
      //   defaultSelectedInAdditionalColumn: true,
      //   type: FILTER_INPUT_TYPES.SELECT,
      // },
      // {
      //   field: 'CardNumber',
      //   headerName: i18n.t('TransactionsResult.columnDefs.CardNumber'),
      //   translation: "TransactionsResult.columnDefs.CardNumber",
      //   sortable: false,
      //   width: 130,
      //   headerClassName: 'super-app-theme--header',
      //   hide: false,
      //   showInAdditionalColumn: true,
      //   nonSelectableField: true,
      //   defaultSelectedInAdditionalColumn: true,
      //   showInStatementTransaction: true,
      //   type: FILTER_INPUT_TYPES.TEXT,
      // },
      {
        field: 'StatementID',
        headerName: i18n.t('TransactionsResult.columnDefs.StatementID'),
        translation: "TransactionsResult.columnDefs.StatementID",
        sortable: false,
        width: 220,
        headerClassName: 'super-app-theme--header',
        hide: false,
        showInAdditionalColumn: true,
        defaultSelectedInAdditionalColumn: false,
        type: FILTER_INPUT_TYPES.TEXT,
        renderCell: (params: any) => (
          <div style={{ display: "flex", flexDirection: "column", height: "50px", justifyContent: "center" }}>
            <CustomBodyRowDisplay rowTopValue={params.row?.MerchantRefID === "N/A" ? "N/A" : <div className="flex" style={{gap:'5px'}}> <DasCopyComponent text={params.row?.MerchantRefID} truncate={true} /> <DownloadStatementSvgIcon style={{cursor:'pointer', width:'14px'}} onClick={()=> {(console.log("statementID"))}}/></div>}  rowTopClassName={"track-id-copy-value"}/>
          </div>
        ),
        renderHeader: () => (
          <CustomHeaderDispaly
          headingTop={i18n.t('TransactionsResult.columnDefs.StatementID')}
          />
        ),
      },
      {
        field: 'DASMID',
        headerName: i18n.t('TransactionsResult.columnDefs.DASMID'),
        translation: "TransactionsResult.columnDefs.DASMID",
        sortable: false,
        headerClassName: 'super-app-theme--header',
        width: 125,
        align: 'left',
        hide: false,
        showInAdditionalColumn: true,
        nonSelectableField: true,
        defaultSelectedInAdditionalColumn: true,
        type: FILTER_INPUT_TYPES.AUTOSELECT,
        renderHeader: () => (
          <CustomHeaderDispaly
          headingTop={i18n.t('TransactionsResult.columnDefs.DASMID')}
          />
        ),
      },

      {
        field: 'LegalName',
        headerName: i18n.t('TransactionsResult.columnDefs.Merchant'),
        translation: "TransactionsResult.columnDefs.Merchant",
        sortable: false,
        headerClassName: 'super-app-theme--header',
        width: 250,
        showInAdditionalColumn: true,
        nonSelectableField: true,
        defaultSelectedInAdditionalColumn: true,
        hide: false,
        type: FILTER_INPUT_TYPES.AUTOSELECT,
        renderHeader: () => (
          <CustomHeaderDispaly
          headingTop={i18n.t('TransactionsResult.columnDefs.Merchant')}
          />
        ),
      },
      {
        field: 'LegalNameInEnglish',
        headerName: i18n.t(
          'TransactionDetail.TransactionInfo.fields.LegalNameInEnglish',
        ),
        translation: "TransactionDetail.TransactionInfo.fields.LegalNameInEnglish",
        sortable: false,
        headerClassName: 'super-app-theme--header',
        width: 250,
        hide: false,
        showInAdditionalColumn: true,
        nonSelectableField: true,
        defaultSelectedInAdditionalColumn: true,
        type: FILTER_INPUT_TYPES.TEXT,
        renderHeader: () => (
          <CustomHeaderDispaly
          headingTop={i18n.t('TransactionDetail.TransactionInfo.fields.LegalNameInEnglish')}
          />
        ),
      },




      {
        field: 'has3DS',
        headerName: i18n.t('TransactionsResult.columnDefs.IntegrationMethod'),
        translation: "TransactionsResult.columnDefs.IntegrationMethod",
        sortable: false,
        headerClassName: 'super-app-theme--header',
        width: 140,
        align: 'left',
        hide: false,
        renderCell: function (params: any) {
          return (
            <>
              {params?.row?.has3DS === false
                ? 'Non 3DS'
                : params?.row?.has3DS === undefined
                  ? null
                  : '3DS'}
            </>
          );
        },
        showInAdditionalColumn: true,
        nonSelectableField: true,
        defaultSelectedInAdditionalColumn: true,
        type: FILTER_INPUT_TYPES.SELECTWITHOUTIN,
        renderHeader: () => (
          <CustomHeaderDispaly
          headingTop={i18n.t('TransactionsResult.columnDefs.IntegrationMethod')}
          />
        ),
      },
      {
        field: 'AcquirerCode',
        headerName: i18n.t('TransactionsResult.columnDefs.Acquirer'),
        translation: "TransactionsResult.columnDefs.Acquirer",
        sortable: false,
        headerClassName: 'super-app-theme--header',
        width: 120,
        align: 'left',
        hide: false,
        showInAdditionalColumn: true,
        renderCell: (params: any) => {
          if (params?.row?.AcquirerCode) {
            return params?.row?.AcquirerCode.toUpperCase()
          } else {
            return 'N/A'
          }
        },
        nonSelectableField: true,
        defaultSelectedInAdditionalColumn: true,
        type: FILTER_INPUT_TYPES.AUTOSELECT,
        renderHeader: () => (
          <CustomHeaderDispaly
          headingTop={i18n.t('TransactionsResult.columnDefs.Acquirer')}
          />
        ),
      },

      {
        field: 'TransactionType',
        headerName: i18n.t('TransactionsResult.columnDefs.TransactionType'),
        translation: "TransactionsResult.columnDefs.TransactionType",
        sortable: false,
        headerClassName: 'super-app-theme--header',
        width: 150,
        // hideFromFilter: false,
        hide: false,
        showInAdditionalColumn: true,
        nonSelectableField: true,
        defaultSelectedInAdditionalColumn: true,
        showInStatementTransaction: true,
        type: FILTER_INPUT_TYPES.SELECT,
        renderHeader: () => (
          <CustomHeaderDispaly
          headingTop={i18n.t('TransactionsResult.columnDefs.TransactionType')}
          />
        ),
        renderCell: (params: any) => {
          return (
            <>
              {params.row
                ? TRANSACTION_TYPE_LABEL[params.row.TransactionType]
                : ''}
            </>
          );
        }
      },


      {
        field: 'MerchantRefID',
        headerName: i18n.t('TransactionsResult.columnDefs.MerchantRefID'),
        translation: "TransactionsResult.columnDefs.MerchantRefID",
        sortable: false,
        width: 130,
        headerClassName: 'super-app-theme--header',
        hide: false,
        showInAdditionalColumn: true,
        nonSelectableField: true,
        defaultSelectedInAdditionalColumn: true,
        type: FILTER_INPUT_TYPES.TEXT,
        renderHeader: () => (
          <CustomHeaderDispaly
          headingTop={i18n.t('TransactionsResult.columnDefs.MerchantRefID')}
          />
        ),
      },
      {
        field: 'trackID',
        headerName: i18n.t('TransactionsResult.columnDefs.trackID'),
        translation: "TransactionsResult.columnDefs.trackID",
        sortable: false,
        width: 180,
        headerClassName: 'super-app-theme--header',
        hide: false,
        showInAdditionalColumn: true,
        defaultSelectedInAdditionalColumn: false,
        type: FILTER_INPUT_TYPES.TEXT,
        renderCell: (params: any) => (
          <div style={{ display: "flex", flexDirection: "column", height: "50px", justifyContent: "center" }}>
            <CustomBodyRowDisplay rowTopValue={params.row?.trackID === "N/A" ? "N/A" : <DasCopyComponent text={params.row?.trackID} truncate={true} />}  rowTopClassName={"track-id-copy-value"}/>
          </div>
        ),
        renderHeader: () => (
          <CustomHeaderDispaly
          headingTop={i18n.t('TransactionsResult.columnDefs.trackID')}
          />
        ),
      },
      {
        field: 'AcquirerMID',
        headerName: i18n.t('TransactionsResult.columnDefs.AcquirerMID'),
        translation: "TransactionsResult.columnDefs.AcquirerMID",
        sortable: false,
        width: 180,
        headerClassName: 'super-app-theme--header',
        hide: false,
        showInAdditionalColumn: true,
        defaultSelectedInAdditionalColumn: false,
        type: FILTER_INPUT_TYPES.AUTOSELECT,
        renderCell: (params: any) => (
          <div style={{ display: "flex", flexDirection: "column", height: "50px", justifyContent: "center" }}>
            <CustomBodyRowDisplay rowTopValue={params.row?.AcquirerMID === "N/A" ? "N/A" : <DasCopyComponent text={params.row?.AcquirerMID} truncate={true} />}  rowTopClassName={"track-id-copy-value"}/>
          </div>
        ),
        renderHeader: () => (
          <CustomHeaderDispaly
          headingTop={i18n.t('TransactionsResult.columnDefs.AcquirerMID')}
          />
        ),
      },
      {
        field: 'AuthCode',
        headerName: i18n.t('TransactionsResult.columnDefs.AuthCode'),
        translation: "TransactionsResult.columnDefs.AuthCode",
        sortable: false,
        width: 110,
        headerClassName: 'super-app-theme--header',
        hide: false,
        showInAdditionalColumn: true,
        defaultSelectedInAdditionalColumn: false,
        type: FILTER_INPUT_TYPES.TEXT,
        renderHeader: () => (
          <CustomHeaderDispaly
          headingTop={i18n.t('TransactionsResult.columnDefs.AuthCode')}
          />
        ),
      },
      {
        field: 'CurrencyCode',
        headerName: i18n.t('TransactionsResult.columnDefs.CurrencyCode'),
        translation: "TransactionsResult.columnDefs.CurrencyCode",
        sortable: false,
        width: 130,
        headerClassName: 'super-app-theme--header',
        hide: false,
        showInAdditionalColumn: false,
        defaultSelectedInAdditionalColumn: true,
        type: FILTER_INPUT_TYPES.SELECT,
        renderHeader: () => (
          <CustomHeaderDispaly
          headingTop={i18n.t('TransactionsResult.columnDefs.CurrencyCode')}
          />
        ),
      },
      {
        field: 'ProductType',
        headerName: i18n.t('TransactionsResult.columnDefs.productType'),
        translation: "TransactionsResult.columnDefs.productType",
        sortable: false,
        width: 130,
        headerClassName: 'super-app-theme--header',
        hide: false,
        showInAdditionalColumn: true,
        defaultSelectedInAdditionalColumn: false,
        type: FILTER_INPUT_TYPES.SELECT,
        renderHeader: () => (
          <CustomHeaderDispaly
          headingTop={i18n.t('TransactionsResult.columnDefs.productType')}
          />
        ),
      },
      // {
      //   field: 'V2UUID',
      //   headerName: i18n.t('TransactionsResult.columnDefs.V2UUID'),
      //   translation: "TransactionsResult.columnDefs.V2UUID",
      //   sortable: false,
      //   width: 130,
      //   headerClassName: 'super-app-theme--header',
      //   hide: true,
      //   showInAdditionalColumn: false,
      //   defaultSelectedInAdditionalColumn: false,
      //   type: FILTER_INPUT_TYPES.TEXT,
      // },
      {
        field: 'SubscriptionId',
        headerName: i18n.t('TransactionsResult.columnDefs.subscriptionID'),
        translation: "TransactionsResult.columnDefs.subscriptionID",
        sortable: false,
        width: 260,
        headerClassName: 'super-app-theme--header',
        hide: false,
        showInAdditionalColumn: true,
        defaultSelectedInAdditionalColumn: false,
        type: FILTER_INPUT_TYPES.TEXT,
        renderHeader: () => (
          <CustomHeaderDispaly
          headingTop={i18n.t('TransactionsResult.columnDefs.subscriptionID')}
          />
        ),
      },
      {
        field: 'TerminalId',
        headerName: i18n.t('TransactionsResult.columnDefs.TerminalID'),
        translation: "TransactionsResult.columnDefs.TerminalID",
        sortable: false,
        width: 110,
        headerClassName: 'super-app-theme--header',
        hide: false,
        showInAdditionalColumn: true,
        defaultSelectedInAdditionalColumn: false,
        type: FILTER_INPUT_TYPES.NUMBERSTRING,
        renderHeader: () => (
          <CustomHeaderDispaly
          headingTop={i18n.t('TransactionsResult.columnDefs.TerminalID')}
          />
        ),
      },
      {
        field: 'TerminalName',
        headerName: i18n.t('TransactionsResult.columnDefs.TerminalName'),
        translation: "TransactionsResult.columnDefs.TerminalName",
        sortable: false,
        width: 120,
        headerClassName: 'super-app-theme--header',
        hide: false,
        showInAdditionalColumn: true,
        defaultSelectedInAdditionalColumn: false,
        type: FILTER_INPUT_TYPES.TEXT,
        renderHeader: () => (
          <CustomHeaderDispaly
          headingTop={i18n.t('TransactionsResult.columnDefs.TerminalName')}
          />
        ),
      },
      {
        field: 'PBLLinkName',
        flex: 1,
        headerName: i18n.t('PayByLinkConfiguration.PayByLink_ColumnDefs.linkname'),
        translation: "PayByLinkConfiguration.PayByLink_ColumnDefs.linkname",
        minWidth: 120,
        headerClassName: 'super-app-theme--header',
        renderCell: (params: any) =>
          params?.row?.PBLLinkName ? params?.row?.PBLLinkName : 'N/A',
        hide: false,
        showInAdditionalColumn: true,
        defaultSelectedInAdditionalColumn: false,
        type: FILTER_INPUT_TYPES.TEXT,
        renderHeader: () => (
          <CustomHeaderDispaly
          headingTop={i18n.t('PayByLinkConfiguration.PayByLink_ColumnDefs.linkname')}
          />
        ),
      },
      {
        field: 'IntegrationType',
        headerName: i18n.t('TransactionsResult.columnDefs.IntegrationType'),
        sortable: false,
        headerClassName: 'super-app-theme--header',
        width: 200,
        type: FILTER_INPUT_TYPES.SELECTWITHOUTIN,
        // hideFromFilter: false,
        renderHeader: () => (
          <CustomHeaderDispaly
          headingTop={i18n.t('TransactionsResult.columnDefs.IntegrationType')}
          />
        ),
        renderCell: (params: any) => {
          return (
            <>
              {params.row
                ? INTEGRATION_TYPE[params.row.IntegrationType]
                : 'N/A'}
            </>
          );
        }
      },
    ],
  };
  return data;
};
export default columns;
