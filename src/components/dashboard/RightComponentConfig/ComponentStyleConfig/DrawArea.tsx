import { InfoCircleOutlined } from "@ant-design/icons";
import { InputNumber, InputNumberProps, Slider, Tooltip } from "antd";
import React, { useState } from "react";
const prefixCls = "draw-area";
interface IDrawAreaProps {
  /** 当前组件的类型 */
  chartType?: "bar" | "pie";
}
/** 组件样式配置-绘制区域 */
const DrawArea: React.FC<IDrawAreaProps> = (props) => {
  const { chartType = "bar" } = props;
  const [inputValue, setInputValue] = useState(1);

  const onChange: InputNumberProps["onChange"] = (newValue) => {
    setInputValue(newValue as number);
  };
  /** 根据不同的图表类型返回不同的配置 */
  const renderChart = () => {
    switch (chartType) {
      case "bar":
        return (
          <div className={`${prefixCls}-bar`}>
            <div className="draw-area-text">
              <span>柱体宽度</span>
              <Tooltip title="当前配置的柱体宽度超过最大范围之后将不再生效">
                <InfoCircleOutlined />
              </Tooltip>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Slider
                  min={1}
                  max={20}
                  style={{ width: 200, marginRight: 10 }}
                  onChange={onChange}
                  value={typeof inputValue === "number" ? inputValue : 0}
                />
                <InputNumber
                  min={1}
                  max={20}
                  value={inputValue}
                  onChange={onChange}
                />
              </div>
            </div>
            <div className="draw-area-text">
              <span>图表对其方式</span>
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
