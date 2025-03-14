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
  /** 图表组件id */
  chartId: string;
  /** 图表类型 */
  type: string;
  /** 是否展示图表标题 */
  isShowTitle?: boolean;
  /** 图表标题 */
  title?: string;
  /** 标题文本颜色 */
  titleColor?: string;
  /** 标题字号 */
  titleFontSize?: number | string | undefined;
  /** 是否显示备注 */
  isShowRemark?: boolean;
  /** 备注内容 */
  remark?: string;
  /** 备注位置 */
  remarkPosition?: "afterTitle" | "belowTitle";
  /** 是否显示尾注 */
  isShowEndNote?: boolean;
  /** 尾注内容 */
  endNote?: string;
  /** 是否显示组件背景颜色 */
  isShowBackgroundColor?: boolean;
  /** 组件背景颜色 */
  backgroundColor?: string;
  /** 组件圆角 */
  borderRadius?: number;
  /** 图表卡片的内边距-上、左、下、右 */
  chartCardPadding?: number[];
  color?: string;
  showLegend?: boolean;
};

const useChartStore = create<State & Action>((set, get) => ({
  curChartId: null,
  chartsConfig: [
    {
      chartId: "pie",
      type: "pie",
      isShowTitle: true,
      title: "饼图",
      titleColor: "#1677ff",
      titleFontSize: 18,
      isShowRemark: false,
      remark: "备注1",
      remarkPosition: "afterTitle",
      isShowEndNote: false,
      endNote: "",
      isShowBackgroundColor: true,
      backgroundColor: "#90b3e7",
      borderRadius: 0,
      chartCardPadding: [10, 10, 10, 10],
    },
    {
      chartId: "barStackPercent",
      type: "barStackPercent",
      isShowTitle: true,
      title: "堆叠百分比图",
      titleColor: "#1677ff",
      titleFontSize: 18,
      isShowRemark: false,
      remark: "备注1",
      remarkPosition: "afterTitle",
      isShowEndNote: false,
      endNote: "",
      isShowBackgroundColor: true,
      backgroundColor: "#90b3e7",
      borderRadius: 0,
      chartCardPadding: [10, 10, 10, 10],
    },
    {
      chartId: "barStack",
      type: "barStack",
      isShowTitle: true,
      title: "堆叠柱状图",
      titleColor: "#1677ff",
      titleFontSize: 18,
      isShowRemark: false,
      remark: "备注1",
      remarkPosition: "afterTitle",
      isShowEndNote: false,
      endNote: "",
      isShowBackgroundColor: true,
      backgroundColor: "#90b3e7",
      borderRadius: 0,
      chartCardPadding: [10, 10, 10, 10],
    },
    {
      chartId: "lineStackPercent",
      type: "polylineStackPercent",
      isShowTitle: true,
      title: "堆叠百分比图面积图",
      titleColor: "#1677ff",
      titleFontSize: 14,
      isShowRemark: false,
      remark: "备注2",
      remarkPosition: "belowTitle",
      isShowEndNote: false,
      endNote: "",
      isShowBackgroundColor: true,
      backgroundColor: "#90b3e7",
      borderRadius: 0,
      chartCardPadding: [10, 10, 10, 10],
    },
    {
      chartId: "lineStack",
      type: "polylineStack",
      isShowTitle: true,
      title: "堆叠图面积图",
      titleColor: "#1677ff",
      titleFontSize: 14,
      isShowRemark: false,
      remark: "备注2",
      remarkPosition: "belowTitle",
      isShowEndNote: false,
      endNote: "",
      isShowBackgroundColor: true,
      backgroundColor: "#90b3e7",
      borderRadius: 0,
      chartCardPadding: [10, 10, 10, 10],
    },
    {
      chartId: "0",
      isShowTitle: true,
      title: "柱状图",
      titleColor: "#1677ff",
      titleFontSize: 18,
      isShowRemark: false,
      remark: "备注1",
      remarkPosition: "afterTitle",
      isShowEndNote: false,
      endNote: "",
      isShowBackgroundColor: true,
      backgroundColor: "#90b3e7",
      borderRadius: 0,
      chartCardPadding: [10, 10, 10, 10],
      type: "bar",
      color: "#1890ff",
      showLegend: true,
    },
    {
      chartId: "1",
      isShowTitle: true,
      title: "折线图",
      titleColor: "#1677ff",
      titleFontSize: 14,
      isShowRemark: false,
      remark: "备注2",
      remarkPosition: "belowTitle",
      isShowEndNote: false,
      endNote: "",
      isShowBackgroundColor: true,
      backgroundColor: "#90b3e7",
      borderRadius: 0,
      chartCardPadding: [10, 10, 10, 10],
      type: "line",
      color: "#52c41a",
      showLegend: false,
    },
    {
      chartId: "3",
      isShowTitle: true,
      title: "面积图",
      titleColor: "#1677ff",
      titleFontSize: 14,
      isShowRemark: false,
      remark: "备注2",
      remarkPosition: "belowTitle",
      isShowEndNote: false,
      endNote: "",
      isShowBackgroundColor: true,
      backgroundColor: "#90b3e7",
      borderRadius: 0,
      chartCardPadding: [10, 10, 10, 10],
      type: "polyline",
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
