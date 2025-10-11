import axios from "axios";

export const photosApi = axios.create({
  baseURL: "http://10.90.62.247/5000",
});
