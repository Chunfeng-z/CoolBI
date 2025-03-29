import {
  AlignCenterOutlined,
  AlignLeftOutlined,
  BoldOutlined,
  CaretRightOutlined,
  DesktopOutlined,
  InfoCircleOutlined,
  ItalicOutlined,
} from "@ant-design/icons";
import CoolCollapse from "@comp/common/CoolCollapse";
import {
  Button,
  Checkbox,
  CheckboxProps,
  CollapseProps,
  ColorPicker,
  Divider,
  Input,
  InputNumber,
  InputNumberProps,
  Radio,
  RadioChangeEvent,
  theme,
  Tooltip,
} from "antd";
import { pick } from "lodash-es";
import React, {
  CSSProperties,
  useCallback,
  useState,
  useEffect,
  useMemo,
} from "react";

import useChartStore, { ChartConfig } from "@/stores/useChartStore";
const prefixCls = "title-card";

type TitleCardProps = Pick<
  ChartConfig,
  | "isShowTitle"
  | "title"
  | "titleColor"
  | "titleFontSize"
  | "isTitleBold"
  | "isTitleItalic"
  | "titleAlign"
  | "isShowRemark"
  | "remark"
  | "remarkPosition"
  | "isShowEndNote"
  | "endNote"
  | "isShowBackgroundColor"
  | "backgroundColor"
  | "borderRadius"
  | "chartCardPadding"
