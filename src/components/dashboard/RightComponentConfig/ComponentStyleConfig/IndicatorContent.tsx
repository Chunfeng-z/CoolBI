import {
  AlignCenterOutlined,
  AlignLeftOutlined,
  BoldOutlined,
  ItalicOutlined,
} from "@ant-design/icons";
import { Button, ColorPicker, InputNumber, Radio, Switch, Tooltip } from "antd";
import React from "react";
const prefixCls = "indicator-content";

/** 指标内容配置 */
const IndicatorContent: React.FC = () => {
  return (
    <div className={`${prefixCls}-container`}>
      <div className="indicator-content-label">
        <span>内容在指标块中的位置</span>
      </div>
      <div className="indicator-content-row-vertical sub-content">
        <Radio.Group
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
          options={[
            {
              value: "left",
              label: (
                <div>
                  <AlignLeftOutlined style={{ marginRight: 5 }} />
                  <span>横向居左</span>
                </div>
              ),
            },
            {
              value: "center",
              label: (
                <div>
                  <AlignCenterOutlined
                    style={{
                      marginRight: 5,
                    }}
                  />
                  <span>横向居中</span>
                </div>
              ),
            },
          ]}
        />
      </div>
      <div className="indicator-content-row-vertical">
        <span>指标值行间距</span>
        <Radio.Group
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
          options={[
            {
              value: "normal",
              label: <span>适中</span>,
            },
            {
              value: "small",
              label: <span>紧凑</span>,
            },
          ]}
        />
      </div>
      <div className="indicator-content-fontsize-config-wrapper">
        <div className="fontsize-config-header">
          <span>字号设置</span>
          <Switch size="small" defaultChecked />
        </div>
        <div className="indicator-content-label">
          <span>指标</span>
        </div>
        <div className="indicator-content-row sub-content">
          <span>名称</span>
          <ColorPicker size="small" />
          <InputNumber
            size="small"
            min={12}
            max={30}
            defaultValue={14}
            step={1}
            style={{ width: 50 }}
          />
          px
          <Tooltip title="加粗">
            <Button type="text" icon={<BoldOutlined />} size="small" />
          </Tooltip>
          <Tooltip title="斜体">
            <Button type="text" icon={<ItalicOutlined />} size="small" />
          </Tooltip>
        </div>
        <div className="indicator-content-row sub-content">
          <span>数值</span>
          <ColorPicker size="small" />
          <InputNumber
            size="small"
            min={12}
            max={40}
            defaultValue={32}
            step={1}
            style={{ width: 50 }}
          />
          px
          <Tooltip title="加粗">
            <Button type="text" icon={<BoldOutlined />} size="small" />
          </Tooltip>
          <Tooltip title="斜体">
            <Button type="text" icon={<ItalicOutlined />} size="small" />
          </Tooltip>
        </div>
      </div>
      <div className="indicator-content-decorate-image-wrapper">
        <div className="decorate-image-header">
          <span>指标修饰图</span>
          <Switch size="small" defaultChecked />
        </div>
        <div className="decorate-image-container">
          <div className="field-name">
            <div
              className="field-name-indicator"
              style={{ backgroundColor: "red" }}
            />
            <span>{"销售额"}</span>
          </div>
          <div className="media-selector-wrapper"></div>
        </div>
      </div>
    </div>
  );
};

export default IndicatorContent;
