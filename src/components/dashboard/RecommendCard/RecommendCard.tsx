import React from "react";

import { Button, Card, Flex, Typography } from "antd";
import { EditOutlined, EyeOutlined } from "@ant-design/icons";
import EllipsisText from "../../common/EllipsisText";
import { RecommendCardProps } from "../utils";

const { Paragraph } = Typography;
// 组件的类型前缀
const prefixCls = "recommend-card";

/** 推荐卡片hover时展示的操作栏 */
const OperationalDetails: React.FC = () => {
  return (
    <div
      className={`${prefixCls}-operational-details flex justify-between gap-2`}
      style={{ width: "100%" }}
    >
      <Button icon={<EyeOutlined />} size="small" block>
        预览
      </Button>
      <Button icon={<EditOutlined />} size="small" block type="primary">
        使用
      </Button>
    </div>
  );
};

/** 首页仪表板推荐卡片 */
const RecommendCard: React.FC<RecommendCardProps> = ({
  imageUrl,
  title,
  description,
  viewsCount,
  usesCount,
  source,
}) => {
  const [isHovered, setIsHovered] = React.useState(false);
  return (
    <>
      <Card
        hoverable
        style={{ width: 260 }}
        loading={false}
        className={`${prefixCls}-container`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        cover={
          <div className="relative">
            <img
              alt="recommend card"
              style={{ width: "100%", height: 140 }}
              src={imageUrl}
            />
            {isHovered && (
              <div className={"description-overlay"}>
                <Paragraph
                  ellipsis={{ rows: 2, tooltip: description }}
                  style={{ color: "white", marginBottom: 0 }}
                >
                  {description}
                </Paragraph>
              </div>
            )}
          </div>
        }
      >
        <div className={`${prefixCls}-content`}>
          <Flex justify="space-between">
            <EllipsisText text={title} width={120} />
            <div className="data-container">
              <span className="view-count">
                <EyeOutlined />
                <EllipsisText text={viewsCount} width={35} marginLeft={2} />
              </span>
              <span className="use-count">
                <EditOutlined />
                <EllipsisText text={usesCount} width={35} marginLeft={2} />
              </span>
            </div>
          </Flex>
          <div className="flex items-center justify-between h-8">
            {isHovered ? (
              <OperationalDetails />
            ) : (
              <span style={{ color: "#8C8C8C" }}>{source}</span>
            )}
          </div>
        </div>
      </Card>
    </>
  );
};

export default RecommendCard;
