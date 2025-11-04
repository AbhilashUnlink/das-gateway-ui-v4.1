// import { useSelector } from "react-redux";
// import Details from "../../../../../../merchants/merchant-view/components/merchant-details/components/merchant-details-section/Details";
// import ApiKeysSection from "../../../../../../merchants/merchant-view/components/merchant-details/components/api-keys-section/ApiKeysSection";
// import { loadingMerchantDetailsPage } from "../../../../../../../store/features/merchant";
import { hasAccess } from "../../../../../../../utils/has-access";

const MerchantDetailsDrawer = () => {
    // const { merchantDetails } = useSelector((store: any) => store.merchant);
    // const loading = useSelector(loadingMerchantDetailsPage);
    return (
        <>
            <div className="merchant-details-drawer">
                {/* <Details merchantDetailSchema={merchantDetails} loading={loading} /> */}
                {hasAccess('SHOW_API_KEY_SECTION', 'ADMIN_EDITOR') &&
                    <div className="api-keys-wrap">
                        {/* <ApiKeysSection merchantDetailSchema={merchantDetails} loading={loading} /> */}
                    </div>
                }
            </div>
        </>
    );
};

export default MerchantDetailsDrawer;