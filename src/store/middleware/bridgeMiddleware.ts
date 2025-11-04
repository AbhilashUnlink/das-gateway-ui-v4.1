// src/store/middleware/bridgeMiddleware.ts
let bridgeDispatch: any;
let bridgeGetState: any;

export const getBridge = () => ({
  dispatch: bridgeDispatch,
  getState: bridgeGetState,
});

export const bridgeMiddleware = (storeAPI: any) => {
  bridgeDispatch = storeAPI.dispatch;
  bridgeGetState = storeAPI.getState;
  return (next: any) => (action: any) => next(action);
};
