export const initialState = {
  statut: false,
  etat: "init",
  detail: {
    //   "vignette":"jsdgqsdhqsj",
    //   "user":{a,b},
    //   confirmation:false
  },
};

const transfertReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "INIT_TRANSFERT":
      console.log("INIT_TRANSFERT", payload);
      console.log("State", state);

      return {
        ...state,
        etat: "waiting",
        detail: payload,
      };
    case "WAITING_TRANSFERT_APPROVAL":
      console.log("INIT_TRANSFERT", payload);
      console.log("State", state);

      return {
        ...state,
        etat: "En attente d'approbation.",
      };
    case "TRANSFERT_SUCCESS":
      console.log("TRANSFERT_SUCCESS", payload);
      console.log("State", state);

      return {
        ...state,
        statut: true,
        etat: "Transfert Effectue",
        detail: payload,
      };
    case "TRANSFERT_FAIL":
      console.log("TRANSFERT_FAIL", payload);
      console.log("State", state);

      return {
        ...state,
        statut: false,
        etat: "Echec du transfert",
        detail: payload,
      };

    default:
      throw new Error(`No case for type ${type} found in FavoisReducer.`);
  }
};

export default transfertReducer;
