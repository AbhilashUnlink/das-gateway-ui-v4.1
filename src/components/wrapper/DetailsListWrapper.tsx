import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { getMerchantDetailsOnTransactionDetails } from '../../store/features/merchant';
import { setDrawer } from '../../store/features/drawer';
import { DRAWER_TYPE } from '../constants/drawer';
import { getAcquirerDetailsAndOpenDrawer } from '../../store/features/acquirer-details';
import DetailsItemValue from '../skeletons/DetailsItemValue';
import { type COPY_TYPE, CopyImage } from 'components/CopyImage';
import GridItem from 'components/grid-item/GridItem';

const HEADER_TYPE: any = {
    MERCHANT_INFO: 'merchantInfo',
    PRODUCT_INFO: 'productInfo',
    ACQUIRER_INFO: 'acquirerInfo',
    HASHCARD_INTEGRATE: 'hashCardIntegration',
};
const DetailsListWrapper = ({ heading, content,
    transactionDetail,
    loading
}: any) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const detailsDrawer = useSelector((store: any) => store.drawer.drawer);
    const drawer = useSelector((store: any) => store.drawer.drawer);


    return (
        <div className="detail-list">
            <Grid container spacing={2}>
                <GridItem>
                    <div className="inner-details">
                        <div id="transactionInfo">
                            <h4 className="transaction-title">{heading}</h4>
                            {content?.map((item: any, index: number) => {
                                const copyValue: COPY_TYPE = {
                                    value: item.value,
                                    allowCopy: item?.allowCopy || false,
                                    label: item?.label
                                };



                                // const dispatch = useDispatch();
                                const dasmid = transactionDetail?.ProductType === "QR" ? `${transactionDetail?.DASMID}@@@${transactionDetail?.TerminalID}` : transactionDetail?.DASMID;

                                if (item.showPopup) {

                                    return (<div key={index} className="box-listing">
                                        <label>{t(item.label)}</label>
                                        <div className={item?.allowCopy === true ? "new-listing-flex allow-hover-text" : "new-listing-flex"}>
                                            <DetailsItemValue
                                                loading={loading}
                                                className={"link-detail"}
                                                value={item.value}
                                                onClick={() => {
                                                    if (item.type === HEADER_TYPE.MERCHANT_INFO) {
                                                        dispatch(getMerchantDetailsOnTransactionDetails({ merchantID: transactionDetail?.MerchantID, name: item.value }));
                                                    } else if (item.type === HEADER_TYPE.PRODUCT_INFO) {
                                                        dispatch(
                                                            setDrawer([
                                                                ...detailsDrawer,
                                                                {
                                                                    productId: dasmid,
                                                                    type: DRAWER_TYPE.PRODUCT,
                                                                    isDrawerOpen: true,
                                                                    dasmid,
                                                                    showQrSection: false
                                                                },
                                                            ]),
                                                        );
                                                    }
                                                    else if (item.type === HEADER_TYPE.ACQUIRER_INFO) {
                                                        dispatch(getAcquirerDetailsAndOpenDrawer({ title: item.value, id: transactionDetail?.AcquirerMID }));
                                                    }
                                                    else if (item.type === HEADER_TYPE.HASHCARD_INTEGRATE) {
                                                        dispatch(
                                                            setDrawer([
                                                                ...drawer,
                                                                {
                                                                    data: { hashCardNumber: transactionDetail?.HashCardNumber, status: "1" },
                                                                    title: t('HashCard.Add Hash Card'),
                                                                    type: DRAWER_TYPE.HASH_CARD_FORM,
                                                                    isDrawerOpen: true,
                                                                    editMode: true
                                                                },
                                                            ]),
                                                        );
                                                    }
                                                    else return;


                                                }
                                                }
                                            /> <CopyImage
                                                value={copyValue}
                                            />
                                        </div>
                                    </div>
                                    );

                                } else {
                                    return (
                                        <div key={index} className="box-listing">
                                            <label>{t(item.label)}</label>
                                            <div className={item?.allowCopy === true ? "new-listing-flex allow-hover-text" : "new-listing-flex"}>
                                                <DetailsItemValue
                                                    className={item.link && item.id && "link-detail"}
                                                    loading={loading}
                                                    value={item.value}
                                                />
                                                <CopyImage
                                                    value={copyValue}
                                                />
                                            </div>
                                        </div>
                                    );
                                }
                            })}
                        </div>
                    </div>
                </GridItem>
            </Grid>
        </div >
    );
};

export default DetailsListWrapper;
