import React from "react";
import { data as areaData } from "./data";
import { VChart } from "@visactor/react-vchart";
const prefixCls = "cool-area-chart";
interface ICoolAreaChartProps {
  /** 图表宽度 */
  width?: number;
  /** 图表高度 */
  height?: number;
  /** 面积图数据 */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any[];
  /** 面积图的x坐标轴 */
  xField?: string | string[];
  /** 面积图的y坐标轴 */
  yField?: string | string[];
  /** 折线样式 */
  line?: {
    style: {
      curveType: "monotone" | "step" | "stepAfter" | "stepBefore";
    };
  };
  /** 标记点样式 */
  point?: {
    visible: boolean;
    style: {
      shape: "circle" | "square" | "triangle";
      size: number;
    };
  };
}
const CoolPolyLineChart: React.FC<ICoolAreaChartProps> = (props) => {
  const {
    width = 300,
    height = 200,
    data = areaData,
    xField = "time",
    yField = "value",
    line = {
      style: { curveType: "step" },
    },
    point = {
      style: { shape: "triangle", size: 9 },
    },
  } = props;
  const spec = {
    type: "area",
    data: {
      values: data,
    },
    xField: xField,
    yField: yField,
    line: line,
    point: point,
  };
  return (
    <div className={prefixCls}>
      <VChart spec={spec} width={width} height={height} />
    </div>
  );
};

export default CoolPolyLineChart;
