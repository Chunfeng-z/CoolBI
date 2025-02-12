import React from "react";
import LeftChartMenu from "../../components/dashboard/LeftChartMenu";
const prefixCls = "dashboard-page";
/** 创建、编辑仪表板界面,独立于home页面（独立的功能） */
const DashBoardPage: React.FC = () => {
  return (
    <div className={`${prefixCls}-container`} style={{ display: "flex" }}>
      <LeftChartMenu />
      DashBoardPage
    </div>
  );
};

export default DashBoardPage;
