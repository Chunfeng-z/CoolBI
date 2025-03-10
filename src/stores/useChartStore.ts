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
  setChartsConfig: (chartId: string, config: object) => boolean;
  /** 获取当前选中图表的配置信息 */
  getCurrentChartConfig: () => ChartConfig | null;
  /** 追加新的图表组件 */
  appendChartConfig: (config: ChartConfig) => void;
}

/** 图表的配置类型 */
export type ChartConfig = {
  chartId: string;
  isShowTitle?: boolean;
  title?: string;
  titleColor?: string;
  titleFontSize?: number | string | undefined;
  isShowRemark?: boolean;
  remark?: string;
  remarkPosition?: "afterTitle" | "belowTitle";
  isShowEndNote?: boolean;
  endNote?: string;
  isShowBackgroundColor?: boolean;
  backgroundColor?: string;
  borderRadius?: number;
  type: string;
  color?: string;
  showLegend?: boolean;
};

const useChartStore = create<State & Action>((set, get) => ({
  curChartId: null,
  chartsConfig: [
    {
      chartId: "0",
      isShowTitle: true,
      title: "图表1",
      titleColor: "#1677ff",
      titleFontSize: 18,
      isShowRemark: false,
      remark: "备注1",
      remarkPosition: "afterTitle",
      isShowEndNote: false,
      endNote: "",
      isShowBackgroundColor: false,
      backgroundColor: "#f0f2f5",
      borderRadius: 0,
      type: "bar",
      color: "#1890ff",
      showLegend: true,
    },
    {
      chartId: "1",
      isShowTitle: true,
      title: "图表2",
      titleColor: "#1677ff",
      titleFontSize: 14,
      isShowRemark: false,
      remark: "备注2",
      remarkPosition: "belowTitle",
      isShowEndNote: false,
      endNote: "",
      isShowBackgroundColor: false,
      backgroundColor: "#f0f2f5",
      borderRadius: 0,
      type: "line",
      color: "#52c41a",
      showLegend: false,
    },
  ],
  setCurChartId: (chartId: string) => set({ curChartId: chartId }),
  setChartsConfig: (chartId: string, config: object) => {
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
  appendChartConfig: (config: ChartConfig) => {
    set({ chartsConfig: [...get().chartsConfig, config] });
  },
}));

export default useChartStore;
