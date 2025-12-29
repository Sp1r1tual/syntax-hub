import { $apiMain } from "@/api";

class AuthService {
  static googleLogin() {
    const currentPath = window.location.pathname + window.location.search;
    sessionStorage.setItem("redirectAfterLogin", currentPath);

    window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
  }

  static refresh() {
    return $apiMain.get<{ accessToken: string }>("/auth/refresh");
  }

  static logout() {
    return $apiMain.post<{ success: boolean; message: string }>("/auth/logout");
  }
}

export { AuthService };
