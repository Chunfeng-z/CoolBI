import {
  ApartmentOutlined,
  CheckCircleFilled,
  CloseOutlined,
  CloudServerOutlined,
  DatabaseOutlined,
  MoreOutlined,
  SearchOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import DataConnectConfig from "@comp/datacenter/DataConnectConfig/DataConnectConfig";
import {
  Button,
  Card,
  Divider,
  Drawer,
  Input,
  Layout,
  Menu,
  MenuProps,
  Row,
  Space,
  Steps,
  Table,
  theme,
  Tooltip,
} from "antd";
import React, { useMemo, useRef, useState } from "react";

import "./index.scss";
import { useThemeStore } from "@/stores/useThemeStore";
const { Sider, Content } = Layout;
const prefixCls = "data-center-page";
const { useToken } = theme;

const DataCenterMenuItems: MenuProps["items"] = [
  {
    key: "dataBuilding",
    label: "数据构建",
    icon: <CloudServerOutlined />,
    children: [
      { label: "数据集", key: "dataSet", icon: <DatabaseOutlined /> },
      { label: "数据源", key: "dataSource", icon: <ApartmentOutlined /> },
    ],
  },
];

/** 数据源表格的列定义 */
const columns = [
  {
    title: "名称",
    dataIndex: "name",
    key: "name",
    render: (text: string) => <a>{text}</a>,
  },
  {
    title: "类型",
    dataIndex: "type",
    key: "type",
  },
  {
    title: "大小",
    dataIndex: "size",
    key: "size",
    render: (size: string) => <span>{size}</span>,
  },
  {
    title: "最近同步时间",
    dataIndex: "createTime",
    key: "createTime",
  },
  {
    title: "操作",
    key: "action",
    render: (_: any, record: any) => (
      <Space size="small">
        <Tooltip title="设置">
          <Button type="text" size="small" icon={<SettingOutlined />} />
        </Tooltip>
        <Tooltip title="更多">
          <Button type="text" size="small" icon={<MoreOutlined />} />
        </Tooltip>
      </Space>
    ),
  },
];

/** 表格示例数据 */
const dataSourceList = [
  {
    key: "1",
    name: "MySQL数据库",
    type: "MySQL",
    size: "1kb",
    createTime: "2023-11-01 12:30:45",
  },
  {
    key: "2",
    name: "PostgreSQL服务器",
    type: "PostgreSQL",
    size: "2kb",
    createTime: "2023-10-15 09:22:18",
  },
  {
    key: "3",
    name: "Oracle企业库",
    type: "Oracle",
    size: "3kb",
    createTime: "2023-09-28 16:45:30",
  },
  {
    key: "4",
    name: "MongoDB集群",
    type: "MongoDB",
    size: "5kb",
    createTime: "2023-11-05 08:15:42",
  },
];

// 新建数据源类型定义测试
const dataSourceTypes: {
  id: string;
  title: string;
  items: {
    name: string;
    value: string;
    icon: string;
    subName?: string;
  }[];
}[] = [
  {
    id: "recent-use",
    title: "最近使用",
    items: [
      {
        name: "本地文件",
        value: "local-file",
        icon: "mysql-icon.png",
        subName: "只支持.csv,xls,xlsx",
      },
    ],
  },
  {
    id: "local-file",
    title: "本地文件",
    items: [
      {
        name: "本地文件",
        value: "local-file",
        icon: "mysql-icon.png",
        subName: "只支持.csv,xls,xlsx",
      },
    ],
  },
  {
    id: "cloud-service",
    title: "云服务",
    items: [
      { name: "AWS", value: "aws", icon: "aws-icon.png" },
      { name: "Azure", value: "azure", icon: "azure-icon.png" },
      { name: "Google Cloud", value: "google cloud", icon: "gcp-icon.png" },
    ],
  },
];

/** 数据中心页面 */
const DataCenterPage: React.FC = () => {
  /** 全局的组件样式 */
  const { token } = useToken();
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  /** 全局定义的组件token */
  const headerHeight = token.Layout?.headerHeight ?? "56px";
  /** 侧边栏的折叠状态 */
  const [collapsed, setCollapsed] = useState<boolean>(false);
  /** 选中的数据菜单 */
  const [selectedKeys, setSelectedKeys] = useState<string[]>(["dataSource"]);
  /** 搜索关键词 */
  const [searchKey, setSearchKey] = useState<string>("");
  /** 新建数据源抽屉状态 */
  const [open, setOpen] = useState<boolean>(false);
  /** 数据源类型菜单选中项 */
  const [selectedTypeKey, setSelectedTypeKey] = useState<string[]>([
    "recent-use",
  ]);
  /** 当前步骤-0是选择数据源、1是配置连接，2是完成 */
  const [currentStep, setCurrentStep] = useState<number>(0);
  /** 选择的数据源项 */
  const [selectedDataSource, setSelectedDataSource] = useState<string>("");

  /** 创建引用以访问各个分类区域 */
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const handleShowDrawer = () => {
    setOpen(true);
  };

  const handleCloseDrawer = () => {
    setOpen(false);
    // 每次关闭的时候需要重置步骤&数据源选择
    setCurrentStep(0);
    setSelectedDataSource("");
  };

  /** 处理数据源项点击 */
  const handleDataSourceItemClick = (value: string) => {
    console.log("选择的数据源类型:", value);
    setSelectedDataSource(value);
    // 进入第二步
    setCurrentStep(1);
  };

  /** 处理搜索事件 */
  const handleSearch = () => {
    console.log("开始检索:", searchKey);
    // TODO:这里实现检索逻辑
  };

  /** 处理菜单项选择，并滚动到对应区域 */
  const handleDSMenuSelect = ({
    selectedKeys,
    key,
  }: {
    selectedKeys: string[];
    key: string;
  }) => {
    setSelectedTypeKey(selectedKeys);
    const targetElement = sectionRefs.current[key];
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  // 生成数据源类型菜单项
  const dataSourceMenuItems = useMemo(
    () =>
      dataSourceTypes.map((type) => ({
        key: type.id,
        label: type.title,
      })),
    []
  );

  return (
    <>
      <Layout
        className={prefixCls}
        style={{
          minHeight: `calc(100vh - ${headerHeight})`,
        }}
      >
        <Sider
          width={200}
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          collapsedWidth={50}
          theme="light"
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={["dataSet"]}
            defaultOpenKeys={["dataBuilding"]}
            selectedKeys={selectedKeys}
            onSelect={({ selectedKeys }) => setSelectedKeys(selectedKeys)}
            items={DataCenterMenuItems}
          />
        </Sider>
        <Content
          style={{
            padding: "10px",
          }}
        >
          <Card
            style={{ minHeight: 700, minWidth: 500 }}
            className="data-center-card"
          >
            <Row style={{ alignItems: "center", marginBottom: 16 }}>
              <span style={{ fontSize: 18, fontWeight: 600 }}>数据源</span>
              <Space style={{ marginLeft: "auto" }}>
                <Input
                  placeholder="请输入需要检索的数据源"
                  style={{
                    width: 300,
                  }}
                  value={searchKey}
                  onChange={(e) => setSearchKey(e.target.value)}
                  onPressEnter={handleSearch}
                  prefix={
                    <SearchOutlined
                      onClick={handleSearch}
                      style={{ cursor: "pointer" }}
                    />
                  }
                />
                <Button type="primary" size="middle" onClick={handleShowDrawer}>
                  新建数据源
                </Button>
              </Space>
            </Row>
            <Table
              columns={columns}
              dataSource={dataSourceList}
              pagination={{ pageSize: 10 }}
              size="small"
            />
          </Card>
        </Content>
      </Layout>
      <Drawer
        className="data-source-drawer"
        placement="bottom"
        closable={false}
        onClose={handleCloseDrawer}
        open={open}
        // 通过styles属性设置antd组件样式
        styles={{
          content: {
            backgroundColor: isDarkMode ? "" : "#f6f8fc",
          },
          body: {
            display: "flex",
            flexDirection: "column",
          },
        }}
        height={"90vh"}
      >
        <div className="data-source-header-wrapper">
          <span style={{ fontSize: 18, fontWeight: 500, whiteSpace: "nowrap" }}>
            新建数据源
          </span>
          <div className="extra-wrapper">
            <Steps
              current={currentStep}
              size="small"
              style={{ minWidth: 700, cursor: "pointer" }}
              items={[
                {
                  title: "选择数据源",
                  description: "选择数据源类型",
                  onClick: () => setCurrentStep(0),
                },
                {
                  title: "配置连接",
                  description: "配置数据源连接信息",
                  disabled: currentStep === 0,
                  onClick: () => {
                    // antd的disabled状态只是样式变化
                    if (currentStep !== 0) {
                      setCurrentStep(1);
                    }
                  },
                },
                {
                  title: "完成",
                  description: "完成数据源创建",
                  disabled: currentStep === 0 || currentStep === 1,
                  onClick: () => {
                    if (currentStep !== 0 && currentStep !== 1) {
                      setCurrentStep(2);
                    }
                  },
                },
              ]}
            />
          </div>
          <Button
            type="text"
            size="large"
            icon={<CloseOutlined />}
            onClick={handleCloseDrawer}
          />
        </div>
        {/* 选择数据源 */}
        {currentStep === 0 && (
          <div className="data-source-content-wrapper">
            <div className="data-source-content-menu">
              <Menu
                style={{
                  border: "none",
                  width: 180,
                  backgroundColor: "transparent",
                }}
                theme="dark"
                mode="inline"
                selectedKeys={selectedTypeKey}
                onSelect={handleDSMenuSelect}
                items={dataSourceMenuItems}
              />
            </div>
            {/* 分隔线高度与父元素保持一致 */}
            <Divider
              type="vertical"
              style={{ borderWidth: 2, height: "100%", marginInline: 20 }}
            />
            <div className="data-source-list">
              {dataSourceTypes.map((type) => (
                <div key={type.id}>
                  <div
                    id={type.id}
                    ref={(el) => (sectionRefs.current[type.id] = el)}
                  >
                    <h4>{type.title}</h4>
                  </div>
                  <Space
                    size={[12, 12]}
                    wrap
                    style={{ marginTop: 8, marginBottom: 24 }}
                  >
                    {type.items.map((item, index) => (
                      <div
                        className="data-source-item"
                        key={`${type.id}-${index}`}
                        onClick={() => handleDataSourceItemClick(item.value)}
                        style={{
                          backgroundColor: isDarkMode
                            ? token.colorBgContainer
                            : "#fff",
                        }}
                      >
                        <div className="icon">
                          <img
                            src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
                            alt={item.name}
                            width={30}
                          />
                        </div>
                        <div className="name">
                          <span>{item.name}</span>
                          {item?.subName && (
                            <>
                              <br />
                              <span className="sub-name">{item?.subName}</span>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </Space>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* 数据源连接 */}
        {currentStep === 1 && (
          <DataConnectConfig
            updateStep={() => {
              setCurrentStep(2);
            }}
          />
        )}
        {/* 数据源文件上传成功 */}
        {currentStep === 2 && (
          <div className="create-data-source-success">
            <Space className="header-tip">
              <CheckCircleFilled style={{ color: "#0CC448" }} />
              <span>您的数据源已创建成功</span>
            </Space>
            <Button type="primary" onClick={handleCloseDrawer}>
              返回数据源列表
            </Button>
          </div>
        )}
      </Drawer>
    </>
  );
};

export default DataCenterPage;
