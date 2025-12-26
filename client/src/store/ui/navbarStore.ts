import { create } from "zustand";

interface INavbarStore {
  mobileOpen: boolean;
  desktopMenus: Record<string, boolean>;
  mobileMenus: Record<string, boolean>;
  activeMobileSubmenu: string | null;
  toggleMobile: () => void;
  closeMobile: () => void;
  toggleDesktopMenu: (menuKey: string, open: boolean) => void;
  toggleMobileSubmenu: (menuKey: string | null) => void;
}

export const useNavbarStore = create<INavbarStore>((set) => ({
  mobileOpen: false,
  desktopMenus: {},
  mobileMenus: {},
  activeMobileSubmenu: null,

  toggleMobile: () =>
    set((state) => ({
      mobileOpen: !state.mobileOpen,
      activeMobileSubmenu: null,
      mobileMenus: {},
    })),

  closeMobile: () =>
    set({
      mobileOpen: false,
      activeMobileSubmenu: null,
      mobileMenus: {},
    }),

  toggleDesktopMenu: (menuKey, open) =>
    set((state) => ({
      desktopMenus: {
        ...state.desktopMenus,
        [menuKey]: open,
      },
    })),

  toggleMobileSubmenu: (menuKey) =>
    set((state) => ({
      activeMobileSubmenu: menuKey,
      mobileMenus: menuKey
        ? { ...state.mobileMenus, [menuKey]: true }
        : state.mobileMenus,
    })),
}));
