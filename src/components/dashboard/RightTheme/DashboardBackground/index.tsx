import React, { useState } from "react";
import { Checkbox, CheckboxProps } from "antd";
import "./index.scss";
import classNames from "classnames";
const prefixCls = "right-theme-dashboard-background";
const backgroundItem = "dashboard-background-item";
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
      <div className={`${backgroundItem} top-image`}>
        <div className="dashboard-background-checkbox">
          <Checkbox checked={isShowTopImage} onChange={handleShowTopImage}>
            顶部图片
          </Checkbox>
        </div>
        <div
          className={classNames("image-picker", {
            "picker-disabled": !isShowTopImage,
          })}
        >
          这里是图片选择器
        </div>
      </div>
      <div className={`${backgroundItem} bottom-image`}>
        <div className="dashboard-background-checkbox">
          <Checkbox
            checked={isShowBottomImage}
            onChange={handleShowBottomImage}
          >
            底部图片
          </Checkbox>
        </div>
        <div
          className={classNames("image-picker", {
            "picker-disabled": !isShowBottomImage,
          })}
        >
          这里是图片选择器具
        </div>
      </div>
    </div>
  );
};

export default DashboardBackground;
