import { Button, Result } from "antd";
import React from "react";

import { useNavigateToHome } from "@/utils/hooks";
const prefixCls = "server-error";
const ServerError: React.FC = () => {
  const handleBackClick = useNavigateToHome();
  return (
    <div className={`${prefixCls}-container error-page-container`}>
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
