import { ColorPicker, InputNumber, Radio } from "antd";
import classNames from "classnames";
import React, { useEffect, useState } from "react";

import { ChartTypeEnum } from "../../utils";

import useChartStore from "@/stores/useChartStore";
import { IndicatorLayout as IndicatorLayoutType } from "@/types/chartConfigItems/indicatorCardItems";

const prefixCls = "indicator-layout";

/** 默认配置 */
const defaultConfig: IndicatorLayoutType = {
  indicatorRelation: "same-level",
  indicatorBlockGroupType: "swipe",
  maxGroupCount: 3,
  indicatorBlockSeparator: "none",
  indicatorBlockSeparatorColor: "#E0E0E0",
};

/** 指标布局配置 */
const IndicatorLayout: React.FC = () => {
  /** 当前选中图表的所有配置信息 */
  const getCurrentChartConfig = useChartStore(
    (state) => state.getCurrentChartConfig
  );
  /** 当前选中图表的id信息 */
  const curChartId = useChartStore((state) => state.curChartId);
  /** 更新图表配置 */
  const setChartsConfig = useChartStore((state) => state.setChartsConfig);

  /** 内部状态 */
  const [config, setConfig] = useState<IndicatorLayoutType>(defaultConfig);

  // 获取当前选中图表的配置
  useEffect(() => {
    const curConfig = getCurrentChartConfig();
    if (curConfig && curConfig.type === ChartTypeEnum.indicatorCard) {
      setConfig(curConfig.indicatorLayout);
    }
  }, [curChartId, getCurrentChartConfig]);

  /** 更新配置的工具函数 */
  const updateConfig = (update: Partial<IndicatorLayoutType>) => {
    const newConfig = {
      ...config,
      ...update,
    };
    setConfig(newConfig);
    // 更新全局状态
    setChartsConfig(curChartId!, (draft) => {
      if (draft.type === ChartTypeEnum.indicatorCard) {
        draft.indicatorLayout = newConfig;
      }
    });
  };

  return (
    <div className={`${prefixCls}-container`}>
      <div className="indicator-layout-label">
        <span>指标间关系</span>
      </div>
      <div className="indicator-layout-row sub-content">
        <Radio.Group
          style={{
            display: "flex",
          }}
          value={config.indicatorRelation}
          onChange={(e) => updateConfig({ indicatorRelation: e.target.value })}
          options={[
            {
              value: "same-level",
              label: <span>并列</span>,
            },
            {
              value: "sub-level",
              label: <span>主副</span>,
            },
          ]}
        />
      </div>
      <div className="indicator-layout-label">
        <span>指标块组展示形式</span>
      </div>
      <div className="indicator-layout-row sub-content">
        <Radio.Group
          style={{
            display: "flex",
          }}
          // 主副展示的时候不支持平铺的样式切换
          disabled={config.indicatorRelation === "sub-level"}
          value={config.indicatorBlockGroupType}
          onChange={(e) =>
            updateConfig({ indicatorBlockGroupType: e.target.value })
          }
          options={[
            {
              value: "swipe",
              label: <span>左右滑动</span>,
            },
            {
              value: "line-feed",
              label: <span>换行平铺</span>,
            },
          ]}
        />
      </div>
      <div className="indicator-layout-row sub-content">
        <span>每行最多显示</span>
        <InputNumber
          size="small"
          min={1}
          max={10}
          value={config.maxGroupCount}
          // TODO: 目前系统左右滑动也支持调整个数
          disabled={
            config.indicatorRelation === "sub-level" ||
            config.indicatorBlockGroupType === "swipe"
          }
          onChange={(value) => updateConfig({ maxGroupCount: value as number })}
          style={{ width: 100 }}
          addonAfter="个"
        />
      </div>
      <div className="indicator-layout-label">
        <span>指标块分隔</span>
      </div>
      <div className="indicator-layout-row-vertical">
        <div className="indicator-block-separate-container">
          <div className="separate-item">
            <div
              className={classNames("separate-wrapper", {
                "is-selected": config.indicatorBlockSeparator === "none",
              })}
              onClick={() => updateConfig({ indicatorBlockSeparator: "none" })}
            >
              <div className="separate-icon">
                <span>A</span>
                <span>B</span>
              </div>
            </div>
            <div className="separate-text">无</div>
          </div>
          <div className="separate-item">
            <div
              className={classNames("separate-wrapper", {
                "is-selected": config.indicatorBlockSeparator === "line",
              })}
              onClick={() => updateConfig({ indicatorBlockSeparator: "line" })}
            >
              <div className="separate-icon">
                <span>A</span>
                <div className="separate-line" />
                <span>B</span>
              </div>
            </div>
            <div className="separate-text">分割线</div>
          </div>
        </div>
      </div>
      <div className="indicator-layout-row">
        <span>分隔线颜色</span>
        <ColorPicker
          size="small"
          value={config.indicatorBlockSeparatorColor}
          onChange={(color) =>
            updateConfig({ indicatorBlockSeparatorColor: color.toHexString() })
          }
          disabled={config.indicatorBlockSeparator === "none"}
        />
      </div>
    </div>
  );
};

export default IndicatorLayout;
