import {
  FileSearchOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MoreOutlined,
  QuestionCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  Dropdown,
  Flex,
  Input,
  MenuProps,
  Modal,
  Row,
  Select,
  Space,
  Tabs,
  Tooltip,
  Tree,
} from "antd";
import classNames from "classnames";
import React, { useMemo, useState } from "react";

import type { TabsProps } from "antd";

const prefixCls = "data-source-config";
import "./index.scss";
import CoolTree from "@/components/common/CoolTree";
import EllipsisText from "@/components/common/EllipsisText";

// 添加Tree数据类型
type TreeDataNode = {
  title: string;
  key: string;
  children?: TreeDataNode[];
  tooltip?: string;
};

enum DSSwitchOptionEnum {
  "preview_data" = "预览数据",
  "edit_data" = "编辑当前数据集",
  "replace_data" = "替换当前数据集",
}
/** 组件数据源配置 */
const DataSourceConfig: React.FC = () => {
  /** 数据源配置的展开收起状态 */
  const [isDSConfigCollapse, setIsDSConfigCollapse] = useState<boolean>(false);

  /** 预览数据的modal显示状态 */
  const [isPreviewModalVisible, setIsPreviewModalVisible] =
    useState<boolean>(false);

  /** 当前选中的菜单项 */
  const [activeTab, setActiveTab] = useState<string>("all");

  /** 搜索关键词 */
  const [searchValue, setSearchValue] = useState<string>("");

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

  /** 显示预览数据的对话框 */
  const showPreviewDSModal = () => {
    setIsPreviewModalVisible(true);
  };

  const handleOk = () => {
    setIsPreviewModalVisible(false);
  };

  const handleCancel = () => {
    setIsPreviewModalVisible(false);
  };

  /** 数据源切换的更多操作 */
  const DSSwitchOption: MenuProps["items"] = useMemo(
    () => [
      {
        key: "preview_data",
        label: (
          <div onClick={showPreviewDSModal}>
            {DSSwitchOptionEnum.preview_data}
          </div>
        ),
      },
      {
        key: "edit_data",
        label: <div>{DSSwitchOptionEnum.edit_data}</div>,
      },
      {
        key: "replace_data",
        label: <div>{DSSwitchOptionEnum.replace_data}</div>,
      },
    ],
    []
  );
  /** 下拉选中的数据源 */
  const [curSelectDs, setCurSelectDs] = useState<string>();
  /** 数据源选项 */
  const [options, setOptions] = useState<{ value: string; label: string }[]>([
    { value: "jack", label: "Jacksssssssssss" },
    { value: "lucy", label: "Lucy" },
    { value: "Yiminghe", label: "yiminghe" },
  ]);

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

  return (
    <>
      <div
        className={classNames(`${prefixCls}-wrapper`, {
          "is-collapse": isDSConfigCollapse,
        })}
      >
        <div className={`${prefixCls}-header`}>
          <Tooltip title={isDSConfigCollapse ? "展开" : "收起"}>
            <Button
              type="text"
              size="small"
              onClick={() => setIsDSConfigCollapse(!isDSConfigCollapse)}
              icon={
                isDSConfigCollapse ? (
                  <MenuFoldOutlined />
                ) : (
                  <MenuUnfoldOutlined />
                )
              }
            />
          </Tooltip>
          <span
            onClick={() => {
              if (isDSConfigCollapse) {
                setIsDSConfigCollapse(false);
              }
            }}
          >
            数据源
          </span>
        </div>
        {!isDSConfigCollapse && (
          <div className={`${prefixCls}-content`}>
            <div className="data-source-switch">
              <Select
                size="small"
                placement="bottomRight"
                variant="filled"
                style={{ width: 130 }}
                placeholder="选择数据源"
                value={curSelectDs}
                onSelect={(value) => {
                  setCurSelectDs(value);
                }}
                // 当下拉列表为空时显示的内容
                notFoundContent={
                  <Flex justify="center" style={{ height: 50 }} align="center">
                    <span>暂无数据，请添加数据源</span>
                  </Flex>
                }
                // 将下来菜单渲染到下拉框
                getPopupContainer={(triggerNode) => triggerNode.parentElement!}
                // option配置
                options={options}
                // TODO:暂时一直展示下拉菜单，便于调试
                // open={true}
                optionRender={(option) => <span>{option.label}</span>}
                // 自定义渲染下拉菜单，可以自定义option的样式/自己注册事件
                dropdownRender={(menu) => (
                  <div>
                    {curSelectDs && (
                      <Row>
                        <Col
                          span={24}
                          style={{
                            display: "flex",
                            height: 24,
                            backgroundColor: "#1990FF",
                            alignItems: "center",
                            paddingInline: 10,
                            borderRadius: "4px 4px 0 0",
                          }}
                        >
                          <EllipsisText
                            text={curSelectDs}
                            style={{
                              color: "white",
                              width: "90%",
                            }}
                          />
                        </Col>
                      </Row>
                    )}
                    <Flex style={{ padding: "0px 4px" }}>
                      <Tabs
                        size="small"
                        tabBarGutter={15}
                        style={{ width: "100%" }}
                        defaultActiveKey="2"
                        items={[
                          { key: "1", label: "已使用", children: menu },
                          { key: "2", label: "全部", children: "2" },
                        ]}
                      />
                    </Flex>
                    <Flex justify="space-around" style={{ paddingTop: 5 }}>
                      <Col span={11}>
                        <Button
                          size="small"
                          type="primary"
                          style={{ width: "100%" }}
                        >
                          上传本地文件
                        </Button>
                      </Col>
                      <Col span={11}>
                        <Button
                          size="small"
                          type="default"
                          style={{
                            width: "100%",
                          }}
                        >
                          取消
                        </Button>
                      </Col>
                    </Flex>
                  </div>
                )}
                dropdownStyle={{
                  width: 300,
                }}
              />
              <Dropdown
                menu={{ items: DSSwitchOption }}
                placement="bottomRight"
                trigger={["click"]}
              >
                <Button type="text" size="small" icon={<MoreOutlined />} />
              </Dropdown>
            </div>
            <div className="data-source-fields-wrapper">
              <span>字段</span>
              <Tooltip
                title={
                  <>
                    <div>同时选择：Cmd/Ctrl +</div>
                    <div>批量选择：Shift +</div>
                  </>
                }
              >
                <QuestionCircleOutlined />
              </Tooltip>
              <div className="search-wrapper">
                <FileSearchOutlined />
              </div>
            </div>
            <div className="tree-wrapper">
              <div className="data-source-dimension-tree-wrapper">
                <div className="data-source-tree-title">
                  <span>维度</span>
                </div>
                <div className="dimension-tree-container">
                  <CoolTree />
                </div>
              </div>
              <div className="data-source-measure-tree-wrapper">
                <div className="data-source-tree-title">
                  <span>度量</span>
                </div>
                <div className="measure-tree-container">
                  <CoolTree />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
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
    </>
  );
};

export default DataSourceConfig;
