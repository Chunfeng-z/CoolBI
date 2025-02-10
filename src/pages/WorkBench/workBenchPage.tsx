import React, { useCallback } from "react";
import { PageContainer, ProCard } from "@ant-design/pro-components";
import { Button, Divider, Dropdown, MenuProps, Space } from "antd";
import RecommendCardList from "../../components/dashboard/RecommendCardList/RecommendCardList";
import DashboardTable from "../../components/dashboard/DashboardTable/DashboardTable";
import QuickActionsBar from "../../components/dashboard/QuickActionBar/QuickActionsBar";
import { SegmentedItems } from "../../components/dashboard/utils";
import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";
/** 工作台页面：创建和管理仪表板等内容 */
const WorkBenchPage: React.FC = () => {
  // 创建表报的hover状态
  const [isHoverCreateReport, setIsHoverCreateReport] = React.useState(false);
  // 当前选中的segmented
  const [selectedSegmented, setSelectedSegmented] =
    React.useState<SegmentedItems>(SegmentedItems.recently_edited);
  // 切换segmented
  const handleSegmentedChange = useCallback((key: SegmentedItems) => {
    console.log("segmented changed:", key);
    setSelectedSegmented(key);
  }, []);
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          1st menu item
        </a>
      ),
    },
    {
      key: "4",
      danger: true,
      label: "a danger item",
    },
  ];

  return (
    <PageContainer
      extra={
        <Dropdown menu={{ items }} placement="bottomRight">
          <Button
            type="primary"
            icon={
              isHoverCreateReport ? <CaretUpOutlined /> : <CaretDownOutlined />
            }
            iconPosition="end"
            onMouseEnter={() => setIsHoverCreateReport(true)}
            onMouseLeave={() => setIsHoverCreateReport(false)}
          >
            {"创建报表"}
          </Button>
        </Dropdown>
      }
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
