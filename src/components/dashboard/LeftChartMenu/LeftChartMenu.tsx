import React from "react";
import ChartCategory from "./ChartCategory";
import { ChartCategoryData } from "./data";
import { ChartItem } from "../utils";
import { PushpinOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import { CHART_ICON_MAP } from "../utils/index";
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
        <div className={`${prefixCls}-title`}>
          <span>图表组件</span>
          <Tooltip title="固定图表菜单">
            <Button type="text" size="small" icon={<PushpinOutlined />} />
          </Tooltip>
        </div>
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
            <div className="detail">
              <div className="chart-icon-image">
                <img
                  src={CHART_ICON_MAP[currentHoverChart.icon]}
                  alt="icon"
                  width={60}
                  height={60}
                />
              </div>
              <span className="description-detail">
                {currentHoverChart.description}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeftChartMenu;
