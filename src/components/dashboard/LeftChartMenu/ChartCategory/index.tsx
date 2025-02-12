import React from "react";
import "./index.scss";
import { Tooltip } from "antd";
const prefixCls = "chart-category";

/** 图表项的数据类型 */
type ChartItem = {
  /** 图表项的名称 */
  name: string;
  /** 图表项的icon */
  icon: string;
  /** 图表的简介 */
  description: string;
};

/** 图表分类属性 */
interface IChartCategoryProps {
  /** 图表分类名称 */
  name: string;
  /** 图表项列表 */
  ChartItemsData: ChartItem[];
}
/** 图表分类 */
const ChartCategory: React.FC<IChartCategoryProps> = (props) => {
  const { name, ChartItemsData } = props;
  return (
    <div className={`${prefixCls}-container`}>
      <span className={`${prefixCls}-title`}>{name}</span>
      <div className={`${prefixCls}-items-container`}>
        {ChartItemsData.map((item, index) => {
          const { name, icon } = item;
          return (
            <Tooltip title={name} key={index}>
              <div className="chart-items">
                <span className="chart-items-icon">{icon}</span>
                <span className="chart-items-name">{name}</span>
              </div>
            </Tooltip>
          );
        })}
      </div>
    </div>
  );
};

export default ChartCategory;
