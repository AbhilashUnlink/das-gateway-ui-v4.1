import { InfoOutlined } from '@mui/icons-material';
import { Tooltip } from '@mui/material';

const DasInfo = ({ onClick, title, className }: any) => {
    return (
        <Tooltip
            title={title}
            arrow
        >
            <InfoOutlined onClick={onClick} style={InfoIconStyle} className={className} />
        </Tooltip>
    );
};

export default DasInfo;

export const InfoIconStyle = {
    color: '#f6921e',
    fontSize: '20px',
    marginLeft: '12px',
    cursor: 'pointer',
    zIndex: 1
};
