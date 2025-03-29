import React, { useMemo } from "react";
import "./index.scss";

import AuxiliaryConfig from "./AuxiliaryConfig";
import ChartAxis from "./ChartAxis";
import ChartLegend from "./ChartLegend";
import ChartToolTip from "./ChartToolTip";
import DataLabel from "./DataLabel";
import DrawArea from "./DrawArea";
import TitleCard from "./TitleCard";

import CoolCollapse from "@/components/common/CoolCollapse";
import useChartStore from "@/stores/useChartStore";

const prefixCls = "component-style-config";

type styleConfigItem = {
  key: string;
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: React.FC<any>;
};

// 所有支持的图表样式配置项
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
  chartAxis: {
    key: "3",
    label: "坐标轴",
    component: ChartAxis,
  },
};

// 不同图表类型的配置项映射
const CHART_TYPE_CONFIG_MAP: Record<
  string,
  (typeof BASE_STYLE_ITEMS.titleCard)[]
> = {
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
  // 散点图配置
  scatter: [
    BASE_STYLE_ITEMS.titleCard,
    BASE_STYLE_ITEMS.drawArea,
    BASE_STYLE_ITEMS.chartAxis,
    BASE_STYLE_ITEMS.chartLegend,
    BASE_STYLE_ITEMS.dataLabel,
    BASE_STYLE_ITEMS.toolTip,
  ],
  // 默认配置（兜底方案）
  default: [
    BASE_STYLE_ITEMS.titleCard,
    BASE_STYLE_ITEMS.drawArea,
    BASE_STYLE_ITEMS.chartAxis,
    BASE_STYLE_ITEMS.chartLegend,
    BASE_STYLE_ITEMS.dataLabel,
    BASE_STYLE_ITEMS.toolTip,
    BASE_STYLE_ITEMS.auxiliaryConfig,
  ],
};

/** 组件样式配置 */
const ComponentStyleConfig: React.FC = () => {
  // 获取当前选中的图表配置
  const getCurrentChartConfig = useChartStore(
    (state) => state.getCurrentChartConfig
  );

  // 根据当前图表类型获取对应的配置项
  const componentStyleItems = useMemo(() => {
    const chartConfig = getCurrentChartConfig();
    const chartType = (chartConfig?.type || "default") as string;

    // 获取对应图表类型的配置，如果没有则使用默认配置
    const configItems =
      CHART_TYPE_CONFIG_MAP[chartType] ?? CHART_TYPE_CONFIG_MAP.default;

    // 将配置项转换为CoolCollapse需要的格式
    return configItems.map((item) => ({
      key: item.key,
      label: item.label,
      children: (
        <div className="style-item">
          <item.component />
        </div>
      ),
    }));
  }, [getCurrentChartConfig]);

  // 默认展开所有配置项
  const defaultActiveKey = componentStyleItems.map((item) => item.key);

  return (
    <div className={`${prefixCls}-container`}>
      <CoolCollapse
        items={componentStyleItems}
        defaultActiveKey={defaultActiveKey}
      />
    </div>
  );
};

export default ComponentStyleConfig;
