import i18n from "../../i18n";

export const downloadReportStatusConstants: any ={
    Initiated: i18n.t('TransactionDetailDrawerBody.TransactionReportDownload.ReportStatus.Initiated'),
    InProgress:i18n.t('TransactionDetailDrawerBody.TransactionReportDownload.ReportStatus.InProgress'),
    Ready:i18n.t('TransactionDetailDrawerBody.TransactionReportDownload.ReportStatus.Ready'),
    Failure:i18n.t('TransactionDetailDrawerBody.TransactionReportDownload.ReportStatus.Failure')    
};
export const downloadReportStatus: any ={
   1 : downloadReportStatusConstants.Initiated,
   2 : downloadReportStatusConstants.InProgress,
   3 : downloadReportStatusConstants.Ready,
   4 : downloadReportStatusConstants.Failure
};