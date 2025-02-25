import React, { CSSProperties, useCallback, useState } from "react";
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
  ColorPickerProps,
  GetProp,
  Input,
  InputNumber,
  InputNumberProps,
  Radio,
  RadioChangeEvent,
  Tooltip,
} from "antd";
import classNames from "classnames";
const prefixCls = "title-card";
type Color = GetProp<ColorPickerProps, "value">;
/** 标题与卡片 */
const TitleCard: React.FC = () => {
  /** 是否展示标题 */
  const [isTitleChecked, setIsTitleChecked] = useState<boolean>(true);
  /** 图表组件的title */
  const [title, setTitle] = useState<string>("这是组件1");
  /** 图表组件的标题颜色 */
  const [color, setColor] = useState<Color>("#1677ff");
  /** 图表组件的标题字号 */
  const [fontSize, setFontSize] = useState<number | string | null>(14);
  /** 是否展示备注 */
  const [isRemarkChecked, setIsRemarkChecked] = useState<boolean>(false);
  /** 备注内容 */
  const [remark, setRemark] = useState<string>("");
  /** 备注的位置 */
  const [remarkPosition, setRemarkPosition] = useState(1);
  /** 是否展示尾注 */
  const [isEndNoteChecked, setIsEndNoteChecked] = useState<boolean>(false);
  /** 尾注内容 */
  const [endNote, setEndNote] = useState<string>("");
  /** 组件背景填充状态 */
  const [isBackgroundColorChecked, setIsBackgroundColorChecked] =
    useState<boolean>(false);
  /** 组件背景填充颜色 */
  const [backgroundColor, setBackgroundColor] = useState<Color>("#fff");
  /** 组件容器的圆角 */
  const [borderRadius, setBorderRadius] = useState<number>(12);
  const handleTitleChecked: CheckboxProps["onChange"] = (e) => {
    setIsTitleChecked(e.target.checked);
  };
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handleFontSizeChange: InputNumberProps["onChange"] = (value) => {
    setFontSize(value);
  };
  const handleRemarkChecked: CheckboxProps["onChange"] = (e) => {
    setIsRemarkChecked(e.target.checked);
  };
  const handleRemarkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRemark(e.target.value);
  };
  const handleRemarkPositionChange = (e: RadioChangeEvent) => {
    setRemarkPosition(e.target.value);
  };
  const handleEndNoteChecked: CheckboxProps["onChange"] = (e) => {
    setIsEndNoteChecked(e.target.checked);
  };
  const handleEndNoteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndNote(e.target.value);
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
            <div
              className={classNames("title-card-item", {
                disabled: !isTitleChecked,
              })}
            >
              <Checkbox checked={isTitleChecked} onChange={handleTitleChecked}>
                显示主标题
              </Checkbox>
              <div className="title-card-text">
                <span>标题</span>
                <Tooltip title="标题最长允许输入100字符">
                  <InfoCircleOutlined />
                </Tooltip>
                <Input
                  disabled={!isTitleChecked}
                  size="small"
                  placeholder="请输入图表组件名称"
                  value={title}
                  onChange={handleTitleChange}
                />
              </div>
              <div className="title-card-text">
                <span>文本</span>
                <ColorPicker
                  value={color}
                  size="small"
                  disabled={!isTitleChecked}
                  onChange={setColor}
                />
                <InputNumber
                  size="small"
                  disabled={!isTitleChecked}
                  changeOnWheel
                  min={5}
                  max={30}
                  defaultValue={14}
                  step={1}
                  style={{ width: 100 }}
                  addonAfter="px"
                  onChange={handleFontSizeChange}
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
                checked={isRemarkChecked}
                onChange={handleRemarkChecked}
              >
                备注
              </Checkbox>
              <div className="title-card-text">
                <span>备注内容</span>
                <Input
                  disabled={!isRemarkChecked}
                  size="small"
                  value={remark}
                  placeholder="请输入备注内容"
                  onChange={handleRemarkChange}
                />
              </div>
              <div className="title-card-text">
                <span>位置</span>
                <Radio.Group
                  disabled={!isRemarkChecked}
                  onChange={handleRemarkPositionChange}
                  value={remarkPosition}
                  options={[
                    { value: 1, label: "标题后方" },
                    { value: 2, label: "标题下方" },
                  ]}
                />
              </div>
              <Checkbox
                checked={isEndNoteChecked}
                onChange={handleEndNoteChecked}
              >
                尾注
              </Checkbox>
              <div className="title-card-text">
                <span>尾注内容</span>
                <Input
                  disabled={!isEndNoteChecked}
                  size="small"
                  value={endNote}
                  placeholder="请输入尾注内容"
                  onChange={handleEndNoteChange}
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
                checked={isBackgroundColorChecked}
                onChange={(e) => {
                  setIsBackgroundColorChecked(e.target.checked);
                }}
              >
                组件背景填充
              </Checkbox>
              <div className="title-card-text">
                <span>卡片颜色</span>
                <ColorPicker
                  size="small"
                  value={backgroundColor}
                  disabled={!isBackgroundColorChecked}
                  onChange={setBackgroundColor}
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
                  onChange={(value) => {
                    setBorderRadius(value || 0);
                  }}
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
      [
        isTitleChecked,
        title,
        color,
        isRemarkChecked,
        remark,
        remarkPosition,
        isEndNoteChecked,
        endNote,
        isBackgroundColorChecked,
        backgroundColor,
      ]
    );
  return (
    <div className={`${prefixCls}-container`}>
      <CoolCollapse
        defaultActiveKey={["2", "3"]}
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
