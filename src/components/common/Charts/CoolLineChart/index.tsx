import React from "react";
import { VChart } from "@visactor/react-vchart";
import { data } from "./data";
const prefixCls = "cool-line-chart";
interface ICoolLineChartProps {
  /** 图表宽度 */
  width?: number;
  /** 图表高度 */
  height?: number;
}
const CoolLineChart: React.FC<ICoolLineChartProps> = (props) => {
  const { width = 300, height = 200 } = props;
  const spec = {
    type: "line",
    data: {
      values: data,
    },
    xField: "time",
    yField: "value",
  };
  return (
    <div className={prefixCls}>
      <VChart spec={spec} width={width} height={height} />
    </div>
  );
};

export default CoolLineChart;
