import React from "react";
import "./index.scss";
import { Tooltip } from "antd";
import { ChartItem } from "../../utils/index";
const prefixCls = "chart-category";

/** 图表分类属性 */
interface IChartCategoryProps {
  /** 图表分类名称 */
  name: string;
  /** 图表项列表 */
  ChartItemsData: ChartItem[];
  /** 鼠标移入图表项的事件 */
  onItemMouseEnter?: (item: ChartItem) => void;
  /** 鼠标移出图表项的事件 */
  onItemMouseLeave?: () => void;
}
/** 图表分类 */
const ChartCategory: React.FC<IChartCategoryProps> = (props) => {
  const { name, ChartItemsData, onItemMouseEnter, onItemMouseLeave } = props;
  /** 鼠标移入图表项 */
  const handleMouseEnter = (item: ChartItem) => {
    if (onItemMouseEnter) {
      onItemMouseEnter(item);
    }
  };
  return (
    <div className={`${prefixCls}-container`}>
      <span className={`${prefixCls}-title`}>{name}</span>
      <div className={`${prefixCls}-items-container`}>
        {ChartItemsData.map((item, index) => {
          const { shortName, name, icon } = item;
          return (
            <Tooltip title={name} key={index}>
              <div
                className="chart-items"
                onMouseEnter={() => handleMouseEnter(item)}
                onMouseLeave={onItemMouseLeave}
              >
                <span className="chart-items-icon">{icon}</span>
                <span className="chart-items-name">{shortName}</span>
              </div>
            </Tooltip>
          );
        })}
      </div>
    </div>
  );
};

export default ChartCategory;
