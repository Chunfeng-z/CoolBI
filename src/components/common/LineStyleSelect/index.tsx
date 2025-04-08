import { Select } from "antd";
import React from "react";
import "./index.scss";
const prefixCls = "line-style-select";

interface LineStyleSelectProps {
  value: "solid" | "dashed" | undefined;
  disabled?: boolean;
  onDataChange?: (value: "solid" | "dashed") => void;
  style?: React.CSSProperties;
}

/** 线条样式选择组件 */
const LineStyleSelect: React.FC<LineStyleSelectProps> = (props) => {
  const { style, value, disabled, onDataChange } = props;
  return (
    <Select
      size="small"
      style={{ width: 100, ...style }}
      className={prefixCls}
      disabled={disabled}
      value={value}
      onChange={onDataChange}
      getPopupContainer={(triggerNode) => triggerNode.parentElement!}
      options={[
        {
          value: "solid",
          label: (
            <div className="line-style-select-item">
              <div className="line-style-select-line-solid" />
            </div>
          ),
        },
        {
          value: "dashed",
          label: (
            <div className="line-style-select-item">
              <div className="line-style-select-line-dashed" />
            </div>
          ),
        },
      ]}
    />
  );
};

export default LineStyleSelect;
