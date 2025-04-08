import { BoldOutlined, ItalicOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  ColorPicker,
  InputNumber,
  Radio,
  Select,
  Tooltip,
} from "antd";
import { Color } from "antd/es/color-picker";
import React, { useEffect, useMemo, useState } from "react";
import { useImmer } from "use-immer";

import "./index.scss";
import { ChartTypeEnum } from "@/components/dashboard/utils";
import useChartStore from "@/stores/useChartStore";
import { DataLabelConfig } from "@/types/chartConfigItems/common";

const prefixCls = "data-label";

const defaultDataLabelConfig: DataLabelConfig = {
  isShowDataLabel: true,
  showMode: "auto",
  fontConfig: {
    color: "#000000",
    fontSize: 12,
    isBold: false,
    isItalic: false,
  },
  position: "auto",
};

/** label的位置配置 */
const positionOptions = [
  { value: "auto", label: "自动" },
  { value: "lineTop", label: "线条顶部" },
  { value: "lineBottom", label: "线条底部" },
  { value: "top", label: "顶部" },
  { value: "bottom", label: "底部" },
  { value: "inside", label: "内部" },
  { value: "outside", label: "外部" },
];

/** 数据标签配置值 */
export interface DataLabelValues {
  showAll: boolean;
  position: string;
  color: string;
  fontSize: number;
  bold: boolean;
  italic: boolean;
}

const DataLabel: React.FC = () => {
  const getCurrentChartConfig = useChartStore(
    (state) => state.getCurrentChartConfig
  );
  const curChartId = useChartStore((state) => state.curChartId);
  const [config, updataConfig] = useImmer<DataLabelConfig>(
    defaultDataLabelConfig
  );
  const [chartType, setChartType] = useState<ChartTypeEnum>();
  useEffect(() => {
    const curConfig = getCurrentChartConfig();
    if (!curConfig) {
      console.error("数据标签获取图表配置失败");
      return;
    }
    if (curConfig.type === ChartTypeEnum.line) {
      setChartType(curConfig.type);
      updataConfig(() => curConfig.dataLabelConfig);
    }
  }, [curChartId]);

  // 是否展示数据标签选择组件
  const isShowLabelPositionSelect = useMemo(() => {
    if (chartType === ChartTypeEnum.line) {
      return true;
    }
    return false;
  }, [chartType]);

  // 获取不同图表类型的label位置配置
  const chartPositionOptions = useMemo(() => {
    if (chartType === ChartTypeEnum.line) {
      const supportPosition = ["auto", "lineTop", "lineBottom"];
      return positionOptions.filter((item) =>
        supportPosition.includes(item.value)
      );
    }
  }, [chartType]);

  return (
    <div className={`${prefixCls}-container`}>
      <div className="data-label-row">
        <Checkbox
          checked={config.isShowDataLabel}
          onChange={(e) => {
            updataConfig((draft) => {
              draft.isShowDataLabel = e.target.checked;
            });
          }}
        >
          显示数据标签
        </Checkbox>
      </div>
      <div className="data-label-label">
        <span>标签显示方式</span>
      </div>
      <div className="data-label-row sub-content">
        <Radio.Group
          value={config.showMode}
          disabled={!config.isShowDataLabel}
          onChange={(e) => {
            updataConfig((draft) => {
              draft.showMode = e.target.value;
            });
          }}
          options={[
            {
              value: "auto",
              label: <span>自动</span>,
            },
            {
              value: "all",
              label: <span>全量显示</span>,
            },
          ]}
        />
      </div>

      {isShowLabelPositionSelect && (
        <div className="data-label-row sub-content">
          <span>位置</span>
          <Select
            size="small"
            placement="bottomRight"
            disabled={!config.isShowDataLabel}
            style={{ width: 160 }}
            options={chartPositionOptions}
            value={config.position}
            onSelect={(value) => {
              updataConfig((draft) => {
                draft.position = value;
              });
            }}
          />
        </div>
      )}
      <div className="data-label-row sub-content">
        <span>文本</span>
        <ColorPicker
          size="small"
          value={config.fontConfig.color}
          disabled={!config.isShowDataLabel}
          onChangeComplete={(color: Color) => {
            updataConfig((draft) => {
              draft.fontConfig.color = color.toHexString();
            });
          }}
        />
        <InputNumber
          size="small"
          addonAfter="px"
          min={12}
          max={20}
          defaultValue={12}
          step={1}
          style={{ width: 85 }}
          value={config.fontConfig.fontSize}
          disabled={!config.isShowDataLabel}
          onChange={(value) => {
            updataConfig((draft) => {
              draft.fontConfig.fontSize = Number(value);
            });
          }}
        />
        <Tooltip title="加粗">
          <Button
            type={config.fontConfig.isBold ? "primary" : "text"}
            icon={<BoldOutlined />}
            size="small"
            disabled={!config.isShowDataLabel}
            onClick={() => {
              updataConfig((draft) => {
                draft.fontConfig.isBold = !draft.fontConfig.isBold;
              });
            }}
          />
        </Tooltip>
        <Tooltip title="斜体">
          <Button
            type={config.fontConfig.isItalic ? "primary" : "text"}
            icon={<ItalicOutlined />}
            size="small"
            disabled={!config.isShowDataLabel}
            onClick={() => {
              updataConfig((draft) => {
                draft.fontConfig.isItalic = !draft.fontConfig.isItalic;
              });
            }}
          />
        </Tooltip>
      </div>
    </div>
  );
};

export default DataLabel;
