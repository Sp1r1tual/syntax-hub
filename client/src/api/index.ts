import axios from "axios";

import { authInterceptors } from "./interceptors/authInterceptors";

const $apiMain = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

authInterceptors($apiMain);

export { $apiMain };
