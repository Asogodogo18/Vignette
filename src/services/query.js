import { useQuery, useMutation, useQueryClient } from "react-query";
import apiClient from "../services/http-common";
import axios from "axios";
//auth User
export async function authUser(data) {
  let { username, password, role } = data;
  return axios.post(
    "http://192.168.1.44/vignette/verif",
    JSON.stringify({ login: username, pass: password })
  );
}

//all vignettes
export function useVignettes() {
  return apiClient.get("vignettes/");
}

//buy vignette
export function buyVignetteMutation(data) {
  let { name, surname, phone, marque, type, noChassi, id, puissance } = data;
  return apiClient.post("vignettes/add", {
    id_agent: id,
    nom: name,
    prenom: surname,
    tel: phone,
    marque,
    type,
    numChassis: noChassi,
    puissance,
  });
}

//buy vignette
export const buyVignetteAgentMutation = (info) => {
  let { name, surname, phone, marque, type, noChassi, id } = info;
  return apiClient.post("vignettes/add", {
    id_agent: id,
    nom: name,
    prenom: surname,
    tel: phone,
    marque,
    type,
    numChassis: noChassi,
    puissance,
  });
};

//vignette by user"
const useVignette = async (id) => {
  return apiClient.post("/vignettes/detail", { id_user: id });
};

// export function useVignette(Id) {
//   return useQuery(["vignette", Id], () => getVignetteById(Id), {
//     enabled: !!Id,
//   });
// }

//update vignette
export function updateVignette(data) {
  let { marque, type, noChassi, id, puissance } = data;
  console.log("donne envoyer :", data);

  return apiClient.post("vignettes/update", {
    marque,
    type,
    num: noChassi,
    puissance,
    id_engin: id,
  });
}

//delete vignette
export const deleteVignette = (id) => {
  return apiClient.post("/vignettes/delete", { id_engin: id });
};
//update password
export const updatePassword = (sentForm) => {
  const { id_user, actuel, newpass, confirmpass } = sentForm;
  console.log(sentForm);
  return apiClient.post("/updateUserPass", {
    id_user,
    actuel,
    new: newpass,
    confirme: confirmpass,
    pass: actuel,
  });
};

//all Roles
export function useRoles() {
  return apiClient.get("/roles");
}

//all guichet
export function useGuichets() {
  return apiClient.get("/guichets");
}

//add guichet
export const addGuichet = (num) => {
  return apiClient.post("/guichets/add", { num });
};

//update Guichet
export const updateGuichet = (sentForm) => {
  const { id_guichet, num } = sentForm;
  return apiClient.post("/guichets/update", { id_guichet, num });
};

//delete Guichet
export const deleteGuichet = (id) => {
  console.log("id:", id);
  return apiClient.post("/guichets/delete", { id_guichet: id });
};

// all puissances
export function usePuissances() {
  return apiClient.get("/puissances/");
}

//add Puissance
export const addPuissance = (sentForm) => {
  const { puissance, montant, utilisation } = sentForm;
  return apiClient.post("/puissances/add", { puissance, montant, utilisation });
};

//update puissance
export const updatePuissance = (sentForm) => {
  return apiClient.post("/puissances/update", sentForm);
};

//delete Puissance
export const deletePuissance = (id) => {
  console.log("id:", id);

  return apiClient.post("/puissances/delete", { puissance_id: id });
};

//all users
export function useUsers() {
  return apiClient.get("/users/");
}

export const addUser = (sentForm) => {
  const { name, prenom, adresse, phone, login, pass, role } = sentForm;

  return apiClient.post("/users/add", {
    nom: name,
    prenom,
    adresse,
    tel: phone,
    login,
    pass,
    role,
  });
};

//update user
export const updateUser = (sentForm) => {
  const { name, surname, adresse, tel, login, role, id } = sentForm;

  return apiClient.post("/users/update", {
    id_user: id,
    nom: name,
    prenom: surname,
    adresse,
    tel,
    login,
    role,
  });
};

//delete user
export const deleteUser = (id) => {
  return apiClient.post("/users/delete", { id_user: id });
};

//agent by guichet
export const getAgentbyGuichet = (id) => {
  return apiClient.post("/users/guichet", { id_guichet: id });
};

//affectation guichet agent
export const affectAgent = (sentForm) => {
  const { id, user_id } = sentForm;
  return apiClient.post("/affectations/add", {
    id_guichet: id,
    users: user_id,
  });
};

//delete affectation
export const unaffectAgent = (sentForm) => {
  const { id, user_id } = sentForm;
  return apiClient.post("/affectations/delete", {
    id_guichet: id,
    users: user_id,
  });
};

//statistiques
export function useStatistiques() {
  return useQuery("statistiques", async () => {
    const { data } = await apiClient.get("/statistiques/");
    return data;
  });
}
