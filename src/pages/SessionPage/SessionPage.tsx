import React, { useReducer, useEffect, useState } from 'react';
import styles from './SessionPage.module.scss';
import cn from 'classnames';
import { Typography, message, Tag, Skeleton, Card, Button } from 'antd';
import { sessionPageReducer, sessionPageInitialState, StateActions, State } from './SessionPage.store';
import { BASE_URL, tagsColors } from '../../shared/utils/helpers';
import { useParams } from 'react-router-dom';
import { Scenario } from '../../shared/interfaces/scenario';
import io from 'socket.io-client';
import { useSelector } from 'react-redux';
import { RootStore } from '../../store';
import Question from './components/Question';
import QuestionsList from './components/QuestionsList';

const loadScenario = (id: string, updateFn: (r: Scenario) => void) => {
    fetch(`${BASE_URL}/scenes/${id}`)
        .then((r) => r.json())
        .then(updateFn)
        .catch(() => {
            message.error('Ошибка при получении записей, попробуйте обновить страницу');
        });
};
const loadSession = (id: string, updateFn: (r: any) => void) => {
    fetch(`${BASE_URL}/scenes/join/${id}`)
        .then((r) => r.json())
        .then(updateFn)
        .catch(() => {
            message.error('Ошибка при получении данных сессии, попробуйте обновить страницу');
        });
};

const SessionPage = () => {
    const [state, dispatch]: [State | null, any] = useReducer(sessionPageReducer, sessionPageInitialState);
    const { scenarioId, sessionId } = useParams();
    const [socket, setSocket] = useState<SocketIOClient.Socket | null>();
    const user = useSelector((state: RootStore) => state.user.data);

    useEffect(() => {
        loadScenario(scenarioId, (r) => {
            console.log(r);

            dispatch({
                type: StateActions.SET_SCENARIO,
                payload: r,
            });
        });

        // loadSession(sessionId, (r) => {
        //     console.log(r);
        // });

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

    console.log(data);

    if (!data)
        return (
            <Card>
                <Skeleton active />
            </Card>
        );

    const questionsList = data.sections.map((s) => s.questions).flat();

    console.log({ state });

    return (
        <div>
            <Card>
                <div className="d-flex">
                    <div style={{ flex: 1 }}>
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

                        <div className="mt-20">
                            <div>
                                <Typography.Text>
                                    <b>Интервьюер:</b> {user?.name}
                                </Typography.Text>
                            </div>
                            <div>
                                {/* <Typography.Text>
                            <b>Кандидат:</b> "кек"
                        </Typography.Text> */}
                            </div>
                        </div>

                        <div>
                            <Question
                                onNext={() => {
                                    dispatch({
                                        type: StateActions.NEXT,
                                    });
                                }}
                                onPrev={() => {
                                    dispatch({
                                        type: StateActions.PREV,
                                    });
                                }}
                                question={questionsList[state.currentQuestion]}
                            />
                        </div>

                        {/* <div className="mt-20">
                        <Button
                            onClick={() => {
                                socket?.emit('message_k', 'hello world');
                            }}
                        >
                            Сообщение сокет
                        </Button>
                    </div> */}
                    </div>
                    <div
                        style={{
                            maxWidth: '250px',
                            marginLeft: '30px',
                        }}
                    >
                        <QuestionsList activeId={questionsList[state.currentQuestion]._id} questions={questionsList} />
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default SessionPage;
