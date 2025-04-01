import { BoldOutlined, ItalicOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  ColorPicker,
  Divider,
  Input,
  InputNumber,
  Select,
  Tooltip,
} from "antd";
import React, { useEffect, useState } from "react";

import { ChartTypeEnum } from "../../utils";

import useChartStore from "@/stores/useChartStore";
import { DataSeriesConfig } from "@/types/chartConfigItems/common";

const prefixCls = "series-config";

/** 默认配置 */
const defaultConfig: DataSeriesConfig = {
  id: "id",
  name: "销售额",
  lineStyle: "solid",
  lineWidth: 2,
  showDataLabels: false,
  dataLabelConfig: {
    color: "#000000",
    fontSize: 14,
    isBold: false,
    isItalic: false,
  },
  showExtremeValue: false,
  indicatorPrefix: "",
  indicatorSuffix: "",
};

/** 图表系列配置 */
const SeriesConfig: React.FC = () => {
  /** 当前选中图表的所有配置信息 */
  const getCurrentChartConfig = useChartStore(
    (state) => state.getCurrentChartConfig
  );
  /** 当前选中图表的id信息 */
  const curChartId = useChartStore((state) => state.curChartId);
  /** 更新图表配置 */
  const setChartsConfig = useChartStore((state) => state.setChartsConfig);

  /** 当前选中的系列的配置 */
  const [config, setConfig] = useState<DataSeriesConfig>();
  /** 字段选项列表 */
  const [fieldOptions, setFieldOptions] = useState<
    { value: string; label: string }[]
  >([]);

  /** 检查当前选中的图表是否存在数据，没有数据就不存在series */
  const [isShowSeriesConfig, setIsShowSeriesConfig] = useState<boolean>(false);
  /** 当前图表的类型
   * -TODO:指标卡片不支持显示其他的配置信息
   * 因为指标卡片的配置是子集所以即使修改了也不会使用到对应的值
   */
  const [curChartType, setCurChartType] = useState<ChartTypeEnum>();

  // 获取当前选中图表的系列配置
  useEffect(() => {
    const curConfig = getCurrentChartConfig();
    setCurChartType(curConfig?.type);
    // 当前图表没有系列配置采用默认值
    if (curConfig?.seriesConfig && curConfig?.seriesConfig.length > 0) {
      // 如果当前的图表的系列配置存在设置显示配置
      setIsShowSeriesConfig(true);
      // 设置字段选项
      const options = curConfig.seriesConfig.map((series) => ({
        value: series.id,
        label: series.name,
      }));
      setFieldOptions(options);

      // 默认选择第一个系列
      const currentSeries = curConfig.seriesConfig[0] ?? defaultConfig;
      setConfig(currentSeries);
    }
  }, [curChartId]);

  /** 更新配置的工具函数 */
  const updateConfig = (update: Partial<DataSeriesConfig>) => {
    const newConfig = {
      ...config!,
      ...update,
    };
    setConfig(newConfig);

    // 依据id找到对应的系列，并更新配置
    const curConfig = getCurrentChartConfig();
    if (curConfig?.seriesConfig) {
      setChartsConfig(curChartId!, (draft) => {
        if (draft.type === ChartTypeEnum.indicatorTrend) {
          // 遍历draft的seriesConfig找到id对应的执行更新
          const index = draft.seriesConfig.findIndex((series) => {
            return series.id === newConfig.id;
          });
          if (index !== -1) {
            draft.seriesConfig[index] = newConfig;
          }
        }
      });
    }
  };

  /** 处理数据标签配置更新 */
  const updateDataLabelConfig = (
    update: Partial<DataSeriesConfig["dataLabelConfig"]>
  ) => {
    const newDataLabelConfig = {
      ...config!.dataLabelConfig,
      ...update,
    };

    updateConfig({
      dataLabelConfig: newDataLabelConfig!,
    });
  };

  /** 处理字段选择的变化 */
  const handleFieldChange = (seriesId: string) => {
    const curConfig = getCurrentChartConfig();
    if (curConfig?.seriesConfig) {
      const selectedSeries = curConfig.seriesConfig.find(
        (series) => series.id === seriesId
      );
      if (selectedSeries) {
        setConfig(selectedSeries);
      }
    }
  };

  return (
    <div className={`${prefixCls}-container`}>
      <div className="series-config-label">
        <span>请选择字段</span>
      </div>
      <div className="series-config-row">
        <Select
          size="small"
          style={{ width: "100%" }}
          options={fieldOptions}
          value={config?.name}
          onChange={handleFieldChange}
        />
      </div>
      <Divider style={{ marginBlock: 4 }} />

      {isShowSeriesConfig && (
        <>
          {curChartType !== ChartTypeEnum.indicatorCard && (
            <>
              <div className="series-config-label">
                <span>线条样式</span>
              </div>
              <div className="series-config-row sub-content">
                <Select
                  size="small"
                  style={{ width: 110 }}
                  getPopupContainer={(triggerNode) =>
                    triggerNode.parentElement!
                  }
                  value={config?.lineStyle}
                  onChange={(value) => updateConfig({ lineStyle: value })}
                  options={[
                    {
                      value: "solid",
                      label: (
                        <div className="series-config-line-style">
                          <div className="series-config-line-style-solid" />
                        </div>
                      ),
                    },
                    {
                      value: "dashed",
                      label: (
                        <div className="series-config-line-style">
                          <div className="series-config-line-style-dashed" />
                        </div>
                      ),
                    },
                  ]}
                />
                <InputNumber
                  size="small"
                  min={1}
                  max={10}
                  value={config?.lineWidth}
                  onChange={(value) =>
                    updateConfig({ lineWidth: value as number })
                  }
                  style={{ width: 80 }}
                  addonAfter="px"
                />
              </div>
              <div className="series-config-row">
                <Checkbox
                  checked={config?.showDataLabels}
                  onChange={(e) =>
                    updateConfig({ showDataLabels: e.target.checked })
                  }
                >
                  显示数据标签
                </Checkbox>
              </div>
              <div className="series-config-row">
                <span>文本</span>
                <ColorPicker
                  size="small"
                  disabled={!config?.showDataLabels}
                  value={config?.dataLabelConfig?.color}
                  onChange={(color) =>
                    updateDataLabelConfig({ color: color.toHexString() })
                  }
                />
                <InputNumber
                  size="small"
                  min={12}
                  max={20}
                  disabled={!config?.showDataLabels}
                  value={config?.dataLabelConfig?.fontSize}
                  onChange={(value) =>
                    updateDataLabelConfig({ fontSize: value as number })
                  }
                  step={1}
                  style={{ width: 80 }}
                  addonAfter="px"
                />
                <Tooltip title="加粗">
                  <Button
                    type={config?.dataLabelConfig?.isBold ? "primary" : "text"}
                    icon={<BoldOutlined />}
                    size="small"
                    disabled={!config?.showDataLabels}
                    onClick={() =>
                      updateDataLabelConfig({
                        isBold: !config?.dataLabelConfig?.isBold,
                      })
                    }
                  />
                </Tooltip>
                <Tooltip title="斜体">
                  <Button
                    type={
                      config?.dataLabelConfig?.isItalic ? "primary" : "text"
                    }
                    icon={<ItalicOutlined />}
                    size="small"
                    disabled={!config?.showDataLabels}
                    onClick={() =>
                      updateDataLabelConfig({
                        isItalic: !config?.dataLabelConfig?.isItalic,
                      })
                    }
                  />
                </Tooltip>
              </div>
              <div className="series-config-row">
                <Checkbox
                  checked={config?.showExtremeValue}
                  onChange={(e) =>
                    updateConfig({ showExtremeValue: e.target.checked })
                  }
                >
                  显示最值
                </Checkbox>
              </div>
            </>
          )}
          <div className="series-config-label">
            <span>指标数据前后缀</span>
          </div>
          <div className="series-config-row sub-content">
            <span>前缀</span>
            <Input
              size="small"
              placeholder="请填写(如¥)"
              maxLength={4}
              value={config?.indicatorPrefix}
              onChange={(e) =>
                updateConfig({ indicatorPrefix: e.target.value })
              }
              style={{
                width: 160,
              }}
            />
          </div>
          <div className="series-config-row sub-content">
            <span>后缀</span>
            <Input
              size="small"
              placeholder="请填写(如元)"
              maxLength={4}
              value={config?.indicatorSuffix}
              onChange={(e) =>
                updateConfig({ indicatorSuffix: e.target.value })
              }
              style={{
                width: 160,
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default SeriesConfig;
