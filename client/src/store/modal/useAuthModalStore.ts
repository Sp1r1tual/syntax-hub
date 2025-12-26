import { create } from "zustand";

type AuthModalState = {
  isAuthModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
};

export const useAuthModalStore = create<AuthModalState>((set) => ({
  isAuthModalOpen: false,

  openAuthModal: () => set({ isAuthModalOpen: true }),
  closeAuthModal: () => set({ isAuthModalOpen: false }),
}));
