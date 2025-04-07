import {
  AlignCenterOutlined,
  AlignLeftOutlined,
  BoldOutlined,
  ItalicOutlined,
} from "@ant-design/icons";
import { Button, ColorPicker, InputNumber, Radio, Switch, Tooltip } from "antd";
import React, { useCallback, useEffect, useState } from "react";

import { ChartTypeEnum } from "../../utils";

import useChartStore from "@/stores/useChartStore";
import { IndicatorContentConfig } from "@/types/chartConfigItems/indicatorTrendItems";

const prefixCls = "indicator-content";

/** 默认配置 */
const defaultConfig: IndicatorContentConfig = {
  indicatorContentPosition: "left",
  indicatorValueLineSpace: "small",
  enableFontSetting: true,
  indicatorNameFontConfig: {
    color: "#000000",
    fontSize: 14,
    isBold: false,
    isItalic: false,
  },
  indicatorValueFontConfig: {
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
  const [config, setConfig] = useState<IndicatorContentConfig>();

  // 获取当前选中图表的配置
  useEffect(() => {
    const curConfig = getCurrentChartConfig();
    if (!curConfig) {
      console.error("指标内容配置，获取当前图表配置失败");
      return;
    }
    setConfig(curConfig.indicatorContentConfig);
  }, [curChartId]);

  /** 更新配置的工具函数 */
  const updateConfig = useCallback(
    (update: Partial<IndicatorContentConfig>) => {
      if (!("enableFontSetting" in update) || update.enableFontSetting) {
        setConfig({
          ...config!,
          ...update,
        });
      } else if ("enableFontSetting" in update && !update.enableFontSetting) {
        setConfig({
          ...config!,
          ...update,
          indicatorNameFontConfig: defaultConfig.indicatorNameFontConfig,
          indicatorValueFontConfig: defaultConfig.indicatorValueFontConfig,
        });
      }
      switch (Object.keys(update)[0]) {
        case "indicatorContentPosition":
          setChartsConfig(curChartId!, (draft) => {
            if (
              draft.type === ChartTypeEnum.indicatorTrend ||
              draft.type === ChartTypeEnum.indicatorCard
            ) {
              draft.indicatorContentConfig.indicatorContentPosition =
                update.indicatorContentPosition!;
            }
          });
          break;
        case "indicatorValueLineSpace":
          setChartsConfig(curChartId!, (draft) => {
            if (
              draft.type === ChartTypeEnum.indicatorTrend ||
              draft.type === ChartTypeEnum.indicatorCard
            ) {
              draft.indicatorContentConfig.indicatorValueLineSpace =
                update.indicatorValueLineSpace!;
            }
          });
          break;
        case "enableFontSetting": {
          // 禁用字号设置，则恢复默认配置
          if (!update.enableFontSetting) {
            setChartsConfig(curChartId!, (draft) => {
              if (
                draft.type === ChartTypeEnum.indicatorTrend ||
                draft.type === ChartTypeEnum.indicatorCard
              ) {
                draft.indicatorContentConfig.indicatorNameFontConfig =
                  defaultConfig.indicatorNameFontConfig;
                draft.indicatorContentConfig.indicatorValueFontConfig =
                  defaultConfig.indicatorValueFontConfig;
              }
            });
          }
          break;
        }
      }
    },
    [config, curChartId, setChartsConfig]
  );

  /** 更新指标名称样式 */
  const updateNameStyle = (
    update: Partial<IndicatorContentConfig["indicatorNameFontConfig"]>
  ) => {
    const newNameStyle = {
      ...config!.indicatorNameFontConfig,
      ...update,
    };
    updateConfig({ indicatorNameFontConfig: newNameStyle });
    setChartsConfig(curChartId!, (draft) => {
      if (
        draft.type === ChartTypeEnum.indicatorTrend ||
        draft.type === ChartTypeEnum.indicatorCard
      ) {
        draft.indicatorContentConfig.indicatorNameFontConfig = newNameStyle;
      }
    });
  };

  /** 更新指标值样式 */
  const updateValueStyle = (
    update: Partial<IndicatorContentConfig["indicatorValueFontConfig"]>
  ) => {
    const newValueStyle = {
      ...config!.indicatorValueFontConfig,
      ...update,
    };
    updateConfig({ indicatorValueFontConfig: newValueStyle });
    setChartsConfig(curChartId!, (draft) => {
      if (
        draft.type === ChartTypeEnum.indicatorTrend ||
        draft.type === ChartTypeEnum.indicatorCard
      ) {
        draft.indicatorContentConfig.indicatorValueFontConfig = newValueStyle;
      }
    });
  };

  if (!config) {
    return <div className="text">获取指标内容配置失败</div>;
  }

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
          value={config.indicatorContentPosition}
          onChange={(e) =>
            updateConfig({ indicatorContentPosition: e.target.value })
          }
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
          value={config.indicatorValueLineSpace}
          onChange={(e) =>
            updateConfig({ indicatorValueLineSpace: e.target.value })
          }
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
            value={config.indicatorNameFontConfig.color}
            onChange={(color) =>
              updateNameStyle({ color: color.toHexString() })
            }
            disabled={!config.enableFontSetting}
          />
          <InputNumber
            size="small"
            min={12}
            max={30}
            value={config.indicatorNameFontConfig.fontSize}
            onChange={(value) => updateNameStyle({ fontSize: value as number })}
            step={1}
            style={{ width: 50 }}
            disabled={!config.enableFontSetting}
          />
          px
          <Tooltip title="加粗">
            <Button
              type={config.indicatorNameFontConfig.isBold ? "primary" : "text"}
              icon={<BoldOutlined />}
              size="small"
              onClick={() =>
                updateNameStyle({
                  isBold: !config.indicatorNameFontConfig.isBold,
                })
              }
              disabled={!config.enableFontSetting}
            />
          </Tooltip>
          <Tooltip title="斜体">
            <Button
              type={
                config.indicatorNameFontConfig.isItalic ? "primary" : "text"
              }
              icon={<ItalicOutlined />}
              size="small"
              onClick={() =>
                updateNameStyle({
                  isItalic: !config.indicatorNameFontConfig.isItalic,
                })
              }
              disabled={!config.enableFontSetting}
            />
          </Tooltip>
        </div>
        <div className="indicator-content-row sub-content">
          <span>数值</span>
          <ColorPicker
            size="small"
            value={config.indicatorValueFontConfig.color}
            onChange={(color) =>
              updateValueStyle({ color: color.toHexString() })
            }
            disabled={!config.enableFontSetting}
          />
          <InputNumber
            size="small"
            min={12}
            max={40}
            value={config.indicatorValueFontConfig.fontSize}
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
              type={config.indicatorValueFontConfig.isBold ? "primary" : "text"}
              icon={<BoldOutlined />}
              size="small"
              onClick={() =>
                updateValueStyle({
                  isBold: !config.indicatorValueFontConfig.isBold,
                })
              }
              disabled={!config.enableFontSetting}
            />
          </Tooltip>
          <Tooltip title="斜体">
            <Button
              type={
                config.indicatorValueFontConfig.isItalic ? "primary" : "text"
              }
              icon={<ItalicOutlined />}
              size="small"
              onClick={() =>
                updateValueStyle({
                  isItalic: !config.indicatorValueFontConfig.isItalic,
                })
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
