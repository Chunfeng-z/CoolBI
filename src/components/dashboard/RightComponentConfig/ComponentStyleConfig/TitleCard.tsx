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
import React, { CSSProperties, useCallback, useState, useEffect } from "react";

import useChartStore from "@/stores/useChartStore";
import { TitleCardConfig } from "@/types/chartConfigItems/common";

const prefixCls = "title-card";

/** 标题与卡片 */
const TitleCard: React.FC = () => {
  const { token } = theme.useToken();
  const getCurrentChartConfig = useChartStore(
    (state) => state.getCurrentChartConfig
  );
  const curChartId = useChartStore((state) => state.curChartId);
  /** 当前图表的标题与卡片配置 */
  const [titleCardConfig, setTitleCardConfig] = useState<TitleCardConfig>();
  /** 更新图表配置 */
  const setChartsConfig = useChartStore((state) => state.setChartsConfig);
  useEffect(() => {
    const curConfig = getCurrentChartConfig();
    setTitleCardConfig(curConfig?.titleCardConfig);
  }, [getCurrentChartConfig, curChartId]);
  /** 处理CheckBox组件的变化 */
  const handleCheckboxChange = useCallback(
    (
        key:
          | "isShowTitle"
          | "isShowRemark"
          | "isShowEndNote"
          | "isShowBackgroundColor"
      ): CheckboxProps["onChange"] =>
      (e) => {
        setTitleCardConfig((prev) => {
          // 在初始化之后prev一定存在
          return {
            ...prev!,
            [key]: e.target.checked,
          };
        });
        // 更新全局的图表配置
        setChartsConfig(curChartId!, (draft) => {
          draft.titleCardConfig[key] = e.target.checked;
        });
      },
    [curChartId, setChartsConfig]
  );
  /** 处理输入框组件的内容变化 */
  const handleInputChange = useCallback(
    (key: "title" | "remark" | "endNote") =>
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitleCardConfig((prev) => {
          return {
            ...prev!,
            [key]: e.target.value,
          };
        });
        setChartsConfig(curChartId!, (draft) => {
          draft.titleCardConfig[key] = e.target.value;
        });
      },
    [curChartId, setChartsConfig]
  );
  /** 处理颜色选择的内容变化 */
  const handleColorPicker = useCallback(
    (key: "titleColor" | "backgroundColor", color: string) => {
      switch (key) {
        case "titleColor": {
          setTitleCardConfig((prev) => {
            return {
              ...prev!,
              titleFontConfig: {
                ...prev!.titleFontConfig,
                color,
              },
            };
          });
          setChartsConfig(curChartId!, (draft) => {
            draft.titleCardConfig.titleFontConfig.color = color;
          });
          break;
        }
        case "backgroundColor": {
          setTitleCardConfig((prev) => {
            return {
              ...prev!,
              backgroundColor: color,
            };
          });
          setChartsConfig(curChartId!, (draft) => {
            draft.titleCardConfig.backgroundColor = color;
          });
          break;
        }
      }
    },
    [curChartId, setChartsConfig]
  );
  /** 处理输入数字输入框的内容变化 */
  const handleInputNumberChange = useCallback(
    (
        key: "titleFontSize" | "borderRadius" | number
      ): InputNumberProps["onChange"] =>
      (value) => {
        value = Number(value);
        switch (key) {
          case "titleFontSize": {
            setTitleCardConfig((prev) => {
              return {
                ...prev!,
                titleFontConfig: {
                  ...prev!.titleFontConfig,
                  fontSize: value,
                },
              };
            });
            setChartsConfig(curChartId!, (draft) => {
              draft.titleCardConfig.titleFontConfig.fontSize = value;
            });
            break;
          }
          case "borderRadius": {
            setTitleCardConfig((prev) => {
              return {
                ...prev!,
                borderRadius: value,
              };
            });
            setChartsConfig(curChartId!, (draft) => {
              draft.titleCardConfig.borderRadius = value;
            });
            break;
          }
          default: {
            const padding = titleCardConfig?.chartCardPadding || [0, 0, 0, 0];
            const newPadding = [...padding];
            if (typeof key === "number" && key >= 0 && key < 4) {
              newPadding[key] = value as number;
            } else {
              return;
            }
            setTitleCardConfig((prev) => {
              return {
                ...prev!,
                chartCardPadding: newPadding,
              };
            });
            setChartsConfig(curChartId!, (draft) => {
              draft.titleCardConfig.chartCardPadding = newPadding;
            });
          }
        }
      },
    [curChartId, setChartsConfig, titleCardConfig?.chartCardPadding]
  );

  /** 处理标题文本配置的点击事件 */
  const handleTitleTextConfigClick = useCallback(
    (key: "isTitleBold" | "isTitleItalic" | "titleAlign") => {
      if (key === "isTitleBold") {
        setTitleCardConfig((prev) => {
          return {
            ...prev!,
            titleFontConfig: {
              ...prev!.titleFontConfig,
              isBold: !prev?.titleFontConfig?.isBold,
            },
          };
        });
        setChartsConfig(curChartId!, (draft) => {
          const isBold = draft.titleCardConfig.titleFontConfig.isBold;
          draft.titleCardConfig.titleFontConfig.isBold = !isBold;
        });
      } else if (key === "isTitleItalic") {
        setTitleCardConfig((prev) => {
          return {
            ...prev!,
            titleFontConfig: {
              ...prev!.titleFontConfig,
              isItalic: !prev?.titleFontConfig?.isItalic,
            },
          };
        });
        setChartsConfig(curChartId!, (draft) => {
          const isItalic = draft.titleCardConfig.titleFontConfig.isItalic;
          draft.titleCardConfig.titleFontConfig.isItalic = !isItalic;
        });
      } else if (key === "titleAlign") {
        setTitleCardConfig((prev) => {
          return {
            ...prev!,
            titleAlign: prev?.titleAlign === "left" ? "center" : "left",
          };
        });
        setChartsConfig(curChartId!, (draft) => {
          const align = draft.titleCardConfig.titleAlign;
          draft.titleCardConfig.titleAlign =
            align === "left" ? "center" : "left";
        });
      }
    },
    [curChartId, setChartsConfig]
  );

  /**  备注位置 */
  const handleRemarkPositionChange = (e: RadioChangeEvent) => {
    setTitleCardConfig((prev) => {
      return {
        ...prev!,
        remarkPosition: e.target.value,
      };
    });
    setChartsConfig(curChartId!, (draft) => {
      draft.titleCardConfig.remarkPosition = e.target.value;
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
                  checked={titleCardConfig?.isShowTitle}
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
                  disabled={!titleCardConfig?.isShowTitle}
                  size="small"
                  placeholder="请输入图表组件名称"
                  maxLength={100}
                  value={titleCardConfig?.title}
                  onChange={handleInputChange("title")}
                />
              </div>
              <div className="title-card-text">
                <span>文本</span>
                <ColorPicker
                  value={titleCardConfig?.titleFontConfig?.color}
                  size="small"
                  disabled={!titleCardConfig?.isShowTitle}
                  onChange={(color) =>
                    handleColorPicker("titleColor", color.toHexString())
                  }
                />
                <InputNumber
                  size="small"
                  disabled={!titleCardConfig?.isShowTitle}
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
                    type={
                      titleCardConfig?.titleFontConfig.isBold
                        ? "primary"
                        : "text"
                    }
                    icon={<BoldOutlined />}
                    size="small"
                    disabled={!titleCardConfig?.isShowTitle}
                    onClick={() => handleTitleTextConfigClick("isTitleBold")}
                  />
                </Tooltip>
                <Tooltip title="斜体">
                  <Button
                    type={
                      titleCardConfig?.titleFontConfig.isItalic
                        ? "primary"
                        : "text"
                    }
                    icon={<ItalicOutlined />}
                    size="small"
                    disabled={!titleCardConfig?.isShowTitle}
                    onClick={() => handleTitleTextConfigClick("isTitleItalic")}
                  />
                </Tooltip>
                <Divider type="vertical" style={{ borderWidth: 2 }} />
                <Tooltip title="左对齐">
                  <Button
                    type={
                      titleCardConfig?.titleAlign === "left"
                        ? "primary"
                        : "text"
                    }
                    icon={<AlignLeftOutlined />}
                    size="small"
                    disabled={!titleCardConfig?.isShowTitle}
                    onClick={() => handleTitleTextConfigClick("titleAlign")}
                  />
                </Tooltip>
                <Tooltip title="居中对齐">
                  <Button
                    type={
                      titleCardConfig?.titleAlign === "center"
                        ? "primary"
                        : "text"
                    }
                    icon={<AlignCenterOutlined />}
                    size="small"
                    disabled={!titleCardConfig?.isShowTitle}
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
                  checked={titleCardConfig?.isShowRemark}
                  onChange={handleCheckboxChange("isShowRemark")}
                >
                  备注
                </Checkbox>
              </div>
              <div className="title-card-text">
                <span>内容</span>
                <Input
                  disabled={!titleCardConfig?.isShowRemark}
                  size="small"
                  maxLength={100}
                  value={titleCardConfig?.remark}
                  placeholder="请输入备注内容"
                  onChange={handleInputChange("remark")}
                />
              </div>
              <div className="title-card-text-vertical">
                <span>位置</span>
                <div className="title-card-text-right">
                  <Radio.Group
                    disabled={!titleCardConfig?.isShowRemark}
                    onChange={handleRemarkPositionChange}
                    value={titleCardConfig?.remarkPosition}
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
                  checked={titleCardConfig?.isShowEndNote}
                  onChange={handleCheckboxChange("isShowEndNote")}
                >
                  尾注
                </Checkbox>
              </div>
              <div className="title-card-text">
                <span>尾注内容</span>
                <Input
                  disabled={!titleCardConfig?.isShowEndNote}
                  size="small"
                  maxLength={100}
                  value={titleCardConfig?.endNote}
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
                  checked={titleCardConfig?.isShowBackgroundColor}
                  onChange={handleCheckboxChange("isShowBackgroundColor")}
                >
                  自定义组件背景填充
                </Checkbox>
              </div>
              <div className="title-card-text">
                <span>卡片颜色</span>
                <ColorPicker
                  size="small"
                  value={titleCardConfig?.backgroundColor}
                  disabled={!titleCardConfig?.isShowBackgroundColor}
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
                  value={titleCardConfig?.borderRadius}
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
                    value={titleCardConfig?.chartCardPadding?.[index]}
                    onChange={handleInputNumberChange(index)}
                  />
                ))}
              </div>
            </div>
          ),
          style: panelStyle,
        },
      ],
      [titleCardConfig]
    );
  return (
    <div className={`${prefixCls}-container`}>
      <CoolCollapse
        // defaultActiveKey={["1", "2", "3"]}
        expandIcon={({ isActive }) => (
          <CaretRightOutlined rotate={isActive ? 90 : 0} />
        )}
        items={getItems(panelStyle)}
      />
    </div>
  );
};

export default TitleCard;
