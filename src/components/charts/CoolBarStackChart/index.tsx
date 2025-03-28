import { VChart } from "@visactor/react-vchart";
import React from "react";

const prefixCls = "cool-bar-stack-chart";
import { exampleData } from "./exampleData";

interface ICoolBarStackChartProps {
  /** 图表宽度 */
  width?: number;
  /** 图表高度 */
  height?: number;
  /** 堆叠柱状图数据 */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any[];
  /** 堆叠柱状图的x坐标轴 */
  xField?: string | string[];
  /** 堆叠柱状图的y坐标轴 */
  yField?: string | string[];
  /** 堆叠柱状图的系列字段 */
  seriesField?: string;
}
const CoolBarStackChart: React.FC<ICoolBarStackChartProps> = (props) => {
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
    stack: true,
    legends: {
      visible: true,
    },
    // 关闭入场动画
    animationAppear: false,
  };
  return (
    <div className={prefixCls} style={{ height: "100%" }}>
      <VChart spec={spec} />
    </div>
  );
};

export default CoolBarStackChart;
