import React from "react";
import styles from "./recommendCard.module.scss";
import { Button, Card, Flex, Typography } from "antd";
import { EditOutlined, EyeOutlined } from "@ant-design/icons";
import EllipsisText from "../common/EllipsisText";

const { Paragraph } = Typography;

interface RecommendCardProps {
  imageUrl: string;
  title: string;
  description: string;
  viewsCount: number | string;
  usesCount: number | string;
  source: string;
}

const OperationalDetails: React.FC = () => {
  return (
    <>
      <Button icon={<EyeOutlined />} size="small" block>
        预览
      </Button>
      <div className="empty" style={{ width: 10 }}></div>
      <Button icon={<EditOutlined />} size="small" block type="primary">
        使用
      </Button>
    </>
  );
};

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
        className={styles["recommend-card"]}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        cover={
          <div style={{ position: "relative" }}>
            <img
              alt="recommend card"
              style={{ width: "100%", height: 140 }}
              src={imageUrl}
            />
            {isHovered && (
              <div className={styles["description-overlay"]}>
                <Paragraph
                  ellipsis={{ rows: 2, tooltip: description }}
                  style={{ color: "white" }}
                >
                  {description}
                </Paragraph>
              </div>
            )}
          </div>
        }
      >
        <div className="card-content">
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
          <div
            className="card-content-bottom-detail"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
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
