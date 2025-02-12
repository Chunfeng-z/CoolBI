import { Button, Flex } from "antd";
import React from "react";
const prefixCls = "left-chart-menu";
/** 仪表板左侧的图表菜单 */
const LeftChartMenu: React.FC = () => {
  return (
    <div
      className={`${prefixCls}-container`}
      style={{
        width: 300,
        height: "100vh",
        border: "1px solid red",
        padding: 10,
      }}
    >
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
            <Flex wrap gap="small">
              {Array.from({ length: 10 }, (_, i) => (
                <div
                  className="chart-items-container"
                  key={i}
                  style={{ padding: 10, backgroundColor: "gray" }}
                >
                  <div className="chart-items-icon">这是icon</div>
                  <div className="chart-items-name">name</div>
                </div>
              ))}
            </Flex>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftChartMenu;
