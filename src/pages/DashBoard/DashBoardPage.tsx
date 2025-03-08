import React, { useState } from "react";
import "./index.scss";
import ActionPanel from "../../components/dashboard/ActionPanel";
import ComponentPanel from "../../components/dashboard/ComponentPanel";
import RightTheme from "../../components/dashboard/RightTheme";
import LeftChartMenu from "../../components/dashboard/LeftChartMenu";
import DashBoardDesign from "../../components/dashboard/DashBoardDesign/DashBoardDesign";
import RightComponentConfig from "../../components/dashboard/RightComponentConfig";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import useChartStore from "../../stores/useChartStore";
import { isEmpty } from "lodash-es";

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
    useState<LeftChartMenuState>(LeftChartMenuState.close);
  /** 在当前存在选中图表卡片的时候展示图表配置菜单 */
  const curChartId = useChartStore((state) => state.curChartId);
  const isShowChartConfig = !isEmpty(curChartId);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={`${prefixCls}-container`}>
        <div className={`${prefixCls}-action-panel`}>
          <ActionPanel />
        </div>
        <div className={`${prefixCls}-component-panel`}>
          <ComponentPanel />
        </div>
        <div className={`${prefixCls}-right-theme`}>
          {isShowChartConfig ? <RightComponentConfig /> : <RightTheme />}
        </div>
        <div className={`${prefixCls}-left-chart-menu`}>
          <LeftChartMenu />
        </div>
        <div className={`${prefixCls}-chart-content`}>
          <DashBoardDesign />
        </div>
      </div>
    </DndProvider>
  );
};

export default DashBoardPage;
