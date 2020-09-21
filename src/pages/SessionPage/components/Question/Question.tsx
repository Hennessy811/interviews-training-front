import React, { FC, useEffect, useState } from 'react';
import styles from './Question.module.scss';
import cn from 'classnames';
import { Typography, Slider, Button, Space } from 'antd';
import { Question as QuestionInterface } from '../../../../shared/interfaces/scenario';
import TextArea from 'antd/lib/input/TextArea';
import { FrownOutlined, SmileOutlined, ArrowRightOutlined, ArrowLeftOutlined } from '@ant-design/icons';

interface QuestionProps {
    question: QuestionInterface;
    onNext: ({ mark, answer }: { mark: number; answer: string }) => void;
    onPrev: ({ mark, answer }: { mark: number; answer: string }) => void;
}

const marksEmojis = {
    1: '❌',
    2: '🙄',
    3: '🤨',
    4: '👌',
    5: '✅',
};

const Question: FC<QuestionProps> = ({ question, onNext, onPrev }) => {
    const [mark, setMark] = useState(3);
    const [answer, setAnswer] = useState('');

    // Reset to default
    useEffect(() => {
        setAnswer('');
        setMark(3);
    }, [question]);

    return (
        <div className="mt-50">
            <Typography.Title level={3}>{question.title}</Typography.Title>

            <TextArea value={answer} onChange={(e) => setAnswer(e.target.value)}></TextArea>

            <div className="mt-20">
                <Typography.Title level={4}>Насколько ты согласен с ответом</Typography.Title>
            </div>
            <div className={styles.responseSlider}>
                <div className="mr-15">
                    <FrownOutlined style={{ fontSize: '24px' }} />
                </div>
                <Slider
                    style={{ width: '300px' }}
                    dots
                    value={mark}
                    onChange={(e: any) => setMark(e)}
                    marks={marksEmojis}
                    min={1}
                    max={5}
                />
                <div className="ml-15">
                    <SmileOutlined style={{ fontSize: '24px' }} />
                </div>
            </div>

            <div className="mt-20">
                <Space>
                    <Button type="ghost" onClick={() => onPrev({ mark, answer })}>
                        <ArrowLeftOutlined />
                        Предыдущий
                    </Button>
                    <Button type="primary" onClick={() => onNext({ mark, answer })}>
                        Следующий
                        <ArrowRightOutlined />
                    </Button>
                </Space>
            </div>
        </div>
    );
};

export default Question;
