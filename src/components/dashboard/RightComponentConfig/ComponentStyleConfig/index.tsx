import React from "react";
import "./index.scss";

import AuxiliaryConfig from "./AuxiliaryConfig";
import ChartAxis from "./ChartAxis";
import ChartLegend from "./ChartLegend";
import ChartToolTip from "./ChartToolTip";
import DataLabel from "./DataLabel";
import DrawArea from "./DrawArea";
import TitleCard from "./TitleCard";

const prefixCls = "component-style-config";
import CoolCollapse from "@/components/common/CoolCollapse";

const componentStyleItems = [
  {
    key: "1",
    label: "标题与卡片",
    children: (
      <div className="style-item">
        <TitleCard />
      </div>
    ),
  },
  {
    key: "2",
    label: "绘图区域",
    children: (
      <div className="style-item">
        <DrawArea />
      </div>
    ),
  },
  {
    key: "3",
    label: "坐标轴",
    children: (
      <div className="style-item">
        <ChartAxis />
      </div>
    ),
  },
  {
    key: "4",
    label: "图例",
    children: (
      <div className="style-item">
        <ChartLegend />
      </div>
    ),
  },
  {
    key: "5",
    label: "数据标签",
    children: (
      <div className="style-item">
        <DataLabel />
      </div>
    ),
  },
  {
    key: "6",
    label: "工具提示",
    children: (
      <div className="style-item">
        <ChartToolTip />
      </div>
    ),
  },
  {
    key: "7",
    label: "辅助展示",
    children: (
      <div className="style-item">
        <AuxiliaryConfig />
      </div>
    ),
  },
];
/** 组件样式配置 */
const ComponentStyleConfig: React.FC = () => {
  return (
    <div className={`${prefixCls}-container`}>
      <CoolCollapse
        items={componentStyleItems}
        defaultActiveKey={[1, 2, 3, 4, 5, 6, 7]}
      />
    </div>
  );
};

export default ComponentStyleConfig;
