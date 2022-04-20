import { getDataObject } from "../services/http-common";

let user = getDataObject("currentUser")
let isSignedIn = new Boolean(getDataObject("currentUser")) ? true : false;


export const initialState = {
  user,
  isSignedIn: isSignedIn,
  loading: false,
  errorMessage: null,
};

export const AuthReducer = (initialState, action) => {
  switch (action.type) {
    case "REQUEST_LOGIN":
      return {
        ...initialState,
        loading: true,
      };
    case "LOGIN_SUCCESS":
      return {
        ...initialState,
        user: action.payload,
        isSignedIn: true,
        loading: false,
      };
    case "LOGOUT":
      return {
        ...initialState,
        user: "",
        isSignedIn: false,
      };

    case "LOGIN_ERROR":
      return {
        ...initialState,
        loading: false,
        errorMessage: action.error,
      };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
