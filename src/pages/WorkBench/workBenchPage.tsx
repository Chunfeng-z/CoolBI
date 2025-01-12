import React from "react";
import { PageContainer, ProCard } from "@ant-design/pro-components";
import {
  Button,
  Divider,
  Dropdown,
  Flex,
  Input,
  MenuProps,
  Segmented,
  Space,
} from "antd";
import RecommendDashboard from "../../components/dashboard/commendDashboard";
import { DownOutlined, SearchOutlined } from "@ant-design/icons";
import DashboardTable from "../../components/dashboard/dashboardTable";

const items: MenuProps["items"] = [
  {
    key: "1",
    label: (
      <a target="_blank" rel="noopener noreferrer">
        全部类型
      </a>
    ),
  },
  {
    type: "divider",
  },
  {
    key: "2",
    label: (
      <a target="_blank" rel="noopener noreferrer">
        2nd menu item
      </a>
    ),
  },
  {
    key: "3",
    label: (
      <a target="_blank" rel="noopener noreferrer">
        3rd menu item
      </a>
    ),
  },
  {
    key: "4",
    danger: true,
    label: "a danger item",
  },
];

const QuickActionsBar: React.FC = () => {
  const actions = [
    { label: "最近编辑", value: "1" },
    {
      label: "我创建的",
      value: "2",
    },
    {
      label: "我收藏的",
      value: "3",
    },
  ];
  return (
    <div className="quick-action-bar-container">
      <Flex justify="space-between">
        <div className="quick-action-bar-nav">
          <Segmented options={actions}></Segmented>
        </div>
        <div className="quick-action-bar-extra-content">
          <Space size="large">
            <Input prefix={<SearchOutlined />}></Input>
            <Dropdown
              menu={{ items, selectable: true, defaultSelectedKeys: ["1"] }}
              placement="bottom"
              trigger={["click"]}
            >
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  {"全部类型"}
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
          </Space>
        </div>
      </Flex>
    </div>
  );
};

const WorkBenchPage: React.FC = () => {
  // 快捷操作
  const quickActions = [
    {
      key: "quickAction1",
      name: "创建仪表板",
    },
  ];
  return (
    <PageContainer
      extra={quickActions.map((action) => (
        <Button key={action.key} type="primary">
          {action.name}
        </Button>
      ))}
    >
      <ProCard
        style={{
          height: "150vh",
          minHeight: 800,
        }}
        bordered
      >
        <RecommendDashboard />
        <Divider />
        <Space direction="vertical" size="middle" style={{ width: "100%" }}>
          <QuickActionsBar />
          <DashboardTable />
        </Space>
      </ProCard>
    </PageContainer>
  );
};

export default WorkBenchPage;
