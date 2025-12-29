import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosError,
  AxiosResponse,
} from "axios";

import { IUser } from "@/common/types";

import { useAuthStore } from "@/store/auth/useAuthStore";

import { isTokenExpired } from "@/common/helpers/api/isTokenExpired";

let refreshPromise: Promise<string> | null = null;

const refreshToken = async (): Promise<string> => {
  if (!refreshPromise) {
    refreshPromise = (async () => {
      try {
        const response = await axios.post<{ accessToken: string; user: IUser }>(
          `${import.meta.env.VITE_API_URL}/auth/refresh`,
          {},
          { withCredentials: true },
        );

        const { accessToken, user } = response.data;

        localStorage.setItem("accessToken", accessToken);

        const { setUser } = useAuthStore.getState();
        if (user) setUser(user);

        return accessToken;
      } catch (error) {
        console.error("[Auth] Token refresh failed:", error);

        const { clearAuth } = useAuthStore.getState();
        clearAuth();

        throw error;
      } finally {
        refreshPromise = null;
      }
    })();
  }

  return refreshPromise;
};

const authInterceptors = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.request.use(
    async (config) => {
      const token = localStorage.getItem("accessToken");

      if (token) {
        if (isTokenExpired(token)) {
          try {
            const newToken = await refreshToken();

            if (!config.headers) {
              config.headers = new axios.AxiosHeaders();
            }
            config.headers.set("Authorization", `Bearer ${newToken}`);
          } catch (error) {
            localStorage.removeItem("accessToken");
            console.error(
              "[Auth] Failed to refresh token in request interceptor:",
              error,
            );
          }
        } else {
          if (!config.headers) {
            config.headers = new axios.AxiosHeaders();
          }
          config.headers.set("Authorization", `Bearer ${token}`);
        }
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (
      error: AxiosError & {
        config?: AxiosRequestConfig & { _retry?: boolean };
      },
    ) => {
      const originalRequest = error.config;

      const publicPaths = ["/auth/google", "/auth/refresh", "/auth/logout"];

      if (
        originalRequest &&
        publicPaths.some((path) => originalRequest.url?.includes(path))
      ) {
        return Promise.reject(error);
      }

      if (
        originalRequest &&
        error.response?.status === 401 &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;

        try {
          const newToken = await refreshToken();

          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
          }

          return axiosInstance(originalRequest);
        } catch (refreshError) {
          console.error(
            "[Auth] Token refresh failed in response interceptor:",
            refreshError,
          );

          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    },
  );
};

export { authInterceptors, refreshToken };
