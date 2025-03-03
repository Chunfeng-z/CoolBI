import React from "react";
import "./index.scss";
import CoolCollapse from "../../../common/CoolCollapse";
import TitleCard from "./TitleCard";
import DrawArea from "./DrawArea";
import ChartAxis from "./ChartAxis";
import ChartLegend from "./ChartLegend";
import DataLabel from "./DataLabel";
const prefixCls = "component-style-config";
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
    children: <div className="style-item">背景</div>,
  },
  {
    key: "7",
    label: "系列设置",
    children: <div className="style-item">颜色</div>,
  },
  {
    key: "8",
    label: "辅助展示",
    children: <div className="style-item">颜色</div>,
  },
];
/** 组件样式配置 */
const ComponentStyleConfig: React.FC = () => {
  return (
    <div className={`${prefixCls}-container`}>
      <CoolCollapse
        items={componentStyleItems}
        defaultActiveKey={[1, 2, 3, 4, 5]}
      />
    </div>
  );
};

export default ComponentStyleConfig;
