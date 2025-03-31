import { Button, Flex, Space } from "antd";
import { debounce } from "lodash-es";
import React, { useLayoutEffect, useState } from "react";

import RecommendCard from "../RecommendCard";
import { recommendCardListData as TempData } from "../test";
import { RecommendCardProps } from "../utils/types";

const prefixCls = "recommend-card-list";
// 每个卡片的宽度+gap
const cardWidth = 268;

/** 首页推荐卡片列表 */
const RecommendCardList: React.FC = () => {
  // 控制推荐列表显隐
  const [displayRecommendCardList, setDisplayRecommendCardList] =
    useState(true);
  // 卡片列表展示的数据
  const [recommendData, setRecommendData] =
    useState<RecommendCardProps[]>(TempData);

  const updateCardCount = () => {
    const containerWidth =
      document.querySelector(`.${prefixCls}-content`)?.clientWidth || 0;
    const count = Math.min(
      Math.floor((containerWidth + 8) / cardWidth),
      TempData.length
    );
    setRecommendData(TempData.slice(0, count));
  };

  /** 推荐数据更新函数防抖 */
  const debouncedUpdateCardCount = debounce(updateCardCount, 300);

  useLayoutEffect(() => {
    updateCardCount();
    window.addEventListener("resize", debouncedUpdateCardCount);
    return () => {
      window.removeEventListener("resize", updateCardCount);
      // 清除防抖函数
      debouncedUpdateCardCount.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRecommendDataDisplay = () => {
    setDisplayRecommendCardList(!displayRecommendCardList);
  };

  return (
    <div className={`${prefixCls}-container`}>
      <div className={`${prefixCls}-title h-8`}>
        <Flex justify="space-between">
          <span>获取灵感</span>
          <Button
            variant="text"
            color="primary"
            size="small"
            onClick={handleRecommendDataDisplay}
          >
            {displayRecommendCardList ? "收起" : "展开"}
          </Button>
        </Flex>
      </div>
      <div
        className={`${prefixCls}-content`}
        style={{
          visibility: displayRecommendCardList ? "visible" : "hidden",
          position: displayRecommendCardList ? "relative" : "absolute",
        }}
      >
        <Space>
          {recommendData.map((item: RecommendCardProps, index) => {
            const {
              id = index,
              imageUrl,
              title,
              description,
              viewsCount,
              usesCount,
              source,
            } = item;
            return (
              <RecommendCard
                key={id}
                imageUrl={imageUrl}
                title={title}
                description={description}
                viewsCount={viewsCount}
                usesCount={usesCount}
                source={source}
              />
            );
          })}
        </Space>
      </div>
    </div>
  );
};

export default RecommendCardList;
