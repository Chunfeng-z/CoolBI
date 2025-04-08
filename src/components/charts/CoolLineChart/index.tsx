import { CloseCircleOutlined } from "@ant-design/icons";
import { VChart } from "@visactor/react-vchart";
import { useRequest } from "ahooks";
import { Flex, Spin } from "antd";
import React, { useMemo, useState } from "react";

import { queryChartData } from "@/api/dashboard";
import {
  DataSourceConfig,
  DataSourceField,
  LegendConfig,
} from "@/types/chartConfigItems/common";
import {
  LineAxisConfig,
  LineDrawAreaConfig,
} from "@/types/chartConfigItems/lineItems";
import { DataSourceValues } from "@/types/dashboard";
import { convertDataToVisactorFormat } from "@/utils/hooks";
const prefixCls = "cool-line-chart";

interface ICoolLineChartProps {
  /** 图表背景配置 */
  backgroundColor: string | object;
  /** 图表使用的数据源的配置 */
  dataSourceConfig: DataSourceConfig;
  /** 绘图区域配置 */
  drawAreaConfig: LineDrawAreaConfig;
  /** 坐标轴配置 */
  axisConfig: LineAxisConfig;
  /** 图例配置 */
  legendConfig: LegendConfig;
}
const areaGradient = {
  fill: {
    gradient: "linear",
    x0: 0.5,
    y0: 0,
    x1: 0.5,
    y1: 1,
    stops: [
      {
        offset: 0,
        opacity: 1,
      },
      {
        offset: 1,
        opacity: 0.3,
      },
    ],
  },
};

