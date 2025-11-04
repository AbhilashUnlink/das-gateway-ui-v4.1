import { useTranslation } from 'react-i18next';
import { TRANSACTION_STATUS_LABEL } from '../../../../constants/transaction';
import useDateFormatter from 'hooks/date-preference/useDateFormatter';

export default function StatusAuditLog({ TransactionLog }: any) {
  const {t} = useTranslation();
  const  { filterDateFormatter } = useDateFormatter();
  return (
    <div
      id="historyTimeline"
      className="timeline-section audit-log-section"
    >
      <h4 className='h-time-heading'>{t('TransactionDetail.TransactionTabList.Audit Log')}</h4>
      <div className="audit-log-wrapper">
        {TransactionLog?.map((key: any, index: number) => {
          return (
            <div className="audit-log-wrap" key={index}>
              <h4>{TRANSACTION_STATUS_LABEL[key?.Status]}</h4>
              <h6>
                {key?.UpdatedAt && filterDateFormatter(
                 key?.UpdatedAt
                )}
              </h6>
              <p>{key?.Comment}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
