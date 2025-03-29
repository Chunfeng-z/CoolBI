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
import React from "react";
const prefixCls = "series-config";

/** 图表系列配置 */
const SeriesConfig: React.FC = () => {
  return (
    <div className={`${prefixCls}-container`}>
      <div className="series-config-label">
        <span>请选择字段</span>
      </div>
      <div className="series-config-row">
        <Select size="small" style={{ width: "100%" }} />
      </div>
      <Divider style={{ marginBlock: 4 }} />
      <div className="series-config-label">
        <span>线条样式</span>
      </div>
      <div className="series-config-row sub-content">
        <Select
          size="small"
          style={{ width: 110 }}
          getPopupContainer={(triggerNode) => triggerNode.parentElement!}
          options={[
            {
              value: "solid",
              label: (
                <div className="chart-trend-line-style">
                  <div className="chart-trend-line-style-solid" />
                </div>
              ),
            },
            {
              value: "dashed",
              label: (
                <div className="chart-trend-line-style">
                  <div className="chart-trend-line-style-dashed" />
                </div>
              ),
            },
          ]}
        />
        <InputNumber
          size="small"
          min={1}
          max={10}
          style={{ width: 80 }}
          addonAfter="px"
        />
      </div>
      <div className="series-config-row">
        <Checkbox>显示数据标签</Checkbox>
      </div>
      <div className="series-config-row">
        <span>文本</span>
        <ColorPicker size="small" />
        <InputNumber
          size="small"
          min={12}
          max={30}
          defaultValue={14}
          step={1}
          style={{ width: 80 }}
          addonAfter="px"
        />
        <Tooltip title="加粗">
          <Button type="text" icon={<BoldOutlined />} size="small" />
        </Tooltip>
        <Tooltip title="斜体">
          <Button type="text" icon={<ItalicOutlined />} size="small" />
        </Tooltip>
      </div>
      <div className="series-config-row">
        <Checkbox>显示最值</Checkbox>
      </div>
      <div className="series-config-label">
        <span>指标数据前后缀</span>
      </div>
      <div className="series-config-row sub-content">
        <span>前缀</span>
        <Input
          size="small"
          placeholder="请填写(如¥)"
          maxLength={4}
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
          style={{
            width: 160,
          }}
        />
      </div>
    </div>
  );
};

export default SeriesConfig;
