import {
  BoldOutlined,
  InfoCircleOutlined,
  ItalicOutlined,
} from "@ant-design/icons";
import {
  Button,
  Checkbox,
  ColorPicker,
  InputNumber,
  Radio,
  Tooltip,
} from "antd";
import { Color } from "antd/es/color-picker";
import React from "react";

const prefixCls = "chart-tooltip";

/** 提示框配置接口 */
export interface ChartToolTipConfig {
  /** 展示方式: 'afterTitle'(按照单数据点) 或 'belowTitle'(按照系列) */
  displayMode: "afterTitle" | "belowTitle";
  /** 是否显示占比 */
  showPercentage: boolean;
  /** 背景颜色 */
  backgroundColor: Color;
  /** 文本颜色 */
  textColor: Color;
  /** 文本大小(px) */
  fontSize: number;
  /** 是否加粗 */
  isBold: boolean;
  /** 是否斜体 */
  isItalic: boolean;
}

interface ChartToolTipProps {
  /** 提示框配置 */
  config: ChartToolTipConfig;
  /** 配置变更回调 */
  onChange: (newConfig: ChartToolTipConfig) => void;
}

/** 图表的提示配置 */
const ChartToolTip: React.FC<ChartToolTipProps> = (props) => {
  const {
    config = {
      displayMode: "afterTitle",
      showPercentage: false,
      backgroundColor: "#ffffff",
      textColor: "#000000",
      fontSize: 12,
      isBold: false,
      isItalic: false,
    },
    onChange,
  } = props;
  // 处理配置更新的工具函数
  const updateConfig = <K extends keyof ChartToolTipConfig>(
    key: K,
    value: ChartToolTipConfig[K]
  ) => {
    if (onChange) {
      onChange({
        ...config,
        [key]: value,
      });
    }
  };

  return (
    <div className={`${prefixCls}-container`}>
      <div className="chart-tooltip-text-vertical">
        <span>展示方式</span>
        <div className="chart-tooltip-right">
          <Radio.Group
            value={config.displayMode}
            onChange={(e) => updateConfig("displayMode", e.target.value)}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
            options={[
              {
                value: "afterTitle",
                label: (
                  <div>
                    <span>按照单数据点</span>
                    <Tooltip
                      title="展示鼠标浮选的数据点所关联的数据"
                      styles={{
                        root: {
                          width: 150,
                        },
                      }}
                    >
                      <InfoCircleOutlined style={{ marginLeft: 4 }} />
                    </Tooltip>
                  </div>
                ),
              },
              {
                value: "belowTitle",
                label: (
                  <div>
                    <span>按照系列</span>
                    <Tooltip
                      title="展示鼠标浮选的数据点所在维值的数据"
                      styles={{
                        root: {
                          width: 150,
                        },
                      }}
                    >
                      <InfoCircleOutlined style={{ marginLeft: 4 }} />
                    </Tooltip>
                  </div>
                ),
              },
            ]}
          />
        </div>
      </div>
      <div className="chart-tooltip-text-simple">
        <span>内容</span>
        <Checkbox
          checked={config.showPercentage}
          onChange={(e) => updateConfig("showPercentage", e.target.checked)}
        >
          占比
        </Checkbox>
      </div>
      <div className="chart-tooltip-text-simple">
        <span>背景色</span>
        <ColorPicker
          size="small"
          value={config.backgroundColor}
          onChange={(color) => updateConfig("backgroundColor", color)}
        />
      </div>
      <div className="chart-tooltip-text-simple">
        <span>文本</span>
        <ColorPicker
          size="small"
          value={config.textColor}
          onChange={(color) => updateConfig("textColor", color)}
        />
        <InputNumber
          size="small"
          addonAfter="px"
          min={0}
          max={20}
          value={config.fontSize}
          onChange={(value) => updateConfig("fontSize", value || 12)}
          step={1}
          changeOnWheel
          style={{ width: 100 }}
        />
        <Tooltip title="加粗">
          <Button
            type={config.isBold ? "primary" : "text"}
            icon={<BoldOutlined />}
            size="small"
            onClick={() => updateConfig("isBold", !config.isBold)}
          />
        </Tooltip>
        <Tooltip title="斜体">
          <Button
            type={config.isItalic ? "primary" : "text"}
            icon={<ItalicOutlined />}
            size="small"
            onClick={() => updateConfig("isItalic", !config.isItalic)}
          />
        </Tooltip>
      </div>
    </div>
  );
};

export default ChartToolTip;
