// Context/actions.js
import { authUser } from "../services/query";
import Toast from "react-native-toast-message";

export function loginUser(dispatch, loginPayload) {
  dispatch({ type: "REQUEST_LOGIN" });
  authUser(loginPayload)
    .then((res) => {
      console.log("-----------------\n", res);
    })
    .catch((error) => {
      // Toast.show({
      //   type: "error",
      //   text1: "Une erreur est survenue, \nVeuillez ressayer!",
      //   text2: `${error}`,
      // });
      dispatch({ type: "LOGIN_ERROR", error: error });
    });

  // if (data[0]) {
  //   // Toast.show({
  //   //   type: "success",
  //   //   text1: `Bienvenue Mr/Mme ${data[0].nom} ${data[0].prenom}`,
  //   // });
  //   dispatch({ type: "LOGIN_SUCCESS", payload: data[0] });

  // }
  // if (data === "False") {
  //   // Toast.show({
  //   //   type: "error",
  //   //   text1: "Une erreur est survenue, \nVeuillez ressayer!",
  //   // });
  //   dispatch({ type: "LOGIN_ERROR", error: data });
  //   return;
  // }
  //else if (data !== "False" && data[0].role !== role) {
  //   Toast.show({
  //     type: "error",
  //     text1: "Une erreur est survenue,",
  //     text2: `Vous n'etes pas un ${role}`,
  //   });
  //   dispatch({ type: "LOGIN_ERROR", error: `Vous n'etes pas un ${role}` });
  // }
}

export async function logout(dispatch) {
  dispatch({ type: "LOGOUT" });
}
