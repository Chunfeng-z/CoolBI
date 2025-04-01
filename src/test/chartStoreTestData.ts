import { ChartTypeEnum } from "@/components/dashboard/utils";
import {
  IndicatorCardChartConfig,
  IndicatorTrendChartConfig,
} from "@/types/charts";

/** 测试数据 */
export const testData: (
  | IndicatorCardChartConfig
  | IndicatorTrendChartConfig
)[] = [
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
      indicatorBlockGroupType: "swipe",
      maxGroupCount: 2,
      indicatorBlockSeparator: "line",
      indicatorBlockSeparatorColor: "#000000",
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
    layout: {
      i: "indicatorCard",
      x: 3,
      y: 0,
      w: 3,
      h: 3,
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
      y: 0,
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
  },
];
