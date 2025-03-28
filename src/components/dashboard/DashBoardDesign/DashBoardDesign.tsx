import classNames from "classnames";
import { throttle } from "lodash-es";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useDrop } from "react-dnd";
import ReactGridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

import { ChartTypeEnum } from "../utils";

import ChartCard from "./ChartCard/ChartCard";

import CoolBarChart from "@/components/charts/CoolBarChart";
import CoolBarStackChart from "@/components/charts/CoolBarStackChart";
import CoolBarStackPercentChart from "@/components/charts/CoolBarStackPercentChart";
import CoolIndicatorTrendChart from "@/components/charts/CoolIndicatorTrendChart";
import CoolLineChart from "@/components/charts/CoolLineChart";
import CoolPieChart from "@/components/charts/CoolPieChart";
import CoolPolyLineChart from "@/components/charts/CoolPolyLineChart";
import CoolPolyLineStackChart from "@/components/charts/CoolPolyLineStackChart";
import CoolPolyLineStackPercentChart from "@/components/charts/CoolPolyLineStackPercentChart";
import useChartStore, { ChartConfig } from "@/stores/useChartStore";
import useRasterStore from "@/stores/useRasterStore";
import { resizeGrid } from "@/utils/hooks";
import { generateUUID } from "@/utils/uuid";
import "./index.scss";

const prefixCls = "dashboard-design";

