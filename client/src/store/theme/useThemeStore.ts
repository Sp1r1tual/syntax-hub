import { create } from "zustand";

interface IThemeState {
  isDarkTheme: boolean;
  toggleTheme: () => void;
}

export const useThemeStore = create<IThemeState>((set) => {
  const initialTheme = localStorage.getItem("theme") || "dark";

  if (typeof document !== "undefined") {
    document.body.classList.toggle("light-theme", initialTheme === "light");
  }

  return {
    isDarkTheme: initialTheme === "dark",

    toggleTheme: () =>
      set((state) => {
        const newTheme = !state.isDarkTheme;

        document.body.classList.add("theme-transitioning");
        document.body.classList.toggle("light-theme", !newTheme);
        localStorage.setItem("theme", newTheme ? "dark" : "light");

        setTimeout(() => {
          document.body.classList.remove("theme-transitioning");
        }, 400);

        return { isDarkTheme: newTheme };
      }),
  };
});
