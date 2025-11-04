import { Skeleton } from 'antd';

const TableActionButtonSkeleton = () => {
    return (
        <Skeleton.Button active={true} size={"default"} block={true} />
    );
};

export default TableActionButtonSkeleton;