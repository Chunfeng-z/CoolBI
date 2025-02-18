import React, { useCallback } from "react";
import { PageContainer, ProCard } from "@ant-design/pro-components";
import { Button, Divider, Popover, Space } from "antd";
import RecommendCardList from "../../components/workbench/RecommendCardList/RecommendCardList";
import DashboardTable from "../../components/workbench/DashboardTable/DashboardTable";
import QuickActionsBar from "../../components/workbench/QuickActionBar/QuickActionsBar";
import { SegmentedItems } from "../../components/workbench/utils/types";
import "./index.scss";
import {
  CaretDownOutlined,
  CaretUpOutlined,
  FundOutlined,
  FundProjectionScreenOutlined,
} from "@ant-design/icons";
const base = import.meta.env.VITE_BASE;
const prefixCls = "workbench-page";
interface contentProps {
  /** 点击创建仪表板的回调 */
  onCreateDashBoardClick: () => void;
}
/** 创建报表的pop提示框内容 */
const Content: React.FC<contentProps> = (props) => {
  const { onCreateDashBoardClick } = props;
  return (
    <div className={`${prefixCls}-popover-content`}>
      <div className="create-report-title">{"快捷创建"}</div>
      <div className="create-report-items">
        <Button
          icon={<FundOutlined />}
          type="text"
          onClick={onCreateDashBoardClick}
        >
          {"仪表板"}
        </Button>
        <Button icon={<FundProjectionScreenOutlined />} type="text">
          {"数据大屏"}
        </Button>
      </div>
    </div>
  );
};
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
  // 点击跳转到创建仪表板界面
  const handleCreateDashboard = useCallback(() => {
    window.open(`${base}/dashboard`, "_blank");
  }, []);

  return (
    <PageContainer
      className={`${prefixCls}-container`}
      extra={
        <Popover
          content={<Content onCreateDashBoardClick={handleCreateDashboard} />}
          trigger={["hover"]}
          arrow={false}
          placement="bottomRight"
          className={`${prefixCls}-popover`}
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
