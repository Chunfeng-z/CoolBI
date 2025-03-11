import React, { useEffect, useRef, useState } from "react";
import "./index.scss";
import CoolBarChart from "../../common/Charts/CoolBarChart";
import ChartCard from "./ChartCard/ChartCard";
import CoolLineChart from "../../common/Charts/CoolLineChart";
import { useDrop } from "react-dnd";
import { ChartEnum } from "../utils";
import useChartStore, { ChartConfig } from "../../../stores/useChartStore";
import { generateUUID } from "../../../utils/uuid";
import { debounce } from "lodash-es";
const prefixCls = "dashboard-design";

const DashBoardDesign: React.FC = () => {
  /** 设计区域的缩放比例-调整窗口大小 */
  const [scale, setScale] = useState<number>(1);
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
  useEffect(() => {
    const updateScale = () => {
      // 控制最小计算缩放比例宽度-防止过小
      const containerWidth = Math.max(ref.current?.clientWidth || 1200, 800);
      console.log("containerWidth", containerWidth);
      // 基准宽度
      const baseWidth = 1200;
      setScale(Math.min(containerWidth / baseWidth, 1));
    };

    const debouncedUpdateScale = debounce(updateScale, 100);

    window.addEventListener("resize", debouncedUpdateScale);
    // 初始化
    updateScale();
    return () => window.removeEventListener("resize", debouncedUpdateScale);
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
    <div
      className={`${prefixCls}-container`}
      ref={ref}
      style={{
        transform: `scale(${scale})`,
        transformOrigin: "0 0",
        transition: "transform 0.3s ease",
      }}
    >
      {chartsConfig.map((config: ChartConfig) => {
        const {
          title,
          chartId,
          type,
          isShowTitle,
          titleFontSize,
          titleColor,
          isShowRemark,
          remark,
          remarkPosition,
          isShowEndNote,
          endNote,
          borderRadius,
          isShowBackgroundColor,
          backgroundColor,
          chartCardPadding,
        } = config;
        return (
          <ChartCard
            key={chartId}
            isShowCardTitle={isShowTitle}
            cardTitle={title}
            titleFontSize={titleFontSize}
            titleColor={titleColor}
            isShowRemark={isShowRemark}
            remark={remark}
            remarkPosition={remarkPosition}
            isShowEndNote={isShowEndNote}
            endNote={endNote}
            borderRadius={borderRadius}
            backgroundColor={backgroundColor}
            isShowBackgroundColor={isShowBackgroundColor}
            chartCardPadding={chartCardPadding}
            isSelected={chartId === curChartId}
            onClick={() => handleChartCardClick(chartId)}
          >
            {renderChart(type)}
          </ChartCard>
        );
      })}
    </div>
  );
};

export default DashBoardDesign;
