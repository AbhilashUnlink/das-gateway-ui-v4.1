

export const extraTransactionList: any = {
    "DAS Lite": {
        "order": [
            "action",
            "Date",
            "amount",
            "status",
            "ProductType",
            "Scheme",
            "TransactionType",
            "CurrencyCode"
        ],
        "unChecked": [
            "uuid",
            "TransactionID",
            "LegalName",
            "LegalNameInEnglish",
            "UpdatedDate",
            "DASMID",
            "has3DS",
            "AcquirerCode",
            "CardNumber",
            "PaymentType",
            "MerchantRefID",
            "trackID",
            "AcquirerMID",
            "AuthCode",
            "SubscriptionId",
            "TerminalId",
            "TerminalName",
            "PBLLinkName",
            "IntegrationType"
        ],
        "updatedList": [
            {
                "field": "Date",
                "headerName": "TransactionsResult.columnDefs.Date",
                "id": 7
            },
            {
                "field": "amount",
                "headerName":"TransactionsResult.columnDefs.Amount",
                "id": 5
            },
            {
                "field": "status",
                "headerName": "TransactionsResult.columnDefs.status",
                "id": 6
            },
            {
                "field": "ProductType",
                "headerName": "TransactionsResult.columnDefs.productType",
                "id": 20
            },
            {
                "field": "Scheme",
                "headerName":"TransactionsResult.columnDefs.Scheme",
                "id": 10
            },
            {
                "field": "TransactionID",
                "headerName": "TransactionsResult.columnDefs.TransactionID",
                "id": 1
            },
            {
                "field": "uuid",
                "headerName": "TransactionsResult.columnDefs.TransactionRefID",
                "id": 2
            },
            {
                "field": "LegalName",
                "headerName": "TransactionsResult.columnDefs.Merchant",
                "id": 3
            },
            {
                "field": "LegalNameInEnglish",
                "headerName": "TransactionsResult.columnDefs.MerchantAccountEnglish",
                "id": 4
            },
            {
                "field": "UpdatedDate",
                "headerName": "TransactionsResult.columnDefs.UpdatedTransactionDate",
                "id": 8
            },
            {
                "field": "DASMID",
                "headerName": "TransactionsResult.columnDefs.DASMID",
                "id": 9
            },
            {
                "field": "has3DS",
                "headerName": "TransactionsResult.columnDefs.IntegrationMethod",
                "id": 11
            },
            {
                "field": "AcquirerCode",
                "headerName": "TransactionsResult.columnDefs.Acquirer",
                "id": 12
            },
            {
                "field": "TransactionType",
                "headerName": "TransactionsResult.columnDefs.TransactionType",
                "id": 13
            },
            {
                "field": "CardNumber",
                "headerName": "TransactionsResult.columnDefs.CardNumber",
                "id": 14
            },
            {
                "field": "MerchantRefID",
                "headerName": "TransactionsResult.columnDefs.MerchantRefID",
                "id": 15
            },
            {
                "field": "trackID",
                "headerName": "TransactionsResult.columnDefs.trackID",
                "id": 16
            },
            {
                "field": "AcquirerMID",
                "headerName": "TransactionsResult.columnDefs.AcquirerMID",
                "id": 17
            },
            {
                "field": "AuthCode",
                "headerName": "TransactionsResult.columnDefs.AuthCode",
                "id": 18
            },
            {
                "field": "CurrencyCode",
                "headerName": "TransactionsResult.columnDefs.CurrencyCode",
                "id": 19
            },
            {
                "field": "SubscriptionId",
                "headerName": "TransactionsResult.columnDefs.subscriptionID",
                "id": 21
            },
            {
                "field": "TerminalId",
                "headerName": "TransactionsResult.columnDefs.TerminalID",
                "id": 22
            },
            {
                "field": "TerminalName",
                "headerName": "TransactionsResult.columnDefs.TerminalName",
                "id": 23
            },
            {
                "field": "PBLLinkName",
                "headerName": "TransactionsResult.columnDefs.LinkName",
                "id": 24
            },
            {
                "field": "IntegrationType",
                "headerName": "TransactionsResult.columnDefs.IntegrationType",
                "id": 24
            },
            {
                "field": "PaymentType",
                "headerName": "TransactionsResult.columnDefs.PaymentType",
                "id": 25
            },
        ]
    }
};

