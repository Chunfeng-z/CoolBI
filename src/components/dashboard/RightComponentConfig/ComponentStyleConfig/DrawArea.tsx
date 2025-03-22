import {
  AlignLeftOutlined,
  AlignRightOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import {
  Flex,
  InputNumber,
  InputNumberProps,
  Radio,
  Slider,
  Tooltip,
} from "antd";
import React, { useState } from "react";
const prefixCls = "draw-area";
interface IDrawAreaProps {
  /** 当前组件的类型 */
  chartType?: "bar" | "pie";
}
/** 组件样式配置-绘制区域 */
const DrawArea: React.FC<IDrawAreaProps> = (props) => {
  const { chartType = "bar" } = props;
  /** 柱体宽度百分比 */
  const [barWidthPercent, setBarWidthPercent] = useState(10);
  const handleBarWidthChange: InputNumberProps["onChange"] = (newValue) => {
    setBarWidthPercent(newValue as number);
  };
  /** 图表对齐方式 */
  const [chartAlign, setChartAlign] = useState<"left" | "right">("left");
  /** 根据不同的图表类型返回不同的配置 */
  const renderChart = () => {
    switch (chartType) {
      case "bar":
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
      case "pie":
        return <div className={`${prefixCls}-pie`}>Pie Chart</div>;
      default:
        return null;
    }
  };

  return <div className={`${prefixCls}-container`}>{renderChart()}</div>;
};

export default DrawArea;
