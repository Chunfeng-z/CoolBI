import { BoldOutlined, ItalicOutlined } from "@ant-design/icons";
import { Button, ColorPicker, InputNumber, Tooltip } from "antd";
import { AggregationColor } from "antd/es/color-picker/color";
import React, { memo } from "react";
import "./index.scss";
const prefixCls = "font-config-panel";

interface FontConfigPanelProps {
  /** 面板名称 */
  label?: string;
  /** 颜色选择器值 */
  colorValue: string;
  /** 字体大小的值 */
  fontSizeValue: number;
  /** 加粗按钮类型 */
  boldButtonType: "primary" | "text";
  /** 斜体按钮的类型 */
  italicButtonType: "primary" | "text";
  /** 字体大小输入框的宽度 */
  inputWidth?: number;
  /** 开启输入框紧凑模式 */
  compact?: boolean;
  /** 输入框的最大值 */
  maxInputValue?: number;
  /** 输入框的最小值 */
  minInputValue?: number;
  /** 字体配置面板禁用状态 */
  isDisabled?: boolean;
  /** 颜色选择器更新函数 */
  onColorChange: (color: AggregationColor) => void;
  /** 字体大小更新 */
  onFontSizeChange: (value: number | null) => void;
  /** 加粗按钮的点击事件 */
  onBoldClick?: () => void;
  /** 斜体按钮的点击事件 */
  onItalicClick?: () => void;
}
/** 字体配置面板 */
const FontConfigPanel: React.FC<FontConfigPanelProps> = memo((props) => {
  const {
    label = "文本",
    isDisabled,
    colorValue,
    onColorChange,
    fontSizeValue,
    inputWidth = 90,
    compact = false,
    maxInputValue = 20,
    minInputValue = 12,
    onFontSizeChange,
    boldButtonType,
    onBoldClick,
    italicButtonType,
    onItalicClick,
  } = props;
  console.log("re-render");
  return (
    <div className={prefixCls}>
      <span>{label}</span>
      <ColorPicker
        size="small"
        disabled={isDisabled}
        value={colorValue}
        onChangeComplete={onColorChange}
      />
      <InputNumber
        size="small"
        addonAfter={compact ? undefined : "px"}
        min={minInputValue}
        max={maxInputValue}
        defaultValue={12}
        step={1}
        style={{ width: inputWidth }}
        disabled={isDisabled}
        value={fontSizeValue}
        onChange={onFontSizeChange}
      />
      {compact && "px"}
      <Tooltip title="加粗">
        <Button
          type={boldButtonType}
          icon={<BoldOutlined />}
          size="small"
          disabled={isDisabled}
          onClick={onBoldClick}
        />
      </Tooltip>
      <Tooltip title="斜体">
        <Button
          type={italicButtonType}
          icon={<ItalicOutlined />}
          size="small"
          disabled={isDisabled}
          onClick={onItalicClick}
        />
      </Tooltip>
    </div>
  );
});

export default FontConfigPanel;
