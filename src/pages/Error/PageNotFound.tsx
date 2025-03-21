import { Button, Result } from "antd";
import React from "react";

import { useNavigateToHome } from "@/utils/hooks";
const prefixCls = "page-not-found";
const PageNotFound: React.FC = () => {
  const handleBackClick = useNavigateToHome();
  return (
    <div className={`${prefixCls}-container error-page-container`}>
      <Result
        status="404"
        title="404"
        subTitle="抱歉，您访问的页面不存在。"
        extra={
          <Button type="primary" onClick={handleBackClick}>
            {"回到主页"}
          </Button>
        }
      />
    </div>
  );
};

export default PageNotFound;
