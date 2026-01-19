import { create } from "zustand";

import { IUser } from "@/common/types";

import { AuthService } from "@/api/services/authService";

interface IAuthState {
  user: IUser | null;
  isLoading: boolean;
  error: string | null;
  setUser: (user: IUser | null) => void;
  setError: (message: string | null) => void;
  setLoading: (loading: boolean) => void;
  login: () => void;
  logout: () => Promise<void>;
  clearAuth: () => void;
  hasRole: (role: string) => boolean;
}

const useAuthStore = create<IAuthState>((set, get) => ({
  user: null,
  isLoading: false,
  error: null,

  setUser: (user) => set({ user }),
  setError: (error) => set({ error }),
  setLoading: (isLoading) => set({ isLoading }),

  login: () => {
    set({ isLoading: true, error: null });

    try {
      AuthService.googleLogin();
    } catch (error) {
      set({ isLoading: false, error: String(error) });
    }
  },

  logout: async () => {
    set({ isLoading: true, error: null });

    try {
      await AuthService.logout();

      localStorage.removeItem("accessToken");
      set({ user: null, error: null });
    } catch (error) {
      console.error("Logout failed:", error);

      localStorage.removeItem("accessToken");
      set({
        user: null,
        error: "Failed to logout from server",
      });
    } finally {
      set({ isLoading: false });
    }
  },

  clearAuth: () => {
    localStorage.removeItem("accessToken");
    set({ user: null, error: null, isLoading: false });
  },

  hasRole: (role: string) => {
    const { user } = get();

    if (!user) return false;

    return user.role === role;
  },
}));

export { useAuthStore };
