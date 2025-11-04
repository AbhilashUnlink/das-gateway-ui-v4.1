import './xray-workflow.css';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import useGetParameter from 'hooks/router/useGetParameter';
import { GET_PARAMS } from 'pages/transaction/components/constants/params';
import { HTTP_STATUS } from 'components/constants';
import DasSnackbar from 'components/das-snackbar/DasSnackbar';
import i18next from 'i18next';
import { useFetchWrapper as Api } from 'utils';
import { useSelector } from 'react-redux';
import { xrayPaymentLoggroup } from 'store/features/gateway-config';
import Loader from 'components/loader';
import ApiImage from 'assets/api-coding.gif';
import { JSONTree } from 'react-json-tree';
import {
  StaticXrayListItems,
  TransactionXrayTheme,
  getRequestData,
  isCurrentTransactionIdSelected,
} from './transaction-xray-constants';

const TransactionXrayTree = () => {
  const { t } = useTranslation();
  const [logGroupName, setLogGroupName] = useState('');
  const [apiDataResponse, setApiDataRespnse] = useState<any>('');
  const [currentSelectedId, setCurrentSelectedId] = useState(logGroupName);
  const [loading, setLoading] = useState(false);


  const requestID = useGetParameter(GET_PARAMS.requestID);
  const transactionDate = useGetParameter(GET_PARAMS.transactionDate);
  const acquirerCode: any = useGetParameter(GET_PARAMS.acquirerCode);

  const formattedtransactionDate = transactionDate;

  const paymentLoggroup: any = useSelector(xrayPaymentLoggroup);

  const apiEndPointPath = (lgName: any) =>
    `logs/insights?logGroupName=${lgName}&requestID=${requestID}&transactionDate=${formattedtransactionDate}`;

  const listItems = [
    ...StaticXrayListItems,
    {
      label: `${t("Transaction_Xray.Acquirer")} - ${acquirerCode}`,
      lgName: paymentLoggroup[acquirerCode],
    },
  ];

  const onHandleClick = async (item: any) => {
    setLogGroupName(item.lgName);
    try {
      setLoading(true);
      const data: any = await Api().get(apiEndPointPath(item.lgName));
      if ([HTTP_STATUS.OK].includes(data?.statusCode)) {
        setApiDataRespnse(Object.entries(data?.data));
        setLoading(false);
        DasSnackbar.success(
          i18next.t(`API_STATUS_MESSAGE.${data?.messageCode}`),
        );
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div className="workflow-wrap">
        <h4 className="h-time-heading">{t('Transaction_Xray.Transaction X-Ray')}</h4>
        <div className="xray-wrap-list">
          <ul className="xray-ul">
            {listItems.map((item: any, index) => {
              return (
                <li key={index}>
                  <button
                    className={`transaction-services-name ${isCurrentTransactionIdSelected(
                      item.label, currentSelectedId
                    )}`}
                    onClick={() => {
                      onHandleClick(item);
                      if (currentSelectedId !== item.label) {
                        setCurrentSelectedId(item.label);
                      }
                    }}
                  >
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>
          <div className="transaction-xray-div">
            {logGroupName ? (
              <div className="request-response-wrap">
                <div className="request-wrapper">
                  {apiDataResponse && !loading ? (
                    <>
                      <h4>{t("Transaction_Xray.API Response")}</h4>
                      <>
                        {/* <pre>{getRequestData()}</pre> */}
                        {apiDataResponse
                          ?.filter(
                            ([key]: any) =>
                              key?.toLowerCase()?.includes('request') ||
                              key?.toLowerCase()?.includes('response'),
                          )
                          .map(([key, item]: any, index: number) => {
                            return (
                              <div className="node-key-theme" key={index}>
                                <h4>{key}</h4>
                                <JSONTree
                                  data={getRequestData(item)}
                                  shouldExpandNodeInitially={() => true}
                                  theme={{
                                    extend: TransactionXrayTheme,
                                    // underline keys for literal values
                                    valueLabel: {
                                      textDecoration: 'underline',
                                    },
                                    // switch key for objects to uppercase when object is expanded.
                                    // `nestedNodeLabel` receives additional argument `expandable`
                                    nestedNodeLabel: (
                                      { style }: any,
                                      keyPath,
                                      nodeType,
                                      expanded,
                                    ) => ({
                                      style: {
                                        ...style,
                                        textTransform: expanded
                                          ? 'uppercase'
                                          : style.textTransform,
                                      },
                                    }),
                                  }}
                                />
                              </div>
                            );
                          })}
                      </>
                    </>
                  ) : (
                    <Loader />
                  )}
                </div>
              </div>
            ) : (
              <div className="no-data-wrap">
                {t("Transaction_Xray.Please Select any service for the Api requests and responses")}
                <img
                  src={ApiImage} className='api-image' alt="API Image" />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TransactionXrayTree;
