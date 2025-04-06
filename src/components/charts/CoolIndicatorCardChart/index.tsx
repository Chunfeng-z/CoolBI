import { CloseCircleOutlined } from "@ant-design/icons";
import { useRequest } from "ahooks";
import { Flex, Spin } from "antd";
import { debounce } from "lodash-es";
import React, { useEffect, useMemo, useState, useRef } from "react";

import IndicatorItem from "./IndicatorItem";

import { queryChartData } from "@/api/dashboard";
import {
  DataSourceConfig,
  DataSourceField,
} from "@/types/chartConfigItems/common";
import {
  IndicatorCardDataSeriesConfig,
  IndicatorContentConfig,
  IndicatorLayout,
} from "@/types/chartConfigItems/indicatorCardItems";
import "./index.scss";
import { DataSourceValues } from "@/types/dashboard";

const prefixCls = "cool-indicator-card-chart";

interface ICoolIndicatorCardChartProps {
  /** 指标看板元素的布局方式 */
  indicatorLayout: IndicatorLayout;
  /** 指标内容配置 */
  indicatorContentConfig: IndicatorContentConfig;
  /** 图表使用的数据源的配置 */
  dataSourceConfig: DataSourceConfig;
  /** 数据系列配置-支持多度量下的前后缀配置 */
  seriesConfig: IndicatorCardDataSeriesConfig[];
}

const defaultIndicatorLayout: IndicatorLayout = {
  indicatorRelation: "same-level",
  indicatorBlockGroupType: "swipe",
  maxGroupCount: 2,
  indicatorBlockSeparator: "line",
  indicatorBlockSeparatorColor: "#000000",
};

const defaultIndicatorContentConfig: IndicatorContentConfig = {
  indicatorContentPosition: "center",
  indicatorValueLineSpace: "normal",
  enableFontSetting: true,
  indicatorNameFontConfig: {
    color: "#000000",
    fontSize: 14,
    isBold: false,
    isItalic: false,
  },
  indicatorValueFontConfig: {
    color: "#000000",
    fontSize: 22,
    isBold: false,
    isItalic: false,
  },
  isShowIndicatorDecoration: true,
  indicatorDecorationConfig: [
    {
      id: "icon",
      name: "icon-zhihang",
      color: "#000000",
      icon: "xxx",
    },
  ],
};

