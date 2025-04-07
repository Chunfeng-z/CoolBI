import { VChart } from "@visactor/react-vchart";
import React from "react";

import { exampleData } from "./exampleData";
const prefixCls = "cool-line-chart";
interface ICoolLineChartProps {
  /** 折线图的x坐标轴 */
  xField?: string | string[];
  /** 折线图的y坐标轴 */
  yField?: string | string[];
}
const CoolLineChart: React.FC<ICoolLineChartProps> = (props) => {
  const { xField = "time", yField = "value" } = props;
  const spec = {
    type: "line",
    data: {
      values: exampleData,
    },
    xField: xField,
    yField: yField,
    animationAppear: false,
  };
  return (
    <div className={prefixCls} style={{ height: "100%" }}>
      <VChart spec={spec} />
    </div>
  );
};

export default CoolLineChart;
