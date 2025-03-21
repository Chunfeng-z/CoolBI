import React, { useEffect, useRef } from "react";
import "./index.scss";
import CoolBarChart from "../../common/CoolBarChart";
import ChartCard from "./ChartCard/ChartCard";
import CoolLineChart from "../../common/CoolLineChart";
import { useDrop } from "react-dnd";
import { ChartTypeEnum } from "../utils";
import useChartStore, { ChartConfig } from "../../../stores/useChartStore";
import { generateUUID } from "../../../utils/uuid";
import CoolPolyLineChart from "../../common/CoolPolyLineChart";
import CoolPolyLineStackChart from "../../common/CoolPolyLineStackChart";
import CoolPolyLineStackPercentChart from "../../common/CoolPolyLineStackPercentChart";
import CoolBarStackChart from "../../common/CoolBarStackChart";
import CoolBarStackPercentChart from "../../common/CoolBarStackPercentChart";
import CoolPieChart from "../../common/CoolPieChart";
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
      accept: [
        ChartTypeEnum.line,
        ChartTypeEnum.bar,
        ChartTypeEnum.polyline,
        ChartTypeEnum.polylineStack,
        ChartTypeEnum.polylineStackPercent,
        ChartTypeEnum.barStack,
        ChartTypeEnum.barStackPercent,
        ChartTypeEnum.pie,
      ],
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
      case ChartTypeEnum.bar:
        return <CoolBarChart />;
      case ChartTypeEnum.line:
        return <CoolLineChart />;
      case ChartTypeEnum.polyline:
        return <CoolPolyLineChart />;
      case ChartTypeEnum.polylineStack:
        return <CoolPolyLineStackChart />;
      case ChartTypeEnum.polylineStackPercent:
        return <CoolPolyLineStackPercentChart />;
      case ChartTypeEnum.barStack:
        return <CoolBarStackChart />;
      case ChartTypeEnum.barStackPercent:
        return <CoolBarStackPercentChart />;
      case ChartTypeEnum.pie:
        return <CoolPieChart />;
      default:
        return <div className="error-chart">未知图表类型</div>;
    }
  };

  return (
    <div className={`${prefixCls}-container`} ref={ref}>
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
