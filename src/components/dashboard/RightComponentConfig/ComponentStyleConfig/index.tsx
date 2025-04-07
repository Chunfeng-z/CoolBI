import React, { useMemo } from "react";
import "./index.scss";

import { CHART_TYPE_CONFIG_MAP } from "./ChartStyleConfig.tsx";

import CoolCollapse from "@/components/common/CoolCollapse";
import ErrorBoundary from "@/components/common/ErrorBoundary/index.tsx";
import useChartStore from "@/stores/useChartStore";

const prefixCls = "component-style-config";

/** 组件样式配置 */
const ComponentStyleConfig: React.FC = () => {
  // 当前选中图表的id作为依赖
  const curChartId = useChartStore((state) => state.curChartId);
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
          <ErrorBoundary>
            <item.component />
          </ErrorBoundary>
        </div>
      ),
    }));
  }, [getCurrentChartConfig, curChartId]);

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
