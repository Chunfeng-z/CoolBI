import {
  AlignLeftOutlined,
  AlignRightOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import {
  Checkbox,
  Flex,
  InputNumber,
  InputNumberProps,
  Radio,
  Slider,
  Tooltip,
} from "antd";
import React, { useCallback, useEffect, useState } from "react";

import "./index.scss";
import { ChartTypeEnum } from "../../../utils";

import LineStyleSelect from "@/components/common/LineStyleSelect";
import useChartStore from "@/stores/useChartStore";
import { LineDrawAreaConfig } from "@/types/chartConfigItems/lineItems";
const prefixCls = "draw-area";

/** 组件样式配置-绘制区域 */
const DrawArea: React.FC = () => {
  const curChartId = useChartStore((state) => state.curChartId);
  const setChartsConfig = useChartStore((state) => state.setChartsConfig);
  const getCurrentChartConfig = useChartStore(
    (state) => state.getCurrentChartConfig
  );

  /** 当前选中图表的类型 */
  const [chartType, setChartType] = useState<ChartTypeEnum>();
  /** 绘图区域配置 */
  const [config, setConfig] = useState<LineDrawAreaConfig>();
  useEffect(() => {
    const curConfig = getCurrentChartConfig();
    if (!curConfig) {
      console.error("绘图区域获取图表配置失败");
      return;
    }
    if (curConfig.type === ChartTypeEnum.line) {
      setChartType(curConfig.type);
      setConfig(curConfig.drawAreaConfig);
    }
  }, [curChartId]);
  /** 更新图表配置 */
  const updateConfig = useCallback(
    (update: Partial<LineDrawAreaConfig>) => {
      // 使用函数式更新状态，解决闭包问题
      setConfig((prev) => ({
        ...prev!,
        ...update,
      }));
      setChartsConfig(curChartId!, (draft) => {
        if (draft.type === ChartTypeEnum.line) {
          draft.drawAreaConfig = {
            ...draft.drawAreaConfig,
            ...update,
          };
        }
      });
    },
    [curChartId]
  );
  /** 柱体宽度百分比 */
  const [barWidthPercent, setBarWidthPercent] = useState(10);
  const handleBarWidthChange: InputNumberProps["onChange"] = (newValue) => {
    setBarWidthPercent(newValue as number);
  };
  /** 图表对齐方式 */
  const [chartAlign, setChartAlign] = useState<"left" | "right">("left");

  /** 根据不同的图表类型返回不同的配置 */
  const renderChart = (chartType: ChartTypeEnum) => {
    if (!config) return <div className="text">获取组件配置失败</div>;
    switch (chartType) {
      case ChartTypeEnum.line:
        return (
          <div className={`${prefixCls}-line`}>
            <div className="draw-area-row">
              <Checkbox
                checked={config.isShowGradient}
                onChange={(e) =>
                  updateConfig({ isShowGradient: e.target.checked })
                }
              >
                开启渐变效果
              </Checkbox>
            </div>
            <div className="draw-area-row-vertical">
              <span>线条类型</span>
              <Radio.Group
                value={config.lineType}
                onChange={(e) => updateConfig({ lineType: e.target.value })}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                }}
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
            <div className="draw-area-label">
              <span>线条样式</span>
            </div>
            <div className="draw-area-row sub-content">
              <LineStyleSelect
                value={config.lineStyle}
                style={{ width: 110 }}
                onDataChange={(value) => updateConfig({ lineStyle: value })}
              />
              <InputNumber
                size="small"
                min={1}
                max={10}
                value={config.lineWidth}
                onChange={(value) =>
                  updateConfig({ lineWidth: value as number })
                }
                style={{ width: 80 }}
                addonAfter="px"
              />
            </div>
          </div>
        );
      case ChartTypeEnum.bar:
        return (
          <div className={`${prefixCls}-bar`}>
            <div className="draw-area-text-vertical">
              <div className="draw-area-text-left">
                <span>柱体宽度</span>
                <Tooltip title="当前配置的柱体宽度超过最大范围之后将不再生效">
                  <InfoCircleOutlined />
                </Tooltip>
              </div>
              <div className="draw-area-text-right">
                <Slider
                  min={1}
                  max={100}
                  style={{ width: 125, marginLeft: 10 }}
                  onChange={handleBarWidthChange}
                  value={
                    typeof barWidthPercent === "number" ? barWidthPercent : 0
                  }
                />
                <InputNumber
                  size="small"
                  min={0}
                  max={100}
                  addonAfter="%"
                  style={{ width: 90 }}
                  value={barWidthPercent}
                  changeOnWheel
                  onChange={handleBarWidthChange}
                />
              </div>
            </div>
            <div className="draw-area-text-vertical">
              <span>图表对其方式</span>
              <Radio.Group
                onChange={(e) => setChartAlign(e.target.value)}
                value={chartAlign}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                }}
                options={[
                  {
                    value: "left",
                    label: (
                      <Flex gap="small">
                        <AlignLeftOutlined />
                        左对齐
                      </Flex>
                    ),
                  },
                  {
                    value: "right",
                    label: (
                      <Flex gap="small">
                        <AlignRightOutlined />
                        右对齐
                      </Flex>
                    ),
                  },
                ]}
              />
            </div>
          </div>
        );
      default:
        return <div className="text">当前组件暂不支持绘图组件配置</div>;
    }
  };

  return (
    <div className={`${prefixCls}-container`}>
      {config && chartType && renderChart(chartType)}
    </div>
  );
};

export default DrawArea;
