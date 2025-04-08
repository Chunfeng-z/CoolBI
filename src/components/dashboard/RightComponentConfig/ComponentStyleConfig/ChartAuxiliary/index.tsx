import { Radio } from "antd";
import React, { useEffect, useState } from "react";

import type { RadioChangeEvent } from "antd";

const prefixCls = "chart-auxiliary";
import { ChartTypeEnum } from "@/components/dashboard/utils";
import useChartStore from "@/stores/useChartStore";
import { AuxiliaryConfig } from "@/types/chartConfigItems/common";
import "./index.scss";
/** 图表的辅助展示 */
const ChartAuxiliary: React.FC = () => {
  const getCurrentChartConfig = useChartStore(
    (state) => state.getCurrentChartConfig
  );
  const curChartId = useChartStore((state) => state.curChartId);
  const setChartsConfig = useChartStore((state) => state.setChartsConfig);
  const [config, setConfig] = useState<AuxiliaryConfig>();

  useEffect(() => {
    const curConfig = getCurrentChartConfig();
    if (!curConfig) {
      console.error("辅助展示获取图表配置失败");
      return;
    }
    if (curConfig.type === ChartTypeEnum.line) {
      setConfig(curConfig.auxiliaryConfig);
    }
  }, [curChartId]);

  return (
    <div className={`${prefixCls}-container`}>
      <div className="chart-auxiliary-label">
        <span>展示方式</span>
      </div>
      <div className="chart-auxiliary-row-vertical">
        <Radio.Group
          value={config?.dataZoomDisplayMode}
          onChange={(e: RadioChangeEvent) => {
            setConfig({
              ...config,
              dataZoomDisplayMode: e.target.value,
            });
            setChartsConfig(curChartId!, (draft) => {
              if (draft.type === ChartTypeEnum.line) {
                draft.auxiliaryConfig.dataZoomDisplayMode = e.target.value;
              }
            });
          }}
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
  );
};

export default ChartAuxiliary;
