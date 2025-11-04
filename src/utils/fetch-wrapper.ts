// src/utils/fetch-wrapper.ts
import { HTTP_STATUS } from "../components/constants";
import { AUTH_URL_VALIDATE } from "../components/constants";
// import { startLoader, stopLoader } from "../store/features/loader";
import { validateTokenExpiryAndGetToken } from "./validate-token";
// import { setDrawer } from "../store/features/drawer";
// import { clearLocalStorage } from "./clear-local-storage";
import { ACCESS_GROUP_NAMES } from "../components/constants/access-group-name";
import { AUTHENTICATION } from "../components/constants/api-paths";
import { getSignInDataFromLocalStorage } from "./helper";
// import { getBridge } from "store/middleware/bridgeMiddleware";

const baseUrl = import.meta.env.VITE_API_URL;
const XApiKey = import.meta.env.VITE_X_API_KEY;

type methodType = "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "DOWNLOAD";


export const useFetchWrapper = () => {
  return {
    get: request("GET"),
    post: request("POST"),
    put: request("PUT"),
    delete: request("DELETE"),
    patch: request("PATCH"),
    download: request("DOWNLOAD"),
  };

  function request(method: methodType) {
    return async (url: string, body?: any, header: any = {}) => {
      const signInDataFromLocalStorage = getSignInDataFromLocalStorage();
      let authHeader: any = {};

      if (!AUTH_URL_VALIDATE(url)) {
        authHeader = {
          Authorization: await validateTokenExpiryAndGetToken(
            signInDataFromLocalStorage,
            request
          ),
        };
        if (!authHeader.Authorization) {
          // clearLocalStorage();
          return;
        }
      }

      const reqInit: RequestInit = {
        method: method === "DOWNLOAD" ? "GET" : method,
        headers: {
          "x-api-key": XApiKey,
          ...authHeader,
          ...header,
        },
      };

      if (body && method !== "DOWNLOAD") {
        reqInit.headers = {
          ...reqInit.headers,
          "Content-Type": "application/json",
        };
        reqInit.body = JSON.stringify(body);
      }

      // dispatch(startLoader());

      try {
        const res = await fetch(`${baseUrl}/${url}`, reqInit);
        // dispatch(stopLoader());

        if (res.status === HTTP_STATUS.NOT_AUTHORIZED) {
          if (!url.includes(AUTHENTICATION.LOGIN_API)) {
            // clearLocalStorage();
            return;
          }
        }

        if (method === "DOWNLOAD") return res.blob();
        return handleResponse(await res.json());
      } catch (error) {
        // dispatch(stopLoader());
        throw error;
      }
    };
  }

  function handleResponse(data: any) {
    const status = data.statusCode || data.status;
    const signInDataFromLocalStorage = getSignInDataFromLocalStorage();
    const groups = signInDataFromLocalStorage?.Groups;

    if ([HTTP_STATUS.OK, HTTP_STATUS.CREATED].includes(status)) {
      return data;
    }

    if (status === HTTP_STATUS.FORBIDDEN) {
      // const drawer = getState()?.drawer?.drawer;

      const isGuest =
        groups?.includes(ACCESS_GROUP_NAMES.GUEST) ||
        groups?.includes(ACCESS_GROUP_NAMES.GUESTSCHEDULER) ||
        groups?.includes(ACCESS_GROUP_NAMES.GUESTTHIRDPARTY);

      if (!isGuest) {
        window.location.href =
          window.location.origin + window.location.pathname;
        // if (drawer?.length) dispatch(setDrawer([]));
      }
      return;
    }

    return Promise.reject(data);
  }
};
