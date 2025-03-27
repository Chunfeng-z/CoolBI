import { EditOutlined, InfoCircleOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Col,
  ConfigProvider,
  Flex,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Tooltip,
  Typography,
  InputNumber,
} from "antd";
import React, { useState } from "react";

import "./index.scss";
import CoolCollapse from "@/components/common/CoolCollapse";

const { Text } = Typography;
const { Option } = Select;

const prefixCls = "data-analysis-config";

// 辅助线类型选项
const AUXILIARY_LINE_TYPES = [
  { label: "最大值", value: "max" },
  { label: "最小值", value: "min" },
  { label: "平均值", value: "average" },
  { label: "中位数", value: "median" },
  { label: "自定义", value: "custom" },
];

// 趋势线类型选项
const TREND_LINE_TYPES = [
  { label: "线性", value: "linear" },
  { label: "多项式", value: "polynomial" },
  { label: "指数", value: "exponential" },
  { label: "对数", value: "logarithmic" },
];

// 辅助线配置项接口
interface AuxiliaryLineConfig {
  id: string;
  name: string;
  field: string;
  type: string;
}

// 趋势线配置项接口
interface TrendLineConfig {
  id: string;
  name: string;
  field: string;
  type: string;
  futureRange: number;
}

/** 组件的数据分析配置 */
const DataAnalysisConfig: React.FC = () => {
  // 辅助线Modal显示状态
  const [auxiliaryLineModalVisible, setAuxiliaryLineModalVisible] =
    useState(false);
  // 辅助线配置列表
  const [auxiliaryLineConfigs, setAuxiliaryLineConfigs] = useState<
    AuxiliaryLineConfig[]
  >([]);

  // 趋势线Modal显示状态
  const [trendLineModalVisible, setTrendLineModalVisible] = useState(false);
  // 趋势线配置列表
  const [trendLineConfigs, setTrendLineConfigs] = useState<TrendLineConfig[]>(
    []
  );

  // Form实例
  const [form] = Form.useForm();
  const [trendLineForm] = Form.useForm();

  // 打开辅助线Modal
  const showAuxiliaryLineModal = () => {
    form.resetFields();
    setAuxiliaryLineModalVisible(true);
  };

  // 关闭辅助线Modal
  const handleCancel = () => {
    setAuxiliaryLineModalVisible(false);
  };

  // 保存辅助线配置
  const handleSave = () => {
    form.validateFields().then((values) => {
      const newConfig: AuxiliaryLineConfig = {
        id: Date.now().toString(),
        name: values.name,
        field: values.field,
        type: values.type,
      };

      setAuxiliaryLineConfigs([...auxiliaryLineConfigs, newConfig]);
      setAuxiliaryLineModalVisible(false);
    });
  };

  // 打开趋势线Modal
  const showTrendLineModal = () => {
    trendLineForm.resetFields();
    setTrendLineModalVisible(true);
  };

  // 关闭趋势线Modal
  const handleTrendLineCancel = () => {
    setTrendLineModalVisible(false);
  };

  // 保存趋势线配置
  const handleTrendLineSave = () => {
    trendLineForm.validateFields().then((values) => {
      const newConfig: TrendLineConfig = {
        id: Date.now().toString(),
        name: values.name,
        field: values.field,
        type: values.type,
        futureRange: values.futureRange,
      };

      setTrendLineConfigs([...trendLineConfigs, newConfig]);
      setTrendLineModalVisible(false);
    });
  };

  /** 组件数据分析的子菜单 */
  const dataAnalysisItems = [
    {
      key: "1",
      label: "分析预警",
      children: (
        <Flex vertical>
          <Flex
            align="center"
            justify="space-between"
            className="data-analysis-item"
          >
            <span>辅助线</span>
            <Button
              type="text"
              size="small"
              icon={<EditOutlined />}
              onClick={showAuxiliaryLineModal}
            />
          </Flex>
          {auxiliaryLineConfigs.length > 0 &&
            auxiliaryLineConfigs.map((config) => (
              <Row
                key={config.id}
                className="data-analysis-item"
                align="middle"
                style={{ marginLeft: 8 }}
              >
                <Col span={11}>
                  <Tooltip title={config.name}>
                    <Text ellipsis style={{ width: "100%" }}>
                      {config.name}
                    </Text>
                  </Tooltip>
                </Col>
                <Col span={7}>
                  <Tooltip title={config.field}>
                    <Text ellipsis style={{ width: "100%" }}>
                      {config.field}
                    </Text>
                  </Tooltip>
                </Col>
                <Col span={6}>
                  <Tooltip
                    title={
                      AUXILIARY_LINE_TYPES.find((t) => t.value === config.type)
                        ?.label || config.type
                    }
                  >
                    <Text ellipsis style={{ width: "100%" }}>
                      {AUXILIARY_LINE_TYPES.find((t) => t.value === config.type)
                        ?.label || config.type}
                    </Text>
                  </Tooltip>
                </Col>
              </Row>
            ))}
          <Flex
            align="center"
            justify="space-between"
            className="data-analysis-item"
          >
            <span>趋势线</span>
            <Button
              type="text"
              size="small"
              icon={<EditOutlined />}
              onClick={showTrendLineModal}
            />
          </Flex>
          {trendLineConfigs.length > 0 &&
            trendLineConfigs.map((config) => (
              <Row
                key={config.id}
                className="data-analysis-item"
                align="middle"
                style={{ marginLeft: 8 }}
              >
                <Col span={8}>
                  <Tooltip title={config.name}>
                    <Text ellipsis style={{ width: "100%" }}>
                      {config.name}
                    </Text>
                  </Tooltip>
                </Col>
                <Col span={6}>
                  <Tooltip title={config.field}>
                    <Text ellipsis style={{ width: "100%" }}>
                      {config.field}
                    </Text>
                  </Tooltip>
                </Col>
                <Col span={5}>
                  <Tooltip
                    title={
                      TREND_LINE_TYPES.find((t) => t.value === config.type)
                        ?.label || config.type
                    }
                  >
                    <Text ellipsis style={{ width: "100%" }}>
                      {TREND_LINE_TYPES.find((t) => t.value === config.type)
                        ?.label || config.type}
                    </Text>
                  </Tooltip>
                </Col>
                <Col span={5}>
                  <Tooltip title={`${config.futureRange}天`}>
                    <Text ellipsis style={{ width: "100%" }}>
                      {config.futureRange}天
                    </Text>
                  </Tooltip>
                </Col>
              </Row>
            ))}
        </Flex>
      ),
    },
    {
      key: "2",
      label: "智能洞察",
      children: (
        <Flex vertical>
          <Flex className="data-analysis-item" align="center">
            <Checkbox>开启自动见解分析</Checkbox>
            <Tooltip title="图表信息智能解读">
              <Button size="small" type="text" icon={<InfoCircleOutlined />} />
            </Tooltip>
          </Flex>
          <Flex
            align="center"
            justify="space-between"
            className="data-analysis-item"
          >
            <span>预测</span>
            <Button
              type="text"
              size="small"
              icon={<EditOutlined />}
              onClick={() => {
                console.log("趋势线");
              }}
            />
          </Flex>
          <Flex
            align="center"
            justify="space-between"
            className="data-analysis-item"
          >
            <span>异常检测</span>
            <Button
              type="text"
              size="small"
              icon={<EditOutlined />}
              onClick={() => {
                console.log("趋势线");
              }}
            />
          </Flex>
          <Flex
            align="center"
            justify="space-between"
            className="data-analysis-item"
          >
            <span>波动分析</span>
            <Button
              type="text"
              size="small"
              icon={<EditOutlined />}
              onClick={() => {
                console.log("趋势线");
              }}
            />
          </Flex>
        </Flex>
      ),
    },
  ];

  return (
    <>
      <div className={prefixCls}>
        <ConfigProvider>
          <CoolCollapse
            items={dataAnalysisItems}
            defaultActiveKey={["1", "2"]}
          />
        </ConfigProvider>
      </div>
      <Modal
        title="辅助线配置"
        open={auxiliaryLineModalVisible}
        onCancel={handleCancel}
        onOk={handleSave}
        width={600}
        destroyOnClose
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="名称"
            rules={[{ required: true, message: "请输入辅助线名称" }]}
          >
            <Input placeholder="请输入辅助线名称" />
          </Form.Item>

          <Form.Item
            name="field"
            label="字段名"
            rules={[{ required: true, message: "请选择字段" }]}
          >
            <Select placeholder="请选择字段">
              <Option value="sales">销售额</Option>
              <Option value="profit">利润</Option>
              <Option value="quantity">数量</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="type"
            label="辅助线类型"
            rules={[{ required: true, message: "请选择辅助线类型" }]}
          >
            <Select placeholder="请选择辅助线类型">
              {AUXILIARY_LINE_TYPES.map((type) => (
                <Option key={type.value} value={type.value}>
                  {type.label}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="趋势线配置"
        open={trendLineModalVisible}
        onCancel={handleTrendLineCancel}
        onOk={handleTrendLineSave}
        width={600}
        destroyOnClose
      >
        <Form form={trendLineForm} layout="vertical" size="middle">
          <Form.Item
            name="name"
            label="名称"
            rules={[{ required: true, message: "请输入趋势线名称" }]}
          >
            <Input placeholder="请输入趋势线名称" />
          </Form.Item>

          <Form.Item
            name="field"
            label="字段名"
            rules={[{ required: true, message: "请选择字段" }]}
          >
            <Select placeholder="请选择字段">
              <Option value="sales">销售额</Option>
              <Option value="profit">利润</Option>
              <Option value="quantity">数量</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="type"
            label="趋势线类型"
            rules={[{ required: true, message: "请选择趋势线类型" }]}
          >
            <Select placeholder="请选择趋势线类型">
              {TREND_LINE_TYPES.map((type) => (
                <Option key={type.value} value={type.value}>
                  {type.label}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="futureRange"
            label="未来范围（天）"
            rules={[{ required: true, message: "请输入未来范围" }]}
          >
            <InputNumber
              min={1}
              max={365}
              placeholder="请输入天数"
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default DataAnalysisConfig;
