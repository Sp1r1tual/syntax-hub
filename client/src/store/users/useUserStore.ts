import { create } from "zustand";

import { IUpdateUserProfilePayload } from "@/common/types";

import { useAuthStore } from "../auth/useAuthStore";

import { UsersService } from "@/api/services/usersService";

interface IUserState {
  isLoading: boolean;
  error: string | null;
  updateProfile: (data: IUpdateUserProfilePayload) => Promise<void>;
}

export const useUserStore = create<IUserState>((set) => ({
  isLoading: false,
  error: null,

  updateProfile: async (data) => {
    set({ isLoading: true, error: null });

    try {
      const response = await UsersService.changeProfileInfo(data);

      useAuthStore.getState().setUser({
        ...useAuthStore.getState().user,
        ...response.data,
      });
    } catch (error) {
      set({ error: String(error) });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
}));
