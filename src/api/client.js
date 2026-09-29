import axios from "axios";
import { getApiBaseUrl } from "../utils/apiBaseUrl.js";

const api = axios.create({
  baseURL: getApiBaseUrl(),
  withCredentials: true,
});

export default api;