/** 指标看板图 */
const CoolIndicatorCardChart: React.FC<ICoolIndicatorCardChartProps> = (
  props
) => {
  const {
    indicatorLayout = defaultIndicatorLayout,
    dataSourceConfig,
    seriesConfig,
  } = props;
  const { indicatorRelation } = indicatorLayout;
  /** 格式化后的图表数据 */
  const [formattedData, setFormattedData] = useState<
    (DataSourceField & { value: string | number })[]
  >([]);

  /** 用于引用容器元素 */
  const containerRef = useRef<HTMLDivElement>(null);
  /** 容器的大小 */
  const [containerSize, setContainerSize] = useState({
    width: 0,
    height: 0,
  });

  // 获取图表数据
  const { data, error, loading } = useRequest(
    () => queryChartData(dataSourceConfig),
    {
      ready: !!dataSourceConfig,
      loadingDelay: 300,
      refreshDeps: [dataSourceConfig],
      onSuccess: (data) => {
        const respData: {
          columns: DataSourceField[];
          values: DataSourceValues;
        } = data.data;
        setFormattedData(
          respData.columns.map((col, index) => {
            return {
              ...col,
              value: respData.values[0][index].v,
            };
          })
        );
      },
    }
  );

  /** 单个指标的时候指标item的样式 */
  const indicatorItemStyle = useMemo(() => {
    return {
      height: "100%",
    };
  }, []);

  /** 多指标并排列的时候样式 */
  const indicatorItemStyle2: React.CSSProperties[] = useMemo(() => {
    if (
      formattedData.length > 1 &&
      indicatorRelation === "same-level" &&
      containerSize.width > 0 &&
      containerSize.height > 0
    ) {
      const minItemWidth = 120;
      const minItemHeight = 80;
      // 指标的个数
      const indicatorCount = formattedData.length;
      const canShowInOneLine =
        containerSize.width / indicatorCount >= minItemWidth;
      // 分隔线的宽度
      const dividerWidth = 2;
      // 1.可以在一行显示
      if (canShowInOneLine) {
        const itemWidth =
          (containerSize.width - (indicatorCount - 1) * dividerWidth) /
          indicatorCount;
        return formattedData.map((_item, index) => {
          return {
            width: `${itemWidth}px`,
            height: "100%",
            position: "absolute",
            left: `${itemWidth * index}px`,
            borderRight:
              index === indicatorCount - 1
                ? "none"
                : `${dividerWidth}px solid #E0E0E0`,
          };
        });
      }
      // 2.不能在一行显示的情况下
      let count = 0;
      for (let i = indicatorCount; i > 0; i--) {
        if (containerSize.width / i >= minItemWidth) {
          count = i;
          break;
        }
      }
      // 当前宽度比最小宽度还小
      if (count === 0) {
        count = 1;
      }
      // 计算每个指标的宽度
      const itemWidth =
        (containerSize.width - (count - 1) * dividerWidth) / count;
      // 显示的行数
      const rowCount = Math.ceil(formattedData.length / count);
      let itemHeight = containerSize.height / rowCount;
      if (itemHeight < minItemHeight) {
        itemHeight = minItemHeight;
      }

      // 计算每个指标的布局样式
      // 1.在一行都可以显示的情况下
      const itemStyles = [];
      for (let i = 0; i < rowCount; i++) {
        for (let j = 0; j < count; j++) {
          const left = j * itemWidth;
          const top = i * itemHeight;
          itemStyles.push({
            width: `${itemWidth}px`,
            height: `${itemHeight}px`,
            position: "absolute",
            left: `${left}px`,
            top: `${top}px`,
            borderRight:
              j === count - 1 ? "none" : `${dividerWidth}px solid #E0E0E0`,
            borderBottom:
              i === rowCount - 1 ? "none" : `${dividerWidth}px solid #E0E0E0`,
          });
        }
      }
      return itemStyles;
    }
  }, [containerSize, formattedData, indicatorRelation]);

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }
    // 获取容器的宽高
    const updateContainerSize = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setContainerSize({
          width,
          height,
        });
      }
    };

    // 初始测量
    updateContainerSize();
    const debounceUpdateContainerSize = debounce(updateContainerSize, 200);
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === containerRef.current) {
          debounceUpdateContainerSize();
        }
      }
    });
    resizeObserver.observe(containerRef.current);
    // 清理函数
    return () => {
      resizeObserver.disconnect();
      debounceUpdateContainerSize.cancel();
    };
  }, [containerRef.current]);

  if (error) {
    return (
      <Flex
        style={{
          width: "100%",
          height: "100%",
        }}
        vertical
        justify="center"
        align="center"
      >
        <CloseCircleOutlined />
        <div className="text">获取数据失败</div>
      </Flex>
    );
  }
  if (loading) {
    return (
      <Spin
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      />
    );
  }

  return (
    <div className={prefixCls}>
      <div className="indicator-container" ref={containerRef}>
        {/* 1. 看板只存在一个数据指标的时候居中展示，此时与指标间主副关系设置无关 */}
        {formattedData.length === 1 && (
          <IndicatorItem
            indicatorName={formattedData[0].name}
            indicatorValue={formattedData[0].value}
            indicatorValuePrefix={seriesConfig[0].indicatorPrefix}
            indicatorValueSuffix={seriesConfig[0].indicatorSuffix}
            style={indicatorItemStyle}
          />
        )}
        {/* 2.存在多个指标同时并列显示的时候 */}
        {formattedData.length > 1 &&
          indicatorRelation === "same-level" &&
          indicatorItemStyle2 &&
          formattedData.map((item, index) => {
            const itemStyle = indicatorItemStyle2[index];
            return (
              <IndicatorItem
                key={item.id}
                indicatorName={item.name}
                indicatorValue={item.value}
                indicatorValuePrefix={seriesConfig[index].indicatorPrefix}
                indicatorValueSuffix={seriesConfig[index].indicatorSuffix}
                style={itemStyle}
              />
            );
          })}
      </div>
    </div>
  );
};

export default CoolIndicatorCardChart;
