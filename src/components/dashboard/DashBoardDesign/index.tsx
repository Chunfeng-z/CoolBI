import React from "react";
import "./index.scss";
import CoolBarChart from "../../common/Charts/CoolBarChart";
const prefixCls = "dashboard-design";
/** 仪表板设计组件 */
const DashBoardDesign = () => {
  return (
    <div
      className={`${prefixCls}-container`}
      //   style={{ width: "200px", height: "200px" }}
    >
      <CoolBarChart />
    </div>
  );
};

export default DashBoardDesign;
