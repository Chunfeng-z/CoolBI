import {
  ApartmentOutlined,
  CalendarOutlined,
  EnvironmentOutlined,
  FieldNumberOutlined,
  FieldStringOutlined,
  FileSearchOutlined,
  LeftOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MoreOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  ConfigProvider,
  Dropdown,
  Flex,
  Input,
  MenuProps,
  Modal,
  Row,
  Select,
  Tabs,
  theme,
  Tooltip,
} from "antd";
import classNames from "classnames";
import React, { useMemo, useState } from "react";

const prefixCls = "data-source-config";
import "./index.scss";
import DataPreviewModal from "./DataPreviewModal";

import CoolFieldList from "@/components/common/CoolFieldList";
import CoolTree from "@/components/common/CoolTree";
import EllipsisText from "@/components/common/EllipsisText";
import DataConnectConfig from "@/components/datacenter/DataConnectConfig/DataConnectConfig";

enum DSSwitchOptionEnum {
  "preview_data" = "预览数据",
  "edit_data" = "编辑当前数据集",
  "replace_data" = "替换当前数据集",
}

/** 字段类型图标 */
const fieldTypeIconMap = {
  string: <FieldStringOutlined style={{ color: "#488BF7" }} />,
  number: <FieldNumberOutlined style={{ color: "#2BC048" }} />,
  date: <CalendarOutlined style={{ color: "#488BF7" }} />,
  address: <EnvironmentOutlined style={{ color: "#488BF7" }} />,
  split: <ApartmentOutlined style={{ color: "#488BF7" }} />,
};

/** 组件数据源配置 */
const DataSourceConfig: React.FC = () => {
  /** 数据源配置的展开收起状态 */
  const [isDSConfigCollapse, setIsDSConfigCollapse] = useState<boolean>(false);

  /** 预览数据的modal显示状态 */
  const [isPreviewModalVisible, setIsPreviewModalVisible] =
    useState<boolean>(false);

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
  ]);

  /** 数据源检索输入框展示状态 */
  const [isFieldSearchVisible, setIsFieldSearchVisible] =
    useState<boolean>(false);
  /** 输入框的数据 */
  const [inputValue, setInputValue] = useState<string>();

  /** 上传本地数据源Modal的显示状态 */
  const [isUploadModalVisible, setIsUploadModalVisible] =
    useState<boolean>(false);

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
                style={{ width: 135 }}
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
                // TODO: 设置为true调试
                // open={true}
                options={options}
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
                        defaultActiveKey="1"
                        items={[
                          { key: "1", label: "已使用", children: menu },
                          { key: "2", label: "全部", children: "2" },
                        ]}
                      />
                    </Flex>
                    <Flex
                      justify="space-around"
                      style={{ padding: "8px 5px 2px" }}
                    >
                      <Button
                        size="small"
                        type="primary"
                        block
                        onClick={() => setIsUploadModalVisible(true)}
                      >
                        上传本地文件
                      </Button>
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
                trigger={["hover"]}
              >
                <Button type="text" size="small" icon={<MoreOutlined />} />
              </Dropdown>
            </div>
            {isFieldSearchVisible ? (
              <div className="data-source-search-wrapper">
                <ConfigProvider
                  theme={{
                    algorithm: theme.compactAlgorithm,
                  }}
                >
                  <Input
                    size="middle"
                    placeholder="请输入关键字检索"
                    allowClear
                    value={inputValue}
                    onChange={(e) => {
                      setInputValue(e.target.value);
                    }}
                    prefix={
                      <LeftOutlined
                        onClick={() => {
                          setIsFieldSearchVisible(false);
                        }}
                      />
                    }
                    style={{ borderRadius: 14 }}
                  />
                </ConfigProvider>
              </div>
            ) : (
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
                  <Button
                    type="text"
                    icon={<FileSearchOutlined />}
                    size="small"
                    onClick={() => {
                      setIsFieldSearchVisible(true);
                    }}
                  />
                </div>
              </div>
            )}
            <div className="tree-wrapper">
              <div className="data-source-dimension-tree-wrapper">
                <div className="data-source-tree-title">
                  <span>维度</span>
                </div>
                <div className="dimension-tree-container">
                  <CoolFieldList searchValue={inputValue} />
                </div>
              </div>
              <div className="data-source-measure-tree-wrapper">
                <div className="data-source-tree-title">
                  <span>度量</span>
                </div>
                <div className="measure-tree-container">
                  <CoolFieldList searchValue={inputValue} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <DataPreviewModal
        isPreviewModalVisible={isPreviewModalVisible}
        handleCancel={handleCancel}
        handleOk={handleOk}
      />
      <Modal
        title="文件上传"
        width={"90%"}
        styles={{
          body: {
            overflowY: "scroll",
          },
          content: {
            height: "780px",
          },
        }}
        open={isUploadModalVisible}
        onCancel={() => {
          setIsUploadModalVisible(false);
        }}
        onOk={() => {
          setIsUploadModalVisible(false);
        }}
        footer={null}
        destroyOnClose={true}
      >
        <DataConnectConfig
          isShowUploadTitle={false}
          updateStep={() => {
            setTimeout(() => {
              setIsUploadModalVisible(false);
            }, 2000);
          }}
        />
      </Modal>
    </>
  );
};

export default DataSourceConfig;
