import {
  DownSquareOutlined,
  LeftSquareOutlined,
  RightSquareOutlined,
  UpSquareOutlined,
} from "@ant-design/icons";
import { Button, Checkbox, Radio, Tooltip } from "antd";
import React, { useCallback, useEffect } from "react";
import { useImmer } from "use-immer";
import "./index.scss";

import FontConfigPanel from "@/components/common/FontConfigPanel";
import { ChartTypeEnum } from "@/components/dashboard/utils";
import useChartStore from "@/stores/useChartStore";
import {
  CoolBILegendPosition,
  LegendConfig,
} from "@/types/chartConfigItems/common";
const prefixCls = "chart-legend";

const defaultLegendConfig: LegendConfig = {
  isShowLegend: true,
  legendPosition: "top",
  legendAlign: "middle",
  legendFontConfig: {
    color: "#000000",
    fontSize: 12,
    isBold: false,
    isItalic: false,
  },
};

const directions: {
  position: CoolBILegendPosition;
  icon: React.ReactNode;
  tooltip: string;
}[] = [
  {
    position: "top",
    icon: <UpSquareOutlined />,
    tooltip: "顶部",
  },
  {
    position: "bottom",
    icon: <DownSquareOutlined />,
    tooltip: "底部",
  },
  {
    position: "left",
    icon: <LeftSquareOutlined />,
    tooltip: "左侧",
  },
  {
    position: "right",
    icon: <RightSquareOutlined />,
    tooltip: "右侧",
  },
];
/** 图例 */
const ChartLegend: React.FC = () => {
  const curChartId = useChartStore((state) => state.curChartId);
  const getCurrentChartConfig = useChartStore(
    (state) => state.getCurrentChartConfig
  );
  const setChartsConfig = useChartStore((state) => state.setChartsConfig);
  const [config, updateConfig] = useImmer<LegendConfig>(defaultLegendConfig);
  useEffect(() => {
    const curConfig = getCurrentChartConfig();
    if (!curConfig) {
      console.error("图例获取图表配置失败");
      return;
    }
    if (curConfig.type === ChartTypeEnum.line) {
      updateConfig(() => curConfig.legendConfig);
    }
  }, [curChartId, getCurrentChartConfig, updateConfig]);

  const renderRadioOptions = useCallback((position: CoolBILegendPosition) => {
    if (position === "top" || position === "bottom") {
      return (
        <>
          <Radio.Button value="start">居左</Radio.Button>
          <Radio.Button value="middle">居中</Radio.Button>
          <Radio.Button value="end">居右</Radio.Button>
        </>
      );
    } else if (position === "left" || position === "right") {
      return (
        <>
          <Radio.Button value="start">顶部</Radio.Button>
          <Radio.Button value="middle">居中</Radio.Button>
          <Radio.Button value="end">底部</Radio.Button>
        </>
      );
    }
    return null;
  }, []);
  return (
    <div className={`${prefixCls}-container`}>
      <div className="chart-legend-label">
        <Checkbox
          checked={config.isShowLegend}
          onChange={(e) => {
            updateConfig((draft) => {
              draft.isShowLegend = e.target.checked;
            });
            setChartsConfig(curChartId!, (draft) => {
              if (draft.type === ChartTypeEnum.line) {
                draft.legendConfig.isShowLegend = e.target.checked;
              }
            });
          }}
        >
          显示图例
        </Checkbox>
      </div>
      <div className="chart-legend-row sub-content">
        <span>位置</span>
        {directions.map(({ position, icon, tooltip }) => (
          <Tooltip key={position} title={tooltip}>
            <Button
              key={position}
              type={config.legendPosition === position ? "primary" : "text"}
              size="small"
              icon={icon}
              disabled={!config.isShowLegend}
              onClick={() => {
                updateConfig((draft) => {
                  draft.legendPosition = position;
                  // 切换图例位置时，初始化对齐方式：居中
                  draft.legendAlign = "middle";
                });
                setChartsConfig(curChartId!, (draft) => {
                  if (draft.type === ChartTypeEnum.line) {
                    draft.legendConfig.legendPosition = position;
                    draft.legendConfig.legendAlign = "middle";
                  }
                });
              }}
            />
          </Tooltip>
        ))}
      </div>
      {config.legendPosition && (
        <div className="chart-legend-row sub-content">
          <Radio.Group
            value={config.legendAlign}
            size="small"
            disabled={!config.isShowLegend}
            onChange={(e) => {
              updateConfig((draft) => {
                draft.legendAlign = e.target.value;
              });
              setChartsConfig(curChartId!, (draft) => {
                if (draft.type === ChartTypeEnum.line) {
                  draft.legendConfig.legendAlign = e.target.value;
                }
              });
            }}
          >
            {renderRadioOptions(config.legendPosition)}
          </Radio.Group>
        </div>
      )}
      <div className="chart-legend-row sub-content">
        <FontConfigPanel
          colorValue={config.legendFontConfig.color}
          fontSizeValue={config.legendFontConfig.fontSize}
          boldButtonType={config.legendFontConfig.isBold ? "primary" : "text"}
          italicButtonType={
            config.legendFontConfig.isItalic ? "primary" : "text"
          }
          inputWidth={82}
          isDisabled={!config.isShowLegend}
          onColorChange={(color) => {
            updateConfig((draft) => {
              draft.legendFontConfig.color = color.toHexString();
            });
            setChartsConfig(curChartId!, (draft) => {
              if (draft.type === ChartTypeEnum.line) {
                draft.legendConfig.legendFontConfig.color = color.toHexString();
              }
            });
          }}
          onFontSizeChange={(value) => {
            updateConfig((draft) => {
              draft.legendFontConfig.fontSize = Number(value);
            });
            setChartsConfig(curChartId!, (draft) => {
              if (draft.type === ChartTypeEnum.line) {
                draft.legendConfig.legendFontConfig.fontSize = Number(value);
              }
            });
          }}
          onBoldClick={() => {
            updateConfig((draft) => {
              draft.legendFontConfig.isBold = !draft.legendFontConfig.isBold;
            });
            setChartsConfig(curChartId!, (draft) => {
              if (draft.type === ChartTypeEnum.line) {
                draft.legendConfig.legendFontConfig.isBold =
                  !draft.legendConfig.legendFontConfig.isBold;
              }
            });
          }}
          onItalicClick={() => {
            updateConfig((draft) => {
              draft.legendFontConfig.isItalic =
                !draft.legendFontConfig.isItalic;
            });
            setChartsConfig(curChartId!, (draft) => {
              if (draft.type === ChartTypeEnum.line) {
                draft.legendConfig.legendFontConfig.isItalic =
                  !draft.legendConfig.legendFontConfig.isItalic;
              }
            });
          }}
        />
      </div>
    </div>
  );
};

export default ChartLegend;
