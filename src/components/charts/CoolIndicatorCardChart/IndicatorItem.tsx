import { Space } from "antd";
import React, { memo } from "react";

import EllipsisText from "@/components/common/EllipsisText";
import { DataSourceField, FontConfig } from "@/types/chartConfigItems/common";
const prefixCls = "indicator-item";

interface IIndicatorItemProps {
  style?: React.CSSProperties;
  /** 指标名称 */
  indicatorName?: string;
  /** 指标值 */
  indicatorValue?: string | number;
  /** 指标前缀 */
  indicatorValuePrefix?: string;
  /** 指标后缀 */
  indicatorValueSuffix?: string;
  /** 指标组-指标主第一个元素作为主指标展示 */
  indicatorList?: (DataSourceField & { value: string | number })[];
  /** 是否开启指标主副展示形式 */
  isShowSubIndicator?: boolean;
  /** 开启指标组后的前后缀列表 */
  indicatorValuePrefixList?: string[];
  indicatorValueSuffixList?: string[];
  /** 指标是否开启紧凑布局 */
  isCompactLayout?: boolean;
  /** 指标名称字体配置 */
  indicatorNameFontConfig?: FontConfig;
  /** 指标值字体配置 */
  indicatorValueFontConfig?: FontConfig;
}

const IndicatorItem: React.FC<IIndicatorItemProps> = memo((props) => {
  const {
    style,
    indicatorName,
    indicatorValue,
    indicatorValuePrefix,
    indicatorValueSuffix,
    indicatorList,
    isShowSubIndicator,
    indicatorValuePrefixList,
    indicatorValueSuffixList,
    isCompactLayout,
    indicatorNameFontConfig,
    indicatorValueFontConfig,
  } = props;
  return (
    <div className={prefixCls} style={{ ...style }}>
      <div className="indicator-main">
        <Space direction="vertical" size={isCompactLayout ? 0 : "small"}>
          <div className="indicator-name">
            <div className="indicator-icon-wrapper"></div>
            <EllipsisText
              text={
                isShowSubIndicator ? indicatorList?.[0].name : indicatorName
              }
              style={{
                fontSize: indicatorNameFontConfig?.fontSize,
                color: indicatorNameFontConfig?.color,
                fontWeight: indicatorNameFontConfig?.isBold ? "bold" : "normal",
                fontStyle: indicatorNameFontConfig?.isItalic
                  ? "italic"
                  : "normal",
              }}
              className="indicator-name-text"
            />
          </div>
          <div className="indicator-value">
            <EllipsisText
              text={
                isShowSubIndicator
                  ? indicatorValuePrefixList?.[0]
                  : indicatorValuePrefix
              }
              className="indicator-value-prefix"
              style={{
                maxWidth: 50,
              }}
            />
            <EllipsisText
              text={
                isShowSubIndicator ? indicatorList?.[0].value : indicatorValue
              }
              className="value"
              style={{
                maxWidth: 100,
                fontSize: indicatorValueFontConfig?.fontSize,
                color: indicatorValueFontConfig?.color,
                fontWeight: indicatorValueFontConfig?.isBold
                  ? "bold"
                  : "normal",
                fontStyle: indicatorValueFontConfig?.isItalic
                  ? "italic"
                  : "normal",
              }}
            />
            <EllipsisText
              text={
                isShowSubIndicator
                  ? indicatorValueSuffixList?.[0]
                  : indicatorValueSuffix
              }
              className="indicator-value-suffix"
              style={{
                maxWidth: 50,
              }}
            />
          </div>
          {isShowSubIndicator && (
            <div className="sub-indicator-row">
              <div className="sub-indicator-name-wrapper">
                {indicatorList?.slice(1).map((item, index) => {
                  return (
                    <div className="sub-indicator-name" key={index}>
                      <EllipsisText
                        text={item.name}
                        className="sub-indicator-name-text"
                        style={{
                          fontSize: 12,
                        }}
                      />
                    </div>
                  );
                })}
              </div>
              <div className="sub-indicator-value-wrapper">
                {indicatorList?.slice(1).map((item, index) => {
                  const prefix = indicatorValuePrefixList?.[index + 1] || "";
                  const suffix = indicatorValueSuffixList?.[index + 1] || "";
                  return (
                    <div className="sub-indicator-value" key={index}>
                      <EllipsisText
                        text={prefix + item.value + suffix}
                        className="sub-indicator-value-text"
                        style={{
                          fontSize: 12,
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </Space>
      </div>
    </div>
  );
});

export default IndicatorItem;
