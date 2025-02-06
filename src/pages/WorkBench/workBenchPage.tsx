import React from "react";
import { PageContainer, ProCard } from "@ant-design/pro-components";
import { Button, Divider, Space } from "antd";
import RecommendCardList from "../../components/dashboard/RecommendCardList/RecommendCardList";
import DashboardTable from "../../components/dashboard/DashboardTable/DashboardTable";
import QuickActionsBar from "../../components/dashboard/QuickActionBar/QuickActionsBar";

/** 工作台页面：创建和管理仪表板等内容 */
const WorkBenchPage: React.FC = () => {
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
          minHeight: 970,
        }}
        bordered
      >
        <RecommendCardList />
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
