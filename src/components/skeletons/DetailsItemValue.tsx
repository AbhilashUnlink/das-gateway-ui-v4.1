/* eslint-disable @typescript-eslint/no-explicit-any */
import { Skeleton } from 'antd';

const DetailsItemValue = ({ loading = false, value, className = "", onClick = () => { }, skeletonWidth = undefined }: { loading: boolean, value: string, className?: string, onClick?: () => void, skeletonWidth?: any }) => {
    if (loading) {
        return (
            <Skeleton.Button style={{ height: "16px", width: skeletonWidth ? skeletonWidth : "14rem" }} active={true} size={"small"} />
        );
    }
    else {
        return (
            <h4 onClick={onClick} className={className}>{value}</h4>
        );
    }
};

export default DetailsItemValue;