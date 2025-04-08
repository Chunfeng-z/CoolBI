import { ChartTypeEnum } from "@/components/dashboard/utils";
import {
  IndicatorCardChartConfig,
  IndicatorTrendChartConfig,
  LineChartConfig,
} from "@/types/charts";

/** 测试数据 */
export const testData: (
  | IndicatorCardChartConfig
  | IndicatorTrendChartConfig
  | LineChartConfig
)[] = [
  {
    chartId: "lineChart1",
    type: ChartTypeEnum.line,
    titleCardConfig: {
      isShowTitle: true,
      title: "折线图",
      titleFontConfig: {
        color: "#1677ff",
        fontSize: 16,
        isBold: true,
        isItalic: false,
      },
      titleAlign: "left",
      isShowRemark: false,
      remark: "备注1",
      remarkPosition: "afterTitle",
      isShowEndNote: false,
      endNote: "",
      isShowBackgroundColor: true,
      backgroundColor: "#ffffff",
      borderRadius: 4,
      chartCardPadding: [5, 10, 10, 10],
    },
    layout: {
      i: "lineChart1",
      x: 0,
      y: 0,
      w: 5,
      h: 5,
    },
    drawAreaConfig: {
      isShowGradient: true,
      lineType: "curve",
      lineStyle: "solid",
      lineWidth: 2,
    },
    axisConfig: {
      xAxisConfig: {
        isShowAxis: true,
        axisTitleConfig: {
          isShowTitleAndUnit: true,
          title: "时间",
          unit: "天",
          fontConfig: {
            color: "#000000",
            fontSize: 12,
            isBold: false,
            isItalic: false,
          },
        },
        axisLabelConfig: {
          isShowAxisLabel: true,
          fontConfig: {
            color: "#000000",
            fontSize: 12,
            isBold: false,
            isItalic: false,
          },
        },
        isShowTickLine: true,
        axisLineConfig: {
          isShowLine: true,
          lineStyle: "solid",
          lineColor: "#e0e0e0",
          lineWidth: 1,
        },
        axisGridConfig: {
          isShowLine: true,
          lineStyle: "solid",
          lineColor: "#e0e0e0",
          lineWidth: 1,
        },
      },
      yAxisConfig: {
        isShowAxis: true,
        axisTitleConfig: {
          isShowTitleAndUnit: true,
          title: "销售额",
          unit: "元",
          fontConfig: {
            color: "#000000",
            fontSize: 12,
            isBold: false,
            isItalic: false,
          },
          position: "top",
        },
        axisLabelConfig: {
          isShowAxisLabel: true,
          fontConfig: {
            color: "#000000",
            fontSize: 12,
            isBold: false,
            isItalic: false,
          },
        },
        isShowTickLine: true,
        axisLineConfig: {
          isShowLine: true,
          lineStyle: "solid",
          lineColor: "#e0e0e0",
          lineWidth: 1,
        },
        axisGridConfig: {
          isShowLine: true,
          lineStyle: "solid",
          lineColor: "#e0e0e0",
          lineWidth: 1,
        },
        axisRangeConfig: {
          isMaxRangeModeAuto: true,
          isMinRangeModeAuto: true,
          maxValue: undefined,
          minValue: undefined,
        },
        intervalConfig: {
          isEnableCustomInterval: false,
          intervalCount: 2,
        },
      },
    },
    legendConfig: {
      isShowLegend: true,
      legendPosition: "top",
      legendAlign: "middle",
      legendFontConfig: {
        color: "#000000",
        fontSize: 12,
        isBold: false,
        isItalic: false,
      },
    },
    dataLabelConfig: {
      isShowDataLabel: true,
      showMode: "auto",
      fontConfig: {
        color: "#000000",
        fontSize: 12,
        isBold: false,
        isItalic: false,
      },
      position: "auto",
    },
    tooltipConfig: {
      isShowToolTip: true,
      displayMode: "singlePoint",
      tipContentConfig: {
        isShowPercentage: true,
        isShowTotal: true,
      },
      backgroundColor: "#ffffff",
      fontConfig: {
        color: "#000000",
        fontSize: 12,
        isBold: false,
        isItalic: false,
      },
    },
    auxiliaryConfig: {
      dataZoomDisplayMode: "auto",
    },
    dataSourceConfig: {
      dataFromId: "dataSource2",
      dimensionFields: [
        {
          id: "field3",
          name: "订单日期",
          type: "Dimension",
          column: "time",
          dataType: "datetime",
        },
      ],
      measureFields: [
        {
          id: "field4",
          name: "销售额",
          type: "Measure",
          column: "value",
          dataType: "number",
        },
      ],
    },
  },
  {
    chartId: "indicatorCard",
    type: ChartTypeEnum.indicatorCard,
    titleCardConfig: {
      isShowTitle: true,
      title: "指标看板",
      titleFontConfig: {
        color: "#1677ff",
        fontSize: 16,
        isBold: true,
        isItalic: false,
      },
      titleAlign: "left",
      isShowRemark: false,
      remark: "备注1",
      remarkPosition: "afterTitle",
      isShowEndNote: false,
      endNote: "",
      isShowBackgroundColor: true,
      backgroundColor: "#ffffff",
      borderRadius: 4,
      chartCardPadding: [5, 10, 10, 10],
    },
    indicatorLayout: {
      indicatorRelation: "same-level",
      indicatorBlockGroupType: "line-feed",
      maxGroupCount: 2,
      indicatorBlockSeparator: "line",
      indicatorBlockSeparatorColor: "#e0e0e0",
    },
    indicatorContentConfig: {
      indicatorContentPosition: "center",
      indicatorValueLineSpace: "normal",
      enableFontSetting: true,
      indicatorNameFontConfig: {
        color: "#000000",
        fontSize: 14,
        isBold: false,
        isItalic: false,
      },
      indicatorValueFontConfig: {
        color: "#000000",
        fontSize: 22,
        isBold: false,
        isItalic: false,
      },
      isShowIndicatorDecoration: true,
      indicatorDecorationConfig: [
        {
          id: "decoration1",
          name: "字段1",
          color: "#000000",
          icon: "xx",
        },
      ],
    },
    seriesConfig: [
      {
        id: "field4",
        name: "销售额",
        indicatorPrefix: "￥",
        indicatorSuffix: "元",
      },
      {
        id: "field5",
        name: "利润",
        indicatorPrefix: "￥",
        indicatorSuffix: "元",
      },
      {
        id: "field6",
        name: "客户数",
        indicatorPrefix: "",
        indicatorSuffix: "个",
      },
    ],
    layout: {
      i: "indicatorCard",
      x: 0,
      y: 5,
      w: 3,
      h: 3,
    },
    dataSourceConfig: {
      dataFromId: "dataSource1",
      dimensionFields: [
        {
          id: "field1",
          name: "字段1",
          type: "Dimension",
          column: "COL_1",
          dataType: "string",
        },
      ],
      measureFields: [
        {
          id: "field2",
          name: "字段2",
          type: "Measure",
          column: "COL_2",
          dataType: "number",
        },
      ],
    },
  },
  {
    chartId: "indicatorTrend",
    type: ChartTypeEnum.indicatorTrend,
    titleCardConfig: {
      isShowTitle: true,
      title: "指标趋势图",
      titleFontConfig: {
        color: "#1677ff",
        fontSize: 16,
        isBold: true,
        isItalic: false,
      },
      titleAlign: "left",
      isShowRemark: false,
      remark: "备注1",
      remarkPosition: "afterTitle",
      isShowEndNote: false,
      endNote: "",
      isShowBackgroundColor: true,
      backgroundColor: "#ffffff",
      borderRadius: 4,
      chartCardPadding: [5, 10, 10, 10],
    },
    trendChartConfig: {
      isShowTrendChart: true,
      trendChartType: "area",
      lineType: "curve",
      lineStyle: "solid",
      lineWidth: 2,
      showMarkers: false,
    },
    indicatorContentConfig: {
      enableFontSetting: true,
      indicatorContentPosition: "left",
      indicatorValueLineSpace: "small",
      indicatorNameFontConfig: {
        color: "#000000",
        fontSize: 14,
        isBold: false,
        isItalic: false,
      },
      indicatorValueFontConfig: {
        color: "#000000",
        fontSize: 22,
        isBold: false,
        isItalic: false,
      },
    },
    layout: {
      i: "indicatorTrend",
      x: 0,
      y: 8,
      w: 3,
      h: 3,
    },
    seriesConfig: [
      {
        id: "sales",
        name: "销售额",
        lineStyle: "solid",
        lineWidth: 2,
        showDataLabels: true,
        dataLabelConfig: {
          color: "#000000",
          fontSize: 14,
          isBold: false,
          isItalic: false,
        },
        showExtremeValue: false,
        indicatorPrefix: "￥",
        indicatorSuffix: "元",
      },
    ],
    dataSourceConfig: {
      dataFromId: "dataSource2",
      dimensionFields: [
        {
          id: "field3",
          name: "订单日期",
          type: "Dimension",
          column: "time",
          dataType: "datetime",
        },
      ],
      measureFields: [
        {
          id: "field4",
          name: "销售额",
          type: "Measure",
          column: "value",
          dataType: "number",
        },
      ],
    },
  },
];
