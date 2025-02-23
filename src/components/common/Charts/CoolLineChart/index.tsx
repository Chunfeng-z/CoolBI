import React from "react";
import { VChart } from "@visactor/react-vchart";

const prefixCls = "cool-line-chart";
const CoolLineChart: React.FC = () => {
  const spec = {
    type: "line",
    data: {
      values: [
        {
          time: "2:00",
          value: 8,
        },
        {
          time: "4:00",
          value: 9,
        },
        {
          time: "6:00",
          value: 11,
        },
        {
          time: "8:00",
          value: 14,
        },
        {
          time: "10:00",
          value: 16,
        },
        {
          time: "12:00",
          value: 17,
        },
        {
          time: "14:00",
          value: 17,
        },
        {
          time: "16:00",
          value: 16,
        },
        {
          time: "18:00",
          value: 15,
        },
      ],
    },
    xField: "time",
    yField: "value",
  };
  return (
    <div className={prefixCls}>
      <VChart spec={spec} width={200} height={200} />
    </div>
  );
};

export default CoolLineChart;
