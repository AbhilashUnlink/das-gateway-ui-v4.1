import { Typography } from "antd";

const UuidCopy = ({ uuid }: { uuid: string }) => {
    const truncated = `${uuid.slice(0, 8)}...${uuid.slice(-8)}`;

    return (
        <Typography.Text
            copyable={{ text: uuid }}
            style={{
                cursor: "pointer",
                maxWidth: 220,
                display: "inline-block",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
            }}
        >
            {truncated}
        </Typography.Text>
    );
};

export default UuidCopy;
