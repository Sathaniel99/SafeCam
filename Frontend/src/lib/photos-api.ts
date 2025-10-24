import axios from "axios";
import { URL } from "@/utils";

export const photosApi = axios.create({
  baseURL: URL,
});
