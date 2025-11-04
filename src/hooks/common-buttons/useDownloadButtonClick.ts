import { SELECTED_TIME_ZONE } from "../../components/constants/constants";
import { useFetchWrapper as Api } from "../../utils";

export const useDownloadButtonClick = async (endPoint: any, setDownloading: any) => {
    setDownloading(true);
    let timeZone = localStorage.getItem(SELECTED_TIME_ZONE);
    try {
        const chargebackFileurl = await Api().download(`${endPoint}&TimeZone=${timeZone}`);
        const url = window.URL.createObjectURL(chargebackFileurl);
        const link: any = document.createElement("a");
        link.href = url;
        link.setAttribute(
            "download",
            `Chargeback Details-${(new Date().toJSON().slice(0, 10))}`
        );
        document.body.appendChild(link);
        link.click();
        // Clean up and remove the link
        link.parentNode.removeChild(link);
        setDownloading(false);
        return undefined;
    } catch (e) {
        setDownloading(false);
        console.error(e);
    }

};