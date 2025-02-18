import React from "react";
import ChartCategory from "./ChartCategory";
import { ChartCategoryData } from "./data";
import { ChartItem } from "../utils";
const prefixCls = "left-chart-menu";

/** 仪表板左侧的图表菜单 */
const LeftChartMenu: React.FC = () => {
  /** 当前hover选中的图表 */
  const [currentHoverChart, setCurrentHoverChart] =
    React.useState<ChartItem | null>(null);
  const handleItemMouseEnter = (item: ChartItem) => {
    setCurrentHoverChart(item);
  };
  const handleItemMouseLeave = () => {
    setCurrentHoverChart(null);
  };
  return (
    <div className={`${prefixCls}-scroll-wrapper`}>
      <div className={`${prefixCls}-container`}>
        <div className={`${prefixCls}-title`}>{"图表组件"}</div>
        <div className={`${prefixCls}-body`}>
          {ChartCategoryData.map((category, index) => (
            <ChartCategory
              key={index}
              name={category.category}
              ChartItemsData={category.items}
              onItemMouseEnter={handleItemMouseEnter}
              onItemMouseLeave={handleItemMouseLeave}
            />
          ))}
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
