import { ROUTE } from "components/constants/route";
import Transactions from "pages/transaction";

const ProtectedRoutesList: any = [
  {
    path: ROUTE.TRANSACTIONS,
    component: Transactions,
    exact: true,
    accessKey: "TRANSACTION_URL",
  },
];

export default ProtectedRoutesList;
