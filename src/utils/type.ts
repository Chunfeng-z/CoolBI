import { ChartTypeEnum } from "@/components/dashboard/utils";

/** 数据解析后支持的字段类型 */
export enum FieldType {
  /** 字符串 */
  STRING = "string",
  /** 数字 */
  NUMBER = "number",
  /** 日期 */
  DATE = "date",
}
/** 系列的数据类型 */
export interface seriesItem {
  /** 系列的id */
  id: string;
  /** 系列的名称/字段 */
  name: string;
  /** 线条样式 */
  lineStyle?: "solid" | "dashed";
  /** 线条宽度 */
  lineWidth?: number;
  /** 是否显示数据标签 */
  showDataLabels?: boolean;
  /** 数据标签样式 */
  dataLabelConfig?: {
    /** 字体颜色 */
    color?: string;
    /** 字体大小 */
    fontSize?: number;
    /** 是否加粗 */
    isBold?: boolean;
    /** 是否斜体 */
    isItalic?: boolean;
  };
  /** 是否显示最值 */
  showExtremeValue?: boolean;
  /** 指标数据前缀 */
  indicatorPrefix?: string;
  /** 指标数据后缀 */
  indicatorSuffix?: string;
}

/** 图表的基本配置类型 */
export interface ChartConfig {
  /** 图表组件id */
  chartId: string;
  /** 图表类型 */
  type: string;
  /** 是否展示图表标题 */
  isShowTitle?: boolean;
  /** 图表标题 */
  title?: string;
  /** 标题文本颜色 */
  titleColor?: string;
  /** 标题字号 */
  titleFontSize?: number | string | undefined;
  /** 标题是否加粗-默认加粗 */
  isTitleBold?: boolean;
  /** 标题是否斜体 */
  isTitleItalic?: boolean;
  /** 标题的对齐方式-默认左对齐 */
  titleAlign?: "left" | "center";
  /** 是否显示备注 */
  isShowRemark?: boolean;
  /** 备注内容 */
  remark?: string;
  /** 备注位置 */
  remarkPosition?: "afterTitle" | "belowTitle";
  /** 是否显示尾注 */
  isShowEndNote?: boolean;
  /** 尾注内容 */
  endNote?: string;
  /** 是否显示组件自定义背景填充 */
  isShowBackgroundColor?: boolean;
  /** 组件背景颜色 */
  backgroundColor?: string;
  /** 组件圆角 */
  borderRadius?: number;
  /** 图表卡片的内边距-上、左、下、右 */
  chartCardPadding?: number[];
  color?: string;
  showLegend?: boolean;
  /** 图表组件在仪表板中grid布局的位置信息 */
  layout?: {
    i: string;
    /** x轴位置 */
    x: number;
    /** y轴位置 */
    y: number;
    /** 宽度 */
    w: number;
    /** 高度 */
    h: number;
  };
  /** 系列配置-只有存在数据的时候才可以配置 */
  seriesConfig?: seriesItem[];
}

/** 指标趋势图的额外配置 */
export interface IndicatorTrendConfig extends ChartConfig {
  /** 当前图表类型为指标趋势图 */
  type: ChartTypeEnum.indicatorTrend;
  /** 是否显示趋势图 */
  isShowTrendChart?: boolean;
  /** 指标趋势图的类型 */
  trendChartType?: "area" | "bar" | "line";
  /** 线条类型 */
  lineType?: "curve" | "straight";
  /** 线条样式 */
  lineStyle?: "solid" | "dashed";
  /** 线条宽度 */
  lineWidth?: number;
  /** 是否显示标记点 */
  showMarkers?: boolean;
  /** 内容在指标块的位置 */
  indicatorContentPosition?: "left" | "center";
  /** 指标值的行间距
   * - normal: 正常
   * - small: 紧凑
   */
  indicatorValueLineSpace?: "normal" | "small";
  /** 指标名称字体配置 */
  indicatorNameFontConfig?: {
    color?: string;
    fontSize?: number;
    isBold?: boolean;
    isItalic?: boolean;
  };
  /** 指标数值字体配置 */
  indicatorValueFontConfig?: {
    color?: string;
    fontSize?: number;
    isBold?: boolean;
    isItalic?: boolean;
  };
}

/** 指标看板-即指标卡片的配置 */
export interface IndicatorCardConfig extends ChartConfig {
  type: ChartTypeEnum.indicatorCard;
  /** 指标布局 */
  indicatorLayout?: {
    /** 指标间关系
     * - same-level:并列
     * - sub-level: 主副
     */
    indicatorRelation: "same-level" | "sub-level";
    /** 指标块组的展示形式
     * - swipe: 滑动
     * - line-feed: 换行
     */
    indicatorBlockGroupType: "swipe" | "line-feed";
    /** 每行最多显示的个数 */
    maxIndicatorBlockGroupCount: number;
    /** 指标块分隔形式 */
    indicatorBlockGroupSeparator: "line" | "none";
    /** 分隔线颜色 */
  };
  /** 指标内容 */
  indicatorContent?: {
    /** 内容在指标块的位置 */
    indicatorContentPosition: "left" | "center";
    /** 指标值的行间距 */
    indicatorValueLineSpace: "normal" | "small";
    /** 是否显示指标名称 */
    isShowIndicatorName: boolean;
    /** 指标名称字体配置 */
    indicatorNameFontConfig: {
      color?: string;
      fontSize?: number;
      isBold?: boolean;
      isItalic?: boolean;
    };
    /** 指标数值字体配置 */
    indicatorValueFontConfig: {
      color?: string;
      fontSize?: number;
      isBold?: boolean;
      isItalic?: boolean;
    };
    /** 是否开启指标修饰图 */
    isShowIndicatorDecoration: boolean;
    /** 指标修饰图配置 */
    indicatorDecorationConfig: {
      // 指标字段id
      id: string;
      // 指标字段name
      name: string;
      // 指标字段颜色
      color: string;
      // 指标字段icon
      icon: string;
    }[];
  };
}
