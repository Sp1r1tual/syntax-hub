import { IMenuConfig } from "@/common/types";

export const MENU_CONFIG: Record<string, IMenuConfig> = {
  learning: {
    label: "Навчання",
    items: [{ path: "/courses", label: "Курси" }],
  },
  community: {
    label: "Спільнота",
    items: [{ path: "/news", label: "Новини" }],
  },
};
