import React, { useRef } from "react";
import { BarChart, Bar, Legend, Axis } from "@visactor/react-vchart";
import { barData } from "./data";
const prefixCls = "cool-bar-chart";

interface ICoolBarChartProps {
  width?: number;
  height?: number;
  /** 背景设置-暂时只支持颜色 */
  background?: string;
  /** 内边距 */
  padding?:
    | number
    | { top?: number; right?: number; bottom?: number; left?: number };
  /** 图表颜色映射配置 - 目前仅支持色值数组 - 连续映射和离散映射暂不支持*/
  color?: string[];
  /** 图表的hover交互配置 - 设置为false可以直接关闭hover效果 */
  hover?:
    | boolean
    | {
        enabled?: boolean;
        trigger?: string | string[];
        triggerOff?: string | string[];
      };
  /** 图表的select配置 - 设置为false直接关闭 */
  select?:
    | boolean
    | {
        enabled?: boolean;
        mode?: "single" | "multiple";
        trigger?: string | string[];
        triggerOff?: string | string[];
      };
  /** 图表的方向配置 */
  direction?: "horizontal" | "vertical";
  /** 标签配置 */
}

/** 柱状图 */
const CoolBarChart: React.FC<ICoolBarChartProps> = (props) => {
  const {
    width = 400,
    height = 300,
    background = "#383639",
    padding,
    color,
    hover,
    select,
    direction = "vertical",
  } = props;
  const chartRef = useRef(null);
  const handleChartClick = () => {
    console.log("图表被点击了");
  };

  return (
    <div
      className={prefixCls}
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      <BarChart
        ref={chartRef}
        data={[{ values: barData }]}
        onClick={handleChartClick}
        background={background}
        padding={padding}
        color={color}
        hover={hover}
        select={select}
        direction={direction}
      >
        <Bar
          seriesField="type"
          xField={["year", "type"]}
          yField="value"
          bar={{
            style: {
              stroke: "#000",
              strokeWidth: 1,
            },
            state: {
              hover: {
                stroke: "black",
              },
            },
          }}
        />
        <Axis orient="bottom" type="band" />
        <Axis orient="left" max={200} type="linear" />
        <Legend
          visible={true}
          position="start"
          orient="top"
          padding={{ bottom: 12 }}
        />
      </BarChart>
    </div>
  );
};

export default CoolBarChart;
