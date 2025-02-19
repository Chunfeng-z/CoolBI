import React, { useState } from "react";
import "./index.scss";
import { Radio, RadioChangeEvent, Select, SelectProps, Tooltip } from "antd";
import { CardRadius, CardSpace, Theme } from "../../utils";
import { InfoCircleOutlined } from "@ant-design/icons";
const prefixCls = "right-theme-global-style";
const globalItem = "global-style-item";
const itemTitle = "global-style-item-title";

const options: SelectProps["options"] = [
  { value: "gold" },
  { value: "lime" },
  { value: "green" },
  { value: "cyan" },
];
/** 仪表板全局样式设置菜单 */
const GlobalStyle: React.FC = () => {
  /** 当前选中的颜色主题 */
  const [themeColor, setThemeColor] = useState<Theme>(Theme.lightTheme);
  /** 主题模式选项 */
  const themeOptions = [
    { value: Theme.lightTheme, label: "亮色模式" },
    { value: Theme.darkTheme, label: "暗色模式" },
  ];
  const handleThemeColorChange = (e: RadioChangeEvent) => {
    setThemeColor(e.target.value);
  };
  /** 当前选中的卡片圆角模式 */
  const [cardRadius, setCardRadius] = useState<CardRadius>(CardRadius.noRadius);
  /** 卡片圆角的选择项 */
  const cardRadiusOptions = [
    { value: CardRadius.noRadius, label: "无" },
    {
      value: CardRadius.small,
      label: "小",
    },
    {
      value: CardRadius.middle,
      label: "中",
    },
    {
      value: CardRadius.large,
      label: "大",
    },
  ];
  const handleCardRadiusChange = (e: RadioChangeEvent) => {
    setCardRadius(e.target.value);
  };
  /** 当前选中的卡片间距 */
  const [cardSpace, setCardSpace] = useState<CardSpace>(CardSpace.compact);
  /** 卡片间距的选项 */
  const cardSpaceOptions = [
    { value: CardSpace.compact, label: "紧凑" },
    { value: CardSpace.normal, label: "正常" },
    { value: CardSpace.custom, label: "自定义" },
  ];
  const handleCardSpaceChange = (e: RadioChangeEvent) => {
    setCardSpace(e.target.value);
  };
  return (
    <div className={`${prefixCls}-container`}>
      <div className={`${globalItem} theme-mode`}>
        <div className={itemTitle}>颜色主题</div>
        <div className="theme-mode-radio">
          <Radio.Group
            options={themeOptions}
            value={themeColor}
            onChange={handleThemeColorChange}
          />
        </div>
      </div>
      <div className={`${globalItem} semantic-color`}>
        <div className={itemTitle}>
          语意色
          <Tooltip title="全局控制仪表板中涨跌、正负、状态等含义的配色，作用范围包括图标、数据条、文字颜色等。">
            <InfoCircleOutlined />
          </Tooltip>
        </div>
        <div className="semantic-color-select">
          {/* <Select
            mode="multiple"
            tagRender={tagRender}
            defaultValue={["gold", "cyan"]}
            style={{ width: "100%" }}
            options={options}
          /> */}
        </div>
      </div>
      <div className={`${globalItem} card-radius`}>
        <div className={itemTitle}>卡片圆角</div>
        <div className="card-radius-radio">
          <Radio.Group
            options={cardRadiusOptions}
            value={cardRadius}
            onChange={handleCardRadiusChange}
          />
        </div>
      </div>
      <div className={`${globalItem} card-space`}>
        <div className={itemTitle}>卡片间距</div>
        <div className="card-space-radio">
          <Radio.Group
            options={cardSpaceOptions}
            value={cardSpace}
            onChange={handleCardSpaceChange}
          />
        </div>
      </div>
      {cardSpace === CardSpace.custom && (
        <div className="card-space-custom">
          <div className={`${globalItem} space-between-cards`}>
            <div className={itemTitle}>卡片间间距</div>
            <div className="card-space-row-column"></div>
          </div>
          <div className={`${globalItem} card-inner-space`}>
            <div className={itemTitle}>卡片内边距</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GlobalStyle;
