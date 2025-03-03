import React from "react";
import "./index.scss";
import ActionPanel from "../../components/dashboard/ActionPanel";
import ComponentPanel from "../../components/dashboard/ComponentPanel";
import RightTheme from "../../components/dashboard/RightTheme";
import LeftChartMenu from "../../components/dashboard/LeftChartMenu";
import DashBoardDesign from "../../components/dashboard/DashBoardDesign";
import RightComponentConfig from "../../components/dashboard/RightComponentConfig";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

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
  /** 显示图表组件的配置菜单 */
  const [isShowChartConfig, setIsShowChartConfig] = React.useState(true);
  return (
    <DndProvider backend={HTML5Backend}>
      <div className={`${prefixCls}-container`}>
        <div className={`${prefixCls}-action-panel`}>
          <ActionPanel
            onShowComponentConfig={() => {
              setIsShowChartConfig(!isShowChartConfig);
            }}
          />
        </div>
        <div className={`${prefixCls}-component-panel`}>
          <ComponentPanel />
        </div>
        <div className={`${prefixCls}-right-theme`}>
          {!isShowChartConfig && <RightTheme />}
          {isShowChartConfig && <RightComponentConfig />}
        </div>
        <div className={`${prefixCls}-left-chart-menu`}>
          <LeftChartMenu />
        </div>
        <div className={`${prefixCls}-chart-content`}>
          <DashBoardDesign />
        </div>
      </div>{" "}
    </DndProvider>
  );
};

export default DashBoardPage;
