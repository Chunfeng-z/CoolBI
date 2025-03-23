import ActionPanel from "@comp/dashboard/ActionPanel";
import ComponentPanel from "@comp/dashboard/ComponentPanel";
import DashBoardDesign from "@comp/dashboard/DashBoardDesign/DashBoardDesign";
import LeftChartMenu from "@comp/dashboard/LeftChartMenu";
import RightComponentConfig from "@comp/dashboard/RightComponentConfig";
import RightTheme from "@comp/dashboard/RightTheme";
import { theme } from "antd";
import { isEmpty } from "lodash-es";
import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const { useToken } = theme;
import "./index.scss";
import useChartStore from "../../stores/useChartStore";

const prefixCls = "dashboard-page";
const enum LeftChartMenuState {
  "close" = "close",
  "open" = "open",
  "pin" = "pin",
}
/** 创建、编辑仪表板界面,独立于home页面（独立的功能） */
const DashBoardPage: React.FC = () => {
  const { token } = useToken();
  /** 左侧图表菜单的显示状态 */
  // const [leftChartMenuState, setLeftChartMenuState] =
  //   useState<LeftChartMenuState>(LeftChartMenuState.close);
  /** 在当前存在选中图表卡片的时候展示图表配置菜单 */
  const curChartId = useChartStore((state) => state.curChartId);
  const isShowChartConfig = !isEmpty(curChartId);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={`${prefixCls}-container`}>
        <div className={`${prefixCls}-action-panel`}>
          <ActionPanel style={{ backgroundColor: token.colorBgContainer }} />
        </div>
        <div className={`${prefixCls}-component-panel`}>
          <ComponentPanel style={{ backgroundColor: token.colorBgContainer }} />
        </div>
        <div className={`${prefixCls}-right-theme`}>
          {isShowChartConfig ? (
            <RightComponentConfig
              style={{
                backgroundColor: token.colorBgContainer,
              }}
            />
          ) : (
            <RightTheme
              style={{
                backgroundColor: token.colorBgContainer,
              }}
            />
          )}
        </div>
        <div className={`${prefixCls}-left-chart-menu`}>
          <LeftChartMenu
            style={{
              backgroundColor: token.colorBgContainer,
            }}
          />
        </div>
        <div className={`${prefixCls}-chart-content`}>
          <DashBoardDesign />
        </div>
      </div>
    </DndProvider>
  );
};

export default DashBoardPage;
