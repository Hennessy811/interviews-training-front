import React from 'react';
import styles from './ScenariosDashboard.module.scss';
import cn from 'classnames';
import ScenarioItem from './ScenarioItem';
import { Typography } from 'antd';

const scenarios = [
    { title: 'Junior', disabled: false, tags: ['easy', 'js'] },
    { title: 'Middle', disabled: false, tags: ['medium', 'react', 'js'] },
    { title: 'Toptal', disabled: true, tags: ['company set', 'hard', 'react', 'js'] },
    { title: 'Sberbank', disabled: true, tags: ['company set', 'react', 'js'] },
];

const ScenariosDashboard = () => {
    return (
        <>
            <Typography.Title level={2}>Сеты вопросов</Typography.Title>
            <div className={styles.ScenariosDashboard}>
                {scenarios.map((i) => {
                    return (
                        <>
                            <ScenarioItem key={i.title} data={i} disabled={i.disabled} />
                        </>
                    );
                })}
            </div>
        </>
    );
};

export default ScenariosDashboard;
