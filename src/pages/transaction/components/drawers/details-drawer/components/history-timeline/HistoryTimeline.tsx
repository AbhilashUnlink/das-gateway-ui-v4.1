import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineOppositeContent,
} from '@mui/lab';
import { Button, Typography } from '@mui/material';

import {
  getCurrency,
  getAmount,
  getTransactionTypeIconClass,
  getAmountWithCurrency,
} from 'utils/helper';
import { getDetails } from 'store/features/details';
import { useDispatch } from 'react-redux';

// import { TRANSACTION_DETAILS_LINK } from '../../../../constants/url';
import { TRANSACTION_TYPE_LABEL } from '../../../../constants/transaction';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import useDateFormatter from 'hooks/date-preference/useDateFormatter';
import DisputeHistoryTimeline from './DisputeHistoryTimeLine';
import { useNavigate } from 'react-router';

const TransactionHistoryTimeline = ({
  timeLineData = '',
  currentTransactionId = [],
  openDrawer = false,
  loading = false,
  caseHistory = null,
  chargeBackID = '',
}: any) => {
  const [currentSelectedId, setCurrentSelectedId] = useState(currentTransactionId);
  const isCurrentTransactionIdSelected = (id: any) => {
    if (id === currentSelectedId) {
      return 'is-selected';
    }
  };
  const { filterDateFormatter } = useDateFormatter();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    setCurrentSelectedId(currentTransactionId);
  }, [currentTransactionId]);

  return (
    <>
      <h4 className='h-time-heading'>{t('TransactionDetail.TransactionTabList.Transaction History')}</h4>
      <Timeline>
        {timeLineData &&
          timeLineData.map((key: any, index: number) => (
            <Button
              sx={loading ? {
                pointerEvents: "none",
                opacity: ".9"
              } : {

              }}
              key={index}
              onClick={() => {
                if (currentSelectedId !== key.uuid) {
                  setCurrentSelectedId(key.uuid);
                  dispatch(getDetails({ uuid: key.uuid, openDrawer, navigate, chargeBackID }));
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
                  <img
                    className="timeline-icons"
                    src={getTransactionTypeIconClass(
                      key.TransactionType,
                      key.status,
                    )}
                    alt="icon"
                  />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent
                  className={`transaction-history-content ${isCurrentTransactionIdSelected(
                    key.uuid,
                  )}`}
                  sx={{ py: '12px', px: 2 }}
                >
                  <Typography className="transaction-history-type">
                    {TRANSACTION_TYPE_LABEL[key.TransactionType]}
                  </Typography>
                  <Typography className="timeline-date-section">
                    <span>
                      {key?.UpdatedAt ? filterDateFormatter(
                        key?.UpdatedAt
                      ) : filterDateFormatter(
                        key?.CreatedAt
                      )}
                    </span>
                  </Typography>
                  <Typography className="transaction-history-amonut">
                    {getAmountWithCurrency(getAmount(key.amount, key.CurrencyCode), getCurrency(key.CurrencyCode))}
                  </Typography>
                </TimelineContent>
              </TimelineItem>
            </Button>
          ))}
      </Timeline>
      {caseHistory &&
        <DisputeHistoryTimeline
          timeLineData={caseHistory}
        />}
    </>
  );
};

export default TransactionHistoryTimeline;
