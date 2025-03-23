import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ThemeState {
  // 暗黑模式
  isDarkMode: boolean;
  // 主题配置项
  colorPrimary: string;
  borderRadius: number;
  // 更多antd配置项
}

interface ThemeAction {
  toggleTheme: () => void;
  setThemeConfig: (
    config: Partial<
      Omit<
        ThemeState,
        "setThemeConfig" | "resetTheme" | "toggleTheme" | "isDarkMode"
      >
    >
  ) => void;
  resetTheme: () => void;
}

// 默认主题配置
const defaultTheme = {
  isDarkMode: false,
  colorPrimary: "#1890ff",
  borderRadius: 6,
  // 其他默认配置
};

export const useThemeStore = create<ThemeState & ThemeAction>()(
  persist(
    (set) => ({
      ...defaultTheme,

      toggleTheme: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
      setThemeConfig: (config) => set((state) => ({ ...state, ...config })),
      // 重置主题配置的时候不更新暗黑模式
      resetTheme: () =>
        set((state) => ({ ...defaultTheme, isDarkMode: state.isDarkMode })),
    }),
    {
      // 命名空间
      name: "cool_bi:theme",
    }
  )
);