const DashBoardDesign: React.FC = () => {
  /** 获取栅格配置的显示状态 */
  const isShowPageRaster = useRasterStore((state) => state.isShowPageRaster);
  /** 当前配置显示的栅格数 */
  const rasterNum = useRasterStore((state) => state.rasterNum);
  /** 上一次配置的栅格数 */
  const preRasterNum = useRasterStore((state) => state.prevRasterNum);
  /** 当前配置的栅格间距 */
  const rasterGap = useRasterStore((state) => state.rasterGap);
  /** 栅格的行间距 */
  const cardRowSpace = useRasterStore((state) => state.cardRowSpace);
  /** 全局的仪表板图表配置-当前仪表板存在已设计的图表 */
  const chartsConfig: ChartConfig[] = useChartStore(
    (state) => state.chartsConfig
  );
  /** 删除当前选中的图表 */
  const deleteChartConfig = useChartStore((state) => state.deleteChartConfig);
  const setCurChartId = useChartStore((state) => state.setCurChartId);
  const curChartId = useChartStore((state) => state.curChartId);
  const appendChartConfig = useChartStore((state) => state.appendChartConfig);

  /** 设置支持图表托拽创建 */
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
        ChartTypeEnum.indicatorTrend,
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
  const renderChart = useCallback((chart: string) => {
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
      case ChartTypeEnum.indicatorTrend:
        return <CoolIndicatorTrendChart />;
      default:
        return <div className="error-chart">未知图表类型</div>;
    }
  }, []);

  /** 图表容器的宽度 */
  const [containerWidth, setContainerWidth] = useState<number>(800);
  const contentRef = useRef<HTMLDivElement | null>(
    null
  ); /** 仪表板的布局配置 */
  const [dashBoardLayout, setDashBoardLayout] = useState<
    {
      i: string;
      x: number;
      y: number;
      w: number;
      h: number;
    }[]
  >([]);

  // 初始化布局
  useEffect(() => {
    setDashBoardLayout(generateLayout());
  }, []);

  // 栅格数变化时，重新生成布局
  useEffect(() => {
    if (preRasterNum === null) return;
    const newDashBoardLayout = resizeGrid(
      dashBoardLayout,
      preRasterNum,
      rasterNum
    );
    setDashBoardLayout(newDashBoardLayout);
  }, [preRasterNum]);

  // 生成布局
  const generateLayout = () => {
    return chartsConfig.map((config) => {
      const { chartId, layout } = config;
      return {
        i: chartId,
        x: layout?.x || 0,
        y: layout?.y || 0,
        w: layout?.w || 4, // 默认宽度为4个单位
        h: layout?.h || 4, // 默认高度为4个单位
      };
    });
  };
  /** 每行的高度 */
  const rowHeight = 50;
  /** 单个栅格的宽度 */
  const rasterWidth = useMemo(
    () => (containerWidth - (rasterNum - 1) * rasterGap) / rasterNum,
    [containerWidth, rasterNum, rasterGap]
  );
  /** 按顺序计算每个图表的宽度和高度-给图表使用，grid不需要 */
  const [dashboardChartsSize, setDashboardChartsSize] = useState<
    {
      width: number;
      height: number;
    }[]
  >(
    chartsConfig.map((config) => {
      const { layout } = config;
      const { w, h } = layout!;
      return {
        width: w * rasterWidth + (w - 1) * rasterGap,
        height: h * rowHeight + (h - 1) * cardRowSpace,
      };
    })
  );

  useEffect(() => {
    setDashboardChartsSize(
      dashBoardLayout.map((layout) => {
        const { w, h } = layout!;
        return {
          width: w * rasterWidth + (w - 1) * rasterGap,
          height: h * rowHeight + (h - 1) * cardRowSpace,
        };
      })
    );
  }, [rasterWidth, rasterGap, rowHeight, cardRowSpace, dashBoardLayout]);

  // 添加ResizeObserver监听容器宽度变化
  useEffect(() => {
    if (!contentRef.current) return;

    // 使用throttle包装回调函数
    const throttledSetWidth = throttle((width: number) => {
      console.log("容器宽度变化:", width);
      setContainerWidth(width);
    }, 200);

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === contentRef.current) {
          throttledSetWidth(entry.contentRect.width);
        }
      }
    });

    resizeObserver.observe(contentRef.current);

    return () => {
      resizeObserver.disconnect();
      // 取消待处理的throttle调用
      throttledSetWidth.cancel();
    };
  }, []);

  /** 更新选中的图表 */
  const handleChartCardClick = useCallback((chartId: string) => {
    setCurChartId(chartId);
  }, []);

  // 计算布局的总高度
  const layoutHeight = useMemo(() => {
    if (!dashBoardLayout.length) return 800; // 默认初始高度

    // 找出所有元素中最下方的位置
    const maxBottomPosition = dashBoardLayout.reduce((max, item) => {
      const bottomPosition = item.y + item.h;
      return bottomPosition > max ? bottomPosition : max;
    }, 0);

    // 计算总高度：最大底部位置 * 行高 + 额外的空间
    return (
      maxBottomPosition * rowHeight +
      (maxBottomPosition - 1) * cardRowSpace +
      50
    ); // 额外添加100px作为底部空间
  }, [dashBoardLayout, rowHeight, cardRowSpace]);

  return (
    <div className={`${prefixCls}-container`} ref={ref}>
      <div className="root-container-main-header-and-content">
        <div className="root-container-main-header"></div>
        <div className="root-container-main-content" ref={contentRef}>
          <div
            className={classNames("cool-bi-layout-indicator", {
              "is-show": isShowPageRaster,
            })}
            style={{
              gap: `${rasterGap}px`,
              gridTemplateColumns: `repeat(${rasterNum}, 1fr)`,
            }}
          >
            {Array.from({ length: rasterNum }).map((_, index) => (
              <div key={index} className="indicator-item" />
            ))}
          </div>

          <ReactGridLayout
            className="layout"
            style={{
              height: layoutHeight,
            }}
            layout={dashBoardLayout}
            cols={rasterNum}
            rowHeight={rowHeight}
            useCSSTransforms={true}
            // 使用动态宽度
            width={containerWidth}
            isDraggable={true}
            isResizable={true}
            // 为真时，容器的高度会自适应内容的高度
            autoSize={false}
            resizeHandles={["w", "se"]}
            // 设置元素之间的间距
            margin={[rasterGap, cardRowSpace]}
            // 设置容器内边距
            containerPadding={[0, 0]}
            // 布局变化时触发
            onLayoutChange={(layout) => {
              console.log("布局变化：", layout);
              setDashBoardLayout(layout);
            }}
          >
            {chartsConfig.map((config: ChartConfig, index) => {
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
                <div key={chartId}>
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
                    style={{
                      width: dashboardChartsSize[index].width,
                      height: dashboardChartsSize[index].height,
                    }}
                    onDelete={() => {
                      deleteChartConfig(chartId);
                    }}
                  >
                    {renderChart(type)}
                  </ChartCard>
                </div>
              );
            })}
          </ReactGridLayout>
        </div>
      </div>
    </div>
  );
};

export default DashBoardDesign;
