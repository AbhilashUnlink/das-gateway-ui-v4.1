
import { useTranslation } from 'react-i18next';
import { CASE_CREATED_TYPE, CHARGE_BACK_CASE_TYPE_STATUS, CHARGE_BACK_TYPE } from '../../../../../../../config/common/charge-back-types';
import useDateFormatter from 'hooks/date-preference/useDateFormatter';
import useGetParameter from 'hooks/router/useGetParameter';
import { useNavigate } from 'react-router';

const CaseHistory = ({ caseHistory = [] }: any) => {

  const { t } = useTranslation();
  const uuid= useGetParameter("uuid");
  const navigate = useNavigate();
  const  { filterDateFormatter } = useDateFormatter();
  if (caseHistory?.length > 0) {

    return (
      <div className='pop-up-wrapper case-history-wrapper'>
        <h4 className='h-time-heading'>{t('TransactionDetail.TransactionTabList.Chargeback History')}</h4>
        <div className="popup-scroll-box subs-popupbox">
          {caseHistory?.map((item: any) => {
            let data = Object.entries(item)[0];
            const caseHistoryStatus = data[0];
            const caseHistoryList: any = data[1];
            const chargebackId = caseHistoryList?.[0]?.ChargeBackId || '';
            return (
              <>
                <h5
                onClick={
                    () => { navigate(`/dispute-management/list?TransactionID=${uuid}&ChargeBackID=${chargebackId}`);}
                }
                 className="chargeback-title chargeback-cursor-click">
                  {CHARGE_BACK_CASE_TYPE_STATUS[caseHistoryStatus]}
                </h5>
                {caseHistoryList?.length > 0 &&
                  caseHistoryList?.map((item: any, index: any) => {
                    return (
                      <div className="popup-lists cgb-history-wrap" key={index}>
                        <div className="subscription-status chargeback-history-ui-list">
                          <h4 className="normal-case-history">
                            {CHARGE_BACK_TYPE[item?.Status]?CASE_CREATED_TYPE.CaseCreated:CHARGE_BACK_CASE_TYPE_STATUS[item?.Status] }
                          </h4>
                          <div className="billing-date">
                            {item?.CreatedAt && filterDateFormatter(item?.CreatedAt)}
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </>
            );
          })}
        </div>
      </div>
    );
  } else {
    return <></>;
  }
};

export default CaseHistory;