export const extraStatementList: any = {
    "DAS Lite": {
        "order": [
            "action",
            "Date",
            "DASMID",
            "StatementID",
            "amount"
        ],
        "unChecked": [
            "ROLLING_RESERVE_HELD",
            "ROLLING_RESERVE_HELD_AMOUNT",
            "ROLLING_RESERVE_RELEASED",
            "RollingReservesHeldYTDAmount",
            "FixedDepositHeldYTDAmount",
            "SettlementStatus",
            "WiredStatus",
            "ReleasedDate",
            "Payout_Date",
            "AdjustmentsAmount",
            "NetSales",
            "TotalFees",
            "TRANSACTION_START_DATE",
            "TRANSACTION_END_DATE"
        ],
        "updatedList": [
            {
                "field": "Date",
                "headerName":
                    'FinanceStatements.Statement_Transactions.Statement Date',

                "id": 1
            },
            {
                "field": "DASMID",
                "headerName": 'FinanceStatements.Statement_Transactions.DASMID',
                "id": 2
            },
            {
                "field": "StatementID",
                "headerName": 'FinanceStatements.Statement_ColumnDefs.STATEMENT_ID',
                "id": 3
            },
            {
                "field": "amount",
                "headerName": 'FinanceStatements.Statement_ColumnDefs.amount',
                "id": 4
            },
            {
                "field": "ROLLING_RESERVE_HELD",
                "headerName": 'FinanceStatements.Statement_ColumnDefs.ROLLING_RESERVE_HELD',
                "id": 5
            },
            {
                "field": "ROLLING_RESERVE_HELD_AMOUNT",
                "headerName": 'FinanceStatements.Statement_ColumnDefs.ROLLING_RESERVE_HELD_AMOUNT',
                "id": 6
            },
            {
                "field": "ROLLING_RESERVE_RELEASED",
                "headerName": 'FinanceStatements.Statement_ColumnDefs.ROLLING_RESERVE_RELEASED',
                "id": 7
            },
            {
                "field": "RollingReservesHeldYTDAmount",
                "headerName": 'FinanceStatements.Statement_ColumnDefs.CUMULATIVE_RESERVES',
                "id": 8
            },
            {
                "field": "FixedDepositHeldYTDAmount",
                "headerName": 'FinanceStatements.Statement_ColumnDefs.FixedDepositHeldYTDAmount',
                "id": 9
            },
            {
                "field": "SettlementStatus",
                "headerName": 'FinanceStatements.Statement_ColumnDefs.STATUS',
                "id": 10
            },
            {
                "field": "WiredStatus",
                "headerName": 'FinanceStatements.Statement_ColumnDefs.Wired_Status',
                "id": 11
            },
            {
                "field": "ReleasedDate",
                "headerName": 'FinanceStatements.Statement_ColumnDefs.ReleasedDate',
                "id": 12
            },
            {
                "field": "Payout_Date",
                "headerName": 'FinanceStatements.Statement_ColumnDefs.Payout_Date',
                "id": 13
            },
            {
                "field": "AdjustmentsAmount",
                "headerName": 'FinanceStatements.Statement_ColumnDefs.AdjustmentsAmount',
                "id": 14
            },
            {
                "field": "NetSales",
                "headerName":'FinanceStatements.Statement_ColumnDefs.NET_SALES',
                "id": 15
            },
            {
                "field": "TotalFees",
                "headerName": 'FinanceStatements.Statement_ColumnDefs.TOTAL_FEES',
                "id": 16
            },
            {
                "field": "TRANSACTION_START_DATE",
                "headerName":'FinanceStatements.Statement_ColumnDefs.TRANSACTION_START_DATE',
                "id": 17
            },
            {
                "field": "TRANSACTION_END_DATE",
                "headerName": 'FinanceStatements.Statement_ColumnDefs.TRANSACTION_END_DATE',
                "id": 18
            }
        ]
    }
};