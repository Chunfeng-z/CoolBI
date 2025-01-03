import React from 'react';
import { Button, Result } from 'antd';

const PageNotFound: React.FC = () => {

    return (
        <Result
            status="404"
            title="404"
            subTitle="抱歉，您访问的页面不存在。"
            extra={<Button type="primary">Back Home</Button>}
        />
    );
}

export default PageNotFound;
