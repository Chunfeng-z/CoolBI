import { Button, Flex, Space } from "antd";
import { debounce } from "lodash-es";
import React, { useEffect, useState } from "react";

import RecommendCard from "../RecommendCard";

import { getRecommendDashboardList } from "@/api/workbench";
import { RecommendCardProps } from "@/types/workbench";

const prefixCls = "recommend-card-list";
// 每个卡片的宽度+gap
const cardWidth = 268;

/** 首页推荐卡片列表 */
const RecommendCardList: React.FC = () => {
  // 控制推荐列表显隐
  const [displayRecommendCardList, setDisplayRecommendCardList] =
    useState(true);
  // 卡片列表展示的数据
  const [recommendData, setRecommendData] = useState<RecommendCardProps[]>();
  /** 获取的全部推荐数据 */
  const [allRecommendData, setAllRecommendData] =
    useState<RecommendCardProps[]>();

  const updateCardCount = () => {
    // 移除debugger语句
    if (!allRecommendData || allRecommendData.length === 0) {
      return;
    }
    const containerWidth =
      document.querySelector(`.${prefixCls}-content`)?.clientWidth || 0;
    const count = Math.min(
      Math.floor((containerWidth + 8) / cardWidth),
      allRecommendData.length || 0
    );
    setRecommendData(allRecommendData.slice(0, count));
  };

  // 初始化推荐数据
  useEffect(() => {
    /** 推荐数据更新函数防抖 */
    const debouncedUpdateCardCount = debounce(updateCardCount, 300);
    window.addEventListener("resize", debouncedUpdateCardCount);
    /** 获取推荐列表的数据 */
    const getRecommendData = async () => {
      const respData = await getRecommendDashboardList();
      const list: RecommendCardProps[] = respData.data;
      setAllRecommendData(list);
      setRecommendData(list);
    };

    getRecommendData();
    return () => {
      window.removeEventListener("resize", debouncedUpdateCardCount);
      // 清除防抖函数
      debouncedUpdateCardCount.cancel();
    };
  }, []);

  // 在获取到推荐数据后，更新卡片数量
  useEffect(() => {
    updateCardCount();
  }, [allRecommendData]);

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
          {recommendData?.map((item: RecommendCardProps, index) => {
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
