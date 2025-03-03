import { create } from "zustand";

interface State {
  /** 当前选中的图表id */
  curChartId: number | null;
  /** 图表组件的所有配置信息 */
  chartsConfig: Record<number, object>;
}

interface Action {
  /** 设置当前选中的图表id */
  setCurChartId: (chartId: number) => void;
  /** 修改当前选中图表组件的配置信息 */
  setChartsConfig: (chartId: number, config: object) => void;
}

const useChartStore = create<State & Action>((set) => ({
  curChartId: null,
  chartsConfig: {
    0: {
      title: "chart1",
    },
  },
  setCurChartId: (chartId: number) => set({ curChartId: chartId }),
  setChartsConfig: (chartId: number, config: object) =>
    set((state) => {
      return {
        chartsConfig: {
          ...state.chartsConfig,
          [chartId]: config,
        },
      };
    }),
}));

export default useChartStore;
