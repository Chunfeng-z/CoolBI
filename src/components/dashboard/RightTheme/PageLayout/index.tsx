import { DesktopOutlined, FormOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  CheckboxProps,
  ColorPicker,
  Input,
  InputNumber,
  Popover,
  Select,
  Slider,
} from "antd";
import React, { useState } from "react";
import "./index.scss";
const prefixCls = "right-theme-page-layout";
const layoutItem = "page-layout-item";
const itemTitle = "page-layout-item-title";
/** 右侧主题的页面布局设置 */
const PageLayout: React.FC = () => {
  /** 是否展示标题区域 */
  const [isShowTitle, setIsShowTitle] = useState<boolean>(false);
  const handleShowTitle: CheckboxProps["onChange"] = (e) => {
    setIsShowTitle(e.target.checked);
  };
  /** 是否展示页尾区域 */
  const [isShowTail, setIsShowTail] = useState<boolean>(false);
  const handleShowTail: CheckboxProps["onChange"] = (e) => {
    setIsShowTail(e.target.checked);
  };
  /** Title settings */
  const [fontSize, setFontSize] = useState<number>(24);
  const [isBold, setIsBold] = useState<boolean>(false);
  const [textAlign, setTextAlign] = useState<string>("center");

  /** Background settings */
  const [backgroundColor, setBackgroundColor] = useState<string>("pink");
  const [backgroundImage, setBackgroundImage] = useState<boolean>(false);
  const [backgroundHeight, setBackgroundHeight] = useState<number>(291);
  /** 标题区域的弹出框 */
  const popoverContent = (
    <div>
      <div>
        <label>Font Size: </label>
        <InputNumber value={fontSize} min={10} max={50} />
      </div>
      <div>
        <Checkbox
          checked={isBold}
          onChange={(e) => setIsBold(e.target.checked)}
        >
          Bold
        </Checkbox>
      </div>
      <div>
        <label>Text Alignment: </label>
        <Select
          value={textAlign}
          onChange={(e) => setTextAlign(e.target.value)}
        >
          <option value="left">Left</option>
          <option value="center">Center</option>
          <option value="right">Right</option>
        </Select>
      </div>
      <div>
        <label>Background Color: </label>
        <Input
          type="color"
          value={backgroundColor}
          onChange={(e) => setBackgroundColor(e.target.value)}
        />
      </div>
      <div>
        <Checkbox
          checked={backgroundImage}
          onChange={(e) => setBackgroundImage(e.target.checked)}
        >
          Use Background Image
        </Checkbox>
      </div>
      <div>
        <label>Background Height: </label>
        <Slider
          min={100}
          max={500}
          value={backgroundHeight}
          onChange={setBackgroundHeight}
        />
      </div>
    </div>
  );
  return (
    <div className={`${prefixCls}-container`}>
      <div className={`${layoutItem} page-info`}>
        <div className={itemTitle}>页面信息</div>
        <div className="page-info-checkbox">
          <div className="page-info-title">
            <Checkbox checked={isShowTitle} onChange={handleShowTitle}>
              <DesktopOutlined className="page-info-checkbox-icon" />
              标题区域
            </Checkbox>
            <Popover content={popoverContent} title="Title" trigger="click">
              <Button
                type="text"
                size="small"
                icon={<FormOutlined />}
                disabled={!isShowTitle}
              />
            </Popover>
          </div>
          <div className="page-info-tail">
            <Checkbox checked={isShowTail} onChange={handleShowTail}>
              <DesktopOutlined className="page-info-checkbox-icon" />
              页尾区域
            </Checkbox>
            <Button
              type="text"
              size="small"
              icon={<FormOutlined />}
              disabled={!isShowTail}
            />
          </div>
        </div>
      </div>
      <div className={`${layoutItem} page-background`}>
        <div className={itemTitle}>页面背景</div>
        <div className="page-background-color-picker">
          <ColorPicker defaultValue="#1677ff" size="small" />
        </div>
      </div>
      <div className={`${layoutItem} page-background-image`}>
        <div className={itemTitle}>页面背景图片</div>
        <div className="page-background-image-picker">
          <Popover>
            <Button size="small">背景图片选择</Button>
          </Popover>
          <div className="picked-image"></div>
        </div>
      </div>
    </div>
  );
};

export default PageLayout;
