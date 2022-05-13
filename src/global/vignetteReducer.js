import { useVignettes, deleteVignette,buyVignetteMutation,updateVignette } from "../services/query";
import Toast from "react-native-toast-message";

export const VignetteReducer = (state, action) => {

  switch (action.type) {
    case "FETCH_VIGNETTES":
      useVignettes()
        .then((res) => {
          return [...res.data];
        })
        .catch((e) => {
          console.log(e);
          return;
        });

    case "ADD_VIGNETTE":
      try {
        buyVignetteMutation(action.payload).then((res) => {
          console.log("reponse:", res.data);
          if (res.data === "true") {
            Toast.show({
              type: "success",
              text1: "Vos modifications ont ete enregistrer!",
            });
            return;
          } else {
            Toast.show({
              type: "error",
              text1: "Une erreur est survenue, \nVeuillez ressayer!",
            });
            return;
          }
        });
      } catch (err) {
        Toast.show({
          type: "error",
          text1: "Une erreur est survenue, Veuillez ressayer!",
          text2: err.toString(),
        });
        return;
      }

    case "UPDATE_VIGNETTE":
      updateVignette(action.payload)
        .then((res) => {
          console.log("debut du requete", res);
          if (res.data === "true") {
            Toast.show({
              type: "success",
              text1: "Vos modifications ont ete enregistrer!",
            });
            return;
          } else {
            Toast.show({
              type: "error",
              text1: "Une erreur est survenue, \nVeuillez ressayer!",
            });
            return;
          }
        })
        .catch((e) => {
          console.log("error", e);
          Toast.show({
            type: "error",
            text1: "Une erreur est survenue, Veuillez ressayer!",
            text2: e.toString(),
          });
          return;
        });

    case "DELETE_VIGNETTE":
      const id = action.payload;

      deleteVignette(id)
        .then((res) => {
          console.log(res);
          if (res.data === "true") {
            Toast.show({
              type: "success",
              text1: "Supprime avec success!",
            });
            return;
          } else {
            Toast.show({
              type: "error",
              text1: "Une erreur est survenue, \nVeuillez ressayer!",
            });
            return;
          }
        })
        .catch((e) => {
          Toast.show({
            type: "error",
            text1: "Une erreur est survenue, Veuillez ressayer!",
            text2: e.toString(),
          });
          return;
        });

    default:
      return state;
  }
};
