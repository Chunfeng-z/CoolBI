import { InfoCircleOutlined } from "@ant-design/icons";
import { Checkbox, ColorPicker, Radio, Tooltip } from "antd";
import React, { useEffect, useMemo } from "react";
import { useImmer } from "use-immer";

import FontConfigPanel from "@/components/common/FontConfigPanel";
import { ChartTypeEnum } from "@/components/dashboard/utils";
import useChartStore from "@/stores/useChartStore";
import { CoolBIToolTipConfig } from "@/types/chartConfigItems/common";

import "./index.scss";

const prefixCls = "chart-tooltip";

const defaultToolTipConfig: CoolBIToolTipConfig = {
  isShowToolTip: true,
  displayMode: "singlePoint",
  tipContentConfig: {
    isShowPercentage: true,
    isShowTotal: true,
  },
  backgroundColor: "#ffffff",
  fontConfig: {
    color: "#000000",
    fontSize: 12,
    isBold: false,
    isItalic: false,
  },
};

const displayModeOptions = [
  {
    value: "singlePoint",
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
    value: "dimension",
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
];

/** 图表的提示配置 */
const ChartToolTip: React.FC = () => {
  const getCurrentChartConfig = useChartStore(
    (state) => state.getCurrentChartConfig
  );
  const curChartId = useChartStore((state) => state.curChartId);
  const setChartsConfig = useChartStore((state) => state.setChartsConfig);
  const [config, updataConfig] =
    useImmer<CoolBIToolTipConfig>(defaultToolTipConfig);

  /** 工具提示配置禁用状态 */
  const isTooltipConfigDisabled = useMemo(
    () => !config.isShowToolTip,
    [config.isShowToolTip]
  );

  useEffect(() => {
    const curConfig = getCurrentChartConfig();
    if (!curConfig) {
      console.error("工具提示获取图表配置失败");
      return;
    }
    if (curConfig.type === ChartTypeEnum.line) {
      updataConfig(() => curConfig.tooltipConfig);
    }
  }, [curChartId]);

  return (
    <div className={`${prefixCls}-container`}>
      <div className="chart-tooltip-row">
        <Checkbox
          checked={config.isShowToolTip}
          onChange={(e) => {
            updataConfig((draft) => {
              draft.isShowToolTip = e.target.checked;
            });
            setChartsConfig(curChartId!, (draft) => {
              if (draft.type === ChartTypeEnum.line) {
                draft.tooltipConfig.isShowToolTip = e.target.checked;
              }
            });
          }}
        >
          是否显示工具提示
        </Checkbox>
      </div>
      <div className="chart-tooltip-row-vertical">
        <span>展示方式</span>
        <div className="chart-tooltip-right">
          <Radio.Group
            disabled={isTooltipConfigDisabled}
            value={config.displayMode}
            options={displayModeOptions}
            onChange={(e) => {
              updataConfig((draft) => {
                draft.displayMode = e.target.value;
              });
              setChartsConfig(curChartId!, (draft) => {
                if (draft.type === ChartTypeEnum.line) {
                  draft.tooltipConfig.displayMode = e.target.value;
                }
              });
            }}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
          />
        </div>
      </div>
      <div className="chart-tooltip-row">
        <span>内容</span>
        {config.displayMode === "dimension" && (
          <Checkbox
            disabled={isTooltipConfigDisabled}
            checked={config.tipContentConfig.isShowTotal}
            onChange={(e) => {
              updataConfig((draft) => {
                draft.tipContentConfig.isShowTotal = e.target.checked;
              });
              setChartsConfig(curChartId!, (draft) => {
                if (draft.type === ChartTypeEnum.line) {
                  draft.tooltipConfig.tipContentConfig.isShowTotal =
                    e.target.checked;
                }
              });
            }}
          >
            总计
          </Checkbox>
        )}
        <Checkbox
          disabled={isTooltipConfigDisabled}
          checked={config.tipContentConfig.isShowPercentage}
          onChange={(e) => {
            updataConfig((draft) => {
              draft.tipContentConfig.isShowPercentage = e.target.checked;
            });
            setChartsConfig(curChartId!, (draft) => {
              if (draft.type === ChartTypeEnum.line) {
                draft.tooltipConfig.tipContentConfig.isShowPercentage =
                  e.target.checked;
              }
            });
          }}
        >
          占比
        </Checkbox>
      </div>
      <div className="chart-tooltip-row">
        <span>背景色</span>
        <ColorPicker
          size="small"
          disabled={isTooltipConfigDisabled}
          value={config.backgroundColor}
          onChangeComplete={(color) => {
            updataConfig((draft) => {
              draft.backgroundColor = color.toHexString();
            });
            setChartsConfig(curChartId!, (draft) => {
              if (draft.type === ChartTypeEnum.line) {
                draft.tooltipConfig.backgroundColor = color.toHexString();
              }
            });
          }}
        />
      </div>
      <div className="chart-tooltip-row">
        <FontConfigPanel
          colorValue={config.fontConfig.color}
          fontSizeValue={config.fontConfig.fontSize}
          boldButtonType={config.fontConfig.isBold ? "primary" : "text"}
          italicButtonType={config.fontConfig.isItalic ? "primary" : "text"}
          isDisabled={isTooltipConfigDisabled}
          onColorChange={(color) => {
            updataConfig((draft) => {
              draft.fontConfig.color = color.toHexString();
            });
            setChartsConfig(curChartId!, (draft) => {
              if (draft.type === ChartTypeEnum.line) {
                draft.tooltipConfig.fontConfig.color = color.toHexString();
              }
            });
          }}
          onFontSizeChange={(value) => {
            updataConfig((draft) => {
              draft.fontConfig.fontSize = Number(value);
            });
            setChartsConfig(curChartId!, (draft) => {
              if (draft.type === ChartTypeEnum.line) {
                draft.tooltipConfig.fontConfig.fontSize = Number(value);
              }
            });
          }}
          onBoldClick={() => {
            updataConfig((draft) => {
              draft.fontConfig.isBold = !draft.fontConfig.isBold;
            });
            setChartsConfig(curChartId!, (draft) => {
              if (draft.type === ChartTypeEnum.line) {
                draft.tooltipConfig.fontConfig.isBold =
                  !draft.tooltipConfig.fontConfig.isBold;
              }
            });
          }}
          onItalicClick={() => {
            updataConfig((draft) => {
              draft.fontConfig.isItalic = !draft.fontConfig.isItalic;
            });
            setChartsConfig(curChartId!, (draft) => {
              if (draft.type === ChartTypeEnum.line) {
                draft.tooltipConfig.fontConfig.isItalic =
                  !draft.tooltipConfig.fontConfig.isItalic;
              }
            });
          }}
          disabledConfigList={["italicBtn"]}
        />
      </div>
    </div>
  );
};

export default ChartToolTip;
