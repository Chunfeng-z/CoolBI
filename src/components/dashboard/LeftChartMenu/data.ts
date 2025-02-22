export const ChartCategoryData = [
  {
    category: "线/面图",
    items: [
      {
        shortName: "折线图",
        name: "折线图",
        icon: "line",
        description: "用来展示在一定时间间隔下数据的趋势走向。",
      },
      {
        shortName: "面积图",
        name: "面积图",
        icon: "polyline",
        description:
          "用来展示在一定时间内数据的趋势走向以及他们所占的面积比例。",
      },
      {
        shortName: "堆叠图",
        name: "堆叠面积图",
        icon: "polylineStack",
        description:
          "用来显示每个数值所占大小随时间或类别变化的趋势线，展示的是部分与整体的关系。",
      },
      {
        shortName: "百分比",
        name: "百分比堆叠面积图",
        icon: "polylineStackPercent",
        description:
          "用来显示每个数值所占大小随时间或类别变化的趋势线，展示的是部分与整体的关系。",
      },
      {
        shortName: "组合图",
        name: "组合图",
        icon: "combination",
        description: "支持双轴展示不同量级数据，用来展示不同项目间的变化趋势。",
      },
    ],
  },
  {
    category: "柱状/条形图",
    items: [
      {
        shortName: "柱状图",
        name: "柱状图",
        icon: "bar",
        description:
          "用来比较各组数据之间的差别，并且显示一段时间内的数据变化情况。",
      },
      {
        shortName: "堆叠图",
        name: "堆叠柱状图",
        icon: "barStack",
        description:
          "用来展示一个大类包含的每个小类的数据，以及各个小类的占比。",
      },
      {
        shortName: "百分比",
        name: "百分比堆叠柱状图",
        icon: "barStackPercent",
        description:
          "用层高表示该类别数据占该分组总体数据的百分比。显示单个项目与整体之间的关系。",
      },
      {
        shortName: "环形柱图",
        name: "环形柱状图",
        icon: "radicalBar",
        description:
          "用来比较各组数据之间的差别，并且可以显示一段时间内的数据变化情况。",
      },
      {
        shortName: "排行榜",
        name: "排行榜",
        icon: "ranking",
        description: "用于展示TOP N的排行榜数据。",
      },
      {
        shortName: "条形图",
        name: "条形图",
        icon: "strip",
        description: "用横向的展示方式来比较数据间的大小以及各项之间的差距。",
      },
      {
        shortName: "堆叠图",
        name: "堆叠条形图",
        icon: "stripStack",
        description:
          "用来展示一个大类包含的每个小类的数据，以及各个小类的对比。",
      },
      {
        shortName: "百分比",
        name: "百分比堆叠条形图",
        icon: "stripStackPercent",
        description:
          "用层宽代表该类别数据占该分组总体数据的百分比。展示单个项目与整体之间的关系。",
      },
      {
        shortName: "动态条形",
        name: "动态条形图",
        icon: "barChartRace",
        description: "用来动态展示随时间播放的TOP条数",
      },
      {
        shortName: "瀑布图",
        name: "瀑布图",
        icon: "waterfall",
        description:
          "采用起始值与相对值结合的方式，展示数据在不同时期或受不同因素影响下的结果。",
      },
      {
        shortName: "子弹图",
        name: "子弹图",
        icon: "bullet",
        description:
          "通常用来显示单个主要度量的表现情况，例如进度进展阶段和目标完成情况",
      },
      {
        shortName: "箱形图",
        name: "箱形图",
        icon: "box",
        description:
          "用于显示数据的分布情况，包括最大值、最小值、中位数、上下四分位数等。",
      },
      {
        shortName: "直方图",
        name: "直方图",
        icon: "histogram",
        description: "用于展示数据的分布情况，显示数据的频数分布情况",
      },
    ],
  },
  {
    category: "饼图/环图",
    items: [
      {
        shortName: "饼图",
        name: "饼图",
        icon: "pie",
        description: "用来展示数据中各项的大小与各项总和的比例。",
      },
      {
        shortName: "玫瑰图",
        name: "玫瑰图",
        icon: "polar",
        description: "用来展示各项数据间的比较情况，多适用于枚举型数据。",
      },
      {
        shortName: "旭日图",
        name: "旭日图",
        icon: "sunburst",
        description: "用来展示多级分类数据的占比情况。",
      },
      {
        shortName: "雷达图",
        name: "雷大图",
        icon: "radar",
        description: "用来展示分析所得的数字或比率，多用于展示维度值的分布。",
      },
      {
        shortName: "矩形树图",
        name: "矩形树图",
        icon: "treemap",
        description: "用来展示数据的层级关系，以及各层级数据的占比情况。",
      },
    ],
  },
  {
    category: "气泡/散点图",
    items: [
      {
        shortName: "气泡图",
        name: "气泡图",
        icon: "bubble",
        description: "用位置和气泡大小展示数据的分布和聚合情况。",
      },
      {
        shortName: "散点图",
        name: "散点图",
        icon: "scatter",
        description: "用来展示数据的分布关系和相关性。",
      },
      {
        shortName: "分面散点",
        name: "分面散点图",
        icon: "facetedScatter",
        description: "用来展示数据的分布关系和相关性。",
      },
    ],
  },
  {
    category: "漏斗/桑基图",
    items: [
      {
        shortName: "漏斗图",
        name: "漏斗图",
        icon: "funnel",
        description:
          "用来展示业务各环节的转化递进情况；如用户从进入网站到实现购买的最终转化率。",
      },
      {
        shortName: "漏斗对比",
        name: "漏斗对比图",
        icon: "funnelCompare",
        description:
          "既可以用来对比两类事物在不同类别下的数据情况，也适用于业务流程多的流程分析。",
      },
      {
        shortName: "桑基图",
        name: "桑基图",
        icon: "sankey",
        description: "用来展示数据的流向和流量分布。",
      },
    ],
  },
  {
    category: "指标图",
    items: [
      {
        shortName: "指标看板",
        name: "指标看板",
        icon: "indicatorCard",
        description: "用来展示关键指标的数值和变化趋势。",
      },
      {
        shortName: "指标趋势",
        name: "指标趋势图",
        icon: "indicatorTrend",
        description: "用来展示关键指标一段时间的变化。",
      },
      {
        shortName: "翻牌器",
        name: "翻牌器",
        icon: "flipper",
        description: "用于监控或展示业务的实时数据变化。",
      },
      {
        shortName: "进度条",
        name: "进度条",
        icon: "progress",
        description: "用来某个指标的完成进度。",
      },
      {
        shortName: "仪表盘",
        name: "仪表盘",
        icon: "gauge",
        description: "用来展示某个指标所在的数据范围。",
      },
      {
        shortName: "水波图",
        name: "水波图",
        icon: "waterwave",
        description: "用来展示某个指标的数值占比。",
      },
      {
        shortName: "指标拆解",
        name: "指标拆解树",
        icon: "decompositionTree",
        description: "按照不同维度分解目标数据，用来查看各部分对整体的贡献度。",
      },
      {
        shortName: "指标关系",
        name: "指标关系图",
        icon: "indicatorRelation",
        description: "描述一组指标间的关系，常用于杜邦分析模型中。",
      },
    ],
  },
];
