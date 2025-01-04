import React from 'react';
import {
    PageContainer,
    ProCard,
} from '@ant-design/pro-components';
import { Button } from 'antd';
import RecommendDashboard from "../../components/dashboard/commendDashboard";

const WorkBenchPage: React.FC = () => {
    // 快捷操作
    const quickActions = [{
        key: 'quickAction1',
        name: "创建仪表板"
    }]
    return (
        <PageContainer
            extra={
                quickActions.map((action) => (
                    <Button key={action.key} type="primary">
                        {action.name}
                    </Button>
                ))
            }
        >
            <ProCard
                style={{
                    height: '200vh',
                    minHeight: 800,
                }}
                bordered
            >
                <RecommendDashboard />
            </ProCard>
        </PageContainer>
    );
}

export default WorkBenchPage;
