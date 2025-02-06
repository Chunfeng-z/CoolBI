import React from "react";
import "./index.scss";

/** 登录页背景气泡 */
const StarrySky: React.FC = () => {
  return (
    <div className="starry-sky">
      <div className="starry-sky-layer1"></div>
      <div className="starry-sky-layer2"></div>
      <div className="starry-sky-layer3"></div>
      <div className="starry-sky-layer4"></div>
      <div className="starry-sky-layer5"></div>
    </div>
  );
};

export default StarrySky;
