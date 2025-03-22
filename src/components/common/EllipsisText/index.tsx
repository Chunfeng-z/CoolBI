import { Typography } from "antd";
import React from "react";
const { Text } = Typography;

interface IEllipsisTextProps {
  /** 展示的内容 */
  text: string | number;
  /** 内容宽度 */
  width?: number | string;
  /** 左边距 */
  marginLeft?: number | string;
  /** 是否开启省略，默认开启 */
  ellipsis?: boolean | { tooltip: string | number };
  /** 字体颜色 */
  color?: string;
  /** 类名 */
  className?: string;
  /** 样式,优先级高于前面的样式属性 */
  style?: React.CSSProperties;
}

/** 文本溢出省略与tooltip提示 */
const EllipsisText: React.FC<IEllipsisTextProps> = (props) => {
  const {
    text,
    width,
    marginLeft,
    ellipsis = true,
    color,
    className,
    style,
  } = props;
  const ellipsisConfig =
    typeof ellipsis === "object"
      ? {
          tooltip: ellipsis.tooltip || text, // 直接传递 tooltip, 覆盖默认的text
        }
      : ellipsis
      ? { tooltip: text }
      : false;
  return (
    <Text
      style={{ width, marginLeft, color, ...style }}
      ellipsis={ellipsisConfig}
      className={className}
    >
      {text}
    </Text>
  );
};

export default EllipsisText;
