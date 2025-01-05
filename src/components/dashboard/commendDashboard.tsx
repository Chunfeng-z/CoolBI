import React, { useLayoutEffect } from "react";
import RecommendCard from "./recommendCard";
import { recommendData as TempData } from "./test";
import { debounce } from "lodash-es";
import { Button, Flex, Space } from "antd";

const CommendDashboard: React.FC = () => {
  // 默认显示4个卡片
  const [recommendData, setRecommendData] = React.useState(TempData);

  const updateCardCount = () => {
    const containerWidth =
      document.querySelector(".commendDashboard-content")?.clientWidth || 0;
    // 每个卡片的宽度
    const cardWidth = 270;
    const count = Math.min(
      Math.floor(containerWidth / cardWidth),
      TempData.length
    );
    setRecommendData(TempData.slice(0, count));
  };

  // 防抖函数
  const debouncedUpdateCardCount = debounce(updateCardCount, 300);

  useLayoutEffect(() => {
    updateCardCount();
    window.addEventListener("resize", debouncedUpdateCardCount);
    return () => {
      window.removeEventListener("resize", updateCardCount);
      // 清除防抖函数
      debouncedUpdateCardCount.cancel();
    };
  }, []);

  const [displayRecommendData, setDisplayRecommendData] = React.useState(true);

  const handleRecommendDataDisplay = () => {
    setDisplayRecommendData(!displayRecommendData);
  };

  return (
    <div className="commendDashboard-container">
      <div className="commendDashboard-title-container">
        <Flex justify="space-between">
          <div>获取灵感</div>
          <Button
            variant="text"
            color="primary"
            onClick={handleRecommendDataDisplay}
          >
            {displayRecommendData ? "收起" : "展开"}
          </Button>
        </Flex>
      </div>
      <div
        className="commendDashboard-content"
        style={{
          visibility: displayRecommendData ? "visible" : "hidden",
          position: displayRecommendData ? "relative" : "absolute",
        }}
      >
        <Space>
          {recommendData.map((item, index) => (
            <RecommendCard key={index} {...item} />
          ))}
        </Space>
      </div>
    </div>
  );
};

export default CommendDashboard;
