import React, { FC } from 'react';
import styles from './ScenarioItem.module.scss';
import cn from 'classnames';
import { Tooltip, Typography, Tag, Card } from 'antd';
import { Link } from 'react-router-dom';
import { tagsColors } from '../../../../../shared/utils/helpers';

interface ScenarioItemProps {
    data: any;
    loading?: boolean;
    disabled?: boolean;
}

const ScenarioItem: FC<ScenarioItemProps> = ({ data, disabled = false, loading = false }) => {
    const emptyCard = (
        <div className="scenario-card">
            <Card loading className={cn(styles.scenarioCard)}></Card>
        </div>
    );
    if (loading) return emptyCard;

    const cardContent = (
        <Link to={`/scenario/${data._id}`}>
            <Card
                loading={loading}
                title={data.title}
                className={cn(styles.scenarioCard, { [styles.disabled]: disabled })}
            >
                <div style={{ textAlign: 'center' }}>
                    {data.tags.map((i: string) => (
                        <Tag color={tagsColors.find((c) => c.text === i)?.color} key={i}>
                            {i}
                        </Tag>
                    ))}
                </div>
            </Card>
        </Link>
    );

    return <>{disabled ? <Tooltip title="Скоро">{cardContent}</Tooltip> : cardContent}</>;
};

export default ScenarioItem;
