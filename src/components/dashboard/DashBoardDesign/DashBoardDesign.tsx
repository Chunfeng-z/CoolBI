import React, { useEffect, useRef, useState } from "react";
import "./index.scss";
import CoolBarChart from "../../common/Charts/CoolBarChart";
import ChartCard from "./ChartCard/ChartCard";
import CoolLineChart from "../../common/Charts/CoolLineChart";
import { useDrop } from "react-dnd";
import { ChartEnum } from "../utils";
import useChartStore, { ChartConfig } from "../../../stores/useChartStore";
import { generateUUID } from "../../../utils/uuid";
const prefixCls = "dashboard-design";

const DashBoardDesign: React.FC = () => {
  /** 全局的仪表板图表配置-当前仪表板存在已设计的图表 */
  const chartsConfig: ChartConfig[] = useChartStore(
    (state) => state.chartsConfig
  );
  const setCurChartId = useChartStore((state) => state.setCurChartId);
  const curChartId = useChartStore((state) => state.curChartId);
  const appendChartConfig = useChartStore((state) => state.appendChartConfig);
  /** 更新选中的图表 */
  const handleChartCardClick = (chartId: string) => {
    setCurChartId(chartId);
  };
  const ref = useRef<HTMLDivElement | null>(null);
  const [, drop] = useDrop(() => {
    return {
      accept: [ChartEnum.line, ChartEnum.bar],
      drop(item: { chart: string }) {
        // 添加新的图表
        appendChartConfig({
          chartId: generateUUID(),
          title: "",
          type: item.chart,
        });
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
      {chartsConfig.map((config: ChartConfig) => {
        return (
          <ChartCard
            cardTitle={config.title}
            key={config.chartId}
            isSelected={config.chartId === curChartId}
            onClick={() => handleChartCardClick(config.chartId)}
          >
            {renderChart(config.type)}
          </ChartCard>
        );
      })}
    </div>
  );
};

export default DashBoardDesign;
