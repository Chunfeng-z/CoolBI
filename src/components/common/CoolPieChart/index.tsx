import React from "react";
import { data as TestData } from "./data";
import { VChart } from "@visactor/react-vchart";
const prefixCls = "cool-pie-chart";
import { IOrientType } from "../utils/chart-type.ts";
interface ICoolPieChartProps {
  /** 图表宽度 */
  width?: number;
  /** 图表高度 */
  height?: number;
  /** 饼图数据 */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any[];
  /** 值 */
  valueField?: string;
  /** 分类 */
  categoryField?: string;
}
const CoolPieChart: React.FC<ICoolPieChartProps> = (props) => {
  const {
    width = 400,
    height = 300,
    data = TestData,
    valueField = "value",
    categoryField = "type",
  } = props;
  const spec = {
    type: "pie",
    data: {
      id: "id0",
      values: data,
    },
    outerRadius: 0.8,
    valueField: valueField,
    categoryField: categoryField,
    title: {
      visible: true,
      text: "Statistics of Surface Element Content",
    },
    legends: {
      visible: true,
      orient: "left" as IOrientType,
    },
    label: {
      visible: true,
    },
    tooltip: {
      mark: {
        content: [
          {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            key: (datum: any) => datum["type"],
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            value: (datum: any) => datum["value"] + "%",
          },
        ],
      },
    },
  };
  return (
    <div className={prefixCls}>
      <VChart spec={spec} width={width} height={height} />
    </div>
  );
};

export default CoolPieChart;
