import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { GridExpandMoreIcon } from "@mui/x-data-grid";
import { DRAWER_TYPE } from "components/constants/drawer";
import { CopyImage, type COPY_TYPE } from "components/CopyImage";
import QuickViewDetailItemValue from "components/skeletons/QuickViewDetailItemValue";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { getAcquirerDetailsAndOpenDrawer } from "store/features/acquirer-details";
import { setDrawer } from "store/features/drawer";
import { getMerchantDetailsOnTransactionDetails } from "store/features/merchant";
import "./style/accordian-style.css";

const HEADER_TYPE: any = {
  MERCHANT_INFO: "merchantInfo",
  PRODUCT_INFO: "productInfo",
  ACQUIRER_INFO: "acquirerInfo",
  HASHCARD_INTEGRATE: "hashCardIntegration",
};
const DetailAccordianWrapper = ({
  heading,
  content,
  transactionDetail,
  loading,
}: any) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const detailsDrawer = useSelector((store: any) => store.drawer.drawer);
  const drawer = useSelector((store: any) => store.drawer.drawer);
  return (
    <div className="quick-view-acc-wrap">
      <Accordion>
        <AccordionSummary
          expandIcon={<GridExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography component="span">{heading}</Typography>
        </AccordionSummary>
        {content?.map((item: any, index: number) => {
          const copyValue: COPY_TYPE = {
            value: item.value,
            allowCopy: item?.allowCopy || false,
            label: item?.label,
          };

          // const dispatch = useDispatch();
          const dasmid =
            transactionDetail?.ProductType === "QR"
              ? `${transactionDetail?.DASMID}@@@${transactionDetail?.TerminalID}`
              : transactionDetail?.DASMID;

          if (item.showPopup) {
            return (
              <AccordionDetails key={index}>
                <label>{t(item.label)}</label>
                <div
                  className={
                    item?.allowCopy === true
                      ? "new-listing-flex allow-hover-text"
                      : "new-listing-flex"
                  }
                >
                  <QuickViewDetailItemValue
                    loading={loading}
                    className={"link-detail"}
                    value={item.value}
                    onClick={() => {
                      if (item.type === HEADER_TYPE.MERCHANT_INFO) {
                        dispatch(
                          getMerchantDetailsOnTransactionDetails({
                            merchantID: transactionDetail?.MerchantID,
                            name: item.value,
                          })
                        );
                      } else if (item.type === HEADER_TYPE.PRODUCT_INFO) {
                        dispatch(
                          setDrawer([
                            ...detailsDrawer,
                            {
                              productId: dasmid,
                              type: DRAWER_TYPE.PRODUCT,
                              isDrawerOpen: true,
                              dasmid,
                              showQrSection: false,
                            },
                          ])
                        );
                      } else if (item.type === HEADER_TYPE.ACQUIRER_INFO) {
                        dispatch(
                          getAcquirerDetailsAndOpenDrawer({
                            title: item.value,
                            id: transactionDetail?.AcquirerMID,
                          })
                        );
                      } else if (item.type === HEADER_TYPE.HASHCARD_INTEGRATE) {
                        dispatch(
                          setDrawer([
                            ...drawer,
                            {
                              data: {
                                hashCardNumber:
                                  transactionDetail?.HashCardNumber,
                                status: "1",
                              },
                              title: t("HashCard.Add Hash Card"),
                              type: DRAWER_TYPE.HASH_CARD_FORM,
                              isDrawerOpen: true,
                              editMode: true,
                            },
                          ])
                        );
                      } else return;
                    }}
                  />{" "}
                  <CopyImage value={copyValue} />
                </div>
              </AccordionDetails>
            );
          } else {
            return (
              <AccordionDetails key="index">
                <label>{t(item.label)}</label>
                <div
                  className={
                    item?.allowCopy === true
                      ? "new-listing-flex allow-hover-text"
                      : "new-listing-flex"
                  }
                >
                  <QuickViewDetailItemValue
                    className={item.link && item.id && "link-detail"}
                    loading={loading}
                    value={item.value}
                  />
                  <CopyImage value={copyValue} />
                </div>
              </AccordionDetails>
            );
          }
        })}
      </Accordion>
    </div>
  );
};

export default DetailAccordianWrapper;
