import { Button , Flex} from 'antd';
import React from 'react';

const RecommendDashboardTitle:React.FC = () => {
    return (
        <div className='commendDashboard-title-container'>
            <Flex justify='space-between'>
                <div>获取灵感</div>
                <Button variant='text' color='primary'>收起</Button>
            </Flex>
        </div>
    );
}

export default RecommendDashboardTitle;
