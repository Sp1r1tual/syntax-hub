import { create } from "zustand";

interface IModalsState {
  isAuthModalOpen: boolean;
  isProfileModalOpen: boolean;
  isMobileTopicsOpen: boolean;

  openAuthModal: () => void;
  closeAuthModal: () => void;
  openProfileModal: () => void;
  closeProfileModal: () => void;
  openMobileTopicsModal: () => void;
  closeMobileTopicsModal: () => void;
}

export const useModalsStore = create<IModalsState>((set) => ({
  isAuthModalOpen: false,
  isProfileModalOpen: false,
  isMobileTopicsOpen: false,

  openAuthModal: () => set({ isAuthModalOpen: true }),
  closeAuthModal: () => set({ isAuthModalOpen: false }),

  openProfileModal: () => set({ isProfileModalOpen: true }),
  closeProfileModal: () => set({ isProfileModalOpen: false }),

  openMobileTopicsModal: () => set({ isMobileTopicsOpen: true }),
  closeMobileTopicsModal: () => set({ isMobileTopicsOpen: false }),
}));
