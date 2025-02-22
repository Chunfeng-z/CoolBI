import IconLine from "../../../assets/dashboard/line.svg";
import IconPolyLine from "../../../assets/dashboard/polyline.svg";
import IconPolyLineStack from "../../../assets/dashboard/polyline-stack.svg";
import IconPolyLineStackPercent from "../../../assets/dashboard/polyline-stack-percent.svg";
import IconCombination from "../../../assets/dashboard/combination.svg";
import IconBar from "../../../assets/dashboard/bar.svg";
import IconBarStack from "../../../assets/dashboard/bar-stack.svg";
import IconBarStackPercent from "../../../assets/dashboard/bar-stack-percent.svg";
import IconRadicalBar from "../../../assets/dashboard/radical-bar.svg";
import IconRanking from "../../../assets/dashboard/ranking.svg";
import IconStrip from "../../../assets/dashboard/strip.svg";
import IconStripStack from "../../../assets/dashboard/strip-stack.svg";
import IconStripStackPercent from "../../../assets/dashboard/strip-stack-percent.svg";
import IconBarChartRace from "../../../assets/dashboard/bar-chart-race.svg";
import IconWaterfall from "../../../assets/dashboard/waterfall.svg";
import IconBullet from "../../../assets/dashboard/bullet.svg";
import IconBox from "../../../assets/dashboard/box.svg";
import IconHistogram from "../../../assets/dashboard/histogram.svg";
import IconPie from "../../../assets/dashboard/pie.svg";
import IconPolar from "../../../assets/dashboard/polar.svg";
import IconSunBurst from "../../../assets/dashboard/sunburst.svg";
import IconRadar from "../../../assets/dashboard/radar.svg";
import IconBubble from "../../../assets/dashboard/bubble.svg";
import IconScatter from "../../../assets/dashboard/scatter.svg";
import IconFacetedScatter from "../../../assets/dashboard/faceted-scatter.svg";
import IconFunnel from "../../../assets/dashboard/funnel.svg";
import IconFunnelCompare from "../../../assets/dashboard/funnel-compare.svg";
import IconSankey from "../../../assets/dashboard/sankey.svg";
import IconArc from "../../../assets/dashboard/arc.svg";
import IconTreeMap from "../../../assets/dashboard/treemap.svg";
import IconIndicatorCard from "../../../assets/dashboard/indicator-card.svg";
import IconIndicatorTrend from "../../../assets/dashboard/indicator-trend.svg";
import IconFlipper from "../../../assets/dashboard/flipper.svg";
import IconProgress from "../../../assets/dashboard/progress.svg";
import IconGauge from "../../../assets/dashboard/gauge.svg";
import IconWaterWave from "../../../assets/dashboard/waterwave.svg";
import IconDecompositionTree from "../../../assets/dashboard/decomposition-tree.svg";
import IconIndicatorRelation from "../../../assets/dashboard/indicator-relation.svg";
/** 每个图表项的数据结构
 * @param shortName 图表项的简称
 * @param name 图表项的全称
 * @param icon 图表项的icon
 * @param description 图表的简介
 */
export type ChartItem = {
  shortName: string;
  name: string;
  icon: string;
  description: string;
};

/**
 * 每种图表的数据结构
 * @param category 图表的分类名称
 * @param items 图表的项
 */
export type ChartCategory = {
  category: string;
  items: ChartItem[];
};

/**
 * 可选的颜色主题
 * @param lightTheme 亮色主题
 * @param darkTheme 暗色主题
 */
export enum Theme {
  lightTheme = "lightTheme",
  darkTheme = "darkTheme",
}

/**
 * 卡片圆角的选择项
 * @param noRadius 无圆角
 * @param small 小圆角
 * @param middle 中圆角
 * @param large 大圆角
 */
export enum CardRadius {
  noRadius = "noRadius",
  small = "small",
  middle = "middle",
  large = "large",
}

/**
 * 卡片间距的选择项
 * @param compact 紧凑
 * @param normal 正常
 * @param custom 自定义
 */
export enum CardSpace {
  compact = "compact",
  normal = "normal",
  custom = "custom",
}

/**
 * 页面栅格数的选择项
 */
export const pageRasterOptions = [
  "4",
  "6",
  "8",
  "10",
  "12",
  "14",
  "16",
  "18",
  "20",
];

/** 图表菜单的图标 */
export const CHART_ICON_MAP: Record<string, string> = {
  line: IconLine,
  polyline: IconPolyLine,
  polylineStack: IconPolyLineStack,
  polylineStackPercent: IconPolyLineStackPercent,
  combination: IconCombination,
  bar: IconBar,
  barStack: IconBarStack,
  barStackPercent: IconBarStackPercent,
  radicalBar: IconRadicalBar,
  ranking: IconRanking,
  strip: IconStrip,
  stripStack: IconStripStack,
  stripStackPercent: IconStripStackPercent,
  barChartRace: IconBarChartRace,
  waterfall: IconWaterfall,
  bullet: IconBullet,
  box: IconBox,
  histogram: IconHistogram,
  pie: IconPie,
  polar: IconPolar,
  sunburst: IconSunBurst,
  radar: IconRadar,
  bubble: IconBubble,
  scatter: IconScatter,
  facetedScatter: IconFacetedScatter,
  funnel: IconFunnel,
  funnelCompare: IconFunnelCompare,
  sankey: IconSankey,
  arc: IconArc,
  treemap: IconTreeMap,
  indicatorCard: IconIndicatorCard,
  indicatorTrend: IconIndicatorTrend,
  flipper: IconFlipper,
  progress: IconProgress,
  gauge: IconGauge,
  waterwave: IconWaterWave,
  decompositionTree: IconDecompositionTree,
  indicatorRelation: IconIndicatorRelation,
};
