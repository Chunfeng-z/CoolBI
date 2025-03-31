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
  lineStyle: "solid" | "dashed";
  /** 系列的线条宽度 */
  lineWidth: number;
  /** 是否显示数据标签 */
  showDataLabels: boolean;
  /** 数据标签的配置 */
  dataLabelConfig: FontConfig;
  /** 是否显示极值 */
  showExtremeValue: boolean;
  /** 指标/字段数据前缀 */
  indicatorPrefix: string;
  /** 指标/字段数据后缀 */
  indicatorSuffix: string;
}
