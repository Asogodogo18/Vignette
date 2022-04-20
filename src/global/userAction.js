// Context/actions.js
import axios from "axios";
import { storeDataObject, removeValue } from "../services/http-common";

const ROOT_URL = "http://192.168.1.44/";

export async function loginUser(dispatch, loginPayload) {
  let { username, password } = loginPayload;
  const loginFormData = new FormData();

  loginFormData.append("login", username);
  loginFormData.append("pass", password);
  try {
    dispatch({ type: "REQUEST_LOGIN" });
    let { data } = await axios({
      method: "post",
      url: "http://192.168.1.44/vignette/verif",
      data: loginFormData,
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (data === "False") {
      dispatch({ type: "LOGIN_ERROR", error: data });
      return;
    } else {
      dispatch({ type: "LOGIN_SUCCESS", payload: data[0] });
      storeDataObject("currentUser", data[0]);
      return data;
    }
  } catch (error) {
    dispatch({ type: "LOGIN_ERROR", error: error });
  }
}

export async function logout(dispatch) {
  dispatch({ type: "LOGOUT" });
  removeValue("currentUser");
}
