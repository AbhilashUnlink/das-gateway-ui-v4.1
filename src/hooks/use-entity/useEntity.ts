import { useSelector } from "react-redux";
import getEntity from "utils/helper";

const useEntity = () => {
    const entity = useSelector((store: any) => store?.auth?.profile?.subsidiaries);
    
    const entityOptions = getEntity(entity)?.map(({ label, value }: any) => {
        return { headerName: label, value };
    });

    return { entityOptions };


};

export default useEntity;