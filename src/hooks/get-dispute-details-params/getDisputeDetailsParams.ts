import useGetParameter from "hooks/router/useGetParameter";
import { GET_PARAMS } from "pages/transaction/components/constants/params";

export default function getDisputeDetailsParams() {
    const TransactionID = useGetParameter(GET_PARAMS.TransactionID);
    const ChargeBackID = useGetParameter(GET_PARAMS.ChargeBackID);
    return {
        TransactionID,
        ChargeBackID
    };
}