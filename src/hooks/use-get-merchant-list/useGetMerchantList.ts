import React from "react";
import { useSelector } from "react-redux";

interface Merchant {
  LegalName: string;
  MerchantID: string;
  Products?: { Name: string; DASMID: string }[];
}

interface Product {
  DASMID: string;
  Name?: string;
}

const useGetMerchantList = () => {
  const merchantListFromApi = useSelector(
    (store: any) => store.config.merchantsList as Merchant[]
  );
  const productsListFromApi = useSelector(
    (store: any) => store.config.productsList as Product[]
  );

  const { merchantList, merchantDasMidList, dasmidOptions, legalNamesList } =
    React.useMemo(() => {
      // Merchant list with IDs
      const merchantList = (merchantListFromApi || [])?.map((m) => ({
        label: `${m.LegalName} - (${m.MerchantID})`,
        value: m.MerchantID,
      }));

      // Unique DASMID list
      const uniqueDasMidList = new Set<string>();
      const merchantDasMidList = productsListFromApi
        ?.map((p) => ({
          label: p.DASMID,
          value: p.DASMID,
        }))
        ?.filter((p) => {
          if (uniqueDasMidList.has(p.value)) return false;
          uniqueDasMidList.add(p.value);
          return true;
        });

      // Legal names only
      const legalNamesList = (merchantListFromApi || [])?.map(
        (m) => m.LegalName
      );

      // All DASMIDs
      const dasmidOptions = (productsListFromApi || [])?.map((p) => p.DASMID);

      return {
        merchantList,
        merchantDasMidList,
        dasmidOptions,
        legalNamesList,
      };
    }, [merchantListFromApi, productsListFromApi]);

  return { merchantList, merchantDasMidList, dasmidOptions, legalNamesList };
};

export default useGetMerchantList;