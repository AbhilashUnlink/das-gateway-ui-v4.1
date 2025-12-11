import { Typography } from "antd";
import { CopySvgIcon } from "components/svg-icons/SvgIcons";

const DasCopyComponent = ({ text , truncate=false}: { text: string, truncate?:boolean }) => {
    const truncated = truncate? `${text?.slice(0, 8)}...${text?.slice(-8)}`: text;

    return (
        <Typography.Text
            copyable={{ text: text, icon:<CopySvgIcon className="copy-svg-icon" style={{position:'relative', top:'3px'}}/> }}
            style={{
                cursor: "pointer",
                maxWidth: 220,
                display: "inline-block",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                fontSize:'12px'
            }}
        >
            {truncated}
        </Typography.Text>
    );
};

export default DasCopyComponent;
