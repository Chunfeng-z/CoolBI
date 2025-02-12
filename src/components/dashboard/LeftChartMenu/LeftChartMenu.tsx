import React from "react";
import ChartCategory from "./ChartCategory";
const prefixCls = "left-chart-menu";

const chartItemsData = [
  { name: "折线图", icon: "icon1", description: "折线图" },
  { name: "柱状图", icon: "icon2", description: "柱状图" },
  { name: "饼图", icon: "icon3", description: "饼图" },
  { name: "散点图", icon: "icon4", description: "散点图" },
  { name: "雷达图", icon: "icon5", description: "雷达图" },
];

type ChartItem = {
  name: string;
  icon: string;
  description: string;
};
/** 仪表板左侧的图表菜单 */
const LeftChartMenu: React.FC = () => {
  /** 当前hover选中的图表 */
  const [currentHoverChart, setCurrentHoverChart] = React.useState<ChartItem>({
    name: "11",
    icon: "222",
    description: "xxxxx",
  });
  return (
    <div className={`${prefixCls}-scroll-wrapper`}>
      <div className={`${prefixCls}-container`}>
        <div className={`${prefixCls}-title`}>{"图表组件"}</div>
        <div className={`${prefixCls}-body`}>
          <div className="chart-category">
            <div className="chart-category-body">
              <ChartCategory name="11" ChartItemsData={chartItemsData} />
            </div>
          </div>
        </div>
        {currentHoverChart && (
          <div className={`${prefixCls}-description`}>
            <span>{currentHoverChart.name}</span>
            <span className="description-detail">
              {currentHoverChart.description}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeftChartMenu;
