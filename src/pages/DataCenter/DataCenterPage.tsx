import {
  ApartmentOutlined,
  CloseOutlined,
  CloudServerOutlined,
  DatabaseOutlined,
  MoreOutlined,
  SearchOutlined,
  SettingOutlined,
} from "@ant-design/icons";
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
  Tooltip,
} from "antd";
import { ConfigContext } from "antd/es/config-provider";
import React, { useContext, useRef, useState } from "react";
import "./index.scss";
const { Sider, Content } = Layout;
const prefixCls = "data-center-page";

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
const dataSourceTypes = [
  {
    id: "recent-use",
    title: "最近使用",
    items: [
      { name: "MySQL", icon: "mysql-icon.png" },
      { name: "PostgreSQL", icon: "postgresql-icon.png" },
      { name: "Oracle", icon: "oracle-icon.png" },
    ],
  },
  {
    id: "database",
    title: "数据库",
    items: [
      { name: "MySQL", icon: "mysql-icon.png" },
      { name: "PostgreSQL", icon: "postgresql-icon.png" },
      { name: "Oracle", icon: "oracle-icon.png" },
      { name: "SQL Server", icon: "sqlserver-icon.png" },
      { name: "MongoDB", icon: "mongodb-icon.png" },
      { name: "Redis", icon: "redis-icon.png" },
    ],
  },
  {
    id: "cloud-service",
    title: "云服务",
    items: [
      { name: "AWS", icon: "aws-icon.png" },
      { name: "Azure", icon: "azure-icon.png" },
      { name: "Google Cloud", icon: "gcp-icon.png" },
    ],
  },
  {
    id: "file-upload",
    title: "文件上传",
    items: [
      { name: "CSV", icon: "csv-icon.png" },
      { name: "Excel", icon: "excel-icon.png" },
      { name: "JSON", icon: "json-icon.png" },
      { name: "XML", icon: "xml-icon.png" },
    ],
  },
  {
    id: "api",
    title: "API",
    items: [
      { name: "RESTful API", icon: "rest-icon.png" },
      { name: "GraphQL", icon: "graphql-icon.png" },
      { name: "SOAP", icon: "soap-icon.png" },
    ],
  },
];

/** 数据中心页面 */
const DataCenterPage: React.FC = () => {
  /** 全局的组件样式 */
  const { theme } = useContext(ConfigContext);
  const headerHeight = theme?.components?.Layout?.headerHeight || "56px";
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
  // 创建引用以访问各个分类区域
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const handleShowDrawer = () => {
    setOpen(true);
  };
  const handleCloseDrawer = () => {
    setOpen(false);
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
  const dataSourceMenuItems = dataSourceTypes.map((type) => ({
    key: type.id,
    label: type.title,
  }));

  return (
    <>
      <Layout
        className={prefixCls}
        style={{
          height: `calc(100vh - ${headerHeight})`,
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
        size="large"
      >
        <div className="data-source-header-wrapper">
          <span style={{ fontSize: 18, fontWeight: 500, whiteSpace: "nowrap" }}>
            新建数据源
          </span>
          <div className="extra-wrapper">
            <Steps
              current={0}
              size="small"
              style={{ minWidth: 700 }}
              items={[
                {
                  title: "选择数据源",
                  description: "选择数据源类型",
                },
                {
                  title: "配置连接",
                  description: "配置数据源连接信息",
                },
                {
                  title: "完成",
                  description: "完成数据源创建",
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
                      </div>
                    </div>
                  ))}
                </Space>
              </div>
            ))}
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default DataCenterPage;
