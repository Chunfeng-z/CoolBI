import { VChart } from "@visactor/react-vchart";
import React from "react";

import { exampleData } from "./exampleData";
const prefixCls = "cool-bar-stack-percent-chart";
interface ICoolBarStackPercentChartProps {
  /** 图表宽度 */
  width?: number;
  /** 图表高度 */
  height?: number;
  /** 堆叠百分比柱状图数据 */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any[];
  /** 堆叠百分比柱状图的x坐标轴 */
  xField?: string | string[];
  /** 堆叠百分比柱状图的y坐标轴 */
  yField?: string | string[];
  /** 堆叠百分比柱状图的系列字段 */
  seriesField?: string;
}
const CoolBarStackPercentChart: React.FC<ICoolBarStackPercentChartProps> = (
  props
) => {
  const {
    data = exampleData,
    xField = "State",
    yField = "Population",
    seriesField = "Age",
  } = props;
  const spec = {
    type: "bar",
    data: {
      id: "barData",
      values: data,
    },
    xField: xField,
    yField: yField,
    seriesField: seriesField,
    percent: true,
    stack: true,
    legends: {
      visible: true,
    },
    axes: [
      {
        orient: "left",
        label: {
          formatMethod: (val) => {
            return `${(val * 100).toFixed(2)}%`;
          },
        },
      },
    ],
    tooltip: {
      mark: { visible: false },
    },
  };
  return (
    <div className={prefixCls} style={{ height: "100%" }}>
      <VChart spec={spec} />
    </div>
  );
};

export default CoolBarStackPercentChart;
