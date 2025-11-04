import { STATEMENT } from "../../../../components/constants/api-paths";
import { useFetchWrapper as Api } from "../../../../utils";

export const viewMerchantStatement = async (data: any) => {
    try {
        // dispatch(toggleLoader());
        const statementId = Number(data.ID);
        const result = await Api().download(
          `${STATEMENT.VIEW_MERCHANT_STATEMENT}/${statementId}`,null , {Accept: 'application/vnd.ms-excel'}
        );
        const blob = new Blob([result], { type: 'application/vnd.ms-excel' });
        const   link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.target = "_blank";
        link.download = `${data.DAS_MID}-${new Date(data?.Date), 'dd MMMM yyyy'}-reconcile-report.xls`;
        link.click();
      } catch (e) {
        console.error(e);
      }
  };

  export const downloadMerchantStatement = async (data: any,downloadLanguage:any)=>{
    try {
        const statementId = data.ID;
        const result = await Api().download(
          `${STATEMENT.DOWNLOAD_STATEMENT}/${statementId}?lang=${downloadLanguage}`,null,
          {Accept: 'application/octet-stream'}
        );
        const blob = new Blob([result], { type: 'application/pdf' });
        const url  = URL.createObjectURL(blob);
        window.open(url, '_blank');
      } catch (e) {
        console.error(e);
      }
  };

export const regenerateStatement = async (data:any) =>{
    try {
        const result = await Api().post(STATEMENT.GENERATE_STATEMENT,data);
        return result;
      } catch (e) {
        console.error(e);
      }
};