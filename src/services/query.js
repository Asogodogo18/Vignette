import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "react-query";
import apiClient from "../services/http-common";
//const formData = new FormData();

//all vignettes
export function useVignettes() {
  return useQuery(
    "vignettes",
    async () => {
      const { data } = await apiClient.get("vignettes/");
      return data;
    },
    {
      // Refetch the data every second
      staleTime: 10000,
    }
  );
}

//buy vignette
export function buyVignetteMutation(data) {
  let { name, surname, phone, marque, type, noChassi, id, puissance } = data;
  const formData = new FormData();

  formData.append("nom", name);
  formData.append("prenom", surname);
  formData.append("tel", phone);
  formData.append("marque", marque);
  formData.append("type", type);
  formData.append("numChassis", noChassi);
  // formData.append("id_user", id);
  formData.append("id_puissance", puissance);
  formData.append("id_agent", id);

  return apiClient.post("vignettes/add", formData);
}

//buy vignette
export const buyVignetteAgentMutation = (info) => {
  let { name, surname, phone, marque, type, noChassi, id } = info;
  const formData = new FormData();

  formData.append("nom", name);
  formData.append("prenom", surname);
  formData.append("tel", phone);
  formData.append("marque", marque);
  formData.append("type", type);
  formData.append("numChassis", noChassi);
  formData.append("id_agent", id);

  return apiClient.post("vignettes/add", formData);
};

//vignette by user"
const getVignetteById = async (id) => {
  const formData = new FormData();
  formData.append("id_user", id);
  const { data } = await apiClient.post("/vignettes/detail", formData);
  return data;
};

export function useVignette(Id) {
  return useQuery(["vignette", Id], () => getVignetteById(Id), {
    enabled: !!Id,
  });
}

//update user info
// TODO

//update password
export const updatePassword = (sentForm) => {
  const { id_user, actuel, newpass, confirmpass } = sentForm;
  console.log(sentForm)
  const formData = new FormData();

  formData.append("id_user", id_user);
  formData.append("actuel", actuel);
  formData.append("new", newpass);
  formData.append("confirme", confirmpass);
  formData.append("pass", actuel);
  return apiClient.post("/updateUserPass", formData);
};

//all Roles
export function useRoles() {
  return useQuery("roles", async () => {
    const { data } = await apiClient.get("/roles");
    return data;
  },{
    // Refetch the data every second
    refetchInterval: 10000,
    staleTime: 5000,
  });
}

//all guichet
export function useGuichets() {
  return useQuery(
    "posts",
    async () => {
      const { data } = await apiClient.get("/guichets");
      return data;
    },
    {
      // Refetch the data every second
      refetchInterval: 10000,
      staleTime: 5000,
    }
  );
}

//add guichet
export const addGuichet = (num) => {
  const formData = new FormData();
  formData.append("num", num);
  return apiClient.post("/guichets/add", formData);
};

//update Guichet
export const updateGuichet = (sentForm) => {
  const { id_guichet, num } = sentForm;
  const formData = new FormData();
  formData.append("id_guichet", id_guichet);
  formData.append("num", num);
  return apiClient.post("/guichets/update", formData);
};

//delete Guichet
export const deleteGuichet = (id) => {
  console.log("id:", id);
  const formData = new FormData();

  formData.append("id_guichet", id);
  return apiClient.post("/guichets/delete", formData);
};

// all puissances
export function usePuissances() {
  return useQuery(
    "puissances",
    async () => {
      const { data } = await apiClient.get("/puissances/");
      return data;
    },
    {
      // Refetch the data every second
      staleTime: 10000,
    }
  );
}

//add Puissance
export const addPuissance = (sentForm) => {
  const { puissance, montant, utilisation } = sentForm;
  const formData = new FormData();

  formData.append("puissance", puissance);
  formData.append("montant", montant);
  formData.append("utilisation", utilisation);
  return apiClient.post("/puissances/add", formData);
};

//update puissance
export const updatePuissance = (sentForm) => {
  const { puissance, montant, utilisation, puissance_id } = sentForm;
  const formData = new FormData();

  formData.append("puissance_id", puissance_id);
  formData.append("puissance", puissance);
  formData.append("montant", montant);
  formData.append("utilisation", utilisation);
  return apiClient.post("/puissances/update", formData);
};

//delete Puissance
export const deletePuissance = (id) => {
  console.log("id:", id);
  const formData = new FormData();

  formData.append("puissance_id", id);
  return apiClient.post("/puissances/delete", formData);
};

//all users
export function useUsers() {
  return useQuery(
    "users",
    async () => {
      const { data } = await apiClient.get("/users/");
      return data;
    },
    {
      // Refetch the data every second
      staleTime: 10000,
    }
  );
}

export const addUser = (sentForm) => {
  const { nom, prenom, adresse, tel, login, pass, role } = sentForm;
  const formData = new FormData();

  formData.append("nom", prenom);
  formData.append("adresse", adresse);
  formData.append("tel", tel);
  formData.append("login", login);
  formData.append("pass", pass);
  formData.append("role", role);
  return apiClient.post("/users/add", formData);
};

//update user
export const updateUser = (sentForm) => {
  const { name, surname, adresse, tel, login, role, id} = sentForm;
  const formData = new FormData();

  formData.append("id_user", id);
  formData.append("nom", name);
  formData.append("prenom", surname);
  formData.append("adresse", adresse);
  formData.append("tel", tel);
  formData.append("login", login);
  formData.append("role", role);
  return apiClient.post("/users/update", formData);
};

//delete user
export const deleteUser = (id) => {
  const formData = new FormData();

  formData.append("id_user", id);
  return apiClient.post("/users/delete", formData);
};

//affectation guichet agent
export const affectAgent = (sentForm) => {
  const { id, user_id } = sentForm;
  const formData = new FormData();

  formData.append("id_guichet", id);
  formData.append("users", user_id);
  return apiClient.post("/affectations/add", formData);
};

//delete affectation
export const unaffectAgent = (sentForm) => {
  const { id, user_id } = sentForm;
  const formData = new FormData();

  formData.append("guichet_id", id);
  formData.append("user_id", user_id);
  return apiClient.post("/affectations/delete", formData);
};

//statistiques
export function useStatistiques() {
  return useQuery("statistiques", async () => {
    const { data } = await apiClient.get("/statistiques/");
    return data;
  });
}
