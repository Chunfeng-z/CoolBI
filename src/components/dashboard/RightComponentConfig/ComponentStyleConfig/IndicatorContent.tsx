import {
  AlignCenterOutlined,
  AlignLeftOutlined,
  BoldOutlined,
  ItalicOutlined,
} from "@ant-design/icons";
import { Button, ColorPicker, InputNumber, Radio, Switch, Tooltip } from "antd";
import React, { useEffect, useState } from "react";

import useChartStore, { IndicatorTrendConfig } from "@/stores/useChartStore";

const prefixCls = "indicator-content";

/** 指标内容配置接口 */
interface IndicatorContentConfig {
  /** 内容在指标块中的位置 */
  contentPosition: "left" | "center";
  /** 指标值行间距 */
  lineSpacing: "normal" | "small";
  /** 是否启用字号设置
   *  - true: 启用时支持自定义设置
   *  - false: 禁用时恢复默认配置
   */
  enableFontSetting: boolean;
  /** 指标名称样式 */
  nameStyle: {
    color: string;
    fontSize: number;
    isBold: boolean;
    isItalic: boolean;
  };
  /** 指标值样式 */
  valueStyle: {
    color: string;
    fontSize: number;
    isBold: boolean;
    isItalic: boolean;
  };
}

/** 默认配置 */
const defaultConfig: IndicatorContentConfig = {
  contentPosition: "left",
  lineSpacing: "small",
  enableFontSetting: true,
  nameStyle: {
    color: "#000000",
    fontSize: 14,
    isBold: false,
    isItalic: false,
  },
  valueStyle: {
    color: "#000000",
    fontSize: 32,
    isBold: false,
    isItalic: false,
  },
};

