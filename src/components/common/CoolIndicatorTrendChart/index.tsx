import React from "react";
import { VChart } from "@visactor/react-vchart";
import { Avatar, Col, Row, Space } from "antd";
const prefixCls = "cool-indicator-trend-chart";
interface ICoolIndicatorTrendChartProps {
  /** 图表宽度-图与文本均分 */
  width?: number;
  /** 图表高度 */
  height?: number;
  /** 指标内容在指标块的位置 */
  indicatorContentPosition?: "left" | "center";
  /** 指标值的行间距 */
  indicatorValueLineSpace?: "normal" | "small";
  /** 指标字号配置 */
  indicatorFontConfig?: {
    name?: {
      color?: string;
      fontSize?: number;
      isBold?: boolean;
      isItalic?: boolean;
    };
    value?: {
      color?: string;
      fontSize?: number;
      isBold?: boolean;
      isItalic?: boolean;
    };
  };
  /** 是否显示指标修饰图 */
  isShowIndicatorDecoration?: boolean;
  /** 指标修饰图地址 */
  indicatorDecorationUrl?: string;
  /** 趋势图类型 */
  trendChartType: "line" | "bar" | "area";
  /** 指标图的x坐标轴 */
  xField?: string | string[];
  /** 指标图的y坐标轴 */
  yField?: string | string[];
}
const CoolIndicatorTrendChart: React.FC<ICoolIndicatorTrendChartProps> = (
  props
) => {
  const {
    width = 400,
    height = 300,
    indicatorContentPosition = "left",
    indicatorValueLineSpace = "normal",
    indicatorFontConfig = {
      name: {
        color: "#000",
        fontSize: 14,
        isBold: false,
        isItalic: false,
      },
      value: {
        color: "#000",
        fontSize: 18,
        isBold: false,
        isItalic: false,
      },
    },
    isShowIndicatorDecoration = true,
    indicatorDecorationUrl = "",
    trendChartType = "line",
    xField = "营售额",
  } = props;
  const spec = {
    type: trendChartType,
    xField: xField,
  };
  return (
    <div className={prefixCls}>
      <Row>
        <Col span={12}>
          <Space
            direction="vertical"
            size={indicatorValueLineSpace === "normal" ? "middle" : "small"}
            style={{
              display: "flex",
              alignItems:
                indicatorContentPosition === "center" ? "center" : "flex-start",
            }}
          >
            <div className="indicator-text-container">
              <div
                className="indicator-name"
                style={{
                  fontSize: indicatorFontConfig.name?.fontSize,
                  color: indicatorFontConfig.name?.color,
                  fontWeight: indicatorFontConfig.name?.isBold
                    ? "bold"
                    : "normal",
                  fontStyle: indicatorFontConfig.name?.isItalic
                    ? "italic"
                    : "normal",
                }}
              >
                {isShowIndicatorDecoration && (
                  <Avatar
                    style={{ backgroundColor: "#6FA4FE", color: "#FFFFFF" }}
                    size={(indicatorFontConfig.name?.fontSize ?? 14) * 2}
                    src={indicatorDecorationUrl}
                  >
                    Data
                  </Avatar>
                )}
                <span>{xField}</span>
              </div>
              <div
                className="indicator-value"
                style={{
                  fontSize: indicatorFontConfig.value?.fontSize,
                  color: indicatorFontConfig.value?.color,
                  fontWeight: indicatorFontConfig.value?.isBold
                    ? "bold"
                    : "normal",
                  fontStyle: indicatorFontConfig.value?.isItalic
                    ? "italic"
                    : "normal",
                }}
              >
                <span>2</span>
              </div>
              <div className="sub-indicator-wrapper">x</div>
            </div>
          </Space>
        </Col>
        <Col span={12}>
          <div className="indicator-text-container">
            <VChart width={Math.floor(width / 2)} height={height} spec={spec} />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default CoolIndicatorTrendChart;
