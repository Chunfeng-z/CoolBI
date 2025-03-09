import React, {
  CSSProperties,
  useCallback,
  useState,
  useEffect,
  useMemo,
} from "react";
import CoolCollapse from "../../../common/CoolCollapse";
import {
  CaretRightOutlined,
  DesktopOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import {
  Checkbox,
  CheckboxProps,
  CollapseProps,
  ColorPicker,
  Input,
  InputNumber,
  InputNumberProps,
  Radio,
  RadioChangeEvent,
  Tooltip,
} from "antd";
import useChartStore, { ChartConfig } from "../../../../stores/useChartStore";
import { pick } from "lodash-es";
const prefixCls = "title-card";

type TitleCardProps = Pick<
  ChartConfig,
  | "isShowTitle"
  | "title"
  | "titleColor"
  | "titleFontSize"
  | "isShowRemark"
  | "remark"
  | "remarkPosition"
  | "isShowEndNote"
  | "endNote"
  | "isShowBackgroundColor"
  | "backgroundColor"
  | "borderRadius"
>;
/** 标题与卡片 */
const TitleCard: React.FC = () => {
  const titleCardProps = useMemo(
    () => [
      "isShowTitle",
      "title",
      "titleColor",
      "titleFontSize",
      "isShowRemark",
      "remark",
      "remarkPosition",
      "isShowEndNote",
      "endNote",
      "isShowBackgroundColor",
      "backgroundColor",
      "borderRadius",
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
  }, [getCurrentChartConfig, titleCardProps, curChartId]);
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
    (key: "titleFontSize" | "borderRadius"): InputNumberProps["onChange"] =>
    (value) => {
      setCurTitleCardConfig((prev) => {
        return {
          ...prev,
          [key]: value,
        };
      });
      setChartsConfig(curChartId!, {
        [key]: value,
      });
    };

  /**  备注位置 */
  const handleRemarkPositionChange = (e: RadioChangeEvent) => {
    setCurTitleCardConfig((prev) => {
      return {
        ...prev,
        remarkPosition: e.target.value,
      };
    });
  };

  const panelStyle: React.CSSProperties = {
    marginBottom: 8,
    background: "#F7F7F7",
    borderRadius: 5,
  };
  const getItems: (panelStyle: CSSProperties) => CollapseProps["items"] =
    useCallback(
      (panelStyle) => [
        {
          key: "1",
          label: "标题",
          children: (
            <div className="title-card-item">
              <Checkbox
                checked={curTitleCardConfig?.isShowTitle}
                onChange={handleCheckboxChange("isShowTitle")}
              >
                显示主标题
              </Checkbox>
              <div className="title-card-text">
                <span>标题</span>
                <Tooltip title="标题最长允许输入100字符">
                  <InfoCircleOutlined />
                </Tooltip>
                <Input
                  disabled={!curTitleCardConfig?.isShowTitle}
                  size="small"
                  placeholder="请输入图表组件名称"
                  value={curTitleCardConfig?.title}
                  onChange={handleInputChange("title")}
                />
              </div>
              <div className="title-card-text">
                <span>文本</span>
                <ColorPicker
                  value={curTitleCardConfig?.titleColor}
                  size="small"
                  showText
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
            </div>
          ),
          style: panelStyle,
        },
        {
          key: "2",
          label: "备注与尾注",
          children: (
            <div className="title-card-item">
              <Checkbox
                checked={curTitleCardConfig?.isShowRemark}
                onChange={handleCheckboxChange("isShowRemark")}
              >
                备注
              </Checkbox>
              <div className="title-card-text">
                <span>备注内容</span>
                <Input
                  disabled={!curTitleCardConfig?.isShowRemark}
                  size="small"
                  value={curTitleCardConfig?.remark}
                  placeholder="请输入备注内容"
                  onChange={handleInputChange("remark")}
                />
              </div>
              <div className="title-card-text">
                <span>位置</span>
                <Radio.Group
                  disabled={!curTitleCardConfig?.isShowRemark}
                  onChange={handleRemarkPositionChange}
                  value={curTitleCardConfig?.remarkPosition}
                  options={[
                    { value: 1, label: "标题后方" },
                    { value: 2, label: "标题下方" },
                  ]}
                />
              </div>
              <Checkbox
                checked={curTitleCardConfig?.isShowEndNote}
                onChange={handleCheckboxChange("isShowEndNote")}
              >
                尾注
              </Checkbox>
              <div className="title-card-text">
                <span>尾注内容</span>
                <Input
                  disabled={!curTitleCardConfig?.isShowEndNote}
                  size="small"
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
              <Checkbox
                checked={curTitleCardConfig?.isShowBackgroundColor}
                onChange={handleCheckboxChange("isShowBackgroundColor")}
              >
                组件背景填充
              </Checkbox>
              <div className="title-card-text">
                <span>卡片颜色</span>
                <ColorPicker
                  size="small"
                  value={curTitleCardConfig?.backgroundColor}
                  disabled={!curTitleCardConfig?.isShowBackgroundColor}
                  showText
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
              <div className="title-card-text" style={{ marginLeft: 0 }}>
                <DesktopOutlined />
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
                    defaultValue={12}
                    style={{ width: 140 }}
                    value={[1, 2, 3, 4][index]}
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
        style={{ fontSize: 13 }}
      />
    </div>
  );
};

export default TitleCard;
