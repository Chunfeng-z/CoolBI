import { Radio } from "antd";
import React, { useState } from "react";

import type { RadioChangeEvent } from "antd";
const prefixCls = "auxiliary-config";
/** 图表的辅助展示 */
const AuxiliaryConfig: React.FC = () => {
  // 添加状态变量控制展示方式
  const [displayMode, setDisplayMode] = useState<string>("auto");

  // 处理展示方式变化
  const handleDisplayModeChange = (e: RadioChangeEvent) => {
    setDisplayMode(e.target.value);
  };

  return (
    <div className={`${prefixCls}-container`}>
      <div className="auxiliary-config-text-vertical">
        <span>展示方式</span>
        <div className="auxiliary-config-text-right">
          <Radio.Group
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
            value={displayMode}
            onChange={handleDisplayModeChange}
            options={[
              {
                value: "auto",
                label: "智能适配",
              },
              {
                value: "show",
                label: "显示",
              },
              {
                value: "hidden",
                label: "隐藏",
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default AuxiliaryConfig;
