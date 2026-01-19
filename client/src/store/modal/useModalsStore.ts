import { create } from "zustand";

interface IModalsState {
  publicUserId: string | null;
  isAuthModalOpen: boolean;
  isProfileModalOpen: boolean;
  isMobileTopicsOpen: boolean;
  isConfirmModalOpen: boolean;
  isPublicProfileModalOpen: boolean;
  confirmText: string;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  openProfileModal: () => void;
  closeProfileModal: () => void;
  openMobileTopicsModal: () => void;
  onConfirm?: (() => void) | undefined;
  closeMobileTopicsModal: () => void;
  openConfirmModal: (text?: string, onConfirm?: () => void) => void;
  closeConfirmModal: () => void;
  openPublicProfileModal: (userId: string) => void;
  closePublicProfileModal: () => void;
}

export const useModalsStore = create<IModalsState>((set) => ({
  publicUserId: null,
  isAuthModalOpen: false,
  isProfileModalOpen: false,
  isMobileTopicsOpen: false,
  isConfirmModalOpen: false,
  isPublicProfileModalOpen: false,
  confirmText: "",
  onConfirm: undefined,

  openAuthModal: () => set({ isAuthModalOpen: true }),
  closeAuthModal: () => set({ isAuthModalOpen: false }),

  openProfileModal: () => set({ isProfileModalOpen: true }),
  closeProfileModal: () => set({ isProfileModalOpen: false }),

  openMobileTopicsModal: () => set({ isMobileTopicsOpen: true }),
  closeMobileTopicsModal: () => set({ isMobileTopicsOpen: false }),

  openConfirmModal: (text = "Підтвердження дії", onConfirm?: () => void) =>
    set({ isConfirmModalOpen: true, confirmText: text, onConfirm }),
  closeConfirmModal: () =>
    set({ isConfirmModalOpen: false, confirmText: "", onConfirm: undefined }),

  openPublicProfileModal: (userId: string) =>
    set({
      isPublicProfileModalOpen: true,
      publicUserId: userId,
    }),
  closePublicProfileModal: () => set({ isPublicProfileModalOpen: false }),
}));
