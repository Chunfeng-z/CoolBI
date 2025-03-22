import {
  DownOutlined,
  UpOutlined,
  LineChartOutlined,
  TableOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import {
  Button,
  Tooltip,
  Dropdown,
  MenuProps,
  Select,
  InputNumber,
} from "antd";
import classNames from "classnames";
import React, { useState } from "react";

import { pageRasterOptions as options } from "../utils";
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

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    const selectedScale =
      ScaleValue[`level${e.key}` as keyof typeof ScaleValue];
    setScale(selectedScale);
  };
  /** 页面栅格设置的显示状态 */
  const [isPageRasterSettingOpen, setIsPageRasterSettingOpen] = useState(false);
  /** 页面栅格显隐设置 */
  const handlePageRasterClick = () => {
    setIsPageRasterSettingOpen(!isPageRasterSettingOpen);
  };
  /** 页面栅格列数控制 */
  const handleRasterNumberChange = (value: string) => {
    console.log(value);
  };
  const pageRasterOptions = options.map((item) => ({
    value: item,
    label: item.toString(),
  }));

  return (
    <div className={`${prefixCls}-container`}>
      {isPageRasterSettingOpen ? (
        <div className={`${prefixCls}-layout-menu`}>
          <div className="layout-menu-label">页面栅格设置</div>
          <div className="layout-menu">
            <div className="layout-menu-item">
              栅格列数
              <Tooltip title="在栅格布局下，每个卡片的宽度由栅格列数决定，栅格列数越多，卡片宽度可设置的颗粒度越细。">
                <InfoCircleOutlined />
              </Tooltip>
              <Select
                size="small"
                defaultValue="12"
                style={{ width: 60 }}
                variant="filled"
                onChange={handleRasterNumberChange}
                options={pageRasterOptions}
              />
            </div>
            <div className="layout-menu-item">
              列间距
              <InputNumber
                size="small"
                variant="filled"
                min={0}
                max={30}
                defaultValue={8}
                style={{ width: 90 }}
                addonAfter="px"
              />
            </div>
            <div className="layout-menu-item">
              行间距
              <InputNumber
                size="small"
                variant="filled"
                min={0}
                max={30}
                defaultValue={8}
                style={{ width: 90 }}
                addonAfter="px"
              />
            </div>
          </div>
          <div className="layout-button">
            <Button
              size="small"
              type="primary"
              variant="solid"
              onClick={handlePageRasterClick}
            >
              完成
            </Button>
          </div>
        </div>
      ) : (
        <>
          <div className={`${prefixCls}-left`}>
            <div
              className={classNames(`${prefixCls}-add-chart-btn`, {
                selected: isMenuOpen,
              })}
              onClick={toggleMenu}
            >
              <LineChartOutlined />
              <span className={`${prefixCls}-btn-text`}>添加图表</span>
              {isMenuOpen ? (
                <UpOutlined style={{ fontSize: 12 }} />
              ) : (
                <DownOutlined style={{ fontSize: 12 }} />
              )}
            </div>
          </div>
          <div className={`${prefixCls}-right`}>
            <Tooltip title="布局缩放">
              <Dropdown
                menu={{ items, onClick: handleMenuClick }}
                trigger={["click"]}
              >
                <Button
                  type="text"
                  size="small"
                  icon={<DownOutlined />}
                  iconPosition="end"
                >
                  {scale}
                </Button>
              </Dropdown>
            </Tooltip>
            <Tooltip title="页面栅格设置">
              <Button
                type="text"
                icon={<TableOutlined />}
                size="small"
                onClick={handlePageRasterClick}
              />
            </Tooltip>
          </div>
        </>
      )}
    </div>
  );
};

export default ComponentPanel;
