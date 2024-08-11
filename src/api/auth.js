import axios from "./axios.js";

export const loginRequest = async (email, password) => {
  return axios.post("/login", {
    email,
    password,
  });
};

export const panelRequest = async () => {
  return axios.get("/panel");
};