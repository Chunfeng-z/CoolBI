import { VChart } from "@visactor/react-vchart";
import React from "react";

import { exampleData } from "./exampleData";
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
  const { background = "#383639", color, direction = "vertical" } = props;

  const spec = {
    type: "bar",
    data: [
      {
        id: "barData",
        values: exampleData,
      },
    ],
    background: background,
    color: color,
    direction: direction,
    xField: "month",
    yField: "sales",
    animationAppear: false,
  };
  return (
    <div className={prefixCls} style={{ height: "100%" }}>
      <VChart spec={spec} />
    </div>
  );
};

export default CoolBarChart;
