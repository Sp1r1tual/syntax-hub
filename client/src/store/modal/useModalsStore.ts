import { create } from "zustand";

interface IModalsState {
  isAuthModalOpen: boolean;
  isProfileModalOpen: boolean;

  openAuthModal: () => void;
  closeAuthModal: () => void;
  openProfileModal: () => void;
  closeProfileModal: () => void;
}

export const useModalsStore = create<IModalsState>((set) => ({
  isAuthModalOpen: false,
  isProfileModalOpen: false,

  openAuthModal: () => set({ isAuthModalOpen: true }),
  closeAuthModal: () => set({ isAuthModalOpen: false }),

  openProfileModal: () => set({ isProfileModalOpen: true }),
  closeProfileModal: () => set({ isProfileModalOpen: false }),
}));
