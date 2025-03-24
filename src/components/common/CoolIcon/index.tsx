import React from "react";

interface CoolIconProps {
  /** 图标大小 */
  size?: number;
  /** 图标颜色 */
  color?: string;
  /** 图标name-即使用的symbol图标的id */
  name: string;
  /** 图标类名 */
  className?: string;
}

/**
 * 系统图标使用方案封装-图标symbol在main.tsx统一引入
 * 对于未填充颜色的图标可以使用color修改，对于已经填充颜色的图标不支持修改
 * 需要修改再添加一个无色的版本
 */
const CoolIcon: React.FC<CoolIconProps> = (props) => {
  const { size, color, name, className } = props;
  // 填充颜色
  const fill = color ?? "currentColor";
  return (
    <svg
      className={className}
      style={{ width: size ?? 16, height: size ?? 16, fill }}
      aria-hidden="true"
    >
      <use xlinkHref={`#${name}`}></use>
    </svg>
  );
};

export default CoolIcon;
