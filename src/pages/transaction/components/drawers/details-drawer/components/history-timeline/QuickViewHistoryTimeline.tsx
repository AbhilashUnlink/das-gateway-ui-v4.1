import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineOppositeContent,
} from '@mui/lab';
import { Accordion, AccordionDetails, AccordionSummary, Button, Typography } from '@mui/material';

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
import { useNavigate } from 'react-router';
import { GridExpandMoreIcon } from '@mui/x-data-grid';

const QuickViewHistoryTimeline = ({
  timeLineData = '',
  currentTransactionId = [],
  openDrawer = false,
  loading = false,
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
    <>
    <Accordion>
        <AccordionSummary
          expandIcon={<GridExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography component="span">{t('TransactionDetail.TransactionTabList.Transaction History')}</Typography>
        </AccordionSummary>
    <AccordionDetails>
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
                  <span className={`transaction-history-side-dot ${isCurrentTransactionIdSelected(
                    key.uuid,
                  )}`}></span>
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent
                  className={`transaction-history-content ${isCurrentTransactionIdSelected(
                    key.uuid,
                  )}`}
                  sx={{ py: '12px', px: 2 }}
                >
                  <Typography className="transaction-history-amt-wrap flex">
                  <span className="transaction-history-amonut">
                    {getAmountWithCurrency(getAmount(key.amount, key.CurrencyCode), getCurrency(key.CurrencyCode))}
                  </span>
                    <span className="transaction-history-type"
                    style={{
                      color: colors[key.status].color,
                      backgroundColor: colors[key.status].bgcolor,
                      borderRadius: "4px",
                      padding: "2px 6px",
                      width: "fit-content",
                      fontWeight: 500,
                      fontSize:'12px',
                      position:'relative',
                      top:'-3px'
                    }}
                    >{TRANSACTION_TYPE_LABEL[key.TransactionType]}</span>
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
                </TimelineContent>
              </TimelineItem>
            </Button>
          ))}
      </Timeline>
    </AccordionDetails>
        </Accordion>

    </>
  );
};

export default QuickViewHistoryTimeline;
