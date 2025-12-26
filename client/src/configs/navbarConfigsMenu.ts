import { IMenuConfig } from "@/types";

export const MENU_CONFIG: Record<string, IMenuConfig> = {
  learning: {
    label: "Навчання",
    items: [{ path: "/courses", label: "Курси" }],
  },
  community: {
    label: "Спільнота",
    items: [{ path: "/forum", label: "Форум" }],
  },
};
