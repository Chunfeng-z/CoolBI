import {
  ArrowRightOutlined,
  ArrowUpOutlined,
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
  Tabs,
  TabsProps,
  Tooltip,
} from "antd";
import React from "react";
const prefixCls = "chart-axis";
/** 图表坐标轴配置 */
const ChartAxis: React.FC = () => {
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "X轴",
      icon: <ArrowRightOutlined />,
      children: (
        <div className={`${prefixCls}-x-content`}>
          <div className="chart-axis-text-simple">
            <Checkbox>显示X轴</Checkbox>
          </div>
          <div className="chart-axis-text-simple">
            <Checkbox>显示标题和单位</Checkbox>
          </div>
          <div className="chart-axis-text">
            <span>标题</span>
            <Input size="small" maxLength={20} placeholder="请输入标题" />
          </div>
          <div className="chart-axis-text">
            <span>单位</span>
            <Input size="small" maxLength={20} placeholder="请输入单位" />
          </div>
          <div className="chart-axis-text">
            <span>文本</span>
            <ColorPicker size="small" />
            <InputNumber
              size="small"
              addonAfter="px"
              min={0}
              max={20}
              defaultValue={12}
              step={1}
              changeOnWheel
              style={{ width: 100 }}
            />
            <Tooltip title="加粗">
              <Button type="text" icon={<BoldOutlined />} size="small" />
            </Tooltip>
            <Tooltip title="斜体">
              <Button type="text" icon={<ItalicOutlined />} size="small" />
            </Tooltip>
          </div>
          <div className="chart-axis-text-simple">
            <Checkbox>显示坐标轴标签</Checkbox>
          </div>
          <div className="chart-axis-text">
            <span>文本</span>
            <ColorPicker size="small" />
            <InputNumber
              size="small"
              addonAfter="px"
              min={0}
              max={20}
              defaultValue={12}
              step={1}
              changeOnWheel
              style={{ width: 100 }}
            />
            <Tooltip title="加粗">
              <Button type="text" icon={<BoldOutlined />} size="small" />
            </Tooltip>
            <Tooltip title="斜体">
              <Button type="text" icon={<ItalicOutlined />} size="small" />
            </Tooltip>
          </div>
          <div className="chart-axis-text-simple">
            <Checkbox>显示刻度线</Checkbox>
          </div>
          <div className="chart-axis-text-simple">
            <Checkbox>显示坐标轴</Checkbox>
          </div>
          <div className="chart-axis-text">
            <InputNumber
              size="small"
              addonAfter="px"
              min={1}
              max={4}
              defaultValue={1}
              step={1}
              changeOnWheel
              style={{ width: 100 }}
            />
            <ColorPicker size="small" />
          </div>
          <div className="chart-axis-text-simple">
            <Checkbox>显示网格线</Checkbox>
          </div>
          <div className="chart-axis-text">
            <InputNumber
              size="small"
              addonAfter="px"
              min={1}
              max={4}
              defaultValue={1}
              step={1}
              changeOnWheel
              style={{ width: 100 }}
            />
            <ColorPicker size="small" />
          </div>
        </div>
      ),
    },
    {
      key: "2",
      label: "Y轴",
      icon: <ArrowUpOutlined />,
      children: (
        <div className={`${prefixCls}-y-content`}>
          <div className="chart-axis-text-simple">
            <Checkbox>显示Y轴</Checkbox>
          </div>
          <div className="chart-axis-text-simple">
            <Checkbox>显示标题和单位</Checkbox>
          </div>
          <div className="chart-axis-text">
            <span>标题</span>
            <Input size="small" placeholder="请输入标题" maxLength={20} />
          </div>
          <div className="chart-axis-text">
            <span>单位</span>
            <Input size="small" placeholder="请输入单位" maxLength={20} />
          </div>
          <div className="chart-axis-text">
            <span>位置</span>
            <Tooltip title="双Y轴下两侧标题会同步">
              <InfoCircleOutlined />
            </Tooltip>
            <Select
              size="small"
              defaultValue="axisOut"
              style={{ width: 120 }}
              options={[
                { value: "axisTop", label: "轴上方" },
                { value: "axisOut", label: "轴外侧" },
              ]}
            />
          </div>
          <div className="chart-axis-text">
            <span>文本</span>
            <ColorPicker size="small" />
            <InputNumber
              size="small"
              addonAfter="px"
              min={0}
              max={20}
              defaultValue={12}
              step={1}
              changeOnWheel
              style={{ width: 100 }}
            />
            <Tooltip title="加粗">
              <Button type="text" icon={<BoldOutlined />} size="small" />
            </Tooltip>
            <Tooltip title="斜体">
              <Button type="text" icon={<ItalicOutlined />} size="small" />
            </Tooltip>
          </div>
          <div className="chart-axis-text-simple">
            <Checkbox>显示坐标轴标签</Checkbox>
          </div>
          <div className="chart-axis-text">
            <span>文本</span>
            <ColorPicker size="small" />
            <InputNumber
              size="small"
              addonAfter="px"
              min={0}
              max={20}
              defaultValue={12}
              step={1}
              changeOnWheel
              style={{ width: 100 }}
            />
            <Tooltip title="加粗">
              <Button type="text" icon={<BoldOutlined />} size="small" />
            </Tooltip>
            <Tooltip title="斜体">
              <Button type="text" icon={<ItalicOutlined />} size="small" />
            </Tooltip>
          </div>
          <div className="chart-axis-text-simple">
            <Checkbox>显示刻度线</Checkbox>
          </div>
          <div className="chart-axis-text-simple">
            <Checkbox>显示坐标轴</Checkbox>
          </div>
          <div className="chart-axis-text">
            <InputNumber
              size="small"
              addonAfter="px"
              min={1}
              max={4}
              defaultValue={1}
              step={1}
              changeOnWheel
              style={{ width: 100 }}
            />
            <ColorPicker size="small" />
          </div>
          <div className="chart-axis-text-simple">
            <Checkbox>显示网格线</Checkbox>
          </div>
          <div className="chart-axis-text">
            <InputNumber
              size="small"
              addonAfter="px"
              min={1}
              max={4}
              defaultValue={1}
              step={1}
              changeOnWheel
              style={{ width: 100 }}
            />
            <ColorPicker size="small" />
          </div>
        </div>
      ),
    },
  ];
  return (
    <div className={`${prefixCls}-container`}>
      <Tabs
        defaultActiveKey="1"
        size="small"
        items={items}
        tabBarGutter={15}
        onChange={(key: string) => {
          console.log(key);
        }}
      />
    </div>
  );
};

export default ChartAxis;
