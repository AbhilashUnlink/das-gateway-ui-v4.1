
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import Typography from '@mui/material/Typography';
import useDateFormatter from 'hooks/date-preference/useDateFormatter';
import { Button } from '@mui/material';
import useGetParameter from 'hooks/router/useGetParameter';
import { useNavigate } from 'react-router';
import { getAmount, getCurrency } from 'utils/helper';
import { getAmountWithCurrency } from 'utils/helper';
import { CHARGE_BACK_CASE_TYPE_STATUS } from 'config/common/charge-back-types';
import '../../../../style.css';
import { useTranslation } from 'react-i18next';

export default function DisputeHistoryTimeline({ timeLineData = [],
    loading = false }: any) {
    const { filterDateFormatter } = useDateFormatter();
    const TransactionID = useGetParameter("uuid");
    const ChargeBackID = useGetParameter("ChargeBackID");
    const navigate = useNavigate();
    const { t } = useTranslation();
    return (
        <div style={{ borderTop: '1px solid #ccc', marginTop: "10px" }}>
            <h4 className='h-time-heading'>{t('TransactionDetailDrawerBody.ChargebackHistory.Heading')}</h4>
            <Timeline sx={{ marginTop: "20px", height: '70vh', overflow: 'hidden' }} >
                {timeLineData && timeLineData?.length > 0 && timeLineData?.map((key: any, index: number) => {
                    let data = Object.entries(key)[0];
                    const caseHistoryStatus = data[0];
                    const caseHistoryList: any = data[1];
                    const obj = {
                        ChargeBackID: caseHistoryList[0]?.ChargeBackId,
                        CaseType: caseHistoryStatus,
                        Amount: caseHistoryList[0]?.Amount,
                        Currency: caseHistoryList[0]?.Currency,
                        CreatedAt: caseHistoryList?.find((s: any) => s.Status === caseHistoryStatus)?.CreatedAt
                    };

                    return (
                        <Button
                            sx={loading ? {
                                pointerEvents: "none",
                                opacity: ".9",
                            } : {

                            }}
                            key={index}
                            onClick={() => {
                                if (TransactionID !== obj.ChargeBackID) {
                                    navigate(`/dispute-management/list?TransactionID=${TransactionID}&ChargeBackID=${obj.ChargeBackID}`);
                                }
                            }}
                        >
                            <TimelineItem className="timeline-transactionlist" key={index}>
                                <TimelineOppositeContent
                                    sx={{ m: 'auto 0', display: 'none' }}
                                    align="right"
                                    variant="body2"
                                    color="text.secondary"
                                    className="timeline-date-section"
                                ></TimelineOppositeContent>
                                <TimelineSeparator className="timeline-seprator">
                                    <TimelineConnector />
                                    <strong className={`timeline-icons dispute-timeline-icons ${obj.ChargeBackID === ChargeBackID ? "is-dot-selected" : ""}`}></strong>
                                    <TimelineConnector />
                                </TimelineSeparator>
                                <TimelineContent
                                    className={`transaction-history-content timeline-dispute-content
              ${obj.ChargeBackID === ChargeBackID ? "is-selected" : ""}`}
                                    sx={{ py: '12px', px: 2 }}
                                >
                                    <Typography
                                        className={`transaction-history-type`}
                                    >
                                        {CHARGE_BACK_CASE_TYPE_STATUS[obj.CaseType]}
                                    </Typography>
                                    <Typography className="timeline-date-section">
                                        <span>
                                            {filterDateFormatter(obj?.CreatedAt)}
                                        </span>
                                    </Typography>
                                    <Typography className="transaction-history-amonut">
                                        {getAmountWithCurrency(getAmount(obj?.Amount, obj?.Currency), getCurrency(obj?.Currency))}
                                    </Typography>
                                </TimelineContent>
                            </TimelineItem>
                        </Button>
                    );
                }
                )}
            </Timeline>
        </div>
    );
}
