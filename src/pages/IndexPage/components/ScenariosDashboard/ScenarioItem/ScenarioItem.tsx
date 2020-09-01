import React, { FC } from 'react';
import styles from './ScenarioItem.module.scss';
import cn from 'classnames';
import { Tooltip, Typography, Tag } from 'antd';

interface ScenarioItemProps {
    data: any;
    disabled?: boolean;
}

const tagsColors = [
    { text: 'easy', color: 'green' },
    { text: 'hard', color: 'red' },
    { text: 'medium', color: 'orange' },
    { text: 'react', color: 'blue' },
    { text: 'js', color: 'volcano' },
    { text: 'company set', color: 'magenta' },
];

const ScenarioItem: FC<ScenarioItemProps> = ({ data, disabled = false }) => {
    const cardContent = (
        <div className={cn(styles.scenarioCard, { [styles.disabled]: disabled })}>
            <div>
                <Typography.Title level={4} style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                    {data.title}
                </Typography.Title>
            </div>
            <div style={{ textAlign: 'center' }}>
                {data.tags.map((i: string) => (
                    <Tag color={tagsColors.find((c) => c.text === i)?.color} key={i}>
                        {i}
                    </Tag>
                ))}
            </div>
        </div>
    );
    return <>{disabled ? <Tooltip title="Скоро">{cardContent}</Tooltip> : cardContent}</>;
};

export default ScenarioItem;
