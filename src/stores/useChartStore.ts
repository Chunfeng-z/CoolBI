import { produce } from "immer";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import { ChartTypeEnum } from "@/components/dashboard/utils";
import { testData } from "@/test/chartStoreTestData";
import {
  IndicatorCardChartConfig,
  IndicatorTrendChartConfig,
} from "@/types/charts";
import { generateDefaultChartName } from "@/utils/hooks";

interface State {
  /** 当前选中的图表id-用于更新选中组件的配置 */
  curChartId: string | null;
  /** 图表组件的所有配置信息 */
  chartsConfig: (IndicatorCardChartConfig | IndicatorTrendChartConfig)[];
  /** 当前选中的图表的所有配置信息 */
  curChartConfig: IndicatorCardChartConfig | IndicatorTrendChartConfig | null;
  /** 图表的操作历史记录 */
  history: historyItem[];
  /** 图表操作的重做栈 */
  redoStack: historyItem[];
}

interface Action {
  /** 设置当前选中的图表id */
  setCurChartId: (chartId: string) => void;
  /** 更新当前选中图表组件的配置信息 */
  setChartsConfig: (
    chartId: string,
    updater: (
      draft: IndicatorCardChartConfig | IndicatorTrendChartConfig
    ) => void
  ) => boolean;
  /** 更新当前选中的图表的配置信息-会在更新curChartId的时候自动更新 */
  setCurChartConfig: (chartId: string) => boolean;
  /** 获取当前选中图表的配置信息-少使用curChartConfig是因为一旦任意一个配置更新都会导致所有的依赖全部重新渲染 */
  getCurrentChartConfig: () =>
    | IndicatorCardChartConfig
    | IndicatorTrendChartConfig
    | null;
  /** 追加新的图表组件 */
  appendChartConfig: (config: IndicatorTrendChartConfig) => void;
  /** 删除指定图表配置 */
  deleteChartConfig: (chartId: string) => boolean;
  /** 撤销 */
  undo?: () => void;
  /** 重做 */
  redo?: () => void;
}

type historyItem = {
  chartId: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

const useChartStore = create<State & Action>()(
  immer((set, get) => ({
    curChartId: null,
    curChartConfig: null,
    chartsConfig: testData,
    redoStack: [],
    history: [],
    setCurChartId: (chartId: string) => {
      const { setCurChartConfig } = get();
      set((state) => {
        state.curChartId = chartId;
      });
      // 设置当前选中的图表配置
      setCurChartConfig(chartId);
    },
    setCurChartConfig: (chartId: string) => {
      const { chartsConfig } = get();
      const index = chartsConfig.findIndex(
        (chart) => chart.chartId === chartId
      );
      if (index !== -1) {
        set((state) => {
          state.curChartConfig = chartsConfig[index];
        });
        return true;
      }
      return false;
    },
    setChartsConfig: (chartId, updater) => {
      const { chartsConfig } = get();
      const index = chartsConfig.findIndex(
        (chart) => chart.chartId === chartId
      );
      if (index !== -1) {
        // 使用immer的produce来更新draft，确保draft是可变的
        const updatedChart = produce(chartsConfig[index], updater);
        set((state) => {
          state.chartsConfig[index] = updatedChart;
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
      return chartsConfig.find((chart) => chart.chartId === curChartId) || null;
    },
    /** 在添加图表的时候针对不同的图表类型预设对应的属性 */
    appendChartConfig: (config) => {
      const commonConfig = {
        titleCardConfig: {
          isShowTitle: true,
          title: generateDefaultChartName(config.type),
          titleFontConfig: {
            color: "#1677ff",
            fontSize: 14,
            isBold: true,
            isItalic: false,
          },
          titleAlign: "left",
          isShowRemark: false,
          remark: "",
          remarkPosition: "afterTitle",
          isShowEndNote: false,
          endNote: "",
          isShowBackgroundColor: true,
          backgroundColor: "#ffffff",
          borderRadius: 4,
          chartCardPadding: [5, 5, 5, 5],
        },
        layout: {
          i: config.chartId,
          x: 0,
          y: 0,
          w: 4,
          h: 3,
        },
      };
      // 不同类型的图表特殊的默认配置
      let defaultConfig = {};
      switch (config.type) {
        case ChartTypeEnum.indicatorTrend: {
          defaultConfig = {
            trendChartConfig: {
              isShowTrendChart: true,
              trendChartType: "area",
              lineType: "curve",
              lineStyle: "solid",
              lineWidth: 2,
              showMarkers: false,
            },
            indicatorContentConfig: {
              indicatorContentPosition: "left",
              indicatorValueLineSpace: "small",
              indicatorNameFontConfig: {
                color: "#000000",
                fontSize: 14,
                isBold: false,
                isItalic: false,
              },
              indicatorValueFontConfig: {
                color: "#000000",
                fontSize: 22,
                isBold: false,
                isItalic: false,
              },
            },
          };
          break;
        }
      }
      set((state) => {
        state.chartsConfig.push({
          ...commonConfig,
          ...defaultConfig,
          ...config,
        });
      });
    },
    deleteChartConfig: (chartId: string) => {
      const { chartsConfig, curChartId } = get();
      const index = chartsConfig.findIndex(
        (chart) => chart.chartId === chartId
      );
      if (index !== -1) {
        // 如果删除的是当前选中的图表，则清空当前选中图表
        const updatedCurChartId = curChartId === chartId ? null : curChartId;
        set((state) => {
          state.chartsConfig.splice(index, 1);
          state.curChartId = updatedCurChartId;
          // TODO:redo 和 undo需要之后适配
        });
        return true;
      }
      return false;
    },
    // undo: () => {
    //   const state = get();
    //   const { history, chartsConfig, redoStack } = state;
    //   // 由于会记录初始状态，所以历史记录至少有两个
    //   if (history.length <= 1) return false;
    //   // 当前状态操作的上一个操作（前一个状态）
    //   const preChange = history[history.length - 2];
    //   const curChange = history[history.length - 1];
    //   const index = chartsConfig.findIndex(
    //     (chart: ChartConfig | IndicatorTrendConfig) =>
    //       chart.chartId === preChange.chartId
    //   );
    //   const updatedChartsConfig = [...chartsConfig];
    //   // 撤销后的图表配置
    //   updatedChartsConfig[index] = {
    //     ...chartsConfig[index],
    //     ...preChange,
    //   };
    //   set({
    //     chartsConfig: updatedChartsConfig,
    //     // 将当前的状态添加到重做栈中
    //     redoStack: [curChange, ...redoStack],
    //     // 移除已撤销的项
    //     history: history.slice(0, history.length - 1),
    //   });
    // },
    // redo: () => {
    //   const state = get();
    //   const { redoStack, chartsConfig, history } = state;
    //   if (redoStack?.length === 0) return false;
    //   // 当前操作的下一个操作，即前一次撤销的操作
    //   const nextChange = redoStack[0];
    //   const index = chartsConfig.findIndex(
    //     (chart: ChartConfig | IndicatorTrendConfig) =>
    //       chart.chartId === nextChange.chartId
    //   );
    //   const updatedChartsConfig = [...chartsConfig];
    //   // 重做后的图表配置
    //   updatedChartsConfig[index] = {
    //     ...chartsConfig[index],
    //     ...nextChange,
    //   };
    //   set({
    //     chartsConfig: updatedChartsConfig,
    //     // 重新将当前修改的配置项添加到历史记录中
    //     history: [...history, nextChange],
    //     // 移除已恢复的项
    //     redoStack: redoStack.slice(1),
    //   });
    // },
  }))
);

export default useChartStore;
