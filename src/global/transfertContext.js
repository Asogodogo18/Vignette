import { createContext, useReducer, useContext } from "react";

import transfertReducer, { initialState } from "./transfertReducer";

const transfertContext = createContext(initialState);

export const TransfertProvider = ({ children }) => {
  const [state, dispatch] = useReducer(transfertReducer, initialState);
  const initTransfert = (payload) => {
    dispatch({
      type: "INIT_TRANSFERT",
      payload,
    });
    dispatch({ type: "WAITING_TRANSFERT_APPROVAL" });
  };

  const confirmTranfert = (payload) => {
    console.log("remove:", payload);

    dispatch({
      type: "TRANSFERT_SUCCESS",
      payload,
    });
  };
  const rejectTranfert = (payload) => {
    console.log("remove:", payload);

    dispatch({
      type: "TRANSFERT_FAIL",
      payload,
    });
  };

  const value = {
    detail: state.detail,
    initTransfert,
    confirmTranfert,
    rejectTranfert,
  };
  return (
    <transfertContext.Provider value={value}>
      {children}
    </transfertContext.Provider>
  );
};

const useTransfert = () => {
  const context = useContext(transfertContext);
  if (context === undefined) {
    throw new Error("useFavoris must be used within transfertContext");
  }
  return context;
};
export default useTransfert;
