import {
  DownOutlined,
  UpOutlined,
  LineChartOutlined,
  TableOutlined,
} from "@ant-design/icons";
import { Button, Tooltip, Dropdown, MenuProps } from "antd";
import classNames from "classnames";
import React, { useState } from "react";

const prefixCls = "component-panel";
enum ScaleValue {
  "level1" = "25%",
  "level2" = "50%",
  "level3" = "75%",
  "level4" = "100%",
}
const items: MenuProps["items"] = [
  {
    key: "1",
    label: <span>{ScaleValue.level1}</span>,
  },
  {
    key: "2",
    label: <span>{ScaleValue.level2}</span>,
  },
  {
    key: "3",
    label: <span>{ScaleValue.level3}</span>,
  },
  {
    key: "4",
    label: <span>{ScaleValue.level4}</span>,
  },
];
/** 仪表板-组件操作菜单 */
const ComponentPanel: React.FC = () => {
  /** 图表菜单的显示状态 */
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  /** 当前菜单缩放倍率 */
  const [scale, setScale] = useState<ScaleValue>(ScaleValue.level4);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className={`${prefixCls}-container`}>
      <div className={`${prefixCls}-left`}>
        <div
          className={classNames(`${prefixCls}-add-chart-btn`, {
            selected: isMenuOpen,
          })}
          onClick={toggleMenu}
        >
          <LineChartOutlined />
          <span className={`${prefixCls}-btn-text`}>添加图表</span>
          {isMenuOpen ? <UpOutlined /> : <DownOutlined />}
        </div>
      </div>
      <div className={`${prefixCls}-right`}>
        <Tooltip title="布局缩放">
          <Dropdown menu={{ items }} trigger={["click"]}>
            <Button type="text" size="small">
              {scale}
              <DownOutlined />
            </Button>
          </Dropdown>
        </Tooltip>
        <Tooltip title="页面栅格设置">
          <Button type="text" icon={<TableOutlined />} size="small"></Button>
        </Tooltip>
      </div>
    </div>
  );
};

export default ComponentPanel;
