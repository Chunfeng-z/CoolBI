import { create } from "zustand";

/** 组件仪表配置 */
interface CompPanelState {
  /** 图表添加组件的显示状态 */
  chartMenuStatus: "hidden" | "expand" | "pin";
}

interface CompPanelAction {
  /** 显示图表添加组件 */
  setChartMenuStatus: (status: "hidden" | "expand" | "pin") => void;
}

export const useCompPanelStore = create<CompPanelState & CompPanelAction>(
  (set) => ({
    chartMenuStatus: "hidden",
    setChartMenuStatus: (status) => set({ chartMenuStatus: status }),
  })
);
