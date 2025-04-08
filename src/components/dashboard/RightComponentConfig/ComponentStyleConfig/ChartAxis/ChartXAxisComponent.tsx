import { Checkbox, ColorPicker, Input, InputNumber } from "antd";
import { Color } from "antd/es/color-picker";
import { set } from "lodash-es";
import { memo, useCallback, useMemo } from "react";
import { useImmer } from "use-immer";

import FontConfigPanel from "@/components/common/FontConfigPanel";
import LineStyleSelect from "@/components/common/LineStyleSelect";
import { ChartTypeEnum } from "@/components/dashboard/utils";
import useChartStore, { SupportedChartType } from "@/stores/useChartStore";
import { LineXAxisConfig } from "@/types/chartConfigItems/lineItems";

const ChartXAxisComponent: React.FC<{
  /** 初始化 x 轴配置 */
  xAxisConfig: LineXAxisConfig;
}> = memo((props) => {
  const { xAxisConfig } = props;
  const setChartsConfig = useChartStore((state) => state.setChartsConfig);
  const curChartId = useChartStore((state) => state.curChartId);
  const [config, updateConfig] = useImmer<LineXAxisConfig>(xAxisConfig);

  /** 标题和单位配置的禁用状态 */
  const isTitleAndUnitDisabled = useMemo(() => {
    return !config.isShowAxis || !config.axisTitleConfig.isShowTitleAndUnit;
  }, [config.isShowAxis, config.axisTitleConfig.isShowTitleAndUnit]);
  /** 坐标轴标签的禁用状态 */
  const isAxisLabelDisabled = useMemo(() => {
    return !config.isShowAxis || !config.axisLabelConfig.isShowAxisLabel;
  }, [config.isShowAxis, config.axisLabelConfig.isShowAxisLabel]);
  /** 坐标轴线显示的禁用状态 */
  const isAxisLineDisabled = useMemo(() => {
    return !config.isShowAxis || !config.axisLineConfig.isShowLine;
  }, [config.isShowAxis, config.axisLineConfig.isShowLine]);
  /** 坐标轴网格线的禁用状态 */
  const isAxisGridDisabled = useMemo(() => {
    return !config.isShowAxis || !config.axisGridConfig.isShowLine;
  }, [config.isShowAxis, config.axisGridConfig.isShowLine]);

  /** 更新zustand当前图表配置
   * paths: 更新路径
   * value: 更新值
   */
  const updateChartsConfig = useCallback(
    (
      paths: string[],
      value:
        | string
        | number
        | boolean
        | undefined
        | ((draft: SupportedChartType) => unknown)
    ) => {
      const basePaths = ["axisConfig", "xAxisConfig"];
      const newPaths = [...basePaths, ...paths];
      setChartsConfig(curChartId!, (draft) => {
        if (draft.type === ChartTypeEnum.line) {
          const newValue = typeof value === "function" ? value(draft) : value;
          set(draft, newPaths, newValue);
        }
      });
    },
    [curChartId, setChartsConfig]
  );

  /** 标题和单位配置的更新 */
  const handleTitleUnitFontColorChange = useCallback(
    (color: Color) => {
      updateConfig((draft) => {
        draft.axisTitleConfig.fontConfig.color = color.toHexString();
      });
      updateChartsConfig(
        ["axisTitleConfig", "fontConfig", "color"],
        color.toHexString()
      );
    },
    [updateChartsConfig, updateConfig]
  );
  const handleTitleUnitFontSizeChange = useCallback(
    (value: number | null) => {
      updateConfig((draft) => {
        draft.axisTitleConfig.fontConfig.fontSize = value ?? 12;
      });
      updateChartsConfig(
        ["axisTitleConfig", "fontConfig", "fontSize"],
        value ?? 12
      );
    },
    [updateConfig, updateChartsConfig]
  );
  const handleTitleUnitBoldClick = useCallback(() => {
    updateConfig((draft) => {
      draft.axisTitleConfig.fontConfig.isBold =
        !draft.axisTitleConfig.fontConfig.isBold;
    });
    updateChartsConfig(["axisTitleConfig", "fontConfig", "isBold"], (draft) => {
      if (draft.type === ChartTypeEnum.line) {
        return !draft.axisConfig.xAxisConfig.axisTitleConfig.fontConfig.isBold;
      }
    });
  }, [updateChartsConfig, updateConfig]);
  const handleTitleUnitItalicClick = useCallback(() => {
    updateConfig((draft) => {
      draft.axisTitleConfig.fontConfig.isItalic =
        !draft.axisTitleConfig.fontConfig.isItalic;
    });
    updateChartsConfig(
      ["axisTitleConfig", "fontConfig", "isItalic"],
      (draft) => {
        if (draft.type === ChartTypeEnum.line) {
          return !draft.axisConfig.xAxisConfig.axisTitleConfig.fontConfig
            .isItalic;
        }
      }
    );
  }, [updateChartsConfig, updateConfig]);

  /** 坐标轴标签配置的更新 */
  const handleAxisLabelFontColorChange = useCallback(
    (color: Color) => {
      updateConfig((draft) => {
        draft.axisLabelConfig.fontConfig.color = color.toHexString();
      });
      updateChartsConfig(
        ["axisLabelConfig", "fontConfig", "color"],
        color.toHexString()
      );
    },
    [updateChartsConfig, updateConfig]
  );
  const handleAxisLabelFontSizeChange = useCallback(
    (value: number | null) => {
      updateConfig((draft) => {
        draft.axisLabelConfig.fontConfig.fontSize = value ?? 12;
      });
      updateChartsConfig(
        ["axisLabelConfig", "fontConfig", "fontSize"],
        value ?? 12
      );
    },
    [updateChartsConfig, updateConfig]
  );
  const handleAxisLabelBoldClick = useCallback(() => {
    updateConfig((draft) => {
      draft.axisLabelConfig.fontConfig.isBold =
        !draft.axisLabelConfig.fontConfig.isBold;
    });
    updateChartsConfig(["axisLabelConfig", "fontConfig", "isBold"], (draft) => {
      if (draft.type === ChartTypeEnum.line) {
        return !draft.axisConfig.xAxisConfig.axisLabelConfig.fontConfig.isBold;
      }
    });
  }, [updateChartsConfig, updateConfig]);
  const handleAxisLabelItalicClick = useCallback(() => {
    updateConfig((draft) => {
      draft.axisLabelConfig.fontConfig.isItalic =
        !draft.axisLabelConfig.fontConfig.isItalic;
    });
    updateChartsConfig(
      ["axisLabelConfig", "fontConfig", "isItalic"],
      (draft) => {
        if (draft.type === ChartTypeEnum.line) {
          return !draft.axisConfig.xAxisConfig.axisLabelConfig.fontConfig
            .isItalic;
        }
      }
    );
  }, [updateChartsConfig, updateConfig]);

  return (
    <div className="chart-axis-x-content">
      <div className="chart-axis-row">
        <Checkbox
          checked={config.isShowAxis}
          onChange={(e) => {
            updateConfig((draft) => {
              draft.isShowAxis = e.target.checked;
            });
            updateChartsConfig(["isShowAxis"], e.target.checked);
          }}
        >
          显示X轴
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
            updateChartsConfig(
              ["axisTitleConfig", "isShowTitleAndUnit"],
              e.target.checked
            );
          }}
        >
          显示标题和单位
        </Checkbox>
      </div>
      <div className="chart-axis-row sub-content">
        <span>标题</span>
        <Input
          size="small"
          maxLength={30}
          placeholder="请输入标题"
          disabled={isTitleAndUnitDisabled}
          value={config.axisTitleConfig.title}
          onChange={(e) => {
            updateConfig((draft) => {
              draft.axisTitleConfig.title = e.target.value;
            });
            updateChartsConfig(["axisTitleConfig", "title"], e.target.value);
          }}
        />
      </div>
      <div className="chart-axis-row sub-content">
        <span>单位</span>
        <Input
          size="small"
          maxLength={30}
          placeholder="请输入单位"
          disabled={isTitleAndUnitDisabled}
          value={config.axisTitleConfig.unit}
          onChange={(e) => {
            updateConfig((draft) => {
              draft.axisTitleConfig.unit = e.target.value;
            });
            updateChartsConfig(["axisTitleConfig", "unit"], e.target.value);
          }}
        />
      </div>
      <div className="chart-axis-row sub-content">
        <FontConfigPanel
          label="文本"
          colorValue={config.axisTitleConfig.fontConfig.color}
          fontSizeValue={config.axisTitleConfig.fontConfig.fontSize}
          boldButtonType={
            config.axisTitleConfig.fontConfig.isBold ? "primary" : "text"
          }
          italicButtonType={
            config.axisTitleConfig.fontConfig.isItalic ? "primary" : "text"
          }
          inputWidth={82}
          isDisabled={isTitleAndUnitDisabled}
          onColorChange={handleTitleUnitFontColorChange}
          onFontSizeChange={handleTitleUnitFontSizeChange}
          onBoldClick={handleTitleUnitBoldClick}
          onItalicClick={handleTitleUnitItalicClick}
        />
      </div>
      <div className="chart-axis-label">
        <Checkbox
          checked={config.axisLabelConfig.isShowAxisLabel}
          disabled={!config.isShowAxis}
          onChange={(e) => {
            updateConfig((draft) => {
              draft.axisLabelConfig.isShowAxisLabel = e.target.checked;
            });
            updateChartsConfig(
              ["axisLabelConfig", "isShowAxisLabel"],
              e.target.checked
            );
          }}
        >
          显示坐标轴标签
        </Checkbox>
      </div>
      <div className="chart-axis-row sub-content">
        <FontConfigPanel
          label="文本"
          colorValue={config.axisLabelConfig.fontConfig.color}
          fontSizeValue={config.axisLabelConfig.fontConfig.fontSize}
          boldButtonType={
            config.axisLabelConfig.fontConfig.isBold ? "primary" : "text"
          }
          italicButtonType={
            config.axisLabelConfig.fontConfig.isItalic ? "primary" : "text"
          }
          inputWidth={82}
          isDisabled={isAxisLabelDisabled}
          onColorChange={handleAxisLabelFontColorChange}
          onFontSizeChange={handleAxisLabelFontSizeChange}
          onBoldClick={handleAxisLabelBoldClick}
          onItalicClick={handleAxisLabelItalicClick}
        />
      </div>
      <div className="chart-axis-row">
        <Checkbox
          checked={config.isShowTickLine}
          disabled={!config.isShowAxis}
          onChange={(e) => {
            updateConfig((draft) => {
              draft.isShowTickLine = e.target.checked;
            });
            updateChartsConfig(["isShowTickLine"], e.target.checked);
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
            updateChartsConfig(
              ["axisLineConfig", "isShowLine"],
              e.target.checked
            );
          }}
        >
          显示坐标轴
        </Checkbox>
      </div>
      <div className="chart-axis-row sub-content">
        <LineStyleSelect
          disabled={isAxisLineDisabled}
          value={config.axisLineConfig.lineStyle}
          onDataChange={(value) => {
            updateConfig((draft) => {
              draft.axisLineConfig.lineStyle = value;
            });
            updateChartsConfig(["axisLineConfig", "lineStyle"], value);
          }}
          style={{ width: 80 }}
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
            updateChartsConfig(["axisLineConfig", "lineWidth"], value ?? 1);
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
            updateChartsConfig(
              ["axisLineConfig", "lineColor"],
              color.toHexString()
            );
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
            updateChartsConfig(
              ["axisGridConfig", "isShowLine"],
              e.target.checked
            );
          }}
        >
          显示网格线
        </Checkbox>
      </div>
      <div className="chart-axis-row sub-content">
        <LineStyleSelect
          disabled={isAxisGridDisabled}
          value={config.axisGridConfig.lineStyle}
          onDataChange={(value) => {
            updateConfig((draft) => {
              draft.axisGridConfig.lineStyle = value;
            });
            updateChartsConfig(["axisGridConfig", "lineStyle"], value);
          }}
          style={{ width: 80 }}
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
            updateChartsConfig(["axisGridConfig", "lineWidth"], value ?? 1);
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
            updateChartsConfig(
              ["axisGridConfig", "lineColor"],
              color.toHexString()
            );
          }}
        />
      </div>
    </div>
  );
});

export default ChartXAxisComponent;
