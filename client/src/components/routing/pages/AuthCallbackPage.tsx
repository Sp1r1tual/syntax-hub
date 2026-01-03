import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import { useAuthStore } from "@/store/auth/useAuthStore";
import { UsersService } from "@/api/services/usersService";

import { PageLoader } from "@/components/ui/loaders/PageLoader";

export const AuthCallbackPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const { setUser } = useAuthStore();

  const [redirectPath] = useState(() => {
    const saved = sessionStorage.getItem("redirectAfterLogin");

    sessionStorage.removeItem("redirectAfterLogin");
    return saved || "/";
  });

  useEffect(() => {
    const token = searchParams.get("token");

    if (token) {
      localStorage.setItem("accessToken", token);

      UsersService.getUser()
        .then((user) => {
          setUser(user);
          navigate(redirectPath, { replace: true });
        })
        .catch(() => {
          navigate("/", { replace: true });
        });
    } else {
      navigate("/", { replace: true });
    }
  }, [searchParams, navigate, setUser, redirectPath]);

  return <PageLoader isLoading={true} />;
};
