import { Checkbox, InputNumber, Radio, Select, Space, Tooltip } from "antd";
import classNames from "classnames";
import React, { useState } from "react";

import CoolIcon from "@/components/common/CoolIcon";
const prefixCls = "chart-trend";

/** 趋势图配置接口 */
interface TrendChartConfig {
  /** 是否展示趋势图 */
  isShowTrendChart: boolean;
  /** 趋势图支持的图表类型 */
  chartType: "area" | "bar" | "line";
  /** 线条类型：曲线或直线 */
  lineType: "curve" | "straight";
  /** 线条样式：实线或虚线 */
  lineStyle: "solid" | "dashed";
  /** 线条宽度 */
  lineWidth: number;
  /** 是否显示标记点 */
  showMarkers: boolean;
}

/** 默认配置 */
const defaultConfig: TrendChartConfig = {
  isShowTrendChart: true,
  chartType: "area",
  lineType: "curve",
  lineStyle: "solid",
  lineWidth: 1,
  showMarkers: false,
};

/** 趋势图配置 */
const ChartTrend: React.FC = () => {
  /** 内部状态 */
  const [config, setConfig] = useState<TrendChartConfig>(defaultConfig);

  /** 更新配置的工具函数 */
  const updateConfig = (update: Partial<TrendChartConfig>) => {
    setConfig({
      ...config,
      ...update,
    });
  };

  /** 处理图表类型点击事件 */
  const handleChartTypeClick = (type: TrendChartConfig["chartType"]) => {
    if (config.isShowTrendChart) {
      updateConfig({ chartType: type });
    }
  };

  /** 图表类型选项 */
  const chartTypes = [
    { type: "area", icon: "icon-mianjitu", label: "面积图" },
    { type: "bar", icon: "icon-zhuzhuangtu", label: "柱图" },
    { type: "line", icon: "icon-zhexiantu", label: "线图" },
  ];

  return (
    <div className={`${prefixCls}-container`}>
      <div className="chart-trend-row">
        <Checkbox
          checked={config.isShowTrendChart}
          onChange={(e) => updateConfig({ isShowTrendChart: e.target.checked })}
        >
          显示趋势图
        </Checkbox>
      </div>
      <div className="chart-trend-row">
        <span>可视化图表切换</span>
      </div>
      <div className="chart-trend-row sub-content">
        <Space>
          {chartTypes.map(({ type, icon, label }) => (
            <Tooltip key={type} title={label}>
              <div
                className={classNames("cool-icon-wrapper", {
                  "is-selected": config.chartType === type,
                  "is-disabled": !config.isShowTrendChart,
                })}
                onClick={() =>
                  handleChartTypeClick(type as TrendChartConfig["chartType"])
                }
              >
                <CoolIcon name={icon} size={28} />
              </div>
            </Tooltip>
          ))}
        </Space>
      </div>
      <div className="chart-trend-row-vertical">
        <span>线条类型</span>
        <Radio.Group
          disabled={!config.isShowTrendChart}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
          value={config.lineType}
          onChange={(e) => updateConfig({ lineType: e.target.value })}
          options={[
            {
              value: "curve",
              label: <span>曲线</span>,
            },
            {
              value: "straight",
              label: <span>直线</span>,
            },
          ]}
        />
      </div>
      <div className="chart-trend-row">
        <span>线条样式</span>
      </div>
      <div className="chart-trend-row sub-content">
        <Select
          size="small"
          disabled={!config.isShowTrendChart}
          value={config.lineStyle}
          onChange={(value) => updateConfig({ lineStyle: value })}
          style={{ width: 110 }}
          getPopupContainer={(triggerNode) => triggerNode.parentElement!}
          options={[
            {
              value: "solid",
              label: (
                <div className="chart-trend-line-style">
                  <div className="chart-trend-line-style-solid" />
                </div>
              ),
            },
            {
              value: "dashed",
              label: (
                <div className="chart-trend-line-style">
                  <div className="chart-trend-line-style-dashed" />
                </div>
              ),
            },
          ]}
        />
        <InputNumber
          size="small"
          min={1}
          max={10}
          value={config.lineWidth}
          onChange={(value) => updateConfig({ lineWidth: value as number })}
          style={{ width: 80 }}
          addonAfter="px"
          disabled={!config.isShowTrendChart}
        />
      </div>
      <div className="chart-trend-row">
        <Checkbox
          checked={config.showMarkers}
          onChange={(e) => updateConfig({ showMarkers: e.target.checked })}
          disabled={!config.isShowTrendChart}
        >
          显示标记点
        </Checkbox>
      </div>
    </div>
  );
};

export default ChartTrend;
