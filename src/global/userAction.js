// Context/actions.js
import axios from "axios";
import Toast from "react-native-toast-message";

const ROOT_URL = "http://192.168.1.44/";

export async function loginUser(dispatch, loginPayload) {
  let { username, password, role } = loginPayload;
  const loginFormData = new FormData();

  loginFormData.append("login", username);
  loginFormData.append("pass", password);
  try {
    dispatch({ type: "REQUEST_LOGIN" });
    let response = await axios({
      method: "post",
      url: "http://192.168.1.44/vignette/verif",
      data: loginFormData,
      headers: { "Content-Type": "multipart/form-data" },
    });
    let data = await response.data

    if (data[0]) {
      Toast.show({
        type: "success",
        text1: `Bienvenue Mr/Mme ${data[0].nom} ${data[0].prenom}`,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: data[0] });
      return data;
    }
    if (data === "False") {
      Toast.show({
        type: "error",
        text1: "Une erreur est survenue, \nVeuillez ressayer!",
      });
      dispatch({ type: "LOGIN_ERROR", error: data });
      return;
    } else if (data !== "False" && data[0].role !== role) {
      Toast.show({
        type: "error",
        text1: "Une erreur est survenue,",
        text2: `Vous n'etes pas un ${role}`,
      });
      dispatch({ type: "LOGIN_ERROR", error: `Vous n'etes pas un ${role}` });
    }
  } catch (error) {
    Toast.show({
      type: "error",
      text1: "Une erreur est survenue, \nVeuillez ressayer!",
      text2: `${error}`,
    });
    dispatch({ type: "LOGIN_ERROR", error: error });
  }
}

export async function logout(dispatch) {
  dispatch({ type: "LOGOUT" });
}
