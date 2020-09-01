import React, { FC } from 'react';
import styles from './Consumer.module.scss';
import cn from 'classnames';
import { Card, Typography } from 'antd';
import { useSelector } from 'react-redux';
import { RootStore } from '../../store';

const Consumer: FC = () => {
    const user = useSelector((state: RootStore) => state.user);

    return (
        <div>
            <Card className={cn('m-5', styles.Card)} loading={user.loading}>
                {user.data && (
                    <>
                        <Typography.Title>{user.data.name}</Typography.Title>
                    </>
                )}
            </Card>
        </div>
    );
};

export default Consumer;
