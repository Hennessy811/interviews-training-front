import React, { useEffect, useState, useReducer } from 'react';
import styles from './ScenarioPage.module.scss';
import cn from 'classnames';
import { useParams, useHistory } from 'react-router-dom';
import { Skeleton, Card, message, Typography, Tag, Button, Space } from 'antd';
import { PlaySquareOutlined, LinkOutlined } from '@ant-design/icons';

import { BASE_URL, tagsColors } from '../../shared/utils/helpers';
import { scenarioPageReducer, scenarioPageInitialState, StateActions } from './ScenarioPage.store';
import { RootStore } from '../../store';
import { useSelector } from 'react-redux';

const ScenarioPage = () => {
    const { id } = useParams();
    const h = useHistory();
    const [state, dispatch] = useReducer(scenarioPageReducer, scenarioPageInitialState);
    const user = useSelector((state: RootStore) => state.user.data);

    const { data, loading, started } = state;

    useEffect(() => {
        fetch(`${BASE_URL}/scenes/${id}`)
            .then((r) => r.json())
            .then((r) => {
                dispatch({
                    type: StateActions.SET_SCENARIO,
                    payload: r,
                });
            })
            .catch(() => {
                message.error('Ошибка при получении записей, попробуйте обновить страницу');
            });
    }, []);

    return (
        <div className="text-center">
            <Card>
                {!data ? (
                    <Skeleton active />
                ) : (
                    <>
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

                        {!started && (
                            <div>
                                <div className="mt-25">
                                    <Space>
                                        <Button
                                            type="primary"
                                            onClick={() => {
                                                const body = JSON.stringify({
                                                    userId: user?._id,
                                                    scenarioId: id,
                                                });

                                                console.log(body);

                                                fetch(`${BASE_URL}/scenes/start`, {
                                                    headers: {
                                                        'Content-Type': 'application/json',
                                                    },
                                                    method: 'POST',
                                                    body,
                                                })
                                                    .then((r) => r.json())
                                                    .then((r) => h.push(`/scenario/${id}/${r._id}`));
                                                dispatch({
                                                    type: StateActions.START,
                                                });
                                            }}
                                        >
                                            Начать как интервьюер
                                        </Button>
                                        <Button disabled type="dashed">
                                            Начать как кандидат
                                        </Button>
                                    </Space>
                                </div>

                                <div className="mt-10">
                                    <Typography.Text type="secondary">
                                        Будет создана уникальная ссылка сессии. Поделитесь ей, чтобы начать интервью
                                    </Typography.Text>
                                </div>
                            </div>
                        )}

                        {started && (
                            <div className="mt-30">
                                <Typography.Title level={3}>Сессия создана </Typography.Title>

                                <Space>
                                    <Button
                                        type="primary"
                                        // loading
                                        // onClick={() => h.push(`/scenario/${id}/${sessionId}`)}
                                        // target="__blank"
                                    >
                                        <PlaySquareOutlined />
                                        начать
                                    </Button>
                                    <Button type="default" loading href="/" target="__blank">
                                        <LinkOutlined />
                                        копировать url
                                    </Button>
                                </Space>
                            </div>
                        )}
                    </>
                )}
            </Card>
        </div>
    );
};

export default ScenarioPage;
