import { Input } from "antd";
import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import { BranchesOutlined, GatewayOutlined } from "@ant-design/icons";
import ComponentStyleConfig from "./ComponentStyleConfig";
import ComponentWordConfig from "./ComponentWordConfig/index";
import useChartStore from "../../../stores/useChartStore";
const prefixCls = "right-component-config";
const onChange = (key: string) => {
  console.log(key);
};

const items: TabsProps["items"] = [
  {
    key: "1",
    label: "字段",
    children: <ComponentWordConfig />,
    icon: <BranchesOutlined />,
  },
  {
    key: "2",
    label: "样式",
    children: <ComponentStyleConfig />,
    icon: <GatewayOutlined />,
  },
];

/** 仪表板右侧组件的配置菜单 */
const RightComponentConfig: React.FC = () => {
  /** 获取当前选中的图表 */
  const getCurrentChartConfig = useChartStore(
    (state) => state.getCurrentChartConfig
  );
  const curChartId = useChartStore((state) => state.curChartId);
  const setChartsConfig = useChartStore((state) => state.setChartsConfig);
  /** 当前选中图表组件的名称 */
  const [componentName, setComponentName] = useState<string>("");
  useEffect(() => {
    setComponentName(getCurrentChartConfig()?.title || "");
  }, [getCurrentChartConfig, curChartId]);
  /** 更新选中图表组件名称 */
  const updateChartCardTitle = (name: string) => {
    setChartsConfig(curChartId!, { title: name });
  };

  return (
    <div className={`${prefixCls}-container`}>
      <div className={`${prefixCls}-header`}>
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
      </div>
      <div className={`${prefixCls}-content`}>
        <Tabs
          centered
          size="small"
          defaultActiveKey="2"
          items={items}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default RightComponentConfig;
