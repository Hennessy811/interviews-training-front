import React, { FC } from 'react';
import styles from './QuestionsList.module.scss';
import cn from 'classnames';
import { Question } from '../../../../shared/interfaces/scenario';
import { List } from 'antd';

const QuestionsList: FC<{ questions: Question[]; activeId: string }> = ({ questions, activeId }) => {
    return (
        <div className={styles.QuestionsList}>
            {questions.map((q, idx) => (
                <div className={cn(styles.question, { [styles.active]: activeId === q._id })} key={q._id}>
                    {idx + 1}. {q.title}
                </div>
            ))}
        </div>
    );
};

export default QuestionsList;
