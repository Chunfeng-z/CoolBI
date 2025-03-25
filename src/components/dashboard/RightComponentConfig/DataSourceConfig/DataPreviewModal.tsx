import { SearchOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Flex,
  Input,
  Modal,
  Row,
  Space,
  Tabs,
  TabsProps,
  Tooltip,
  Tree,
} from "antd";
import React, { useMemo, useState } from "react";

// 添加Tree数据类型
type TreeDataNode = {
  title: string;
  key: string;
  children?: TreeDataNode[];
  tooltip?: string;
};

interface DataPreviewModalProps {
  /** 是否显示数据预览对话框 */
  isPreviewModalVisible: boolean;
  /** 关闭数据预览对话框 */
  handleCancel: () => void;
  /** 确定数据预览对话框 */
  handleOk: () => void;
}

/** 数据预览的对话框 */
const DataPreviewModal: React.FC<DataPreviewModalProps> = (props) => {
  const { isPreviewModalVisible, handleCancel, handleOk } = props;
  /** 当前选中的菜单项 */
  const [activeTab, setActiveTab] = useState<string>("all");
  /** 搜索关键词 */
  const [searchValue, setSearchValue] = useState<string>("");

  /** 书就预览左侧的标签页配置 */
  // 标签页配置
  const tabItems: TabsProps["items"] = [
    {
      key: "all",
      label: "全部",
    },
    {
      key: "used",
      label: "已使用",
    },
  ];
  // 渲染Tree节点
  const renderTreeNodes = (data: TreeDataNode[]) => {
    return data.map((item) => {
      if (item.children) {
        return (
          <Tree.TreeNode
            key={item.key}
            title={
              <Tooltip title={item.tooltip}>
                <span>{item.title}</span>
              </Tooltip>
            }
          >
            {renderTreeNodes(item.children)}
          </Tree.TreeNode>
        );
      }
      return (
        <Tree.TreeNode
          key={item.key}
          title={
            <Tooltip title={item.tooltip}>
              <span>{item.title}</span>
            </Tooltip>
          }
        />
      );
    });
  };

  /** 模拟全部数据 */
  const allTreeData: TreeDataNode[] = useMemo(
    () => [
      {
        title: "维度1",
        key: "dim1",
        tooltip: "这是维度1的说明",
        children: [
          { title: "子维度1-1", key: "dim1-1", tooltip: "子维度1-1的说明" },
          { title: "子维度1-2", key: "dim1-2", tooltip: "子维度1-2的说明" },
        ],
      },
      {
        title: "维度2",
        key: "dim2",
        tooltip: "这是维度2的说明",
        children: [
          { title: "子维度2-1", key: "dim2-1", tooltip: "子维度2-1的说明" },
        ],
      },
    ],
    []
  );
  /** 模拟已使用数据 */
  const usedTreeData: TreeDataNode[] = useMemo(
    () => [
      { title: "已使用维度1", key: "used1" },
      { title: "已使用维度2", key: "used2" },
      { title: "已使用维度3", key: "used3" },
    ],
    []
  );
  return (
    <Modal
      title="预览数据集"
      open={isPreviewModalVisible}
      classNames={{
        content: "preview-data-source-modal-content",
      }}
      width={1000}
      onOk={handleOk}
      onCancel={handleCancel}
      styles={{
        body: {
          height: 450,
        },
        content: {
          padding: 15,
        },
      }}
      footer={[
        <Button
          key="back"
          onClick={handleCancel}
          size="middle"
          style={{ width: 80 }}
        >
          取消
        </Button>,
        <Button
          key="submit"
          type="primary"
          onClick={handleOk}
          size="middle"
          style={{ width: 80 }}
        >
          确定
        </Button>,
      ]}
    >
      <Row className="preview-modal-content" style={{ height: "100%" }}>
        <Col
          style={{
            width: 240,
            borderRight: "1px solid #f0f0f0",
            padding: "0 10px 0 0",
          }}
          className="data-source-tree-panel"
        >
          <Tabs
            items={tabItems}
            activeKey={activeTab}
            onChange={setActiveTab}
            size="small"
          />
          {activeTab === "all" && (
            <>
              <Input
                placeholder="输入关键字检索数据源"
                prefix={<SearchOutlined />}
                size="small"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                style={{ marginBottom: 8 }}
              />
              <div className="tree-wrapper">
                <Tree defaultExpandAll>{renderTreeNodes(allTreeData)}</Tree>
              </div>
            </>
          )}
          {activeTab === "used" && (
            <div>
              <Tree showLine>
                {usedTreeData.map((item) => (
                  <Tree.TreeNode key={item.key} title={item.title} />
                ))}
              </Tree>
            </div>
          )}
        </Col>
        <Col flex="auto" style={{ display: "flex", flexDirection: "column" }}>
          <div className="data-source-table-wrapper" style={{ flex: "1" }}>
            1
          </div>
          <Flex
            justify="space-between"
            className="data-source-table-footer"
            style={{
              height: 30,
              border: "1px solid #f0f0f0",
              padding: "0 10px",
              fontSize: 12,
              color: "#747474",
            }}
            align="center"
          >
            <Space className="select-tips">
              <span>维度：x</span>
              <span>度量：y</span>
            </Space>
            <span className="preview-data-tips">最多预览前100行数据</span>
          </Flex>
        </Col>
      </Row>
    </Modal>
  );
};

export default DataPreviewModal;
