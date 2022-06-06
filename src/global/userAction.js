// Context/actions.js
import axios from "axios";
import Toast from "react-native-toast-message";

import { authUser } from "../services/query";

// var FormData = require('form-data');

const ROOT_URL = "http://192.168.1.44/";

export async function loginUser(dispatch, loginPayload) {
  const { role } = loginPayload;
  try {
    dispatch({ type: "REQUEST_LOGIN" });
    let response = await authUser(loginPayload);
    let data = await response.data;
    // console.log("la reponse : ", response);
    if (data === "False") {
      Toast.show({
        type: "error",
        text1: "Une erreur est survenue, \nVeuillez ressayer!",
      });
      dispatch({ type: "LOGIN_ERROR", error: data });
      return;
    } else if (data !== "False" && data[0].role !== loginPayload.role) {
      Toast.show({
        type: "error",
        text1: "Une erreur est survenue,",
        text2: `Vous n'etes pas un ${role}`,
      });
      dispatch({ type: "LOGIN_ERROR", error: `Vous n'etes pas un ${role}` });
    } else if (data[0]) {
      Toast.show({
        type: "success",
        text1: `Bienvenue Mr/Mme ${data[0].nom} ${data[0].prenom}`,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: data[0] });
      return data;
    }
  } catch (error) {
    //console.log("error: ", error);
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
