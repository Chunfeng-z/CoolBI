import { create } from "zustand";

import { ChartTypeEnum } from "@/components/dashboard/utils";

interface State {
  /** 当前选中的图表id */
  curChartId: string | null;
  /** 图表组件的所有配置信息 */
  chartsConfig: (ChartConfig | IndicatorTrendConfig)[];
  /** 图表的操作历史记录 */
  history: historyItem[];
  /** 图表操作的重做栈 */
  redoStack: historyItem[];
}

interface Action {
  /** 设置当前选中的图表id */
  setCurChartId: (chartId: string) => void;
  /** 更新当前选中图表组件的配置信息 */
  setChartsConfig: (chartId: string, config: object) => boolean;
  /** 获取当前选中图表的配置信息 */
  getCurrentChartConfig: () => ChartConfig | IndicatorTrendConfig | null;
  /** 追加新的图表组件 */
  appendChartConfig: (config: ChartConfig | IndicatorTrendConfig) => void;
  /** 删除指定图表配置 */
  deleteChartConfig: (chartId: string) => boolean;
  /** 撤销 */
  undo: () => void;
  /** 重做 */
  redo: () => void;
}

type historyItem = {
  chartId: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

/** 图表的基本配置类型 */
export interface ChartConfig {
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
  /** 标题是否加粗-默认加粗 */
  isTitleBold?: boolean;
  /** 标题是否斜体 */
  isTitleItalic?: boolean;
  /** 标题的对齐方式-默认左对齐 */
  titleAlign?: "left" | "center";
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
  /** 是否显示组件自定义背景填充 */
  isShowBackgroundColor?: boolean;
  /** 组件背景颜色 */
  backgroundColor?: string;
  /** 组件圆角 */
  borderRadius?: number;
  /** 图表卡片的内边距-上、左、下、右 */
  chartCardPadding?: number[];
  color?: string;
  showLegend?: boolean;
  /** 图表组件在仪表板中grid布局的位置信息 */
  layout?: {
    i: string;
    /** x轴位置 */
    x: number;
    /** y轴位置 */
    y: number;
    /** 宽度 */
    w: number;
    /** 高度 */
    h: number;
  };
}

/** 指标趋势图的额外配置 */
export interface IndicatorTrendConfig extends ChartConfig {
  /** 当前图表类型为指标趋势图 */
  type: ChartTypeEnum.indicatorTrend;
  /** 是否显示趋势图 */
  isShowTrendChart?: boolean;
  /** 指标趋势图的类型 */
  trendChartType?: "area" | "bar" | "line";
  /** 线条类型 */
  lineType?: "curve" | "straight";
  /** 线条样式 */
  lineStyle?: "solid" | "dashed";
  /** 线条宽度 */
  lineWidth?: number;
  /** 是否显示标记点 */
  showMarkers?: boolean;
  /** 内容在指标块的位置 */
  indicatorContentPosition?: "left" | "center";
  /** 指标值的行间距
   * - normal: 正常
   * - small: 紧凑
   */
  indicatorValueLineSpace?: "normal" | "small";
  /** 指标名称字体配置 */
  indicatorNameFontConfig?: {
    color?: string;
    fontSize?: number;
    isBold?: boolean;
    isItalic?: boolean;
  };
  /** 指标数值字体配置 */
  indicatorValueFontConfig?: {
    color?: string;
    fontSize?: number;
    isBold?: boolean;
    isItalic?: boolean;
  };
}

const useChartStore = create<State & Action>((set, get) => ({
  curChartId: null,
  chartsConfig: [
    {
      chartId: "indicatorTrend",
      type: "indicatorTrend",
      isShowTitle: false,
      title: "指标趋势图",
      titleColor: "#1677ff",
      titleFontSize: 16,
      isTitleBold: true,
      isTitleItalic: false,
      titleAlign: "left",
      isShowRemark: false,
      remark: "备注1",
      remarkPosition: "afterTitle",
      isShowEndNote: false,
      endNote: "",
      isShowBackgroundColor: true,
      backgroundColor: "#ffffff",
      borderRadius: 4,
      chartCardPadding: [5, 10, 10, 10],
      layout: {
        i: "indicatorTrend",
        x: 0,
        y: 0,
        w: 3,
        h: 3,
      },
      isShowTrendChart: true,
      trendChartType: "area",
      lineType: "curve",
      lineStyle: "solid",
      lineWidth: 2,
      showMarkers: false,
      indicatorContentPosition: "left",
      indicatorValueLineSpace: "small",
    },
    // {
    //   chartId: "pie",
    //   type: "pie",
    //   isShowTitle: true,
    //   title: "饼图",
    //   titleColor: "#1677ff",
    //   titleFontSize: 18,
    //   isShowRemark: false,
    //   remark: "备注1",
    //   remarkPosition: "afterTitle",
    //   isShowEndNote: false,
    //   endNote: "",
    //   isShowBackgroundColor: true,
    //   backgroundColor: "#ffffff",
    //   borderRadius: 4,
    //   chartCardPadding: [10, 10, 10, 10],
    //   layout: {
    //     i: "pie",
    //     x: 6,
    //     y: 0,
    //     w: 6,
    //     h: 4,
    //   },
    // },
    // {
    //   chartId: "barStackPercent",
    //   type: "barStackPercent",
    //   isShowTitle: true,
    //   title: "堆叠百分比图",
    //   titleColor: "#1677ff",
    //   titleFontSize: 18,
    //   isShowRemark: false,
    //   remark: "备注1",
    //   remarkPosition: "afterTitle",
    //   isShowEndNote: false,
    //   endNote: "",
    //   isShowBackgroundColor: true,
    //   backgroundColor: "#fff",
    //   borderRadius: 4,
    //   chartCardPadding: [10, 10, 10, 10],
    //   layout: {
    //     i: "barStackPercent",
    //     x: 0,
    //     y: 4,
    //     w: 6,
    //     h: 4,
    //   },
    // },
    // {
    //   chartId: "barStack",
    //   type: "barStack",
    //   isShowTitle: true,
    //   title: "堆叠柱状图",
    //   titleColor: "#1677ff",
    //   titleFontSize: 18,
    //   isShowRemark: false,
    //   remark: "备注1",
    //   remarkPosition: "afterTitle",
    //   isShowEndNote: false,
    //   endNote: "",
    //   isShowBackgroundColor: true,
    //   backgroundColor: "#fff",
    //   borderRadius: 4,
    //   chartCardPadding: [10, 10, 10, 10],
    //   layout: {
    //     i: "barStack",
    //     x: 6,
    //     y: 4,
    //     w: 6,
    //     h: 4,
    //   },
    // },
    // {
    //   chartId: "lineStackPercent",
    //   type: "polylineStackPercent",
    //   isShowTitle: true,
    //   title: "堆叠百分比图面积图",
    //   titleColor: "#1677ff",
    //   titleFontSize: 14,
    //   isShowRemark: false,
    //   remark: "备注2",
    //   remarkPosition: "belowTitle",
    //   isShowEndNote: false,
    //   endNote: "",
    //   isShowBackgroundColor: true,
    //   backgroundColor: "#fff",
    //   borderRadius: 4,
    //   chartCardPadding: [10, 10, 10, 10],
    //   layout: {
    //     i: "lineStackPercent",
    //     x: 0,
    //     y: 8,
    //     w: 6,
    //     h: 4,
    //   },
    // },
    // {
    //   chartId: "lineStack",
    //   type: "polylineStack",
    //   isShowTitle: true,
    //   title: "堆叠图面积图",
    //   titleColor: "#1677ff",
    //   titleFontSize: 14,
    //   isShowRemark: false,
    //   remark: "备注2",
    //   remarkPosition: "belowTitle",
    //   isShowEndNote: false,
    //   endNote: "",
    //   isShowBackgroundColor: true,
    //   backgroundColor: "#fff",
    //   borderRadius: 4,
    //   chartCardPadding: [10, 10, 10, 10],
    //   layout: {
    //     i: "lineStack",
    //     x: 6,
    //     y: 8,
    //     w: 6,
    //     h: 4,
    //   },
    // },
    // {
    //   chartId: "bar",
    //   isShowTitle: true,
    //   title: "柱状图",
    //   titleColor: "#1677ff",
    //   titleFontSize: 18,
    //   isShowRemark: false,
    //   remark: "备注1",
    //   remarkPosition: "afterTitle",
    //   isShowEndNote: false,
    //   endNote: "",
    //   isShowBackgroundColor: true,
    //   backgroundColor: "#fff",
    //   borderRadius: 4,
    //   chartCardPadding: [10, 10, 10, 10],
    //   type: "bar",
    //   color: "#1890ff",
    //   showLegend: true,
    //   layout: {
    //     i: "bar",
    //     x: 0,
    //     y: 12,
    //     w: 6,
    //     h: 4,
    //   },
    // },
    // {
    //   chartId: "line",
    //   isShowTitle: true,
    //   title: "折线图",
    //   titleColor: "#1677ff",
    //   titleFontSize: 14,
    //   isShowRemark: false,
    //   remark: "备注2",
    //   remarkPosition: "belowTitle",
    //   isShowEndNote: false,
    //   endNote: "",
    //   isShowBackgroundColor: true,
    //   backgroundColor: "#fff",
    //   borderRadius: 4,
    //   chartCardPadding: [10, 10, 10, 10],
    //   type: "line",
    //   color: "#52c41a",
    //   showLegend: false,
    //   layout: {
    //     i: "line",
    //     x: 6,
    //     y: 12,
    //     w: 6,
    //     h: 4,
    //   },
    // },
    // {
    //   chartId: "areArraysEqualCircular",
    //   isShowTitle: true,
    //   title: "面积图",
    //   titleColor: "#1677ff",
    //   titleFontSize: 14,
    //   isShowRemark: false,
    //   remark: "备注2",
    //   remarkPosition: "belowTitle",
    //   isShowEndNote: false,
    //   endNote: "",
    //   isShowBackgroundColor: true,
    //   backgroundColor: "#fff",
    //   borderRadius: 4,
    //   chartCardPadding: [10, 10, 10, 10],
    //   type: "polyline",
    //   color: "#52c41a",
    //   showLegend: false,
    //   layout: {
    //     i: "areArraysEqualCircular",
    //     x: 0,
    //     y: 16,
    //     w: 6,
    //     h: 4,
    //   },
    // },
  ],
  redoStack: [],
  history: [],
  setCurChartId: (chartId: string) => set({ curChartId: chartId }),
  setChartsConfig: (chartId: string, config: object) => {
    const state = get();
    const { chartsConfig, history, getCurrentChartConfig } = state;
    const index = chartsConfig.findIndex(
      (chart: ChartConfig | IndicatorTrendConfig) => chart.chartId === chartId
    );
    if (index !== -1) {
      // 更新已存在的图表配置
      const updatedConfig = [...chartsConfig];
      updatedConfig[index] = { ...updatedConfig[index], ...config };
      let updatedHistory: object[] = [];

      // 第一次修改的时候，将当前配置项添加到历史记录中才可复原
      if (history.length === 0) {
        // TODO: 后续需要拓展不仅是支持当前选中的图表
        const currentConfig = getCurrentChartConfig();
        if (currentConfig) {
          updatedHistory = [currentConfig, { chartId, ...config }];
        }
      } else {
        updatedHistory = [
          ...history,
          {
            chartId,
            ...config,
          },
        ];
      }

      set({
        chartsConfig: updatedConfig,
        // 清空redo栈
        redoStack: [],
        // 添加新的历史记录
        history: updatedHistory as historyItem[],
      });
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
      chartsConfig.find(
        (chart: ChartConfig | IndicatorTrendConfig) =>
          chart.chartId === curChartId
      ) || null
    );
  },
  /** 在添加图表的时候针对不同的图表类型预设对应的属性 */
  appendChartConfig: (config: ChartConfig | IndicatorTrendConfig) => {
    // 不同类型的图表特殊的默认配置
    let defaultConfig = {};
    switch (config.type) {
      case ChartTypeEnum.indicatorTrend: {
        defaultConfig = {
          isShowTrendChart: true,
          trendChartType: "area",
          lineType: "curve",
          lineStyle: "solid",
          lineWidth: 2,
          showMarkers: false,
          indicatorContentPosition: "left",
          indicatorValueLineSpace: "small",
        };
        break;
      }
    }
    // 共同默认配置
    set({
      chartsConfig: [
        ...get().chartsConfig,
        {
          ...{
            isTitleBold: true,
            titleAlign: "left",
            backgroundColor: "#ffffff",
            layout: {
              i: config.chartId,
              x: 0,
              y: 0,
              w: 4,
              h: 3,
            },
          },
          ...defaultConfig,
          ...config,
        },
      ],
    });
  },
  deleteChartConfig: (chartId: string) => {
    const state = get();
    const { chartsConfig, curChartId } = state;
    const index = chartsConfig.findIndex(
      (chart: ChartConfig | IndicatorTrendConfig) => chart.chartId === chartId
    );
    if (index !== -1) {
      const updatedConfig = [...chartsConfig];
      updatedConfig.splice(index, 1);

      // 如果删除的是当前选中的图表，则清空当前选中图表
      const updatedCurChartId = curChartId === chartId ? null : curChartId;

      set({
        chartsConfig: updatedConfig,
        curChartId: updatedCurChartId,
        // TODO:redo 和 undo需要之后适配
      });
      return true;
    }
    return false;
  },
  undo: () => {
    const state = get();
    const { history, chartsConfig, redoStack } = state;
    // 由于会记录初始状态，所以历史记录至少有两个
    if (history.length <= 1) return false;
    // 当前状态操作的上一个操作（前一个状态）
    const preChange = history[history.length - 2];
    const curChange = history[history.length - 1];
    const index = chartsConfig.findIndex(
      (chart: ChartConfig | IndicatorTrendConfig) =>
        chart.chartId === preChange.chartId
    );
    const updatedChartsConfig = [...chartsConfig];
    // 撤销后的图表配置
    updatedChartsConfig[index] = {
      ...chartsConfig[index],
      ...preChange,
    };
    set({
      chartsConfig: updatedChartsConfig,
      // 将当前的状态添加到重做栈中
      redoStack: [curChange, ...redoStack],
      // 移除已撤销的项
      history: history.slice(0, history.length - 1),
    });
  },
  redo: () => {
    const state = get();
    const { redoStack, chartsConfig, history } = state;
    if (redoStack?.length === 0) return false;
    // 当前操作的下一个操作，即前一次撤销的操作
    const nextChange = redoStack[0];
    const index = chartsConfig.findIndex(
      (chart: ChartConfig | IndicatorTrendConfig) =>
        chart.chartId === nextChange.chartId
    );
    const updatedChartsConfig = [...chartsConfig];
    // 重做后的图表配置
    updatedChartsConfig[index] = {
      ...chartsConfig[index],
      ...nextChange,
    };
    set({
      chartsConfig: updatedChartsConfig,
      // 重新将当前修改的配置项添加到历史记录中
      history: [...history, nextChange],
      // 移除已恢复的项
      redoStack: redoStack.slice(1),
    });
  },
}));

export default useChartStore;
