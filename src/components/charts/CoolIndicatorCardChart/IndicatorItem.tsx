import React, { memo } from "react";

import EllipsisText from "@/components/common/EllipsisText";
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
}

const IndicatorItem: React.FC<IIndicatorItemProps> = memo((props) => {
  const {
    style,
    indicatorName,
    indicatorValue,
    indicatorValuePrefix,
    indicatorValueSuffix,
  } = props;
  console.log("IndicatorItem render");
  return (
    <div className={prefixCls} style={{ ...style }}>
      <div className="indicator-main">
        <div className="indicator-name">
          <div className="indicator-icon-wrapper"></div>
          <EllipsisText text={indicatorName} className="indicator-name-text" />
        </div>
        <div className="indicator-value">
          <EllipsisText
            text={indicatorValuePrefix}
            className="indicator-value-prefix"
            style={{
              maxWidth: 50,
            }}
          />
          <EllipsisText
            text={indicatorValue}
            className="value"
            style={{
              maxWidth: 100,
              fontSize: 24,
            }}
          />
          <EllipsisText
            text={indicatorValueSuffix}
            className="indicator-value-suffix"
            style={{
              maxWidth: 50,
            }}
          />
        </div>
        {/* <div className="sub-indicator-row">
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
            </div> */}
      </div>
    </div>
  );
});

export default IndicatorItem;
