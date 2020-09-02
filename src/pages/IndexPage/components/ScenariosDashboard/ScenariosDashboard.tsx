import React, { useEffect, useState } from 'react';
import styles from './ScenariosDashboard.module.scss';
import cn from 'classnames';
import ScenarioItem from './ScenarioItem';
import { Typography, message } from 'antd';
import { BASE_URL } from '../../../../shared/utils/helpers';

const scenarios = [
    { title: 'Junior', disabled: false, tags: ['easy', 'js'] },
    { title: 'Middle', disabled: false, tags: ['medium', 'react', 'js'] },
    { title: 'Toptal', disabled: true, tags: ['company set', 'hard', 'react', 'js'] },
    { title: 'Sberbank', disabled: true, tags: ['company set', 'react', 'js'] },
];

const ScenariosDashboard = () => {
    const [sets, setSets]: any = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        fetch(`${BASE_URL}/scenes`)
            .then((r) => r.json())
            .then((r) => {
                setSets([...r, ...sets]);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
                message.error('Ошибка при получении записей, попробуйте обновить страницу');
            });
    }, []);

    return (
        <>
            <Typography.Title level={2}>Сеты вопросов</Typography.Title>
            <div className={styles.ScenariosDashboard}>
                {loading && Array.from({ length: 6 }).map((i, idx) => <ScenarioItem key={idx} data={idx} loading />)}
                {sets.map((i: any) => {
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
