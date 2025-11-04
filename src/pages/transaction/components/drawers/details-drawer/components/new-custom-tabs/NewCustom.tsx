import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { hasAccess } from "../../../../../../../utils/has-access";
import TransactionHistoryTimeline from "../history-timeline/HistoryTimeline";
import SubscriptionDetailPopup from "../subscription-detail/SubscriptionDetailPopup";
import TokenizationDetails from "../tokenization-detail/TokenizationDetails";
import StatusAuditLog from "../status-audit/StatusAuditLog";
import CaseHistory from "../case-history/CaseHistory";
import HistoryIcon from '@mui/icons-material/History';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import TokenOutlinedIcon from '@mui/icons-material/TokenOutlined';
import PlaylistAddCheckOutlinedIcon from '@mui/icons-material/PlaylistAddCheckOutlined';
import WorkHistoryOutlinedIcon from '@mui/icons-material/WorkHistoryOutlined';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import { Tooltip } from "@mui/material";
import OrderOverView from "../order-overview/OrderOverview";


const NewCustom = ({ transactionDetail, loading = false }: any) => {
    const { t } = useTranslation();
    const caseHistory = useSelector((store: any) => store?.details?.chargeBackData);
    const timeLineData = transactionDetail && transactionDetail?.TransactionHistory;
    const currentTransactionId = transactionDetail && transactionDetail?.TransactionRefID;
    const SubscriptionDetails = transactionDetail && transactionDetail?.SubscriptionDetails?.TransactionHistory;
    const TokenizedTransactionHistory = transactionDetail && transactionDetail?.TokenizedTransactionHistory;
    const showSubscriptionDetailPopup = SubscriptionDetails && SubscriptionDetails?.length > 0;
    const showTokenizationDetails = TokenizedTransactionHistory && TokenizedTransactionHistory?.length > 0;
    const showCaseHistory = caseHistory && caseHistory?.length > 0;
    const accessOfTransactionLog = hasAccess('EDIT_STATUS_BUTTON');
    const showAuditLog = transactionDetail && transactionDetail?.TransactionLog?.length > 0 && accessOfTransactionLog;
    const OrderOverviewData = transactionDetail && transactionDetail?.ProductDetails;
    const showOverviewData = OrderOverviewData && OrderOverviewData?.length > 0;
    const currency = transactionDetail?.CurrencyCode;
    //const reqID = transactionDetail?.RequestID;
    const tabsList = [
        {
            id: 0,
            label: t('TransactionDetail.TransactionTabList.Transaction History'),
            icon: <HistoryIcon />,
            show: true,
            Component: (
                <TransactionHistoryTimeline
                    timeLineData={timeLineData}
                    currentTransactionId={currentTransactionId}
                    loading={loading}
                    caseHistory={caseHistory}
                />
            ),
        },
        {
            id: 1,
            label: t('TransactionDetail.TransactionTabList.Subscription History'),
            show: showSubscriptionDetailPopup || false,
            icon: <CalendarMonthIcon />,
            Component: (
                <SubscriptionDetailPopup
                    SubscriptionDetails={SubscriptionDetails}
                    currentTransactionId={currentTransactionId}
                />
            ),
        },
        {
            id: 2,
            label: t('TransactionDetail.TransactionTabList.Tokenization History'),
            show: showTokenizationDetails || false,
            icon: <TokenOutlinedIcon />,
            Component: (
                <TokenizationDetails
                    TokenizedTransactionHistory={TokenizedTransactionHistory}
                    currentTransactionId={currentTransactionId}
                />
            ),
        },
        {
            id: 3,
            label: t('TransactionDetail.TransactionTabList.Audit Log'),
            show: showAuditLog || false,
            icon: <PlaylistAddCheckOutlinedIcon />,
            Component: (
                <StatusAuditLog
                    TransactionLog={
                        transactionDetail?.TransactionLog
                    }
                />
            ),
        },
        {
            id: 4,
            label: t('TransactionDetail.TransactionTabList.Chargeback History'),
            show: showCaseHistory || false,
            icon: <WorkHistoryOutlinedIcon />,
            Component: (
                <CaseHistory
                    caseHistory={caseHistory}
                />
            ),
        },
        {
            id: 5,
            label: t('TransactionDetail.TransactionTabList.Order Overview'),
            show: showOverviewData || false,
            icon: <InventoryOutlinedIcon />,
            Component: (
                <OrderOverView
                    OrderOverviewData={OrderOverviewData}
                    currency={currency}
                />
            ),
        },
    ];

    const [value, setValue] = useState(0);
    return (
        <>
            <div className="tab-buttons-transaction-details">
                {
                    tabsList && tabsList?.length > 0 && tabsList?.filter((item: any) => item.show)?.map((item: any, index: number) => {
                        return (<div key={index} className={value === item.id ? "active right-list" : "right-list"} onClick={() => {
                            setValue(item.id);
                        }}>
                            <Tooltip title={item.label} arrow>
                                <span className="icon-img-list">
                                    {item.icon}
                                </span>
                            </Tooltip>
                        </div>
                        );
                    })
                }
            </div>
            <div className="scrollable-section">
                {
                    tabsList && tabsList?.length > 0 ? tabsList?.find((item: any) => item.id === value)?.Component : <></>
                }
            </div>
        </>

    );
};

export default NewCustom;