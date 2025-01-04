import React from "react";
import { Typography } from "antd";
const { Text } = Typography;

interface EllipsisTextProps {
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
}

const EllipsisText: React.FC<EllipsisTextProps> = (props) => {
  const { text, width, marginLeft, ellipsis = true, color } = props;
  const ellipsisConfig =
    typeof ellipsis === "object"
      ? {
          tooltip: ellipsis.tooltip || text, // 直接传递 tooltip, 覆盖默认的text
        }
      : ellipsis
      ? { tooltip: text }
      : false;
  return (
    <Text style={{ width, marginLeft, color }} ellipsis={ellipsisConfig}>
      {text}
    </Text>
  );
};

export default EllipsisText;
