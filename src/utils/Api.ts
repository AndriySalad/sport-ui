import axios from "axios";
import { API_ROUTE } from "../ApiRoute";

const axiosInstance = axios.create({
  baseURL: API_ROUTE,
});

export default axiosInstance;
