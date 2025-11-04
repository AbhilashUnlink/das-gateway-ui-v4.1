import { useEffect } from "react";
import { store } from "../../store/store";

const useDynamicTitle = () => {
  const docTitle = store?.getState().title;
  useEffect(() => {
    document.title = docTitle?.title;
  }, []);
};

export default useDynamicTitle;
