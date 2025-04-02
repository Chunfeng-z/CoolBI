import React from "react";

import "./index.scss";
import EllipsisText from "@/components/common/EllipsisText";
import {
  IndicatorContentConfig,
  IndicatorLayout,
} from "@/types/chartConfigItems/indicatorCardItems";
const prefixCls = "cool-indicator-card-chart";

interface ICoolIndicatorCardChartProps {
  /** 指标看板元素的布局方式 */
  indicatorLayout: IndicatorLayout;
  /** 指标内容配置 */
  indicatorContentConfig: IndicatorContentConfig;
}

const defaultIndicatorLayout: IndicatorLayout = {
  indicatorRelation: "same-level",
  indicatorBlockGroupType: "swipe",
  maxGroupCount: 2,
  indicatorBlockSeparator: "line",
  indicatorBlockSeparatorColor: "#000000",
};

const defaultIndicatorContentConfig: IndicatorContentConfig = {
  indicatorContentPosition: "center",
  indicatorValueLineSpace: "normal",
  enableFontSetting: true,
  indicatorNameFontConfig: {
    color: "#000000",
    fontSize: 14,
    isBold: false,
    isItalic: false,
  },
  indicatorValueFontConfig: {
    color: "#000000",
    fontSize: 22,
    isBold: false,
    isItalic: false,
  },
  isShowIndicatorDecoration: true,
  indicatorDecorationConfig: [
    {
      id: "icon",
      name: "icon-zhihang",
      color: "#000000",
      icon: "xxx",
    },
  ],
};

/** 指标看板图 */
const CoolIndicatorCardChart: React.FC<ICoolIndicatorCardChartProps> = (
  props
) => {
  const {
    indicatorLayout = defaultIndicatorLayout,
    indicatorContentConfig = defaultIndicatorContentConfig,
  } = props;
  const {
    indicatorRelation,
    indicatorBlockGroupType,
    maxGroupCount,
    indicatorBlockSeparator,
    indicatorBlockSeparatorColor,
  } = indicatorLayout;
  return (
    <div className={prefixCls}>
      <div className="indicator-container">
        <div
          className="indicator-item"
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div className="indicator-main">
            <div className="indicator-name">
              <div className="indicator-icon-wrapper"></div>
              <EllipsisText
                text="xxxxxxxxxxxxxx"
                width={100}
                className="indicator-name-text"
              />
            </div>
            <div className="indicator-value">
              <EllipsisText
                text="这是指标值的前缀"
                className="indicator-value-prefix"
                style={{
                  maxWidth: 50,
                }}
              />
              <EllipsisText
                text="121"
                className="value"
                style={{
                  maxWidth: 100,
                  fontSize: 24,
                }}
              />
              <EllipsisText
                text="这是指标值的后缀"
                className="indicator-value-suffix"
                style={{
                  maxWidth: 50,
                }}
              />
            </div>
            <div className="sub-indicator-row">
              <div className="sub-indicator-name-wrapper">
                <div className="sub-indicator-name">
                  <EllipsisText
                    text="环比的值是xxx"
                    className="sub-indicator-name-text"
                    style={{
                      fontSize: 12,
                    }}
                  />
                </div>
                <div className="sub-indicator-name">
                  <EllipsisText
                    text="环比"
                    className="sub-indicator-name-text"
                    style={{
                      fontSize: 12,
                    }}
                  />
                </div>
              </div>
              <div className="sub-indicator-value-wrapper">
                <div className="sub-indicator-value">
                  <EllipsisText
                    text="21322222"
                    className="sub-indicator-value-text"
                    style={{
                      fontSize: 12,
                    }}
                  />
                </div>
                <div className="sub-indicator-value">
                  <EllipsisText
                    text="3.134321"
                    className="sub-indicator-value-text"
                    style={{
                      fontSize: 12,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoolIndicatorCardChart;
