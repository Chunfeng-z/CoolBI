import React from "react";
import { Button, Result } from "antd";
import { useNavigateToHome } from "./utils";
const prefixCls = "server-error";
const ServerError: React.FC = () => {
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
        status="500"
        title="500"
        subTitle="对不起，出错了。"
        extra={
          <Button type="primary" onClick={handleBackClick}>
            {"回到主页"}
          </Button>
        }
      />
    </div>
  );
};

export default ServerError;
