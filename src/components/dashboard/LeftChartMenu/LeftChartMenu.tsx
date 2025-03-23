import { PushpinOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import React from "react";

import { ChartItem } from "../utils";
import { CHART_ICON_MAP } from "../utils/index";

import ChartCategory from "./ChartCategory";
import { ChartCategoryData } from "./data";

import { useThemeStore } from "@/stores/useThemeStore";

const prefixCls = "left-chart-menu";

interface LeftChartMenuProps {
  style?: React.CSSProperties;
}

/** 仪表板左侧的图表菜单 */
const LeftChartMenu: React.FC<LeftChartMenuProps> = (props) => {
  const { style } = props;
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
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
    <div
      className={`${prefixCls}-scroll-wrapper`}
      style={{
        ...style,
      }}
    >
      <div className={`${prefixCls}-container`}>
        <div
          className={`${prefixCls}-title`}
          style={{
            backgroundColor: isDarkMode ? "#1f1f1f" : "#ffffff",
          }}
        >
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
          <div
            className={`${prefixCls}-description`}
            style={{
              backgroundColor: isDarkMode ? "#1f1f1f" : "#ffffff",
            }}
          >
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
