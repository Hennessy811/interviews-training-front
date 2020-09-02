import React, { useReducer, useEffect } from 'react';
import styles from './SessionPage.module.scss';
import cn from 'classnames';
import { Typography, message, Tag, Skeleton, Card } from 'antd';
import { sessionPageReducer, sessionPageInitialState, StateActions } from './SessionPage.store';
import { BASE_URL, tagsColors } from '../../shared/utils/helpers';
import { useParams } from 'react-router-dom';
import { Scenario } from '../../shared/interfaces/scenario';

const loadScenario = (id: string, updateFn: (r: Scenario) => void) => {
    fetch(`${BASE_URL}/scenes/${id}`)
        .then((r) => r.json())
        .then(updateFn)
        .catch(() => {
            message.error('Ошибка при получении записей, попробуйте обновить страницу');
        });
};

const SessionPage = () => {
    const [state, dispatch] = useReducer(sessionPageReducer, sessionPageInitialState);
    const { scenarioId, sessionId } = useParams();

    useEffect(() => {
        loadScenario(scenarioId, (r) =>
            dispatch({
                type: StateActions.SET_SCENARIO,
                payload: r,
            }),
        );
    }, []);

    const { data } = state;

    if (!data)
        return (
            <Card>
                <Skeleton active />
            </Card>
        );

    return (
        <div>
            <Card>
                <div>
                    <Typography.Title>{data.title}</Typography.Title>
                </div>
                <div>
                    {data.tags.map((i: string) => (
                        <Tag color={tagsColors.find((c) => c.text === i)?.color} key={i}>
                            {i}
                        </Tag>
                    ))}
                </div>
            </Card>
        </div>
    );
};

export default SessionPage;
