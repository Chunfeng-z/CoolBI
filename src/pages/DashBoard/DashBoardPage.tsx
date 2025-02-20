import React from "react";
import "./index.scss";
import ActionPanel from "../../components/dashboard/ActionPanel";
import ComponentPanel from "../../components/dashboard/ComponentPanel";
import RightTheme from "../../components/dashboard/RightTheme";
import LeftChartMenu from "../../components/dashboard/LeftChartMenu";

const prefixCls = "dashboard-page";
const enum LeftChartMenuState {
  "close" = "close",
  "open" = "open",
  "pin" = "pin",
}
/** 创建、编辑仪表板界面,独立于home页面（独立的功能） */
const DashBoardPage: React.FC = () => {
  /** 左侧图表菜单的显示状态 */
  const [leftChartMenuState, setLeftChartMenuState] =
    React.useState<LeftChartMenuState>(LeftChartMenuState.close);
  return (
    <div className={`${prefixCls}-container`}>
      <div className={`${prefixCls}-action-panel`}>
        <ActionPanel />
      </div>
      <div className={`${prefixCls}-component-panel`}>
        <ComponentPanel />
      </div>
      <div className={`${prefixCls}-right-theme`}>
        <RightTheme />
      </div>
      <div className={`${prefixCls}-left-chart-menu`}>
        <LeftChartMenu />
      </div>
      <div className={`${prefixCls}-chart-content`}> </div>
    </div>
  );
};

export default DashBoardPage;
