import { SettingOutlined } from "@ant-design/icons";
import { Button, Divider, Radio } from "antd";
import React from "react";
import "./index.scss";
const prefixCls = "component-word-config";
/** 组件字段配置 */
const ComponentWordConfig: React.FC = () => {
  return (
    <div className={`${prefixCls}-container`}>
      <div className="field-area-wrapper">
        <div className="field-area-header">
          <div className="area-name">
            <span>维度</span>
          </div>
          <div className="right-operation">
            <span className="count-limit">1 / 1</span>
            <Button type="text" size="small" icon={<SettingOutlined />} />
          </div>
        </div>
        <div className="field-area-body">
          <div className="blank-area-tip" title="选择数据字段到此处">
            选择数据字段到此处
          </div>
        </div>
      </div>
      <Divider type="horizontal" style={{ margin: "10px 0px" }} />
      <div className="field-area-wrapper">
        <div className="field-area-header">
          <div className="area-name">
            <span>度量</span>
          </div>
          <div className="right-operation">
            <span className="count-limit">1 / 10</span>
            <Button type="text" size="small" icon={<SettingOutlined />} />
          </div>
        </div>
        <div className="field-area-body">
          <div className="blank-area-tip" title="选择数据字段到此处">
            选择数据字段到此处
          </div>
        </div>
      </div>
      <Divider type="horizontal" style={{ margin: "10px 0px" }} />
      <div className="field-area-wrapper">
        <div className="field-area-header">
          <span>指标默认取值</span>
        </div>
        <div className="field-area-body">
          <Radio.Group
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
            options={[
              {
                value: "newestData",
                label: (
                  <div>
                    <span>最新日期数据</span>
                  </div>
                ),
              },
              {
                value: "stageSummaryData",
                label: (
                  <div>
                    <span>阶段汇总数据</span>
                  </div>
                ),
              },
            ]}
          />
        </div>
      </div>
      <div className="update-btn">更新</div>
    </div>
  );
};

export default ComponentWordConfig;
