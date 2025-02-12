import React, { useCallback } from "react";
import { PageContainer, ProCard } from "@ant-design/pro-components";
import { Button, Divider, Popover, Space } from "antd";
import RecommendCardList from "../../components/dashboard/RecommendCardList/RecommendCardList";
import DashboardTable from "../../components/dashboard/DashboardTable/DashboardTable";
import QuickActionsBar from "../../components/dashboard/QuickActionBar/QuickActionsBar";
import { SegmentedItems } from "../../components/dashboard/utils/types";
import {
  CaretDownOutlined,
  CaretUpOutlined,
  FundOutlined,
  FundProjectionScreenOutlined,
} from "@ant-design/icons";
const prefixCls = "workbench-page";
/** 创建报表的pop提示框内容 */
const content = (
  <div className={`${prefixCls}-popover-content`} style={{ width: 220 }}>
    <div className="create-report-title">{"快捷创建"}</div>
    <div
      className="create-report-items"
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginTop: 10,
      }}
    >
      <Button icon={<FundOutlined />} type="text">
        {"仪表板"}
      </Button>
      <Button icon={<FundProjectionScreenOutlined />} type="text">
        {"数据大屏"}
      </Button>
    </div>
  </div>
);
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

  return (
    <PageContainer
      extra={
        <Popover
          content={content}
          trigger={["hover"]}
          arrow={false}
          placement="bottomRight"
        >
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
        </Popover>
      }
    >
      <ProCard
        style={{
          minHeight: 700,
        }}
        bordered
      >
        <RecommendCardList />
        <Divider style={{ margin: "15px 0" }} />
        <Space direction="vertical" size="middle" style={{ width: "100%" }}>
          <QuickActionsBar onSegmentedChange={handleSegmentedChange} />
          <DashboardTable />
        </Space>
      </ProCard>
    </PageContainer>
  );
};

export default WorkBenchPage;
