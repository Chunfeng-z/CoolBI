import React from "react";
import { Button, Result } from "antd";
import { useNavigateToHome } from "./utils/index";
const prefixCls = "page-not-authorized";
const PageNotAuthorized: React.FC = () => {
  /** 返回主页 */
  const handleBackClick = useNavigateToHome();
  return (
    <div
      className={`${prefixCls}-container`}
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Result
        status="403"
        title="403"
        subTitle="抱歉，您无权访问此页面。"
        extra={
          <Button type="primary" onClick={handleBackClick}>
            {"回到主页"}
          </Button>
        }
      />
    </div>
  );
};

export default PageNotAuthorized;
