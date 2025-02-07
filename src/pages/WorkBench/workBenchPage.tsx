import React, { useCallback } from "react";
import { PageContainer, ProCard } from "@ant-design/pro-components";
import { Button, Divider, Space } from "antd";
import RecommendCardList from "../../components/dashboard/RecommendCardList/RecommendCardList";
import DashboardTable from "../../components/dashboard/DashboardTable/DashboardTable";
import QuickActionsBar from "../../components/dashboard/QuickActionBar/QuickActionsBar";
import { SegmentedItems } from "../../components/dashboard/utils";
/** 工作台页面：创建和管理仪表板等内容 */
const WorkBenchPage: React.FC = () => {
  // 当前选中的segmented
  const [selectedSegmented, setSelectedSegmented] =
    React.useState<SegmentedItems>(SegmentedItems.recently_edited);
  // 切换segmented
  const handleSegmentedChange = useCallback((key: SegmentedItems) => {
    setSelectedSegmented(key);
  }, []);
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
          minHeight: 700,
        }}
        bordered
      >
        <RecommendCardList />
        <Divider />
        <Space direction="vertical" size="middle" style={{ width: "100%" }}>
          <QuickActionsBar onSegmentedChange={handleSegmentedChange} />
          <DashboardTable />
        </Space>
      </ProCard>
    </PageContainer>
  );
};

export default WorkBenchPage;
