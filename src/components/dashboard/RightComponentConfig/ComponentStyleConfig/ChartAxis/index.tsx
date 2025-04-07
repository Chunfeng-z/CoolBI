import { ArrowRightOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { Tabs, TabsProps } from "antd";
import React, { useEffect, useState } from "react";

import { ChartTypeEnum } from "../../../utils";

import ChartXAxisComponent from "./ChartXAxisComponent";
import ChartYAxisComponent from "./ChartYAxisComponent";

import "./index.scss";
import useChartStore from "@/stores/useChartStore";
import {
  LineXAxisConfig,
  LineYAxisConfig,
} from "@/types/chartConfigItems/lineItems";
const prefixCls = "chart-axis";

/** 图表坐标轴配置 */
const ChartAxis: React.FC = () => {
  const curChartId = useChartStore((state) => state.curChartId);
  const getCurrentChartConfig = useChartStore(
    (state) => state.getCurrentChartConfig
  );
  /** x,y轴配置 */
  const [xAxisConfig, setXAxisConfig] = useState<LineXAxisConfig>();
  const [yAxisConfig, setYAxisConfig] = useState<LineYAxisConfig>();
  useEffect(() => {
    const curConfig = getCurrentChartConfig();
    if (!curConfig) {
      console.error("坐标轴设置获取图表配置失败");
      return;
    }
    if (curConfig.type === ChartTypeEnum.line) {
      setXAxisConfig(curConfig.axisConfig.xAxisConfig);
      setYAxisConfig(curConfig.axisConfig.yAxisConfig);
    }
  }, [curChartId]);

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "X轴",
      icon: <ArrowRightOutlined />,
      children: xAxisConfig ? (
        <ChartXAxisComponent xAxisConfig={xAxisConfig} />
      ) : (
        <div>获取x轴配置失败</div>
      ),
    },
    {
      key: "2",
      label: "Y轴",
      icon: <ArrowUpOutlined />,
      children: yAxisConfig ? (
        <ChartYAxisComponent yAxisConfig={yAxisConfig} />
      ) : (
        <div>获取y轴配置失败</div>
      ),
    },
  ];
  return (
    <div className={`${prefixCls}-container`}>
      <Tabs defaultActiveKey="1" size="small" items={items} tabBarGutter={15} />
    </div>
  );
};

export default ChartAxis;
