import { useQuery, useMutation, useQueryClient } from "react-query";
import apiClient from "../services/http-common";
import axios from "axios";
//auth User
export async function authUser(data) {
  let { username, password, role } = data;
  return axios.post(
    "http://192.168.1.44/vignette/api",
    JSON.stringify({ login: username, pass: password })
  );
}

//all vignettes
export function useVignettes() {
  return useQuery("vignettes", async () => {
    const { data } = await apiClient.get("vignettes/");
    return data;
  });
}

//buy vignette
export function buyVignetteMutation(data) {
  const { name, surname, phone, marque, type, noChassi, id, puissance } = data;
  //console.log("info:", data);
  const sent = {
    id_agent: id,
    nom: name,
    prenom: surname,
    tel: phone,
    marque,
    type,
    numChassis: noChassi,
    id_puissance: puissance,
  };
  console.log("sent:", sent);
  return apiClient.post("vignettes/add", JSON.stringify(sent));
}

//buy vignette
export const buyVignetteAgentMutation = (info) => {
  const { name, surname, phone, marque, type, noChassi, id } = info;
  //console.log("info:", info);
  const sent = {
    id_agent: id,
    nom: name,
    prenom: surname,
    tel: phone,
    marque,
    type,
    numChassis: noChassi,
    puissance,
  };
  //console.log("sent:", sent);
  return apiClient.post("vignettes/add", JSON.stringify(sent));
};

//vignette by user"
export const getVignetteByChassis = async (query) => {
  return await apiClient.post("/vignettes/search", {
    num_chassis: query,
  });
};
export const getVignetteById = async (id) => {
  return await apiClient.post("/vignettes/detail", { id_user: id });
};

export function useVignette(Id) {
  return useQuery(["vignette", Id], () => getVignetteById(Id), {
    enabled: !!Id,
  });
}

//update vignette
export function updateVignette(data) {
  let { marque, type, noChassi, id, puissance } = data;
  //console.log("donne envoyer :", data);
  const sent = {
    marque,
    type,
    num: noChassi,
    puissance,
    id_engin: id,
  };
  return apiClient.post("vignettes/update", JSON.stringify(sent));
}

//delete vignette
export const deleteVignette = (id) => {
  return apiClient.post("/vignettes/delete", { id_engin: id });
};
//update password
export const updatePassword = (data) => {
  const { id_user, actuel, newpass, confirmpass } = data;
  //console.log(data);
  const sent = {
    id_user,
    actuel,
    new: newpass,
    confirme: confirmpass,
    pass: actuel,
  };
  return apiClient.post("/updateUserPass", JSON.stringify(sent));
};

//all Roles
export function useRoles() {
  return useQuery("roles", async () => {
    const { data } = await apiClient.get("/roles");
    return data;
  });
}

//all guichet
export function useGuichets() {
  return useQuery("guichets", async () => {
    const { data } = await apiClient.get("/guichets");
    return data;
  });
}

//add guichet
export const addGuichet = (num) => {
  return apiClient.post("/guichets/add", JSON.stringify({ num }));
};

//update Guichet
export const updateGuichet = (sentForm) => {
  const { id_guichet, num } = sentForm;
  return apiClient.post("/guichets/update", JSON.stringify(sentForm));
};

//delete Guichet
export const deleteGuichet = (id) => {
  return apiClient.post("/guichets/delete", JSON.stringify({ id_guichet: id }));
};

// all puissances
export function usePuissances() {
  return useQuery("puissances", async () => {
    const { data } = await apiClient.get("/puissances/");
    return data;
  });
}

//add Puissance
export const addPuissance = (sentForm) => {
  return apiClient.post("/puissances/add", JSON.stringify(sentForm));
};

//update puissance
export const updatePuissance = (sentForm) => {
  return apiClient.post("/puissances/update", JSON.stringify(sentForm));
};

//delete Puissance
export const deletePuissance = (id) => {
  return apiClient.post(
    "/puissances/delete",
    JSON.stringify({ puissance_id: id })
  );
};

//all users
export function useUsers() {
  return useQuery("users", async () => {
    const { data } = await apiClient.get("/users/");
    return data;
  });
}

export const addUser = (sentForm) => {
  const {
    name,
    prenom,
    adresse,
    phone,
    login,
    password,
    role,
    arrondi: arrondissement,
    matricule,
  } = sentForm;

  const sent = {
    nom: name,
    prenom,
    adresse,
    tel: phone,
    login,
    pass: password,
    role,
    arrondissement,
    matricule,
  };
  //console.log("adding user:", sent);
  return apiClient.post("/users/add", JSON.stringify(sent));
};

//update user
export const updateUser = (sentForm) => {
  const { name, surname, adresse, tel, login, role, id } = sentForm;
  const sent = {
    id_user: id,
    nom: name,
    prenom: surname,
    adresse,
    tel,
    login,
    role,
  };
  return apiClient.post("/users/update", JSON.stringify(sent));
};

//delete user
export const deleteUser = (id) => {
  return apiClient.post("/users/delete", JSON.stringify({ id_user: id }));
};

//agent by guichet
export const getAgentbyGuichet = (id) => {
  return apiClient.post("/users/guichet", JSON.stringify({ id_guichet: id }));
};

//affectation guichet agent
export const affectAgent = (sentForm) => {
  const { id, user_id } = sentForm;
  //console.log("affectation data:", sentForm);
  const sent = {
    id_guichet: id,
    id_user: user_id,
  };
  //console.log("affectation data to be sent:", sent);
  return apiClient.post("/affectations/add", JSON.stringify(sent));
};

//delete affectation
export const unaffectAgent = (sentForm) => {
  const { id, user_id } = sentForm;
  //console.log("desaffectation data:", sentForm);
  const sent = {
    guichet_id: id,
    user_id,
  };
  //console.log("desaffectation data to be sent:", sent);
  return apiClient.post("/affectations/delete", JSON.stringify(sent));
};

//statistiques
export function useStatistiques() {
  return useQuery("statistiques", async () => {
    const { data } = await apiClient.get("/statistiques/");
    return data;
  });
}

export const transfertVignette = (sentForm) => {
  const { id_engin, nouveau, ancien, image } = sentForm;
  let data = new FormData();
  data.append("nouveau", nouveau);
  data.append("ancien", ancien);
  data.append("id_engin", id_engin);
  data.append("file[]", image);
  return fetch("http://192.168.1.44/vignette/transfert", {
    method: "post",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: data,
  });
};
