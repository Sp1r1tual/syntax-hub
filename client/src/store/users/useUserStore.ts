import { create } from "zustand";

import { IUpdateUserProfilePayload, PublicUserType } from "@/common/types";

import { useAuthStore } from "../auth/useAuthStore";

import { UsersService } from "@/api/services/usersService";

interface IUserState {
  publicUser: PublicUserType | null;
  isLoading: boolean;
  error: string | null;
  updateProfile: (data: IUpdateUserProfilePayload) => Promise<void>;
  fetchPublicUser: (userId: string) => Promise<void>;
  reset: () => void;
}

export const useUserStore = create<IUserState>((set) => ({
  publicUser: null,
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

  fetchPublicUser: async (userId) => {
    set({ isLoading: true, error: null });

    try {
      const publicUser = await UsersService.getPublicUser(userId);
      set({ publicUser });
    } catch (error) {
      set({ error: String(error), publicUser: null });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  reset: () => {
    set({ publicUser: null, error: null, isLoading: false });
  },
}));
