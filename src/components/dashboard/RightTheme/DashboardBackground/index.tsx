import { Checkbox, CheckboxProps } from "antd";
import React, { useState } from "react";
import "./index.scss";
const prefixCls = "right-theme-dashboard-background";
/** 仪表板背景设置 */
const DashboardBackground: React.FC = () => {
  /** 是否展示顶部图片 */
  const [isShowTopImage, setIsShowTopImage] = useState<boolean>(false);
  const handleShowTopImage: CheckboxProps["onChange"] = (e) => {
    setIsShowTopImage(e.target.checked);
  };
  /** 是否展示底部图片 */
  const [isShowBottomImage, setIsShowBottomImage] = useState<boolean>(false);
  const handleShowBottomImage: CheckboxProps["onChange"] = (e) => {
    setIsShowBottomImage(e.target.checked);
  };

  return (
    <div className={`${prefixCls}-container`}>
      <div className="dashboard-background-row">
        <div className="dashboard-background-checkbox">
          <Checkbox checked={isShowTopImage} onChange={handleShowTopImage}>
            顶部图片
          </Checkbox>
        </div>
        {isShowTopImage && <div className="image-picker">这里是图片选择器</div>}
      </div>
      <div className="dashboard-background-row">
        <div className="dashboard-background-checkbox">
          <Checkbox
            checked={isShowBottomImage}
            onChange={handleShowBottomImage}
          >
            底部图片
          </Checkbox>
        </div>
        {isShowBottomImage && (
          <div className="image-picker">这里是图片选择器具</div>
        )}
      </div>
    </div>
  );
};

export default DashboardBackground;
