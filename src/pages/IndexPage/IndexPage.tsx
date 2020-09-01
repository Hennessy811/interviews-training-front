import React from 'react';
import styles from './IndexPage.module.scss';
import cn from 'classnames';
import { Typography } from 'antd';
import ScenariosDashboard from './components/ScenariosDashboard';

const IndexPage = () => {
    return (
        <div>
            <Typography.Title>Интервью-практикум</Typography.Title>
            <Typography.Text type="secondary">Симулируй и властвуй</Typography.Text>

            <ScenariosDashboard />
        </div>
    );
};

export default IndexPage;
