import React from "react";
import { VChart } from "@visactor/react-vchart";
import { data as TestData } from "./data";
const prefixCls = "cool-line-chart";
interface ICoolLineChartProps {
  /** 图表宽度 */
  width?: number;
  /** 图表高度 */
  height?: number;
  /** 折线图数据 */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any[];
  /** 折线图的x坐标轴 */
  xField?: string | string[];
  /** 折线图的y坐标轴 */
  yField?: string | string[];
}
const CoolLineChart: React.FC<ICoolLineChartProps> = (props) => {
  const {
    width = 300,
    height = 200,
    data = TestData,
    xField = "time",
    yField = "value",
  } = props;
  const spec = {
    type: "line",
    data: {
      values: data,
    },
    xField: xField,
    yField: yField,
  };
  return (
    <div className={prefixCls}>
      <VChart spec={spec} width={width} height={height} />
    </div>
  );
};

export default CoolLineChart;
