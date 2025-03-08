import { create } from "zustand";

interface State {
  /** 当前选中的图表id */
  curChartId: string | null;
  /** 图表组件的所有配置信息 */
  chartsConfig: ChartConfig[];
}

interface Action {
  /** 设置当前选中的图表id */
  setCurChartId: (chartId: string) => void;
  /** 修改当前选中图表组件的配置信息 */
  setChartsConfig: (chartId: string, config: ChartConfig) => boolean;
  /** 获取当前选中图表的配置信息 */
  getCurrentChartConfig: () => ChartConfig | null;
}

/** 图表的配置类型 */
export type ChartConfig = {
  chartId: string;
  title?: string;
  type: string;
  color?: string;
  showLegend?: boolean;
};

const useChartStore = create<State & Action>((set, get) => ({
  curChartId: null,
  chartsConfig: [
    {
      chartId: "0",
      title: "图表1",
      type: "bar",
      color: "#1890ff",
      showLegend: true,
    },
    {
      chartId: "1",
      title: "图表2",
      type: "line",
      color: "#52c41a",
      showLegend: false,
    },
  ],
  setCurChartId: (chartId: string) => set({ curChartId: chartId }),
  setChartsConfig: (chartId: string, config: ChartConfig) => {
    const state = get();
    const index = state.chartsConfig.findIndex(
      (chart: ChartConfig) => chart.chartId === chartId
    );
    if (index !== -1) {
      // 更新已存在的图表配置
      const updatedConfig = [...state.chartsConfig];
      updatedConfig[index] = { ...updatedConfig[index], ...config };
      set({ chartsConfig: updatedConfig });
      return true;
    } else {
      // 添加新的图表配置
      return false;
    }
  },
  getCurrentChartConfig: () => {
    const { curChartId, chartsConfig } = get();
    if (curChartId === null) return null;
    return (
      chartsConfig.find((chart: ChartConfig) => chart.chartId === curChartId) ||
      null
    );
  },
}));

export default useChartStore;
