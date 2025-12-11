import { DRAWER_TITLE, DRAWER_TYPE } from "components/constants/drawer";
import DasButton from "pages/transaction/components/buttons/DasButton";
import VoidAuthButton from "pages/transaction/components/buttons/VoidAuthButton";
import {
  TRANSACTION_STATUS,
  TRANSACTION_TYPE_CONSTANTS,
} from "pages/transaction/components/constants/transaction";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { loadingTransactionDetails } from "store/features/details";
import { setDrawer } from "store/features/drawer";
import { hasAccess } from "utils/has-access";
import { getAmount } from "utils/helper";
import "./style.css";
import { EditStatusSvgIcon } from "components/svg-icons/SvgIcons";
import RefundDetails from "../../../refund-drawer";
import CaptureDetails from "../../../capture-drawer";
import TransactionEditDetailsDrawer from "../../../edit-status-drawer";
import useDetails from "hooks/use-details/useDetails";
import { transactionInfoSchema } from "../schema/transaction-info-schema";
import { cardHolderDetailsSchema } from "../schema/card-holder-details-schema";
import { subscriptionInfoSchema } from "../schema/subscription-info-schema";
import { additionalInfoSchema } from "../schema/additional-info-schema";
import { browserInfoSchema } from "../schema/browser-info-schema";
import DetailAccordianWrapper from "components/wrapper/DetailAccordianWrapper";
import QuickViewHistoryTimeline from "../history-timeline/QuickViewHistoryTimeline";

