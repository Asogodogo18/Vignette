import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "react-query";
import apiClient from "../services/http-common";
//const formData = new FormData();

//all vignettes
export function useVignettes() {
  return useQuery("vignettes", async () => {
    const { data } = await apiClient.get("vignettes/");
    return data;
  });
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

  return apiClient.post("vignettes/add", formData)
   
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
// TODO

//all guichet
export function useGuichets() {
  return useQuery("posts", async () => {
    const { data } = await apiClient.get("/guichets");
    return data;
  });
}

//add guichet

// all puissances
export function usePuissances() {
  return useQuery("puissances", async () => {
    const { data } = await apiClient.get("/puissances/");
    return data;
  });
}

//delete Puissance

//add Puissance

//update puissance

//all users
export function useUsers() {
  return useQuery("users", async () => {
    const { data } = await apiClient.get("/users/");
    return data;
  });
}

//update user

//delete user

//affectation guichet agent

//delete affectation
