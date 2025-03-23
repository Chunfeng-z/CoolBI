import { create } from "zustand";

interface ThemeState {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

// 从 localStorage 获取初始值
const getInitialTheme = () => localStorage.getItem("theme") === "dark";

export const useThemeStore = create<ThemeState>((set) => ({
  isDarkMode: getInitialTheme(),
  toggleTheme: () =>
    set((state) => {
      const newTheme = !state.isDarkMode;
      localStorage.setItem("theme", newTheme ? "dark" : "light");
      return { isDarkMode: newTheme };
    }),
}));
