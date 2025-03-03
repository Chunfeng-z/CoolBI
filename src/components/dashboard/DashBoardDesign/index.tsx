import React, { useEffect, useRef, useState } from "react";
import "./index.scss";
import CoolBarChart from "../../common/Charts/CoolBarChart";
import ChartCard from "./ChartCard/ChartCard";
import CoolLineChart from "../../common/Charts/CoolLineChart";
import { useDrop } from "react-dnd";
import { ChartEnum } from "../utils";
const prefixCls = "dashboard-design";
/** 仪表板设计组件 */
const DashBoardDesign = () => {
  /** 当前仪表板展示的图表 */
  const [charts, setCharts] = useState<string[]>([]);
  const ref = useRef<HTMLDivElement | null>(null);
  const [, drop] = useDrop(() => {
    return {
      accept: [ChartEnum.line, ChartEnum.bar],
      drop(item: { chart: string }) {
        // 确保最新的状态
        setCharts((charts) => [...charts, item.chart]);
      },
    };
  });
  useEffect(() => {
    drop(ref);
  }, []);
  /** 渲染指定的图表 */
  const renderChart = (chart: string) => {
    switch (chart) {
      case "bar":
        return <CoolBarChart />;
      case "line":
        return <CoolLineChart />;
      default:
        break;
    }
  };

  return (
    <div className={`${prefixCls}-container`} ref={ref}>
      {charts.map((chart, index) => {
        return (
          <ChartCard cardTitle={chart} key={index} chartId={index}>
            {renderChart(chart)}
          </ChartCard>
        );
      })}
    </div>
  );
};

export default DashBoardDesign;
