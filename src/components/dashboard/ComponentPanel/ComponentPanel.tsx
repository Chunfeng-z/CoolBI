import {
  DownOutlined,
  UpOutlined,
  LineChartOutlined,
  TableOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import {
  Button,
  Tooltip,
  Dropdown,
  MenuProps,
  Select,
  InputNumber,
  InputNumberProps,
} from "antd";
import classNames from "classnames";
import React, { useMemo, useState } from "react";

import LeftChartMenu from "../LeftChartMenu";
import { pageRasterOptions as options } from "../utils";

import { useCompPanelStore } from "@/stores/useCompPanel";
import useRasterStore from "@/stores/useRasterStore";
import { useThemeStore } from "@/stores/useThemeStore";
const prefixCls = "component-panel";
enum ScaleValue {
  "level1" = "25%",
  "level2" = "50%",
  "level3" = "75%",
  "level4" = "100%",
}
const items: MenuProps["items"] = [
  {
    key: "1",
    label: <span>{ScaleValue.level1}</span>,
  },
  {
    key: "2",
    label: <span>{ScaleValue.level2}</span>,
  },
  {
    key: "3",
    label: <span>{ScaleValue.level3}</span>,
  },
  {
    key: "4",
    label: <span>{ScaleValue.level4}</span>,
  },
];

interface ComponentPanelProps {
  style?: React.CSSProperties;
}

/** 仪表板-组件操作菜单 */
const ComponentPanel: React.FC<ComponentPanelProps> = (props) => {
  const { style } = props;
  const isShowPageRaster = useRasterStore((state) => state.isShowPageRaster);
  const setIsShowPageRaster = useRasterStore(
    (state) => state.setIsShowPageRaster
  );
  const setRasterNum = useRasterStore((state) => state.setRasterNum);
  const rasterGap = useRasterStore((state) => state.rasterGap);
  const setRasterGap = useRasterStore((state) => state.setRasterGap);
  const cardRowSpace = useRasterStore((state) => state.cardRowSpace);
  const setCardRowSpace = useRasterStore((state) => state.setCardRowSpace);

  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  /** 图表菜单的显示状态 */
  const chartMenuStatus = useCompPanelStore((state) => state.chartMenuStatus);
  const setChartMenuStatus = useCompPanelStore(
    (state) => state.setChartMenuStatus
  );
  /** 当前菜单缩放倍率 */
  const [scale, setScale] = useState<ScaleValue>(ScaleValue.level4);

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    const selectedScale =
      ScaleValue[`level${e.key}` as keyof typeof ScaleValue];
    setScale(selectedScale);
  };
  /** 页面栅格显隐设置 */
  const handlePageRasterClick = () => {
    setIsShowPageRaster(!isShowPageRaster);
  };
  /** 页面栅格列数控制 */
  const handleRasterNumberChange = (value: string) => {
    console.log("栅格列数：", value);
    // 更新栅格数
    setRasterNum(Number(value));
  };
  /** 页面栅格的选项配置 */
  const pageRasterOptions = useMemo(
    () =>
      options.map((rasterNum) => ({
        value: rasterNum,
        label: rasterNum,
      })),
    []
  );

  /** 栅格间距调整 */
  const handleRasterGapChange: InputNumberProps["onChange"] = (value) => {
    console.log("栅格间距：", value);
    setRasterGap(value as number);
  };

  /** 卡片行间距调整 */
  const handleCardRowSpaceChange: InputNumberProps["onChange"] = (value) => {
    console.log("卡片行间距：", value);
    setCardRowSpace(value as number);
  };

  return (
    <>
      <div className={`${prefixCls}-container`} style={{ ...style }}>
        {isShowPageRaster ? (
          <div
            className={classNames(`${prefixCls}-layout-menu`)}
            style={{ backgroundColor: isDarkMode ? "#141414" : "#f4f4f5" }}
          >
            <div className="layout-menu-label">页面栅格设置</div>
            <div className="layout-menu">
              <div className="layout-menu-item">
                栅格列数
                <Tooltip
                  title="在栅格布局下，每个卡片的宽度由栅格列数决定，栅格列数越多，卡片宽度可设置的颗粒度越细。"
                  trigger={["hover"]}
                  styles={{
                    root: {
                      zIndex: 9999,
                    },
                  }}
                >
                  <InfoCircleOutlined />
                </Tooltip>
                <Select
                  size="small"
                  defaultValue={"12"}
                  style={{ width: 60 }}
                  variant="filled"
                  onChange={handleRasterNumberChange}
                  options={pageRasterOptions}
                />
              </div>
              <div className="layout-menu-item">
                列间距
                <InputNumber
                  size="small"
                  variant="filled"
                  min={0}
                  max={20}
                  defaultValue={8}
                  value={rasterGap}
                  onChange={handleRasterGapChange}
                  style={{ width: 90 }}
                  addonAfter="px"
                />
              </div>
              <div className="layout-menu-item">
                行间距
                <InputNumber
                  size="small"
                  variant="filled"
                  min={0}
                  max={20}
                  defaultValue={12}
                  value={cardRowSpace}
                  onChange={handleCardRowSpaceChange}
                  style={{ width: 90 }}
                  addonAfter="px"
                />
              </div>
            </div>
            <div className="layout-button">
              <Button
                size="small"
                type="primary"
                variant="solid"
                onClick={handlePageRasterClick}
              >
                完成
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div className={`${prefixCls}-left`}>
              <div
                className={classNames(`${prefixCls}-add-chart-btn`, {
                  selected:
                    chartMenuStatus === "expand" || chartMenuStatus === "pin",
                })}
                onClick={() => {
                  if (
                    chartMenuStatus === "expand" ||
                    chartMenuStatus === "pin"
                  ) {
                    setChartMenuStatus("hidden");
                  } else if (chartMenuStatus === "hidden") {
                    setChartMenuStatus("expand");
                  }
                }}
              >
                <LineChartOutlined />
                <span className={`${prefixCls}-btn-text`}>添加图表</span>
                {/* 图表状态在expand和pin都是展开状态 */}
                {chartMenuStatus === "hidden" ? (
                  <DownOutlined style={{ fontSize: 12 }} />
                ) : (
                  <UpOutlined style={{ fontSize: 12 }} />
                )}
              </div>
              {/* 菜单展开的时候绝对定位展示 */}
              {chartMenuStatus === "expand" && <LeftChartMenu />}
            </div>
            <div className={`${prefixCls}-right`}>
              <Tooltip title="布局缩放">
                <Dropdown
                  menu={{ items, onClick: handleMenuClick }}
                  trigger={["click"]}
                >
                  <Button
                    type="text"
                    size="small"
                    icon={<DownOutlined />}
                    iconPosition="end"
                  >
                    {scale}
                  </Button>
                </Dropdown>
              </Tooltip>
              <Tooltip title="页面栅格设置">
                <Button
                  type="text"
                  icon={<TableOutlined />}
                  size="small"
                  onClick={handlePageRasterClick}
                />
              </Tooltip>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ComponentPanel;
