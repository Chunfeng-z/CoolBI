import { VChart } from "@visactor/react-vchart";
import React from "react";

import { exampleData } from "./exampleData";
const prefixCls = "cool-poly-line-stack-percent-chart";

interface ICoolPolyLineStackPercentChartProps {
  /** 图表宽度 */
  width?: number;
  /** 图表高度 */
  height?: number;
  /** 折线堆叠百分比图数据 */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any[];
  /** 折线堆叠百分比图的x坐标轴 */
  xField?: string | string[];
  /** 折线堆叠百分比图的y坐标轴 */
  yField?: string | string[];
  /** 折线堆叠百分比图的系列字段 */
  seriesField?: string;
}

const CoolPolyLineStackPercentChart: React.FC<
  ICoolPolyLineStackPercentChartProps
> = (props) => {
  const {
    data = exampleData,
    xField = "type",
    yField = "value",
    seriesField = "country",
  } = props;
  const spec = {
    type: "area",
    data: {
      fields: {
        country: {
          domain: ["China", "USA", "EU", "Africa"],
          sortIndex: 0,
        },
      },
      values: data,
    },
    xField: xField,
    yField: yField,
    stack: true,
    percent: true,
    seriesField: seriesField,
    axes: [
      {
        orient: "left",
        label: {
          formatMethod(val: number) {
            return `${(val * 100).toFixed(2)}%`;
          },
        },
      },
    ],
    line: {
      style: {
        curveType: "monotone",
      },
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

export default CoolPolyLineStackPercentChart;
