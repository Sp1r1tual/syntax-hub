import { useEffect, useState } from "react";

import { useAuthStore } from "@/store/auth/useAuthStore";
import { UsersService } from "@/api/services/usersService";
import { refreshToken } from "@/api/interceptors/authInterceptors";
import { MainPreLoader } from "../ui/loaders/MainPreloader";

interface AuthInitializerProps {
  children: React.ReactNode;
}

export const AuthInitializer = ({ children }: AuthInitializerProps) => {
  const { setError, logout, setUser } = useAuthStore();
  const [ready, setReady] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("accessToken");

      if (token) {
        try {
          const newToken = await refreshToken();
          localStorage.setItem("accessToken", newToken);

          const user = await UsersService.getUser();
          setUser(user);
        } catch (error) {
          console.error("Auth initialization failed:", error);
          setError("Сесію завершено");
          logout();
        }
      }

      setFadeOut(true);
      setTimeout(() => setReady(true), 500);
    };

    verifyToken();
  }, [logout, setError, setUser]);

  if (!ready) return <MainPreLoader fadeOut={fadeOut} />;

  return <>{children}</>;
};
