import {
  BoldOutlined,
  DownSquareOutlined,
  ItalicOutlined,
  LeftSquareOutlined,
  RightSquareOutlined,
  UpSquareOutlined,
} from "@ant-design/icons";
import {
  Button,
  Checkbox,
  ColorPicker,
  InputNumber,
  Radio,
  Tooltip,
} from "antd";
import React, { useCallback } from "react";
import { useImmer } from "use-immer";
import "./index.scss";

import useChartStore from "@/stores/useChartStore";
import {
  CoolBILegendPosition,
  LegendConfig,
} from "@/types/chartConfigItems/common";
const prefixCls = "chart-legend";

const defaultLegendConfig: LegendConfig = {
  isShowLegend: true,
  legendPosition: "top",
  legendAlign: "center",
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
  const [config, updateConfig] = useImmer<LegendConfig>(defaultLegendConfig);

  const renderRadioOptions = useCallback((position: CoolBILegendPosition) => {
    if (position === "top" || position === "bottom") {
      return (
        <>
          <Radio.Button value="start">居左</Radio.Button>
          <Radio.Button value="center">居中</Radio.Button>
          <Radio.Button value="end">居右</Radio.Button>
        </>
      );
    } else if (position === "left" || position === "right") {
      return (
        <>
          <Radio.Button value="start">顶部</Radio.Button>
          <Radio.Button value="center">居中</Radio.Button>
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
          onChange={(e) =>
            updateConfig((draft) => {
              draft.isShowLegend = e.target.checked;
            })
          }
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
                  draft.legendAlign = "center";
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
            onChange={(e) =>
              updateConfig((draft) => {
                draft.legendAlign = e.target.value;
              })
            }
          >
            {renderRadioOptions(config.legendPosition)}
          </Radio.Group>
        </div>
      )}
      <div className="chart-legend-row sub-content">
        <span>文本</span>
        <ColorPicker
          size="small"
          disabled={!config.isShowLegend}
          value={config.legendFontConfig.color}
          onChangeComplete={(color) =>
            updateConfig((draft) => {
              draft.legendFontConfig.color = color.toHexString();
            })
          }
        />
        <InputNumber
          size="small"
          addonAfter="px"
          min={12}
          max={20}
          defaultValue={12}
          step={1}
          style={{ width: 85 }}
          disabled={!config.isShowLegend}
          value={config.legendFontConfig.fontSize}
          onChange={(value) =>
            updateConfig((draft) => {
              console.log("value", value);
              draft.legendFontConfig.fontSize = Number(value);
            })
          }
        />
        <Tooltip title="加粗">
          <Button
            icon={<BoldOutlined />}
            size="small"
            type={config.legendFontConfig.isBold ? "primary" : "text"}
            disabled={!config.isShowLegend}
            onClick={() =>
              updateConfig((draft) => {
                draft.legendFontConfig.isBold = !draft.legendFontConfig.isBold;
              })
            }
          />
        </Tooltip>
        <Tooltip title="斜体">
          <Button
            icon={<ItalicOutlined />}
            size="small"
            type={config.legendFontConfig.isItalic ? "primary" : "text"}
            disabled={!config.isShowLegend}
            onClick={() =>
              updateConfig((draft) => {
                draft.legendFontConfig.isItalic =
                  !draft.legendFontConfig.isItalic;
              })
            }
          />
        </Tooltip>
      </div>
    </div>
  );
};

export default ChartLegend;
