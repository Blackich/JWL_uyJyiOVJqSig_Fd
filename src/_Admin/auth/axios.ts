import axios from "axios";

const instanseAxios = axios.create({
  baseURL: "http://localhost:4444",
});

instanseAxios.interceptors.request.use((config) => {
  config.headers.Authorization = localStorage.getItem("token");
  config.withCredentials = true;
  return config;
});

export default instanseAxios;
