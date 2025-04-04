import { Tooltip } from "antd";
import classNames from "classnames";
import React, { useEffect, useRef } from "react";
import { useDrag } from "react-dnd";

import { CHART_ICON_MAP } from "../../utils";

import "./index.scss";
import { useThemeStore } from "@/stores/useThemeStore";

interface IChartItemIconProps {
  /** 图标名称 */
  name: string;
  /** 图标简称 */
  shortName: string;
  /** 当前展示的icon */
  icon: string;
  /** 鼠标移入 */
  onMouseEnter?: () => void;
  /** 鼠标移出 */
  onMouseLeave?: () => void;
}

/** 图表菜单的图表icon */
const ChartItemIcon: React.FC<IChartItemIconProps> = (props) => {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const { name, icon, shortName, onMouseEnter, onMouseLeave } = props;
  const ref = useRef<HTMLDivElement | null>(null);
  const [, drag] = useDrag({
    type: icon,
    item: {
      chart: icon,
    },
  });
  useEffect(() => {
    drag(ref);
  }, []);
  return (
    <Tooltip title={name}>
      <div
        className={classNames("chart-items", {
          "is-dark-mode": isDarkMode,
        })}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        ref={ref}
      >
        <div className="chart-items-icon">
          <img src={CHART_ICON_MAP[icon]} alt="" height={30} width={30} />
        </div>
        <div className="chart-items-name">{shortName}</div>
      </div>
    </Tooltip>
  );
};

export default ChartItemIcon;
