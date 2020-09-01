import React, { FC } from 'react';
// import styles from './Transformer.module.scss';
// import cn from 'classnames';
import { Card, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { RootStore } from '../../store';
import { UsersActions } from '../../store/Users/users.actions';

const Transformer: FC = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: RootStore) => state.user);

    const onChangeName = () => {
        dispatch({ type: UsersActions.ChangeName, payload: 'Kek Kekovitch' });
    };

    return (
        <div>
            <Card className="m-5">
                <Button type="dashed" disabled={!user.data} onClick={onChangeName}>
                    Set name
                </Button>
            </Card>
        </div>
    );
};

export default Transformer;
