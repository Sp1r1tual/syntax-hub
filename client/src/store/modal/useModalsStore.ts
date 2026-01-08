import { create } from "zustand";

interface IModalsState {
  isAuthModalOpen: boolean;
  isProfileModalOpen: boolean;
  isMobileTopicsOpen: boolean;
  isConfirmModalOpen: boolean;
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
}

export const useModalsStore = create<IModalsState>((set) => ({
  isAuthModalOpen: false,
  isProfileModalOpen: false,
  isMobileTopicsOpen: false,
  isConfirmModalOpen: false,
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
}));
