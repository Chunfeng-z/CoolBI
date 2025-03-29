import {
  BranchesOutlined,
  BulbOutlined,
  GatewayOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Button, Flex, Input, Tooltip } from "antd";
import { Tabs } from "antd";
import classNames from "classnames";
import React, { useEffect, useMemo, useState } from "react";

import ComponentStyleConfig from "./ComponentStyleConfig";
import ComponentWordConfig from "./ComponentWordConfig/index";
import DataAnalysisConfig from "./DataAnalysisConfig";
import DataSourceConfig from "./DataSourceConfig";

import type { TabsProps } from "antd";

import useChartStore from "@/stores/useChartStore";
const prefixCls = "right-component-config";

// 提取配置项到常量
const CONFIG_TABS = [
  {
    key: "1",
    label: "字段",
    icon: <BranchesOutlined />,
    component: <ComponentWordConfig />,
  },
  {
    key: "2",
    label: "样式",
    icon: <GatewayOutlined />,
    component: <ComponentStyleConfig />,
  },
  {
    key: "3",
    label: "分析",
    icon: <BulbOutlined />,
    component: <DataAnalysisConfig />,
  },
];

interface RightComponentConfigProps {
  /** 组件样式 */
  style?: React.CSSProperties;
}

/** 仪表板右侧组件的配置菜单 */
const RightComponentConfig: React.FC<RightComponentConfigProps> = (props) => {
  const { style } = props;
  /** 获取当前选中的图表 */
  const getCurrentChartConfig = useChartStore(
    (state) => state.getCurrentChartConfig
  );
  const curChartId = useChartStore((state) => state.curChartId);
  const setChartsConfig = useChartStore((state) => state.setChartsConfig);
  /** 当前选中图表组件的名称 */
  const [componentName, setComponentName] = useState<string>("");
  /** 当前选中的tab */
  const [activeTabKey, setActiveTabKey] = useState<string>("2");

  useEffect(() => {
    setComponentName(getCurrentChartConfig()?.title || "");
  }, [getCurrentChartConfig, curChartId]);

  /** 更新选中图表组件名称 */
  const updateChartCardTitle = (name: string) => {
    setChartsConfig(curChartId!, { title: name });
  };

  /** tab切换处理 */
  const handleTabChange = (key: string) => {
    setActiveTabKey(key);
  };

  /** tab渲染配置 */
  const items: TabsProps["items"] = useMemo(
    () =>
      CONFIG_TABS.map((tab) => ({
        key: tab.key,
        label: tab.label,
        children: tab.component,
        icon: tab.icon,
      })),
    []
  );

  /** 组件配置的展开收起状态 */
  const [isCompConfigCollapsed, setIsCompConfigCollapsed] =
    useState<boolean>(false);

  /** 处理配置项点击 */
  const handleConfigOptionClick = (tabKey: string) => {
    setIsCompConfigCollapsed(false);
    setActiveTabKey(tabKey);
  };

  return (
    <div className="setting-panel" style={{ ...style }}>
      <div
        className={classNames(`${prefixCls}-container`, {
          "is-collapsed": isCompConfigCollapsed,
        })}
      >
        <div className={`${prefixCls}-header`}>
          {!isCompConfigCollapsed && (
            <Input
              placeholder="图表组件名称"
              variant="filled"
              value={componentName}
              maxLength={100}
              onChange={(e) => setComponentName(e.target.value)}
              onPressEnter={(e) => {
                updateChartCardTitle((e.target as HTMLInputElement).value);
              }}
            />
          )}
          <Tooltip title={isCompConfigCollapsed ? "展开" : "收起"}>
            <Button
              type="text"
              size="small"
              onClick={() => setIsCompConfigCollapsed(!isCompConfigCollapsed)}
              icon={
                isCompConfigCollapsed ? (
                  <MenuFoldOutlined />
                ) : (
                  <MenuUnfoldOutlined />
                )
              }
            />
          </Tooltip>
          {/* 折叠后展示的组件配置选项 */}
          {isCompConfigCollapsed && (
            <Flex className="collapsed-config-options" vertical align="center">
              {CONFIG_TABS.map((tab) => (
                <span
                  key={tab.key}
                  onClick={() => handleConfigOptionClick(tab.key)}
                >
                  {tab.label}
                </span>
              ))}
            </Flex>
          )}
        </div>
        {!isCompConfigCollapsed && (
          <div className={`${prefixCls}-content`}>
            <Tabs
              centered
              className="right-component-config-tabs"
              size="small"
              activeKey={activeTabKey}
              items={items}
              tabBarGutter={15}
              onChange={handleTabChange}
            />
          </div>
        )}
      </div>
      <DataSourceConfig />
    </div>
  );
};

export default RightComponentConfig;
