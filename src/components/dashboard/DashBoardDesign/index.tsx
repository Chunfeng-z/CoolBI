import React from "react";
import "./index.scss";
import CoolBarChart from "../../common/Charts/CoolBarChart";
import ChartCard from "./ChartCard/ChartCard";
import CoolLineChart from "../../common/Charts/CoolLineChart";
const prefixCls = "dashboard-design";
/** 仪表板设计组件 */
const DashBoardDesign = () => {
  return (
    <div className={`${prefixCls}-container`}>
      <ChartCard cardTitle="柱状图">
        <CoolBarChart />
      </ChartCard>
      <ChartCard cardTitle="xxxx">
        <CoolLineChart />
      </ChartCard>
    </div>
  );
};

export default DashBoardDesign;