const TransactionQuickView = ({
  drawer,
  handleDrawerClose,
  tableApiEndPoint,
  payload,
}: any) => {
  const { t } = useTranslation();
  const [renderComponent, setRenderComponent] = useState("QuickDetails");
  const loading = useSelector(loadingTransactionDetails);
  const dispatch = useDispatch();
  const transactionDetail: any = useSelector(
    (store: any) => store.details.details
  );
  const timeLineData = transactionDetail && transactionDetail?.TransactionHistory;
  const currentTransactionId = transactionDetail && transactionDetail?.TransactionRefID;
  // const subscriptionInfoDetail: any = useSelector(
  //   (store: any) => store?.details?.details?.SubscriptionDetails,
  // );
  const DetailsSchema = useDetails(transactionInfoSchema(), transactionDetail);
  const ContactSchema = useDetails(
    cardHolderDetailsSchema(),
    transactionDetail
  );
  const rawSubscriptionData = transactionDetail?.SubscriptionDetails
    ? {
        ...transactionDetail.SubscriptionDetails,
        SubscriptionStatus: transactionDetail.SubscriptionDetails.Status,
      }
    : null;

  const SubscriptionSchema = useDetails(
    subscriptionInfoSchema,
    rawSubscriptionData
  );
  const AdditionalInfoSchema = useDetails(
    additionalInfoSchema(),
    transactionDetail
  );
  const BrowserInfoSchema = useDetails(browserInfoSchema(), {
    ...transactionDetail?.browser_info,
  });

  const sections: any = [
    {
      title: "TransactionInfo",
      data: DetailsSchema.filter((item: any) => !item.hide),
      heading: t("TransactionDetail.TransactionInfo.label"),
    },
    {
      ...(rawSubscriptionData && {
        title: "SubscriptionDetails",
        data:
          SubscriptionSchema?.length > 0
            ? SubscriptionSchema.filter((item: any) => !item.hide)
            : null,
        heading: t("TransactionDetail.SubscriptionDetails.label"),
      }),
    },
    {
      title: "CustomerDetails",
      data: ContactSchema.filter((item: any) => !item.hide),
      heading: t("TransactionDetail.CustomerDetails.label"),
    },
    {
      title: "AdditionalInformation",
      data: AdditionalInfoSchema.filter((item: any) => !item.hide),
      heading: t("TransactionDetail.AdditionalInformation.label"),
    },
    {
      title: "BrowserInformation",
      data: BrowserInfoSchema.filter((item: any) => !item.hide),
      heading: t("TransactionDetail.BrowserInformation.label"),
    },
  ];
  const getAccess = hasAccess("EDIT_STATUS_BUTTON");
  const {
    isCaptureButtonEnabled,
    isVoidAuthorizationButtonEnabled,
    isRefundButtonEnabled,
  } = useSelector((store: any) => store.details);
  const onRefundClick = () => {
    setRenderComponent("Refund");
  };
  const onCaptureClick = () => {
    setRenderComponent("Capture");
  };
  const onVoidClick = () => {
    setRenderComponent("Void");
  };
  const onEditTransactionClick = () => {
    setRenderComponent("EditStatus");
  };
  const onDetailsClick = () => {
    setRenderComponent("QuickDetails");
  };
  return (
    <div className="quick-view-wrapper">
      <div className="status-btns">
        <div className="flex-start-btns">
          <DasButton
            //accessKey={'EDIT_STATUS_BUTTON'}
            buttonClassName={
              renderComponent === "QuickDetails" ||  renderComponent === ""
                ? "common-button active"
                : "common-button"
            }
            handleOnClick={onDetailsClick}
            //    startAdornment={<EditStatusSvgIcon />}
            buttonText={
              "TransactionDetail.TransactionListButtonPopper.button.Details"
            }
          />
          {isVoidAuthorizationButtonEnabled && (
            <DasButton
              //accessKey={'EDIT_STATUS_BUTTON'}
              buttonClassName={
                renderComponent === "Void"
                  ? "common-button active"
                  : "common-button"
              }
              handleOnClick={onVoidClick}
              //    startAdornment={<EditStatusSvgIcon />}
              buttonText={"TransactionDetail.voidButton"}
            />
          )}

          {isCaptureButtonEnabled && (
            <DasButton
              //accessKey={'EDIT_STATUS_BUTTON'}
              buttonClassName={
                renderComponent === "Capture"
                  ? "common-button active"
                  : "common-button"
              }
              handleOnClick={onCaptureClick}
              //    startAdornment={<EditStatusSvgIcon />}
              buttonText={"TransactionDetail.actionButton.CAPTURE"}
            />
          )}

          {isRefundButtonEnabled && (
            <DasButton
              //accessKey={'EDIT_STATUS_BUTTON'}
              buttonClassName={
                renderComponent === "Refund"
                  ? "common-button active"
                  : "common-button"
              }
              handleOnClick={onRefundClick}
              //    startAdornment={<EditStatusSvgIcon />}
              buttonText={"TransactionDetail.actionButton.REFUND"}
            />
          )}
          {((isRefundButtonEnabled &&
            transactionDetail.TransactionType !==
              TRANSACTION_TYPE_CONSTANTS.AUTHORISATION &&
            transactionDetail.TransactionType !==
              TRANSACTION_TYPE_CONSTANTS.REFUND) ||
            (transactionDetail.Status === TRANSACTION_STATUS.SUCCESSFUL &&
              transactionDetail.TransactionType ===
                TRANSACTION_TYPE_CONSTANTS.PURCHASE) ||
            (transactionDetail.Status === TRANSACTION_STATUS.SUCCESSFUL &&
              transactionDetail.TransactionType ===
                TRANSACTION_TYPE_CONSTANTS.CAPTURE)) && (
            <DasButton
              loading={loading}
              accessKey={"DISPUTE_TRANSACTION_ACCESS"}
              hasSingleAccess={true}
              variant={"outlined"}
              buttonClassName={
                renderComponent === "Dispute"
                  ? "common-button active"
                  : "common-button"
              }
              handleOnClick={() => {
                // navigate(MENU.TRANSACTIONS);
                const amount = getAmount(
                  transactionDetail.Amount,
                  transactionDetail.CurrencyCode
                );
                setRenderComponent("Dispute");
                dispatch(
                  setDrawer([
                    ...drawer,
                    {
                      data: {
                        uuid: transactionDetail.TransactionRefID,
                        amount,
                        AcquirerName: transactionDetail.Acquirer,
                        ...transactionDetail,
                      },
                      type: DRAWER_TYPE.DISPUTE_EDIT_DRAWER,
                      title: DRAWER_TITLE.DISPUTE_EDIT_DRAWER,
                      isDrawerOpen: true,
                    },
                  ])
                );
                // dispatch(transactionInfoQuery(transactionDetail?.uuid));
              }}
              // imgSrc={refundImage}
              imgClassName={"table-icon-img"}
              imgAlt={"Refund"}
              buttonText={t("TransactionDetail.actionButton.DISPUTE")}
            />
          )}
        </div>

        <div className="flex-right-btn">
          {([
            TRANSACTION_STATUS.NOTSUCCESSFUL,
            TRANSACTION_STATUS.PENDING,
          ].includes(transactionDetail?.Status) ||
            transactionDetail?.TransactionLog?.length > 0) &&
            getAccess && (
              <>
                <DasButton
                  //accessKey={'EDIT_STATUS_BUTTON'}
                  buttonClassName={
                    renderComponent === "EditStatus"
                      ? "common-button active"
                      : "common-button"
                  }
                  handleOnClick={onEditTransactionClick}
                  startAdornment={<EditStatusSvgIcon />}
                  buttonText={"TransactionDetail.Edit_button"}
                />
              </>
            )}
        </div>
      </div>

      <div className="quick-view-form-container">
        {renderComponent === "QuickDetails" && 
        <>
        <div className="quick-view-history">
          <QuickViewHistoryTimeline
        timeLineData={timeLineData}
        currentTransactionId={currentTransactionId}
        loading={loading}
    />
          </div>
          {sections
            .filter((section: any) => section?.data && section.data.length > 0)
            .map((section: any, index: any) => (
              <DetailAccordianWrapper
                key={index}
                title={`TransactionDetail.${section.title}.label`}
                content={section.data}
                transactionDetail={transactionDetail}
                heading={section.heading}
                loading={loading}
              />
            ))}
            </>
            }

        {renderComponent === "Refund" && (
          <RefundDetails
            drawer={drawer}
            handleDrawerClose={() => handleDrawerClose(drawer)}
            tableApiEndPoint={tableApiEndPoint}
            payload={payload}
          />
        )}
        {renderComponent === "Capture" && (
          <CaptureDetails
            drawer={drawer}
            handleDrawerClose={() => handleDrawerClose(drawer)}
            tableApiEndPoint={tableApiEndPoint}
            payload={payload}
          />
        )}
        {renderComponent === "Void" && <VoidAuthButton />}

        {renderComponent === "EditStatus" && (
          <TransactionEditDetailsDrawer
            // openStatusDrawer={openStatusDrawer}
            handleDrawerClose={handleDrawerClose}
            uuid={transactionDetail.TransactionRefID}
          />
        )}
      </div>
    </div>
  );
};

export default TransactionQuickView;
