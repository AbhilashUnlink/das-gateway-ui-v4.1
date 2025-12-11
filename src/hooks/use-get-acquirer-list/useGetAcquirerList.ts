import React from "react";
import { useSelector } from "react-redux";

interface Acquirer {
  AcquirerID: string;
  AcquirerName: string;
  AcquirerMID: string[];
  AcquirerCode: string;
}

const useGetAcquirerList = () => {
  const acquirerListFromApi = useSelector(
    (store: any) => store.config.acquirersList as Acquirer[]
  );

  const {
    acquirerList,
    acquirerMIDList,
    AcquirerMIDFilterOptions,
    AcquirerFilterOptions,
  } = React.useMemo(() => {
    if (!acquirerListFromApi) {
      return {
        acquirerList: [],
        acquirerMIDList: [],
        AcquirerMIDFilterOptions: [],
        AcquirerFilterOptions: [],
      };
    }

    // Dropdown-friendly list of acquirers
    const acquirerList = acquirerListFromApi.map((a) => ({
      label: a.AcquirerName,
      value: a.AcquirerID,
    }));

    // Dropdown-friendly list of MIDs
    const acquirerMIDList = acquirerListFromApi
      ?.map((item: any) => {
        return item.AcquirerMID;
      })
      ?.flat()
      ?.map((item: any) => {
        return { label: item.AcquirerMID, value: item.AcquirerMID };
      });

    // Values only (for filtering etc.)
    const AcquirerMIDFilterOptions = acquirerMIDList.map((m) => m.value);
    const AcquirerFilterOptions = acquirerListFromApi.map(
      (a) => a.AcquirerName
    );

    return {
      acquirerList,
      acquirerMIDList,
      AcquirerMIDFilterOptions,
      AcquirerFilterOptions,
    };
  }, [acquirerListFromApi]);

  return {
    acquirerListFromApi,
    acquirerList,
    acquirerMIDList,
    AcquirerMIDFilterOptions,
    AcquirerFilterOptions,
  };
};

export default useGetAcquirerList;
