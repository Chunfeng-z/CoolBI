import AuxiliaryConfig from "./AuxiliaryConfig";
import ChartAxis from "./ChartAxis";
import ChartLegend from "./ChartLegend";
import ChartToolTip from "./ChartToolTip";
import ChartTrend from "./ChartTrend";
import DataLabel from "./DataLabel";
import DrawArea from "./DrawArea";
import IndicatorContent from "./IndicatorContent";
import IndicatorLayout from "./IndicatorLayout";
import SeriesConfig from "./SeriesConfig";
import TitleCard from "./TitleCard";

type styleConfigItem = {
  key: string;
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: React.FC<any>;
};

/**
 * 所有支持的图表样式配置项
 */
const BASE_STYLE_ITEMS: Record<string, styleConfigItem> = {
  titleCard: {
    key: "1",
    label: "标题与卡片",
    component: TitleCard,
  },
  drawArea: {
    key: "2",
    label: "绘图区域",
    component: DrawArea,
  },
  chartAxis: {
    key: "3",
    label: "坐标轴",
    component: ChartAxis,
  },
  chartLegend: {
    key: "4",
    label: "图例",
    component: ChartLegend,
  },
  dataLabel: {
    key: "5",
    label: "数据标签",
    component: DataLabel,
  },
  toolTip: {
    key: "6",
    label: "工具提示",
    component: ChartToolTip,
  },
  auxiliaryConfig: {
    key: "7",
    label: "辅助展示",
    component: AuxiliaryConfig,
  },
  chartTrend: {
    key: "8",
    label: "趋势图",
    component: ChartTrend,
  },
  indicatorContent: {
    key: "9",
    label: "指标内容",
    component: IndicatorContent,
  },
  seriesConfig: {
    key: "10",
    label: "系列配置",
    component: SeriesConfig,
  },
  IndicatorLayout: {
    key: "11",
    label: "指标布局",
    component: IndicatorLayout,
  },
};

/**
 * 不同图表类型对应的组件样式配置
 */
export const CHART_TYPE_CONFIG_MAP: Record<
  string,
  (typeof BASE_STYLE_ITEMS.titleCard)[]
> = {
  // 指标看板/卡片图配置
  indicatorCard: [
    BASE_STYLE_ITEMS.titleCard,
    BASE_STYLE_ITEMS.IndicatorLayout,
    BASE_STYLE_ITEMS.indicatorContent,
    BASE_STYLE_ITEMS.seriesConfig,
  ],
  // 指标趋势图配置
  indicatorTrend: [
    BASE_STYLE_ITEMS.titleCard,
    BASE_STYLE_ITEMS.chartTrend,
    BASE_STYLE_ITEMS.indicatorContent,
    BASE_STYLE_ITEMS.seriesConfig,
  ],
  // 柱状图配置
  bar: [
    BASE_STYLE_ITEMS.titleCard,
    BASE_STYLE_ITEMS.drawArea,
    BASE_STYLE_ITEMS.chartAxis,
    BASE_STYLE_ITEMS.chartLegend,
    BASE_STYLE_ITEMS.dataLabel,
    BASE_STYLE_ITEMS.toolTip,
    BASE_STYLE_ITEMS.auxiliaryConfig,
  ],
  // 折线图配置
  line: [
    BASE_STYLE_ITEMS.titleCard,
    BASE_STYLE_ITEMS.drawArea,
    BASE_STYLE_ITEMS.chartAxis,
    BASE_STYLE_ITEMS.chartLegend,
    BASE_STYLE_ITEMS.dataLabel,
    BASE_STYLE_ITEMS.toolTip,
    BASE_STYLE_ITEMS.auxiliaryConfig,
  ],
  // 饼图配置（没有坐标轴）
  pie: [
    BASE_STYLE_ITEMS.titleCard,
    BASE_STYLE_ITEMS.drawArea,
    BASE_STYLE_ITEMS.chartLegend,
    BASE_STYLE_ITEMS.dataLabel,
    BASE_STYLE_ITEMS.toolTip,
    BASE_STYLE_ITEMS.auxiliaryConfig,
  ],
  // 默认配置（兜底方案）
  default: [
    {
      key: "error",
      label: "错误",
      component: () => <div>当前图表组件不支持样式配置</div>,
    },
  ],
};
