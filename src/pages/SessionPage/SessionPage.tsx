import React, { useReducer, useEffect, useState } from 'react';
import styles from './SessionPage.module.scss';
import cn from 'classnames';
import { Typography, message, Tag, Skeleton, Card, Button } from 'antd';
import { sessionPageReducer, sessionPageInitialState, StateActions } from './SessionPage.store';
import { BASE_URL, tagsColors } from '../../shared/utils/helpers';
import { useParams } from 'react-router-dom';
import { Scenario } from '../../shared/interfaces/scenario';
import io from 'socket.io-client';

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
    const [socket, setSocket] = useState<SocketIOClient.Socket | null>();

    useEffect(() => {
        loadScenario(scenarioId, (r) =>
            dispatch({
                type: StateActions.SET_SCENARIO,
                payload: r,
            }),
        );

        setSocket(io(`${BASE_URL}`));
    }, []);

    useEffect(() => {
        if (socket) {
            socket.on('connection', (r: any) => {
                console.log(r);
                message.success('Сессия начата');
            });

            socket.on('message_i', (s: any) => {
                message.success('Сообщение');
                console.log(s);
            });
        }
    }, [socket]);

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

                <Button
                    onClick={() => {
                        socket?.emit('message_k', 'hello world');
                    }}
                >
                    send
                </Button>
            </Card>
        </div>
    );
};

export default SessionPage;
