/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  getAmount,
  getAmountWithCurrency,
  getCardType,
  getStatusIcon,
} from '../../../../../utils/helper';
import { INTEGRATION_TYPE, PAYMENT_TYPE, TRANSACTION_TYPE_LABEL } from '../../constants/transaction';
import ActionButton from '../../buttons/ActionButton';
import { Tooltip } from '@mui/material';
import i18n from 'i18n';
import { FILTER_INPUT_TYPES } from 'components/popper/constants/filter-constants';
import { BookmarkBorderOutlined } from '@mui/icons-material';


export const columns: any = (filterDateFormatter: any) => {
  const data = {
    fields: [
      {
        field: 'action',
        headerName: i18n.t('TransactionsResult.columnDefs.Action'),
        renderHeader: () => (
          <div style={{ marginLeft: "10px", color: "orange" }}>
            <BookmarkBorderOutlined />
          </div>
        ),
        translation: "TransactionsResult.columnDefs.Action",
        sortable: false,
        headerClassName: 'super-app-theme--header',
        width: 80,
        renderCell: (params: any) => <ActionButton data={params.row} />,
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
        width: 260,
        hideable: false,
        renderCell: (params: any) => (
          <div style={{ display: "flex", flexDirection: "column", height: "50px", justifyContent: "center" }}>
            <div className="table-header-top-label value">{params.row?.uuid}</div>
            <div>{params.row?.TransactionID}</div>
          </div>
        ),
        renderHeader: () => (
          <div>
            <div className="table-header-top-label">
              {i18n.t('TransactionsResult.columnDefs.TransactionRefID')}
            </div>
            <div>{i18n.t('TransactionsResult.columnDefs.TransactionID')}</div>
          </div>
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
      },
      {
        field: 'amount',
        headerName: i18n.t('TransactionsResult.columnDefs.Amount'),
        translation: "TransactionsResult.columnDefs.Amount",
        sortable: false,
        headerClassName: 'super-app-theme--header',
        width: 120,
        align: 'left',
        valueGetter: (_params: any, row: any) => {
          // on statement transaction we are getting Amount and on transaction we are getting amount
          const transactionAmount = row?.amount || row?.Amount;
          if (row?.CurrencyCode) {
            return getAmountWithCurrency(getAmount(transactionAmount, row?.CurrencyCode), row?.CurrencyCode);
          } else {
            return "N/A"
          }
        },
        hide: false,
        showInAdditionalColumn: true,
        nonSelectableField: true,
        defaultSelectedInAdditionalColumn: true,
        showInStatementTransaction: true,
        type: FILTER_INPUT_TYPES.NUMBER,
      },
      {
        field: 'status',
        headerName: i18n.t('TransactionsResult.columnDefs.status'),
        type: FILTER_INPUT_TYPES.SELECT,
        translation: "TransactionsResult.columnDefs.status",
        renderCell: (params: any) => {
          // on statement transaction we are getting Amount and on transaction we are getting amount
          const transactionStatus = params?.row?.status || params?.row?.Status;
          const GatewayError = i18n.t('TransactionsResult.columnDefs.GatewayError');
          const ResponseCode = i18n.t('TransactionsResult.columnDefs.ResponseCode');
          return (
            <>
              {transactionStatus === 'NOTSUCCESSFUL' ?
                <Tooltip title={
                  <>
                    <ol>
                      <li className="products-names"><strong>{ResponseCode}:</strong> {params.row?.ResponseCode}</li>
                      <li className="products-names"><strong>{GatewayError}:</strong> {params.row?.GatewayResponse}</li>
                    </ol>
                  </>
                } arrow>
                  <img
                    src={getStatusIcon(transactionStatus)}
                    className="transaction-status-icons"
                    alt={transactionStatus}
                  />
                </Tooltip>
                : <img
                  src={getStatusIcon(transactionStatus)}
                  className="transaction-status-icons"
                  alt={transactionStatus}
                />
              }
              {params.row
                ? TRANSACTION_TYPE_LABEL[params.row.TransactionType]?.toUpperCase()
                : ''}
            </>
          );
        },
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
        field: 'Date',
        headerName: i18n.t('TransactionsResult.columnDefs.Date'),
        translation: "TransactionsResult.columnDefs.Date",
        sortable: false,
        headerClassName: 'super-app-theme--header',
        minWidth: 220,
        hide: false,
        valueGetter: (_params: any, row: any) =>
          row?.Date &&
          filterDateFormatter(row?.Date),
        showInAdditionalColumn: true,
        nonSelectableField: true,
        defaultSelectedInAdditionalColumn: true,
        showInStatementTransaction: true,
        type: FILTER_INPUT_TYPES.NEWDATERANGEPICKER,
      },
      {
        field: 'UpdatedDate',
        headerName: i18n.t('TransactionsResult.columnDefs.UpdatedTransactionDate'),
        translation: "TransactionsResult.columnDefs.UpdatedTransactionDate",
        sortable: false,
        headerClassName: 'super-app-theme--header',
        minWidth: 220,
        hide: false,
        valueGetter: (_params: any, row: any) =>
          row?.UpdatedDate &&
          filterDateFormatter(row?.UpdatedDate),
        nonSelectableField: true,
        defaultSelectedInAdditionalColumn: true,
        showInStatementTransaction: true,
        showInAdditionalColumn: true,
        type: FILTER_INPUT_TYPES.NEWDATERANGEPICKER,
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
      },
      {
        field: 'Scheme',
        headerName: i18n.t('TransactionsResult.columnDefs.Scheme'),
        translation: "TransactionsResult.columnDefs.Scheme",
        sortable: false,
        headerClassName: 'super-app-theme--header',
        width: 80,
        hide: false,
        renderCell: function (params: any) {
          return (
            <>
              <img
                src={getCardType(params.row.Scheme)}
                className="transaction-scheme-icons"
                alt=""
              />
            </>
          );
        },
        showInAdditionalColumn: true,
        nonSelectableField: true,
        defaultSelectedInAdditionalColumn: true,
        type: FILTER_INPUT_TYPES.SELECT,
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
      },
      {
        field: 'PaymentType',
        headerName: i18n.t('TransactionsResult.columnDefs.PaymentType'),
        translation: "TransactionsResult.columnDefs.PaymentType",
        sortable: false,
        headerClassName: 'super-app-theme--header',
        width: 120,
        align: 'left',
        hide: false,
        showInAdditionalColumn: true,
        renderCell: (params: any) =>
          params?.row?.PaymentType ? PAYMENT_TYPE[(params?.row?.PaymentType)].toUpperCase() : 'N/A',
        nonSelectableField: true,
        showInStatementTransaction: true,
        defaultSelectedInAdditionalColumn: true,
        type: FILTER_INPUT_TYPES.AUTOSELECT,
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
        field: 'CardNumber',
        headerName: i18n.t('TransactionsResult.columnDefs.CardNumber'),
        translation: "TransactionsResult.columnDefs.CardNumber",
        sortable: false,
        width: 130,
        headerClassName: 'super-app-theme--header',
        hide: false,
        showInAdditionalColumn: true,
        nonSelectableField: true,
        defaultSelectedInAdditionalColumn: true,
        showInStatementTransaction: true,
        type: FILTER_INPUT_TYPES.TEXT,
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
      },
      {
        field: 'trackID',
        headerName: i18n.t('TransactionsResult.columnDefs.trackID'),
        translation: "TransactionsResult.columnDefs.trackID",
        sortable: false,
        width: 260,
        headerClassName: 'super-app-theme--header',
        hide: false,
        showInAdditionalColumn: true,
        defaultSelectedInAdditionalColumn: false,
        type: FILTER_INPUT_TYPES.TEXT,
      },
      {
        field: 'AcquirerMID',
        headerName: i18n.t('TransactionsResult.columnDefs.AcquirerMID'),
        translation: "TransactionsResult.columnDefs.AcquirerMID",
        sortable: false,
        width: 130,
        headerClassName: 'super-app-theme--header',
        hide: false,
        showInAdditionalColumn: true,
        defaultSelectedInAdditionalColumn: false,
        type: FILTER_INPUT_TYPES.AUTOSELECT,
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
      },
      {
        field: 'V2UUID',
        headerName: i18n.t('TransactionsResult.columnDefs.V2UUID'),
        translation: "TransactionsResult.columnDefs.V2UUID",
        sortable: false,
        width: 130,
        headerClassName: 'super-app-theme--header',
        hide: true,
        showInAdditionalColumn: false,
        defaultSelectedInAdditionalColumn: false,
        type: FILTER_INPUT_TYPES.TEXT,
      },
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
      },
      {
        field: 'PBLLinkName',
        flex: 1,
        headerName: i18n.t('PayByLinkConfiguration.PayByLink_ColumnDefs.linkname'),
        translation: "PayByLinkConfiguration.PayByLink_ColumnDefs.linkname",
        minWidth: 120,
        renderCell: (params: any) =>
          params?.row?.PBLLinkName ? params?.row?.PBLLinkName : 'N/A',
        hide: false,
        showInAdditionalColumn: true,
        defaultSelectedInAdditionalColumn: false,
        type: FILTER_INPUT_TYPES.TEXT,
      },
      {
        field: 'IntegrationType',
        headerName: i18n.t('TransactionsResult.columnDefs.IntegrationType'),
        sortable: false,
        headerClassName: 'super-app-theme--header',
        width: 200,
        type: FILTER_INPUT_TYPES.SELECTWITHOUTIN,
        // hideFromFilter: false,

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
