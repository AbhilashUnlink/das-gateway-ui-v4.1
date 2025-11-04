import ErrorResponse from "../../config/error/ErrorResponse";
import logo from "../../assets/logo/PO-Logo.svg";
import "./style.css";
import { Button } from "@mui/material";
import { useNavigate, useParams } from "react-router";

type ItemType = {
  code: number;
  message: string;
  description: string;
  buttontext: string;
};

export default function PageNotFound({ isAuthenticated = false }) {
  const { id }: any = useParams();

  const navigate = useNavigate();

  const Error: Record<string, ItemType[]> = ErrorResponse;
  const errorPage = Error[`error ${id}`]
    ? Error[`error ${id}`]
    : Error.error404;
  // const dispatch = useDispatch();
  return (
    <div className="error-wrap">
      <div className="error-page-design">
        <div className="logo-404">
          <img src={logo} className="errorpag-logo" alt="Payment Options" />
        </div>
        {errorPage?.map((item: ItemType, index: number) => {
          return (
            <div key={index} onClick={() => {
              // dispatch(onStepClick(0));
            }}>
              <h1>{item.code}</h1>
              <h3>{item.message}</h3>
              <p>{item.description}</p>
              <Button
                className="btn go-back"
                onClick={() =>
                  isAuthenticated ? navigate("/") : navigate("/login")
                }
              >
                {item.buttontext}
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
