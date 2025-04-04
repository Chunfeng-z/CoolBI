import ActionPanel from "@comp/dashboard/ActionPanel";
import ComponentPanel from "@comp/dashboard/ComponentPanel";
import DashBoardDesign from "@comp/dashboard/DashBoardDesign/DashBoardDesign";
import LeftChartMenu from "@comp/dashboard/LeftChartMenu";
import RightComponentConfig from "@comp/dashboard/RightComponentConfig";
import RightTheme from "@comp/dashboard/RightTheme";
import { theme } from "antd";
import { isEmpty } from "lodash-es";
import React, { useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const { useToken } = theme;
import "./index.scss";
import useChartStore from "../../stores/useChartStore";

import { getDashboardData } from "@/api/dashboard";
import ErrorBoundary from "@/components/common/ErrorBoundary";
import { useCompPanelStore } from "@/stores/useCompPanel";
import {
  IndicatorCardChartConfig,
  IndicatorTrendChartConfig,
} from "@/types/charts";

const prefixCls = "dashboard-page";

/** 创建、编辑仪表板界面,独立于home页面（独立的功能） */
const DashBoardPage: React.FC = () => {
  const { token } = useToken();
  /** 在当前存在选中图表卡片的时候展示图表配置菜单 */
  const curChartId = useChartStore((state) => state.curChartId);
  const isShowChartConfig = !isEmpty(curChartId);
  const chartMenuStatus = useCompPanelStore((state) => state.chartMenuStatus);
  /** 初始化仪表板的所有图表配置信息 */
  const initChartsConfig = useChartStore((state) => state.initChartsConfig);
  /** 初始进入仪表板界面获取数据 */
  useEffect(() => {
    const getData = async () => {
      const respData = await getDashboardData({
        dashboardId: "dashboard1",
      });
      const chartsConfigList: (
        | IndicatorCardChartConfig
        | IndicatorTrendChartConfig
      )[] = respData.data;
      initChartsConfig(chartsConfigList);
    };
    getData();
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={`${prefixCls}-container`}>
        <div className={`${prefixCls}-action-panel`}>
          <ErrorBoundary>
            <ActionPanel style={{ backgroundColor: token.colorBgContainer }} />
          </ErrorBoundary>
        </div>
        <div className={`${prefixCls}-component-panel`}>
          <ErrorBoundary>
            <ComponentPanel
              style={{ backgroundColor: token.colorBgContainer }}
            />
          </ErrorBoundary>
        </div>
        <div className={`${prefixCls}-right-theme`}>
          <ErrorBoundary>
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
          </ErrorBoundary>
        </div>
        <div className={`${prefixCls}-left-chart-menu`}>
          <ErrorBoundary>
            {chartMenuStatus === "pin" && (
              <LeftChartMenu
                style={{
                  backgroundColor: token.colorBgContainer,
                }}
              />
            )}
          </ErrorBoundary>
        </div>
        <div className={`${prefixCls}-chart-content`}>
          <ErrorBoundary>
            <DashBoardDesign />
          </ErrorBoundary>
        </div>
      </div>
    </DndProvider>
  );
};

export default DashBoardPage;
