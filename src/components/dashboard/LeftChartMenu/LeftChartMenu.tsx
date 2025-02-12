import React from "react";
import ChartCategory from "./ChartCategory";
const prefixCls = "left-chart-menu";
/** 仪表板左侧的图表菜单 */
const LeftChartMenu: React.FC = () => {
  return (
    <div className={`${prefixCls}-scroll-wrapper`}>
      <div className={`${prefixCls}-container`}>
        <div className={`${prefixCls}-title`}>{"图表组件"}</div>
        <div className={`${prefixCls}-body`}>
          <div className="chart-category" style={{ margin: "10px 0" }}>
            <span className="chart-category-title">{"线/面图"}</span>
            <div
              className="chart-category-body"
              style={{
                marginTop: 5,
                width: "100%",
                backgroundColor: "lightblue",
              }}
            >
              <ChartCategory />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftChartMenu;
