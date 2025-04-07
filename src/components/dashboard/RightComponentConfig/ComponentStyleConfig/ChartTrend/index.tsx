import { Checkbox, InputNumber, Radio, Select, Space, Tooltip } from "antd";
import classNames from "classnames";
import React, { useCallback, useEffect, useMemo, useState } from "react";

import { ChartTypeEnum } from "../../../utils";

import CoolIcon from "@/components/common/CoolIcon";
import useChartStore from "@/stores/useChartStore";
import { TrendChartConfig } from "@/types/chartConfigItems/indicatorTrendItems";
import { IndicatorTrendChartConfig } from "@/types/charts";
import "./index.scss";
const prefixCls = "chart-trend";

/** 默认配置 */
const defaultConfig: TrendChartConfig = {
  isShowTrendChart: true,
  trendChartType: "area",
  lineType: "curve",
  lineStyle: "solid",
  lineWidth: 1,
  showMarkers: false,
};

/** 趋势图配置 */
const ChartTrend: React.FC = () => {
  /** 当前选中图表的所有配置信息 */
  const getCurrentChartConfig = useChartStore(
    (state) => state.getCurrentChartConfig
  );
  /** 当前选中图表的id信息 */
  const curChartId = useChartStore((state) => state.curChartId);
  /** 更新图表配置 */
  const setChartsConfig = useChartStore((state) => state.setChartsConfig);
  /** 趋势图状态 */
  const [config, setConfig] = useState<TrendChartConfig>(defaultConfig);
  // 获取当前选中图表的趋势配置
  useEffect(() => {
    const curConfig = getCurrentChartConfig() as IndicatorTrendChartConfig;
    setConfig(curConfig.trendChartConfig);
  }, [curChartId]);

  /** 更新配置的工具函数 */
  const updateConfig = useCallback(
    (update: Partial<TrendChartConfig>) => {
      setConfig({
        ...config,
        ...update,
      });
      setChartsConfig(curChartId!, (draft) => {
        // 联合类型需要手动缩小类型范围
        if (draft.type === ChartTypeEnum.indicatorTrend) {
          draft.trendChartConfig = {
            ...draft.trendChartConfig,
            ...update,
          };
        }
      });
    },
    [curChartId, setChartsConfig]
  );

  /** 处理图表类型点击事件 */
  const handleChartTypeClick = useCallback(
    (type: TrendChartConfig["trendChartType"]) => {
      if (config.isShowTrendChart) {
        updateConfig({ trendChartType: type });
        setChartsConfig(curChartId!, (draft) => {
          if (draft.type === ChartTypeEnum.indicatorTrend) {
            draft.trendChartConfig.trendChartType = type;
          }
        });
      }
    },
    [curChartId, setChartsConfig]
  );

  /** 图表类型选项 */
  const chartTypes = useMemo(
    () => [
      { type: "area", icon: "icon-mianjitu", label: "面积图" },
      { type: "bar", icon: "icon-zhuzhuangtu", label: "柱图" },
      { type: "line", icon: "icon-zhexiantu", label: "线图" },
    ],
    []
  );

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
      <div className="chart-trend-label">
        <span>可视化图表切换</span>
      </div>
      <div className="chart-trend-row sub-content">
        <Space>
          {chartTypes.map(({ type, icon, label }) => (
            <Tooltip key={type} title={label}>
              <div
                className={classNames("cool-icon-wrapper", {
                  "is-selected": config.trendChartType === type,
                  "is-disabled": !config.isShowTrendChart,
                })}
                onClick={() =>
                  handleChartTypeClick(
                    type as TrendChartConfig["trendChartType"]
                  )
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
            gap: 2,
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
      <div className="chart-trend-label">
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
