import React, { FC } from 'react';
import styles from './Question.module.scss';
import cn from 'classnames';
import { Typography, Slider, Button, Space } from 'antd';
import { Question as QuestionInterface } from '../../../../shared/interfaces/scenario';
import TextArea from 'antd/lib/input/TextArea';
import { FrownOutlined, SmileOutlined, ArrowRightOutlined, ArrowLeftOutlined } from '@ant-design/icons';

interface QuestionProps {
    question: QuestionInterface;
    onNext: () => void;
    onPrev: () => void;
}

const Question: FC<QuestionProps> = ({ question, onNext, onPrev }) => {
    console.log({ question });

    return (
        <div className="mt-50">
            <Typography.Title level={3}>{question.title}</Typography.Title>

            <TextArea></TextArea>

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
                    marks={{
                        1: '❌',
                        2: '🙄',
                        3: '🤨',
                        4: '👌',
                        5: '✅',
                    }}
                    min={1}
                    max={5}
                />
                <div className="ml-15">
                    <SmileOutlined style={{ fontSize: '24px' }} />
                </div>
            </div>

            <div className="mt-20">
                <Space>
                    <Button type="ghost" onClick={() => onPrev()}>
                        <ArrowLeftOutlined />
                        Предыдущий
                    </Button>
                    <Button type="primary" onClick={() => onNext()}>
                        Следующий
                        <ArrowRightOutlined />
                    </Button>
                </Space>
            </div>
        </div>
    );
};

export default Question;