/** 指标内容配置 */
const IndicatorContent: React.FC = () => {
  /** 当前选中图表的所有配置信息 */
  const getCurrentChartConfig = useChartStore(
    (state) => state.getCurrentChartConfig
  );
  /** 当前选中图表的id信息 */
  const curChartId = useChartStore((state) => state.curChartId);
  /** 更新图表配置 */
  const setChartsConfig = useChartStore((state) => state.setChartsConfig);

  /** 内部状态 */
  const [config, setConfig] = useState<IndicatorContentConfig>(defaultConfig);

  // 获取当前选中图表的配置
  useEffect(() => {
    const curConfig = getCurrentChartConfig() as IndicatorTrendConfig;
    if (curConfig) {
      setConfig({
        ...config,
        contentPosition:
          curConfig.indicatorContentPosition ?? defaultConfig.contentPosition,
      });
    }
  }, [curChartId]);

  /** 更新配置的工具函数 */
  const updateConfig = (update: Partial<IndicatorContentConfig>) => {
    if (!("enableFontSetting" in update) || update.enableFontSetting) {
      const newConfig = {
        ...config,
        ...update,
      };
      setConfig(newConfig);
    } else if ("enableFontSetting" in update && !update.enableFontSetting) {
      const newConfig = {
        ...config,
        ...update,
        nameStyle: defaultConfig.nameStyle,
        valueStyle: defaultConfig.valueStyle,
      };
      setConfig(newConfig);
    }
    switch (Object.keys(update)[0]) {
      case "contentPosition":
        setChartsConfig(curChartId!, {
          indicatorContentPosition: update.contentPosition,
        });
        break;
      case "lineSpacing":
        setChartsConfig(curChartId!, {
          indicatorValueLineSpace: update.lineSpacing,
        });
        break;
      case "enableFontSetting": {
        // 禁用字号设置，则恢复默认配置
        if (!update.enableFontSetting) {
          setChartsConfig(curChartId!, {
            indicatorNameFontConfig: defaultConfig.nameStyle,
            indicatorValueFontConfig: defaultConfig.valueStyle,
          });
        }
        break;
      }
    }
  };

  /** 更新指标名称样式 */
  const updateNameStyle = (
    update: Partial<IndicatorContentConfig["nameStyle"]>
  ) => {
    const newNameStyle = {
      ...config.nameStyle,
      ...update,
    };
    updateConfig({ nameStyle: newNameStyle });
    setChartsConfig(curChartId!, {
      indicatorNameFontConfig: newNameStyle,
    });
  };

  /** 更新指标值样式 */
  const updateValueStyle = (
    update: Partial<IndicatorContentConfig["valueStyle"]>
  ) => {
    const newValueStyle = {
      ...config.valueStyle,
      ...update,
    };
    updateConfig({ valueStyle: newValueStyle });
    setChartsConfig(curChartId!, {
      indicatorValueFontConfig: newValueStyle,
    });
  };

  return (
    <div className={`${prefixCls}-container`}>
      <div className="indicator-content-label">
        <span>内容在指标块中的位置</span>
      </div>
      <div className="indicator-content-row-vertical sub-content">
        <Radio.Group
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
          value={config.contentPosition}
          onChange={(e) => updateConfig({ contentPosition: e.target.value })}
          options={[
            {
              value: "left",
              label: (
                <div>
                  <AlignLeftOutlined style={{ marginRight: 5 }} />
                  <span>横向居左</span>
                </div>
              ),
            },
            {
              value: "center",
              label: (
                <div>
                  <AlignCenterOutlined
                    style={{
                      marginRight: 5,
                    }}
                  />
                  <span>横向居中</span>
                </div>
              ),
            },
          ]}
        />
      </div>
      <div className="indicator-content-row-vertical">
        <span>指标值行间距</span>
        <Radio.Group
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
          value={config.lineSpacing}
          onChange={(e) => updateConfig({ lineSpacing: e.target.value })}
          options={[
            {
              value: "normal",
              label: <span>适中</span>,
            },
            {
              value: "small",
              label: <span>紧凑</span>,
            },
          ]}
        />
      </div>
      <div className="indicator-content-fontsize-config-wrapper">
        <div className="fontsize-config-header">
          <span>字号设置</span>
          <Switch
            size="small"
            checked={config.enableFontSetting}
            onChange={(checked) => updateConfig({ enableFontSetting: checked })}
          />
        </div>
        <div className="indicator-content-label">
          <span>指标</span>
        </div>
        <div className="indicator-content-row sub-content">
          <span>名称</span>
          <ColorPicker
            size="small"
            value={config.nameStyle.color}
            onChange={(color) =>
              updateNameStyle({ color: color.toHexString() })
            }
            disabled={!config.enableFontSetting}
          />
          <InputNumber
            size="small"
            min={12}
            max={30}
            value={config.nameStyle.fontSize}
            onChange={(value) => updateNameStyle({ fontSize: value as number })}
            step={1}
            style={{ width: 50 }}
            disabled={!config.enableFontSetting}
          />
          px
          <Tooltip title="加粗">
            <Button
              type={config.nameStyle.isBold ? "primary" : "text"}
              icon={<BoldOutlined />}
              size="small"
              onClick={() =>
                updateNameStyle({ isBold: !config.nameStyle.isBold })
              }
              disabled={!config.enableFontSetting}
            />
          </Tooltip>
          <Tooltip title="斜体">
            <Button
              type={config.nameStyle.isItalic ? "primary" : "text"}
              icon={<ItalicOutlined />}
              size="small"
              onClick={() =>
                updateNameStyle({ isItalic: !config.nameStyle.isItalic })
              }
              disabled={!config.enableFontSetting}
            />
          </Tooltip>
        </div>
        <div className="indicator-content-row sub-content">
          <span>数值</span>
          <ColorPicker
            size="small"
            value={config.valueStyle.color}
            onChange={(color) =>
              updateValueStyle({ color: color.toHexString() })
            }
            disabled={!config.enableFontSetting}
          />
          <InputNumber
            size="small"
            min={12}
            max={40}
            value={config.valueStyle.fontSize}
            onChange={(value) =>
              updateValueStyle({ fontSize: value as number })
            }
            step={1}
            style={{ width: 50 }}
            disabled={!config.enableFontSetting}
          />
          px
          <Tooltip title="加粗">
            <Button
              type={config.valueStyle.isBold ? "primary" : "text"}
              icon={<BoldOutlined />}
              size="small"
              onClick={() =>
                updateValueStyle({ isBold: !config.valueStyle.isBold })
              }
              disabled={!config.enableFontSetting}
            />
          </Tooltip>
          <Tooltip title="斜体">
            <Button
              type={config.valueStyle.isItalic ? "primary" : "text"}
              icon={<ItalicOutlined />}
              size="small"
              onClick={() =>
                updateValueStyle({ isItalic: !config.valueStyle.isItalic })
              }
              disabled={!config.enableFontSetting}
            />
          </Tooltip>
        </div>
      </div>
      {/* !TODO:当前版本暂不支持指标修饰图的配置 */}
      {/* <div className="indicator-content-decorate-image-wrapper">
        <div className="decorate-image-header">
          <span>指标修饰图</span>
          <Switch size="small" defaultChecked />
        </div>
        <div className="decorate-image-container">
          <div className="field-name">
            <div
              className="field-name-indicator"
              style={{ backgroundColor: "red" }}
            />
            <span>{"销售额"}</span>
          </div>
          <div className="media-selector-wrapper"></div>
        </div>
      </div> */}
    </div>
  );
};

export default IndicatorContent;
