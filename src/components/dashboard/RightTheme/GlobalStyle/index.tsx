import { InfoCircleOutlined } from "@ant-design/icons";
import {
  InputNumber,
  Radio,
  RadioChangeEvent,
  SelectProps,
  theme,
  Tooltip,
} from "antd";
import React, { useCallback, useState } from "react";
import { useImmer } from "use-immer";

import { CardRadius, CardSpace, Theme } from "../../utils";

import "./index.scss";
import CombinePanel, {
  CardPaddingValues,
} from "@/components/common/CombinePanel";
import CoolIcon from "@/components/common/CoolIcon";

const prefixCls = "right-theme-global-style";

const options: SelectProps["options"] = [
  { value: "gold" },
  { value: "lime" },
  { value: "green" },
  { value: "cyan" },
];
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
/** 主题模式选项 */
const themeOptions = [
  { value: Theme.lightTheme, label: "亮色模式" },
  { value: Theme.darkTheme, label: "暗色模式" },
];
/** 卡片间距的选项 */
const cardSpaceOptions = [
  { value: CardSpace.compact, label: "紧凑" },
  { value: CardSpace.normal, label: "正常" },
  { value: CardSpace.custom, label: "自定义" },
];
/** 仪表板全局样式设置菜单 */
const GlobalStyle: React.FC = () => {
  const { token } = theme.useToken();
  /** 当前选中的颜色主题 */
  const [themeColor, setThemeColor] = useState<Theme>(Theme.lightTheme);

  const handleThemeColorChange = (e: RadioChangeEvent) => {
    setThemeColor(e.target.value);
  };
  /** 当前选中的卡片圆角模式 */
  const [cardRadius, setCardRadius] = useState<CardRadius>(CardRadius.noRadius);

  const handleCardRadiusChange = (e: RadioChangeEvent) => {
    setCardRadius(e.target.value);
  };
  /** 当前选中的卡片间距 */
  const [cardSpace, setCardSpace] = useState<CardSpace>(CardSpace.custom);

  const handleCardSpaceChange = (e: RadioChangeEvent) => {
    setCardSpace(e.target.value);
  };

  /** 卡片间间距状态 */
  const [cardGap, setCardGap] = useImmer({
    rowGap: 12,
    columnGap: 12,
  });

  /** 卡片内边距状态 */
  const [cardPadding, setCardPadding] = useState<CardPaddingValues>({
    top: 12,
    bottom: 12,
    left: 12,
    right: 12,
  });

  /** 处理卡片间间距的变化 */
  const handleCardGapChange = (
    type: "rowGap" | "columnGap",
    value: number | null
  ) => {
    if (value !== null) {
      setCardGap((draft) => {
        draft[type] = value;
      });
    }
  };

  /** 处理card内边距变化 */
  const handlePaddingChange = useCallback((padding: CardPaddingValues) => {
    setCardPadding(padding);
  }, []);

  return (
    <div className={`${prefixCls}-container`}>
      <div className="global-style-row">
        <div className="global-style-row-label">颜色主题</div>
        <div className="theme-mode-radio">
          <Radio.Group
            options={themeOptions}
            value={themeColor}
            onChange={handleThemeColorChange}
          />
        </div>
      </div>
      <div className="global-style-row">
        <div className="global-style-row-label">卡片圆角</div>
        <div className="card-radius-radio">
          <Radio.Group
            options={cardRadiusOptions}
            value={cardRadius}
            onChange={handleCardRadiusChange}
          />
        </div>
      </div>
      <div className="global-style-row">
        <div className="global-style-row-label">卡片间距</div>
        <div className="card-space-radio">
          <Radio.Group
            options={cardSpaceOptions}
            value={cardSpace}
            onChange={handleCardSpaceChange}
          />
        </div>
      </div>
      {cardSpace === CardSpace.custom && (
        <div
          className="card-space-custom"
          style={{ backgroundColor: token.colorBgLayout }}
        >
          <div className="global-style-row">
            <div className="global-style-row-label">卡片间间距</div>
            <div className="card-space-row-column">
              <div className="layout-menu-item">
                <span>行间距</span>
                <InputNumber
                  size="small"
                  min={0}
                  max={20}
                  value={cardGap.rowGap}
                  onChange={(value) => handleCardGapChange("rowGap", value)}
                  style={{ width: 90 }}
                  addonAfter="px"
                />
              </div>
              <div className="layout-menu-item">
                <span>列间距</span>
                <InputNumber
                  size="small"
                  min={0}
                  max={20}
                  value={cardGap.columnGap}
                  onChange={(value) => handleCardGapChange("columnGap", value)}
                  style={{ width: 90 }}
                  addonAfter="px"
                />
              </div>
            </div>
          </div>
          <div className="global-style-row">
            <div className="global-style-row-label">卡片内边距</div>
            <Tooltip title="单位：px">
              <InfoCircleOutlined />
            </Tooltip>
          </div>
          <div className="global-style-card-inner-padding">
            <div className="inner-padding-icon">
              <CoolIcon name="icon-inner-padding" size={34} />
            </div>
            <CombinePanel
              paddingValues={cardPadding}
              onChange={handlePaddingChange}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default GlobalStyle;
