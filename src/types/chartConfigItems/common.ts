/** 字体样式配置 */
export interface FontConfig {
  /** 字体颜色 */
  color: string;
  /** 字体大小 */
  fontSize: number;
  /** 是否加粗 */
  isBold: boolean;
  /** 是否斜体 */
  isItalic: boolean;
}

/** 标题与卡片配置 */
export interface TitleCardConfig {
  /** 是否展示图表标题 */
  isShowTitle: boolean;
  /** 图表标题 */
  title: string;
  /** 标题字体配置 */
  titleFontConfig: FontConfig;
  /** 标题对齐方式 */
  titleAlign: "left" | "center";
  /** 是否显示备注 */
  isShowRemark: boolean;
  /** 备注内容 */
  remark: string;
  /** 备注位置
   * - afterTitle: 在标题后面
   * - belowTitle: 在标题下面
   */
  remarkPosition: "afterTitle" | "belowTitle";
  /** 是否显示尾注 */
  isShowEndNote: boolean;
  /** 尾注内容 */
  endNote: string;
  /** 是否显示组件自定义背景填充 */
  isShowBackgroundColor: boolean;
  /** 组件背景颜色 */
  backgroundColor: string;
  /** 组件圆角 */
  borderRadius: number;
  /** 图表卡片的内边距-上、左、下、右 */
  chartCardPadding: number[];
}

/** 图表组件在仪表板中的布局信息配置 */
export interface ChartLayout {
  /** 图表组件id */
  i: string;
  /** 图表组件在仪表板中的横坐标 */
  x: number;
  /** 图表组件在仪表板中的纵坐标 */
  y: number;
  /** 图表组件在仪表板中所占的列数 */
  w: number;
  /** 图表组件在仪表板中所占的行数 */
  h: number;
}

/** 指标修饰图配置 */
export interface IndicatorDecorationImgConfig {
  /** 当前指标字段的id */
  id: string;
  /** 当前指标字段的名称 */
  name: string;
  /** 当前指标字段修饰图的颜色 */
  color: string;
  /** 当前指标字段修饰图的icon */
  icon: string;
}

/** 数据系列的数据项配置 */
export interface DataSeriesConfig {
  /** 系列的id-也就是字段/指标的id */
  id: string;
  /** 系列的名称-也就是字段/指标的名称 */
  name: string;
  /** 系列的线条样式
   * - solid: 实线
   * - dashed: 虚线
   */
  lineStyle?: "solid" | "dashed";
  /** 系列的线条宽度 */
  lineWidth?: number;
  /** 是否显示数据标签 */
  showDataLabels?: boolean;
  /** 数据标签的配置 */
  dataLabelConfig?: FontConfig;
  /** 是否显示极值 */
  showExtremeValue?: boolean;
  /** 指标/字段数据前缀 */
  indicatorPrefix: string;
  /** 指标/字段数据后缀 */
  indicatorSuffix: string;
}

/** 数据源的数据字段的类型 */
export interface DataSourceField {
  /** 字段id */
  id: string;
  /** 字段名称 */
  name: string;
  /** 字段类型 */
  type: "Measure" | "Dimension";
  /** 数据的column */
  column: string;
  /** 字段的数据类型 */
  dataType: "string" | "number" | "datetime";
  /** 数据聚合方式 - 比如利润可以计算总和和平均 */
  aggregation?: "sum" | "avg" | "count" | "max" | "min";
}

/** 数据图表使用的数据源的信息-已使用的部分 */
export interface DataSourceConfig {
  /** 当前使用的数据源表单的id */
  dataFromId: string;
  /** 当前使用到的数据源的维度字段 */
  dimensionFields: DataSourceField[];
  /** 当前使用到的数据源的指标字段 */
  measureFields: DataSourceField[];
}

/** cool bi图例位置
 * - top: 上方
 * - bottom: 下方
 * - left: 左侧
 * - right: 右侧
 */
export type CoolBILegendPosition = "top" | "bottom" | "left" | "right";
/** cool bi对齐方式
 * - start: 左对齐
 * - center: 居中对齐
 * - end: 右对齐
 */
export type CoolBILegendAlign = "start" | "center" | "end";

/** 图表图例配置  */
export interface LegendConfig {
  /** 是否显示图例 */
  isShowLegend: boolean;
  /** 图例位置 */
  legendPosition: CoolBILegendPosition;
  /** 图例对齐方式 */
  legendAlign: CoolBILegendAlign;
  /** 图例字体配置 */
  legendFontConfig: FontConfig;
}

/** 图表数据标签配置 */
export interface DataLabelConfig {
  /** 是否显示数据标签 */
  isShowDataLabel: boolean;
  /** 数据标签的显示模式
   * - auto: 自动
   * - all: 全量显示
   */
  showMode: "auto" | "all";
  /** 数据标签的字体配置 */
  fontConfig: FontConfig;
  /** 数据标签的位置 */
  position?:
    | "auto"
    | "lineTop"
    | "lineBottom"
    | "top"
    | "bottom"
    | "inside"
    | "outside";
}

/** 工具提示配置 */
export interface CoolBIToolTipConfig {
  /** 是否显示tooltip */
  isShowToolTip: boolean;
  /** 展示方式
   * - singlePoint: 单数据点
   * - dimension: 按维度
   */
  displayMode: "singlePoint" | "dimension";
  /** 内容展示配置 */
  tipContentConfig: {
    /** 显示占比 */
    isShowPercentage: boolean;
    /** 显示总计 */
    isShowTotal: boolean;
  };
  /** 背景色 */
  backgroundColor: string;
  /** 字体配置 */
  fontConfig: FontConfig;
}

/** 图表辅助展示配置 */
export interface AuxiliaryConfig {
  /** 缩略轴显示方式
   * - auto: 智能适配
   * - show: 显示
   * - hidden: 不显示
   */
  dataZoomDisplayMode: "auto" | "show" | "hidden";
}
