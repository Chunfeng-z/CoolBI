import React from "react";
import "./index.scss";
const prefixCls = "chart-category-items";
/** 图表分类 */
const ChartCategory: React.FC = () => {
  return (
    <div
      className={`${prefixCls}-container`}
      style={{ display: "flex", flexWrap: "wrap", gap: 4 }}
    >
      {Array.from({ length: 10 }, (_, i) => (
        <div
          className="chart-items-container"
          key={i}
          style={{
            padding: 10,
            backgroundColor: "#EEEEEE",
            borderRadius: 5,
          }}
        >
          <div className="chart-items-icon">这是icon</div>
          <div className="chart-items-name">name</div>
        </div>
      ))}
    </div>
  );
};

export default ChartCategory;
