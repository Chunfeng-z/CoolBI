import { Button, Result } from "antd";
import React from "react";

import { useNavigateToHome } from "@/utils/hooks";
const prefixCls = "page-not-authorized";
const PageNotAuthorized: React.FC = () => {
  /** 返回主页 */
  const handleBackClick = useNavigateToHome();
  return (
    <div className={`${prefixCls}-container error-page-container`}>
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
