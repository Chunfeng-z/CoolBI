import { CloseCircleOutlined } from "@ant-design/icons";
import { VChart } from "@visactor/react-vchart";
import { useRequest } from "ahooks";
import { Flex, Spin } from "antd";
import React, { useMemo, useState } from "react";

import { queryChartData } from "@/api/dashboard";
import {
  AuxiliaryConfig,
  CoolBIToolTipConfig,
  DataLabelConfig,
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
  /** 数据标签配置 */
  dataLabelConfig: DataLabelConfig;
  /** 工具提示配置 */
  tooltipConfig: CoolBIToolTipConfig;
  /** 辅助展示配置 */
  auxiliaryConfig: AuxiliaryConfig;
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
  const {
    dataSourceConfig,
    drawAreaConfig,
    axisConfig,
    legendConfig,
    dataLabelConfig,
    tooltipConfig,
    auxiliaryConfig,
  } = props;
  const [xField, setXField] = useState<string>("");
  const [yField, setYField] = useState<string>("");
  /** 格式化后的图表数据 */
  const [formattedData, setFormattedData] = useState<unknown[]>([]);
  /** 折线图label的位置配置 */
  const labelPosition = useMemo(() => {
    switch (dataLabelConfig.position) {
      case "auto":
        return "top";
      case "lineTop":
        return "top";
      case "lineBottom":
        return "bottom";
      default:
        return "top";
    }
  }, [dataLabelConfig.position]);

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
    const isShowPercentage = tooltipConfig.tipContentConfig.isShowPercentage;
    // tooltip的字体配置
    const tooltipFontConfig = {
      fontSize: tooltipConfig.fontConfig.fontSize,
      fill: tooltipConfig.fontConfig.color,
      fontWeight: tooltipConfig.fontConfig.isBold ? "bold" : "normal",
    };
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
      tooltip: {
        visible: tooltipConfig.isShowToolTip,
        // TODO:百分比和总计的设置，参考：https://visactor.io/vchart/demo/label/label-mark-tooltip
        mark: {
          visible: tooltipConfig.displayMode === "singlePoint",
          content: {
            key: "数值",
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            value: (datum: any) => {
              return isShowPercentage ? datum.value + "(100%)" : datum.value;
            },
          },
        },
        dimension: {
          visible: tooltipConfig.displayMode === "dimension",
        },
        style: {
          panel: {
            backgroundColor: tooltipConfig.backgroundColor,
          },
          titleLabel: { ...tooltipFontConfig, fontWeight: "bold" },
          keyLabel: tooltipFontConfig,
          valueLabel: tooltipFontConfig,
        },
      },
      dataZoom: {
        visible: auxiliaryConfig.dataZoomDisplayMode === "show",
        orient: "bottom",
        height: 15,
        // 消除数据缩放轴的间距
        padding: [2, 0, 0, 0],
      },
      label: {
        visible: dataLabelConfig.isShowDataLabel,
        offset: 3,
        // 标签的防重叠配置
        overlap: {
          // 是否约束标签必须在绘图区域内。
          clampForce: false,
          // 检测到标签发生重叠后，是否隐藏放不下的标签。
          hideOnHit: dataLabelConfig.showMode === "auto" ? true : false,
        },
        position: labelPosition,
        style: {
          fontSize: dataLabelConfig.fontConfig.fontSize,
          fontWeight: dataLabelConfig.fontConfig.isBold ? "bold" : "normal",
          fontStyle: dataLabelConfig.fontConfig.isItalic ? "italic" : "normal",
          fill: dataLabelConfig.fontConfig.color,
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
            // 标题距离坐标轴(轴线、刻度、标签共同构成的包围盒)的距离
            space: 2,
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
            space: 2,
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
  }, [
    drawAreaConfig,
    axisConfig,
    formattedData,
    legendConfig,
    dataLabelConfig,
    labelPosition,
    tooltipConfig,
    auxiliaryConfig,
    xField,
    yField,
  ]);
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
    <div className={`${prefixCls} chart-no-drag`} style={{ height: "100%" }}>
      <VChart spec={spec} />
    </div>
  );
};

export default CoolLineChart;
