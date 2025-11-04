import { useSelector } from "react-redux";
import loading from "../../assets/spinner-payops.gif";
import './style.css';

type isLoaderActiveType = Record<string, any>

export default function Loader({ isLoading, skeletonAdded = false }: any) {
  const { isLoaderActive } = useSelector((state: isLoaderActiveType) => state.loader);
  if (skeletonAdded) {
    return (
      <>
        {(isLoading) ? (
          <div className="loader-container">
            <img className="loader-gif" src={loading} alt="Loader" />
          </div>
        ) : (
          ""
        )}
      </>
    );
  } else {
    return (
      <>

        {(isLoading | isLoaderActive) ? (
          <div className="loader-container">
            <img className="loader-gif" src={loading} alt="Loader" />
          </div>
        ) : (
          ""
        )}
      </>
    );
  }
}
