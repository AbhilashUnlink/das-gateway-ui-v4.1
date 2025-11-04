import { onCopyClick } from "utils/helper";
import copyIcon from "../assets/clipboard.png";

export type COPY_TYPE = {
  value : string,
  allowCopy : boolean,
  label:string
}
export const CopyImage = ({
  value
}: {
  value: COPY_TYPE;
}) => {
  return (
    <>
      <img
        className={value?.allowCopy === true ? 'clipboard-copy' : 'not-copy'}
        width="18"
        height="18"
        src={copyIcon}
        alt="clipboard--v2"
        onClick={()=>onCopyClick(value)}
      />
    </>
  );
};
