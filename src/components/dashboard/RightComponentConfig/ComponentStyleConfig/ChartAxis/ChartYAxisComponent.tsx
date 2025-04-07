import {
  BoldOutlined,
  InfoCircleOutlined,
  ItalicOutlined,
} from "@ant-design/icons";
import {
  Button,
  Checkbox,
  ColorPicker,
  Input,
  InputNumber,
  Select,
  Tooltip,
} from "antd";
import { memo, useMemo } from "react";
import { useImmer } from "use-immer";

import { LineYAxisConfig } from "@/types/chartConfigItems/lineItems";

const ChartYAxisComponent: React.FC<{
  /** 初始化y轴配置 */
  yAxisConfig: LineYAxisConfig;
}> = memo((props) => {
  const { yAxisConfig } = props;
  const [config, updateConfig] = useImmer<LineYAxisConfig>(yAxisConfig);
  /** 标题和单位配置的禁用状态 */
  const isTitleAndUnitDisabled = useMemo(() => {
    return !config.isShowAxis || !config.axisTitleConfig.isShowTitleAndUnit;
  }, [config.isShowAxis, config.axisTitleConfig.isShowTitleAndUnit]);
  /** 坐标轴标签配置的禁用状态 */
  const isAxisLabelDisabled = useMemo(() => {
    return !config.isShowAxis || !config.axisLabelConfig.isShowAxisLabel;
  }, [config.isShowAxis, config.axisLabelConfig.isShowAxisLabel]);
  /** 坐标轴线配置的禁用状态 */
  const isAxisLineDisabled = useMemo(() => {
    return !config.isShowAxis || !config.axisLineConfig.isShowLine;
  }, [config.isShowAxis, config.axisLineConfig.isShowLine]);
  /** 坐标轴网格线的禁用状态 */
  const isAxisGridDisabled = useMemo(() => {
    return !config.isShowAxis || !config.axisGridConfig.isShowLine;
  }, [config.isShowAxis, config.axisGridConfig.isShowLine]);
  /** 轴值范围最大值的禁用状态 */
  const isMaxRangeDisabled = useMemo(() => {
    return !config.isShowAxis || config.axisRangeConfig.isMaxRangeModeAuto;
  }, [config.isShowAxis, config.axisRangeConfig.isMaxRangeModeAuto]);
  /** 轴值范围最小值的禁用状态 */
  const isMinRangeDisabled = useMemo(() => {
    return !config.isShowAxis || config.axisRangeConfig.isMinRangeModeAuto;
  }, [config.isShowAxis, config.axisRangeConfig.isMinRangeModeAuto]);
  /** 自定义等分间隔的禁用状态 */
  const isCustomIntervalDisabled = useMemo(() => {
    return !config.isShowAxis || !config.intervalConfig.isEnableCustomInterval;
  }, [config.isShowAxis, config.intervalConfig.isEnableCustomInterval]);
  return (
    <div className="chart-axis-y-content">
      <div className="chart-axis-row">
        <Checkbox
          checked={config.isShowAxis}
          onChange={(e) => {
            updateConfig((draft) => {
              draft.isShowAxis = e.target.checked;
            });
          }}
        >
          显示Y轴
        </Checkbox>
      </div>
      <div className="chart-axis-label">
        <Checkbox
          disabled={!config.isShowAxis}
          checked={config.axisTitleConfig.isShowTitleAndUnit}
          onChange={(e) => {
            updateConfig((draft) => {
              draft.axisTitleConfig.isShowTitleAndUnit = e.target.checked;
            });
          }}
        >
          显示标题和单位
        </Checkbox>
      </div>
      <div className="chart-axis-row sub-content">
        <span>标题</span>
        <Input
          size="small"
          placeholder="请输入标题"
          maxLength={30}
          disabled={isTitleAndUnitDisabled}
          value={config.axisTitleConfig.title}
          onChange={(e) => {
            updateConfig((draft) => {
              draft.axisTitleConfig.title = e.target.value;
            });
          }}
        />
      </div>
      <div className="chart-axis-row sub-content">
        <span>单位</span>
        <Input
          size="small"
          placeholder="请输入单位"
          maxLength={30}
          disabled={isTitleAndUnitDisabled}
          value={config.axisTitleConfig.unit}
          onChange={(e) => {
            updateConfig((draft) => {
              draft.axisTitleConfig.unit = e.target.value;
            });
          }}
        />
      </div>
      <div className="chart-axis-row sub-content">
        <span>位置</span>
        <Tooltip title="双Y轴下两侧标题会同步">
          <InfoCircleOutlined />
        </Tooltip>
        <Select
          size="small"
          defaultValue="outer"
          style={{ width: 120 }}
          getPopupContainer={(triggerNode) => triggerNode.parentElement}
          disabled={isTitleAndUnitDisabled}
          value={config.axisTitleConfig.position}
          onChange={(value) => {
            updateConfig((draft) => {
              draft.axisTitleConfig.position = value as "outer" | "top";
            });
          }}
          options={[
            { value: "outer", label: "轴外侧" },
            { value: "top", label: "轴上方" },
          ]}
        />
      </div>
      <div className="chart-axis-row sub-content">
        <span>文本</span>
        <ColorPicker
          size="small"
          disabled={isTitleAndUnitDisabled}
          value={config.axisTitleConfig.fontConfig.color}
          onChangeComplete={(color) => {
            updateConfig((draft) => {
              draft.axisTitleConfig.fontConfig.color = color.toHexString();
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
          style={{ width: 100 }}
          disabled={isTitleAndUnitDisabled}
          value={config.axisTitleConfig.fontConfig.fontSize}
          onChange={(value) => {
            updateConfig((draft) => {
              draft.axisTitleConfig.fontConfig.fontSize = value ?? 12;
            });
          }}
        />
        <Tooltip title="加粗">
          <Button
            type={config.axisTitleConfig.fontConfig.isBold ? "primary" : "text"}
            icon={<BoldOutlined />}
            size="small"
            disabled={isTitleAndUnitDisabled}
            onClick={() => {
              updateConfig((draft) => {
                draft.axisTitleConfig.fontConfig.isBold =
                  !draft.axisTitleConfig.fontConfig.isBold;
              });
            }}
          />
        </Tooltip>
        <Tooltip title="斜体">
          <Button
            type={
              config.axisTitleConfig.fontConfig.isItalic ? "primary" : "text"
            }
            icon={<ItalicOutlined />}
            size="small"
            disabled={isTitleAndUnitDisabled}
            onClick={() => {
              updateConfig((draft) => {
                draft.axisTitleConfig.fontConfig.isItalic =
                  !draft.axisTitleConfig.fontConfig.isItalic;
              });
            }}
          />
        </Tooltip>
      </div>
      <div className="chart-axis-label">
        <Checkbox
          checked={config.axisLabelConfig.isShowAxisLabel}
          disabled={!config.isShowAxis}
          onChange={(e) => {
            updateConfig((draft) => {
              draft.axisLabelConfig.isShowAxisLabel = e.target.checked;
            });
          }}
        >
          显示坐标轴标签
        </Checkbox>
      </div>
      <div className="chart-axis-row sub-content">
        <span>文本</span>
        <ColorPicker
          size="small"
          disabled={isAxisLabelDisabled}
          value={config.axisLabelConfig.fontConfig.color}
          onChangeComplete={(color) => {
            updateConfig((draft) => {
              draft.axisLabelConfig.fontConfig.color = color.toHexString();
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
          style={{ width: 100 }}
          disabled={isAxisLabelDisabled}
          value={config.axisLabelConfig.fontConfig.fontSize}
          onChange={(value) => {
            updateConfig((draft) => {
              draft.axisLabelConfig.fontConfig.fontSize = value ?? 12;
            });
          }}
        />
        <Tooltip title="加粗">
          <Button
            type={config.axisLabelConfig.fontConfig.isBold ? "primary" : "text"}
            icon={<BoldOutlined />}
            size="small"
            disabled={isAxisLabelDisabled}
            onClick={() => {
              updateConfig((draft) => {
                draft.axisLabelConfig.fontConfig.isBold =
                  !draft.axisLabelConfig.fontConfig.isBold;
              });
            }}
          />
        </Tooltip>
        <Tooltip title="斜体">
          <Button
            type={
              config.axisLabelConfig.fontConfig.isItalic ? "primary" : "text"
            }
            icon={<ItalicOutlined />}
            size="small"
            disabled={isAxisLabelDisabled}
            onClick={() => {
              updateConfig((draft) => {
                draft.axisLabelConfig.fontConfig.isItalic =
                  !draft.axisLabelConfig.fontConfig.isItalic;
              });
            }}
          />
        </Tooltip>
      </div>
      <div className="chart-axis-row">
        <Checkbox
          checked={config.isShowTickLine}
          disabled={!config.isShowAxis}
          onChange={(e) => {
            updateConfig((draft) => {
              draft.isShowTickLine = e.target.checked;
            });
          }}
        >
          显示刻度线
        </Checkbox>
      </div>
      <div className="chart-axis-label">
        <Checkbox
          checked={config.axisLineConfig.isShowLine}
          disabled={!config.isShowAxis}
          onChange={(e) => {
            updateConfig((draft) => {
              draft.axisLineConfig.isShowLine = e.target.checked;
            });
          }}
        >
          显示坐标轴
        </Checkbox>
      </div>
      <div className="chart-axis-row sub-content">
        <Select
          size="small"
          style={{ width: 80 }}
          getPopupContainer={(triggerNode) => triggerNode.parentElement!}
          disabled={isAxisLineDisabled}
          value={config.axisLineConfig.lineStyle}
          onChange={(value) => {
            updateConfig((draft) => {
              draft.axisLineConfig.lineStyle = value;
            });
          }}
          options={[
            {
              value: "solid",
              label: (
                <div className="chart-axis-line-style">
                  <div className="chart-axis-line-style-solid" />
                </div>
              ),
            },
            {
              value: "dashed",
              label: (
                <div className="chart-axis-line-style">
                  <div className="chart-axis-line-style-dashed" />
                </div>
              ),
            },
          ]}
        />
        <InputNumber
          size="small"
          addonAfter="px"
          min={1}
          max={4}
          defaultValue={1}
          step={1}
          style={{ width: 80 }}
          disabled={isAxisLineDisabled}
          value={config.axisLineConfig.lineWidth}
          onChange={(value) => {
            updateConfig((draft) => {
              draft.axisLineConfig.lineWidth = value ?? 1;
            });
          }}
        />
        <ColorPicker
          size="small"
          disabled={isAxisLineDisabled}
          value={config.axisLineConfig.lineColor}
          onChangeComplete={(color) => {
            updateConfig((draft) => {
              draft.axisLineConfig.lineColor = color.toHexString();
            });
          }}
        />
      </div>
      <div className="chart-axis-label">
        <Checkbox
          checked={config.axisGridConfig.isShowLine}
          disabled={!config.isShowAxis}
          onChange={(e) => {
            updateConfig((draft) => {
              draft.axisGridConfig.isShowLine = e.target.checked;
            });
          }}
        >
          显示网格线
        </Checkbox>
      </div>
      <div className="chart-axis-row sub-content">
        <Select
          size="small"
          style={{ width: 80 }}
          disabled={isAxisGridDisabled}
          value={config.axisGridConfig.lineStyle}
          onChange={(value) => {
            updateConfig((draft) => {
              draft.axisGridConfig.lineStyle = value;
            });
          }}
          getPopupContainer={(triggerNode) => triggerNode.parentElement!}
          options={[
            {
              value: "solid",
              label: (
                <div className="chart-axis-line-style">
                  <div className="chart-axis-line-style-solid" />
                </div>
              ),
            },
            {
              value: "dashed",
              label: (
                <div className="chart-axis-line-style">
                  <div className="chart-axis-line-style-dashed" />
                </div>
              ),
            },
          ]}
        />
        <InputNumber
          size="small"
          addonAfter="px"
          min={1}
          max={4}
          defaultValue={1}
          step={1}
          style={{ width: 80 }}
          disabled={isAxisGridDisabled}
          value={config.axisGridConfig.lineWidth}
          onChange={(value) => {
            updateConfig((draft) => {
              draft.axisGridConfig.lineWidth = value ?? 1;
            });
          }}
        />
        <ColorPicker
          size="small"
          value={config.axisGridConfig.lineColor}
          disabled={isAxisGridDisabled}
          onChangeComplete={(color) => {
            updateConfig((draft) => {
              draft.axisGridConfig.lineColor = color.toHexString();
            });
          }}
        />
      </div>
      <div className="chart-axis-label">
        <span>轴值范围与间隔</span>
      </div>
      <div className="chart-axis-row sub-content">
        <span>最大值</span>
        <Input
          size="small"
          placeholder="0"
          maxLength={20}
          value={config.axisRangeConfig.maxValue}
          disabled={isMaxRangeDisabled}
          onChange={(e) => {
            const inputValue = e.target.value;
            const reg = /^-?\d*(\.\d*)?$/;
            if (
              reg.test(inputValue) ||
              inputValue === "" ||
              inputValue === "-"
            ) {
              updateConfig((draft) => {
                if (inputValue === "") {
                  draft.axisRangeConfig.maxValue = undefined;
                } else {
                  draft.axisRangeConfig.maxValue = Number(inputValue);
                }
              });
            }
          }}
          onPressEnter={(e) => {
            console.log("更新到store");
          }}
        />
        <Checkbox
          style={{ whiteSpace: "nowrap" }}
          checked={config.axisRangeConfig.isMaxRangeModeAuto}
          disabled={!config.isShowAxis}
          onChange={(e) => {
            updateConfig((draft) => {
              draft.axisRangeConfig.isMaxRangeModeAuto = e.target.checked;
            });
          }}
        >
          自动
        </Checkbox>
      </div>
      <div className="chart-axis-row sub-content">
        <span>最小值</span>
        <Input
          size="small"
          placeholder="0"
          maxLength={20}
          value={config.axisRangeConfig.minValue}
          disabled={isMinRangeDisabled}
          onChange={(e) => {
            const inputValue = e.target.value;
            const reg = /^-?\d*(\.\d*)?$/;
            if (
              reg.test(inputValue) ||
              inputValue === "" ||
              inputValue === "-"
            ) {
              updateConfig((draft) => {
                if (inputValue === "") {
                  draft.axisRangeConfig.minValue = undefined;
                } else {
                  draft.axisRangeConfig.minValue = Number(inputValue);
                }
              });
            }
          }}
          onPressEnter={(e) => {
            console.log("更新到store");
          }}
        />
        <Checkbox
          style={{ whiteSpace: "nowrap" }}
          checked={config.axisRangeConfig.isMinRangeModeAuto}
          disabled={!config.isShowAxis}
          onChange={(e) => {
            updateConfig((draft) => {
              draft.axisRangeConfig.isMinRangeModeAuto = e.target.checked;
            });
          }}
        >
          自动
        </Checkbox>
      </div>
      <div className="chart-axis-row sub-content">
        <Checkbox
          disabled={!config.isShowAxis}
          checked={config.intervalConfig.isEnableCustomInterval}
          onChange={(e) => {
            updateConfig((draft) => {
              draft.intervalConfig.isEnableCustomInterval = e.target.checked;
            });
          }}
        >
          自定义间隔
        </Checkbox>
      </div>
      <div className="chart-axis-row sub-sub-content">
        <span>等分间隔数</span>
        <InputNumber
          size="small"
          min={1}
          max={20}
          defaultValue={4}
          step={1}
          style={{ width: 80 }}
          disabled={isCustomIntervalDisabled}
          value={config.intervalConfig.intervalCount}
          onChange={(value) => {
            updateConfig((draft) => {
              draft.intervalConfig.intervalCount = value ?? 4;
            });
          }}
        />
      </div>
    </div>
  );
});

export default ChartYAxisComponent;