const CoolLineChart: React.FC<ICoolLineChartProps> = (props) => {
  const { dataSourceConfig, drawAreaConfig, axisConfig, legendConfig } = props;
  const [xField, setXField] = useState<string>("");
  const [yField, setYField] = useState<string>("");
  /** 格式化后的图表数据 */
  const [formattedData, setFormattedData] = useState<unknown[]>([]);

  // 获取图表数据
  const { data, error, loading } = useRequest(
    () => queryChartData(dataSourceConfig),
    {
      ready: !!dataSourceConfig,
      loadingDelay: 300,
      refreshDeps: [dataSourceConfig],
      onSuccess: (res) => {
        if (res.data) {
          const respData: {
            columns: DataSourceField[];
            values: DataSourceValues;
          } = res.data;
          // 找出Dimension类型的字段作为X轴
          const dimensionField = respData.columns.find(
            (col) => col.type === "Dimension"
          );
          // 找出Measure类型的字段作为Y轴
          const measureField = respData.columns.find(
            (col) => col.type === "Measure"
          );
          if (dimensionField && measureField) {
            setYField(measureField.column);
            setXField(dimensionField.column);
            const chartData = convertDataToVisactorFormat(
              respData.columns,
              respData.values
            );
            setFormattedData(chartData);
          }
        }
      },
    }
  );
  const spec = useMemo(() => {
    const { isShowGradient } = drawAreaConfig;
    const { xAxisConfig, yAxisConfig } = axisConfig;
    /** 图表可变配置 */
    let partConfig = {};
    if (isShowGradient) {
      partConfig = {
        type: "area",
        area: {
          style: areaGradient,
        },
      };
    } else {
      partConfig = {
        type: "line",
      };
    }
    return {
      ...partConfig,
      line: {
        style: {
          lineDash: drawAreaConfig.lineStyle === "dashed" ? [4, 4] : [0],
          lineWidth: drawAreaConfig.lineWidth,
          curveType:
            drawAreaConfig.lineType === "curve" ? "monotone" : "linear",
        },
      },
      legends: {
        visible: legendConfig.isShowLegend,
        orient: legendConfig.legendPosition,
        position: legendConfig.legendAlign,
        item: {
          label: {
            style: {
              fontSize: legendConfig.legendFontConfig.fontSize,
              fontWeight: legendConfig.legendFontConfig.isBold
                ? "bold"
                : "normal",
              fontStyle: legendConfig.legendFontConfig.isItalic
                ? "italic"
                : "normal",
              fill: legendConfig.legendFontConfig.color,
            },
          },
        },
      },
      // https://visactor.com/vchart/guide/tutorial_docs/Chart_Concepts/Axes
      axes: [
        {
          type: "band",
          orient: "bottom",
          visible: xAxisConfig.isShowAxis,
          grid: {
            visible: xAxisConfig.axisGridConfig.isShowLine,
            style: {
              stroke: xAxisConfig.axisGridConfig.lineColor,
              lineDash:
                xAxisConfig.axisGridConfig.lineStyle === "dashed"
                  ? [4, 4]
                  : [0],
              lineWidth: xAxisConfig.axisGridConfig.lineWidth,
            },
          },
          domainLine: {
            visible: xAxisConfig.axisLineConfig.isShowLine,
            style: {
              stroke: xAxisConfig.axisLineConfig.lineColor,
              lineDash:
                xAxisConfig.axisLineConfig.lineStyle === "dashed"
                  ? [4, 4]
                  : [0],

              lineWidth: xAxisConfig.axisLineConfig.lineWidth,
            },
          },
          tick: {
            visible: xAxisConfig.isShowTickLine,
          },
          label: {
            visible: xAxisConfig.axisLabelConfig.isShowAxisLabel,
            style: {
              fontSize: xAxisConfig.axisLabelConfig.fontConfig.fontSize,
              fontWeight: xAxisConfig.axisLabelConfig.fontConfig.isBold
                ? "bold"
                : "normal",
              fontStyle: xAxisConfig.axisLabelConfig.fontConfig.isItalic
                ? "italic"
                : "normal",
              fill: xAxisConfig.axisLabelConfig.fontConfig.color,
            },
          },
          title: {
            visible: xAxisConfig.axisTitleConfig.isShowTitleAndUnit,
            text:
              xAxisConfig.axisTitleConfig.title +
              " (" +
              xAxisConfig.axisTitleConfig.unit +
              ") ",
            style: {
              fill: xAxisConfig.axisTitleConfig.fontConfig.color,
              fontSize: xAxisConfig.axisTitleConfig.fontConfig.fontSize,
              fontWeight: xAxisConfig.axisTitleConfig.fontConfig.isBold
                ? "bold"
                : "normal",
              fontStyle: xAxisConfig.axisTitleConfig.fontConfig.isItalic
                ? "italic"
                : "normal",
            },
          },
        },
        {
          type: "linear",
          orient: "left",
          visible: yAxisConfig.isShowAxis,
          min: yAxisConfig.axisRangeConfig.isMinRangeModeAuto
            ? undefined
            : yAxisConfig.axisRangeConfig.minValue,
          max: yAxisConfig.axisRangeConfig.isMaxRangeModeAuto
            ? undefined
            : yAxisConfig.axisRangeConfig.maxValue,
          grid: {
            visible: yAxisConfig.axisGridConfig.isShowLine,
            style: {
              stroke: yAxisConfig.axisGridConfig.lineColor,
              lineDash:
                yAxisConfig.axisGridConfig.lineStyle === "dashed"
                  ? [4, 4]
                  : [0],
              lineWidth: yAxisConfig.axisGridConfig.lineWidth,
            },
          },
          domainLine: {
            visible: yAxisConfig.axisLineConfig.isShowLine,
            style: {
              stroke: yAxisConfig.axisLineConfig.lineColor,
              lineDash:
                yAxisConfig.axisLineConfig.lineStyle === "dashed"
                  ? [4, 4]
                  : [0],
              lineWidth: yAxisConfig.axisLineConfig.lineWidth,
            },
          },
          tick: {
            visible: yAxisConfig.isShowTickLine,
            tickCount: yAxisConfig.intervalConfig.isEnableCustomInterval
              ? yAxisConfig.intervalConfig.intervalCount
              : undefined,
          },
          label: {
            visible: yAxisConfig.axisLabelConfig.isShowAxisLabel,
            style: {
              fontSize: yAxisConfig.axisLabelConfig.fontConfig.fontSize,
              fontWeight: yAxisConfig.axisLabelConfig.fontConfig.isBold
                ? "bold"
                : "normal",
              fontStyle: yAxisConfig.axisLabelConfig.fontConfig.isItalic
                ? "italic"
                : "normal",
              fill: yAxisConfig.axisLabelConfig.fontConfig.color,
            },
          },
          title: {
            visible: yAxisConfig.axisTitleConfig.isShowTitleAndUnit,
            // position: "end",
            // angle: 0,
            text:
              yAxisConfig.axisTitleConfig.title +
              " (" +
              yAxisConfig.axisTitleConfig.unit +
              ") ",
            style: {
              fill: yAxisConfig.axisTitleConfig.fontConfig.color,
              fontSize: yAxisConfig.axisTitleConfig.fontConfig.fontSize,
              fontWeight: yAxisConfig.axisTitleConfig.fontConfig.isBold
                ? "bold"
                : "normal",
              fontStyle: yAxisConfig.axisTitleConfig.fontConfig.isItalic
                ? "italic"
                : "normal",
            },
          },
        },
      ],
      data: {
        values: formattedData,
      },
      xField: xField,
      yField: yField,
      animationAppear: false,
      padding: [5, 5, 5, 5],
    };
  }, [drawAreaConfig, axisConfig, formattedData, legendConfig]);
  if (error) {
    return (
      <Flex
        style={{
          width: "100%",
          height: "100%",
        }}
        vertical
        justify="center"
        align="center"
      >
        <CloseCircleOutlined />
        <div className="text">获取数据失败</div>
      </Flex>
    );
  }
  if (loading) {
    return (
      <Spin
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      />
    );
  }

  return (
    <div className={prefixCls} style={{ height: "100%" }}>
      <VChart spec={spec} />
    </div>
  );
};

export default CoolLineChart;