>;
/** 标题与卡片 */
const TitleCard: React.FC = () => {
  const { token } = theme.useToken();

  const titleCardProps = useMemo(
    () => [
      "isShowTitle",
      "title",
      "titleColor",
      "titleFontSize",
      "isTitleBold",
      "isTitleItalic",
      "titleAlign",
      "isShowRemark",
      "remark",
      "remarkPosition",
      "isShowEndNote",
      "endNote",
      "isShowBackgroundColor",
      "backgroundColor",
      "borderRadius",
      "chartCardPadding",
    ],
    []
  );
  const getCurrentChartConfig = useChartStore(
    (state) => state.getCurrentChartConfig
  );
  const curChartId = useChartStore((state) => state.curChartId);
  /** 当前图表的标题与卡片配置 */
  const [curTitleCardConfig, setCurTitleCardConfig] =
    useState<TitleCardProps>();
  /** 更新图表配置 */
  const setChartsConfig = useChartStore((state) => state.setChartsConfig);
  useEffect(() => {
    const config = getCurrentChartConfig();
    setCurTitleCardConfig(pick(config, titleCardProps));
  }, [getCurrentChartConfig, curChartId, titleCardProps]);
  /** 处理CheckBox组件的变化 */
  const handleCheckboxChange =
    (
      key:
        | "isShowTitle"
        | "isShowRemark"
        | "isShowEndNote"
        | "isShowBackgroundColor"
    ): CheckboxProps["onChange"] =>
    (e) => {
      setCurTitleCardConfig((prev) => ({
        ...prev,
        [key]: e.target.checked,
      }));
      // 更新全局的图表配置
      setChartsConfig(curChartId!, {
        [key]: e.target.checked,
      });
    };
  /** 处理输入框组件的内容变化 */
  const handleInputChange =
    (key: "title" | "remark" | "endNote") =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setCurTitleCardConfig((prev) => {
        return {
          ...prev,
          [key]: e.target.value,
        };
      });
      setChartsConfig(curChartId!, {
        [key]: e.target.value,
      });
    };
  /** 处理颜色选择的内容变化 */
  const handleColorPicker = (
    key: "titleColor" | "backgroundColor",
    color: string
  ) => {
    setCurTitleCardConfig((prev) => {
      return {
        ...prev,
        [key]: color,
      };
    });
    setChartsConfig(curChartId!, {
      [key]: color,
    });
  };
  /** 处理输入数字输入框的内容变化 */
  const handleInputNumberChange =
    (
      key: "titleFontSize" | "borderRadius" | number
    ): InputNumberProps["onChange"] =>
    (value) => {
      if (key === "titleFontSize" || key === "borderRadius") {
        setCurTitleCardConfig((prev) => {
          return {
            ...prev,
            [key]: value,
          };
        });
        setChartsConfig(curChartId!, {
          [key]: value,
        });
      } else {
        const padding = curTitleCardConfig?.chartCardPadding || [0, 0, 0, 0];
        const newPadding = [...padding];
        if (typeof key === "number" && key >= 0 && key < 4) {
          newPadding[key] = value as number;
        } else {
          return;
        }
        setCurTitleCardConfig((pre) => {
          return {
            ...pre,
            chartCardPadding: newPadding,
          };
        });
        setChartsConfig(curChartId!, {
          chartCardPadding: newPadding,
        });
      }
    };

  /** 处理标题文本配置的点击事件 */
  const handleTitleTextConfigClick = (
    key: "isTitleBold" | "isTitleItalic" | "titleAlign"
  ) => {
    if (key === "isTitleBold" || key === "isTitleItalic") {
      setCurTitleCardConfig((prev) => {
        return {
          ...prev,
          [key]: !prev?.[key],
        };
      });
      setChartsConfig(curChartId!, {
        [key]: !curTitleCardConfig?.[key],
      });
    } else if (key === "titleAlign") {
      setCurTitleCardConfig((prev) => {
        return {
          ...prev,
          [key]: prev?.[key] === "left" ? "center" : "left",
        };
      });
      setChartsConfig(curChartId!, {
        [key]: curTitleCardConfig?.[key] === "left" ? "center" : "left",
      });
    }
  };

  /**  备注位置 */
  const handleRemarkPositionChange = (e: RadioChangeEvent) => {
    setCurTitleCardConfig((prev) => {
      return {
        ...prev,
        remarkPosition: e.target.value,
      };
    });
    setChartsConfig(curChartId!, {
      remarkPosition: e.target.value,
    });
  };

  const panelStyle: React.CSSProperties = {
    marginBottom: 5,
    background: token.colorFillAlter,
    borderRadius: token.borderRadius,
  };
  const getItems: (panelStyle: CSSProperties) => CollapseProps["items"] =
    useCallback(
      (panelStyle) => [
        {
          key: "1",
          label: "标题",
          children: (
            <div className="title-card-item">
              <div className="title-card-text-simple">
                <Checkbox
                  checked={curTitleCardConfig?.isShowTitle}
                  onChange={handleCheckboxChange("isShowTitle")}
                >
                  显示主标题
                </Checkbox>
              </div>
              <div className="title-card-text">
                <span>标题</span>
                <Tooltip
                  title="标题最长允许输入100字符"
                  styles={{
                    root: {
                      width: 150,
                    },
                  }}
                >
                  <InfoCircleOutlined />
                </Tooltip>
                <Input
                  disabled={!curTitleCardConfig?.isShowTitle}
                  size="small"
                  placeholder="请输入图表组件名称"
                  maxLength={100}
                  value={curTitleCardConfig?.title}
                  onChange={handleInputChange("title")}
                />
              </div>
              <div className="title-card-text">
                <span>文本</span>
                <ColorPicker
                  value={curTitleCardConfig?.titleColor}
                  size="small"
                  disabled={!curTitleCardConfig?.isShowTitle}
                  onChange={(color) =>
                    handleColorPicker("titleColor", color.toHexString())
                  }
                />
                <InputNumber
                  size="small"
                  disabled={!curTitleCardConfig?.isShowTitle}
                  changeOnWheel
                  min={12}
                  max={30}
                  defaultValue={14}
                  step={1}
                  style={{ width: 100 }}
                  addonAfter="px"
                  onChange={handleInputNumberChange("titleFontSize")}
                />
              </div>
              <div className="title-card-text-sub">
                <Tooltip title="加粗">
                  <Button
                    type="text"
                    icon={<BoldOutlined />}
                    size="small"
                    style={{
                      color: curTitleCardConfig?.isTitleBold
                        ? token.colorPrimary
                        : token.colorText,
                    }}
                    disabled={!curTitleCardConfig?.isShowTitle}
                    onClick={() => handleTitleTextConfigClick("isTitleBold")}
                  />
                </Tooltip>
                <Tooltip title="斜体">
                  <Button
                    type="text"
                    icon={<ItalicOutlined />}
                    size="small"
                    style={{
                      color: curTitleCardConfig?.isTitleItalic
                        ? token.colorPrimary
                        : token.colorText,
                    }}
                    disabled={!curTitleCardConfig?.isShowTitle}
                    onClick={() => handleTitleTextConfigClick("isTitleItalic")}
                  />
                </Tooltip>
                <Divider type="vertical" style={{ borderWidth: 2 }} />
                <Tooltip title="左对齐">
                  <Button
                    type="text"
                    icon={<AlignLeftOutlined />}
                    size="small"
                    style={{
                      color:
                        curTitleCardConfig?.titleAlign === "left"
                          ? token.colorPrimary
                          : token.colorText,
                    }}
                    disabled={!curTitleCardConfig?.isShowTitle}
                    onClick={() => handleTitleTextConfigClick("titleAlign")}
                  />
                </Tooltip>
                <Tooltip title="居中对齐">
                  <Button
                    type="text"
                    icon={<AlignCenterOutlined />}
                    size="small"
                    style={{
                      color:
                        curTitleCardConfig?.titleAlign === "center"
                          ? token.colorPrimary
                          : token.colorText,
                    }}
                    disabled={!curTitleCardConfig?.isShowTitle}
                    onClick={() => handleTitleTextConfigClick("titleAlign")}
                  />
                </Tooltip>
              </div>
            </div>
          ),
          style: panelStyle,
        },
        {
          key: "2",
          label: "备注与尾注",
          children: (
            <div className="title-card-item">
              <div className="title-card-text-simple">
                <Checkbox
                  checked={curTitleCardConfig?.isShowRemark}
                  onChange={handleCheckboxChange("isShowRemark")}
                >
                  备注
                </Checkbox>
              </div>
              <div className="title-card-text">
                <span>内容</span>
                <Input
                  disabled={!curTitleCardConfig?.isShowRemark}
                  size="small"
                  maxLength={100}
                  value={curTitleCardConfig?.remark}
                  placeholder="请输入备注内容"
                  onChange={handleInputChange("remark")}
                />
              </div>
              <div className="title-card-text-vertical">
                <span>位置</span>
                <div className="title-card-text-right">
                  <Radio.Group
                    disabled={!curTitleCardConfig?.isShowRemark}
                    onChange={handleRemarkPositionChange}
                    value={curTitleCardConfig?.remarkPosition}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 4,
                    }}
                    options={[
                      {
                        value: "afterTitle",
                        label: <span>标题后</span>,
                      },
                      {
                        value: "belowTitle",
                        label: <span>标题下</span>,
                      },
                    ]}
                  />
                </div>
              </div>
              <div className="title-card-text-simple">
                <Checkbox
                  checked={curTitleCardConfig?.isShowEndNote}
                  onChange={handleCheckboxChange("isShowEndNote")}
                >
                  尾注
                </Checkbox>
              </div>
              <div className="title-card-text">
                <span>尾注内容</span>
                <Input
                  disabled={!curTitleCardConfig?.isShowEndNote}
                  size="small"
                  maxLength={100}
                  value={curTitleCardConfig?.endNote}
                  placeholder="请输入尾注内容"
                  onChange={handleInputChange("endNote")}
                />
              </div>
            </div>
          ),
          style: panelStyle,
        },
        {
          key: "3",
          label: "组件容器",
          children: (
            <div className="title-card-item">
              <div className="title-card-text-simple">
                <Checkbox
                  checked={curTitleCardConfig?.isShowBackgroundColor}
                  onChange={handleCheckboxChange("isShowBackgroundColor")}
                >
                  组件背景填充
                </Checkbox>
              </div>
              <div className="title-card-text">
                <span>卡片颜色</span>
                <ColorPicker
                  size="small"
                  value={curTitleCardConfig?.backgroundColor}
                  disabled={!curTitleCardConfig?.isShowBackgroundColor}
                  onChange={(color) =>
                    handleColorPicker("backgroundColor", color.toHexString())
                  }
                />
              </div>
              <div className="title-card-text" style={{ marginLeft: 0 }}>
                <span>圆角</span>
                <InputNumber
                  size="small"
                  addonAfter="px"
                  min={0}
                  max={20}
                  defaultValue={12}
                  step={1}
                  changeOnWheel
                  style={{ width: 100 }}
                  value={curTitleCardConfig?.borderRadius}
                  onChange={handleInputNumberChange("borderRadius")}
                />
              </div>
              <div className="title-card-label">
                <DesktopOutlined style={{ marginRight: 5 }} />
                <span>卡片内边距</span>
              </div>
              <div className="title-card-text-large">
                {["上", "左", "下", "右"].map((direction, index) => (
                  <InputNumber
                    size="small"
                    key={direction}
                    addonBefore={direction}
                    addonAfter="px"
                    min={0}
                    max={20}
                    changeOnWheel
                    defaultValue={2}
                    style={{ width: 140 }}
                    value={curTitleCardConfig?.chartCardPadding?.[index]}
                    onChange={handleInputNumberChange(index)}
                  />
                ))}
              </div>
            </div>
          ),
          style: panelStyle,
        },
      ],
      [curTitleCardConfig]
    );
  return (
    <div className={`${prefixCls}-container`}>
      <CoolCollapse
        defaultActiveKey={["1", "2", "3"]}
        expandIcon={({ isActive }) => (
          <CaretRightOutlined rotate={isActive ? 90 : 0} />
        )}
        items={getItems(panelStyle)}
      />
    </div>
  );
};

export default TitleCard;
