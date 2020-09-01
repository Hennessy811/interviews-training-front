import React, { useReducer, useEffect, FC } from 'react';
import { Card, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { UsersActions } from '../../store/Users/users.actions';
import { RootStore } from '../../store';

interface TriggerReducerState {
    error: any | null;
    loading: boolean;
    data: any | null;
}

const initialState: TriggerReducerState = {
    error: null,
    loading: false,
    data: null,
};

// Локальный редьюсер - предпочтительнее useState для случаев со сложной логикой
const reducer = (state: TriggerReducerState, action: any) => {
    switch (action.type) {
        case 'get_data':
            return { ...state, loading: true };
        case 'data_ready':
            return { ...state, loading: false, data: 'ready' };
        default:
            return state;
    }
};

const getData = (dispatch: React.Dispatch<any>) => {
    setTimeout(() => {
        dispatch({ type: 'data_ready' });
    }, 3000);
};

const Trigger: FC = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: RootStore) => state.user);
    const [state, dispatchLocal] = useReducer(reducer, initialState);

    useEffect(() => {
        if (state.loading) getData(dispatchLocal);
    }, [state.loading]);

    const fetchUser = () => {
        dispatch({
            type: UsersActions.GetUser,
            payload: {
                userId: '1234',
                userStatus: 'loading',
            },
        });
    };

    return (
        <div>
            <Card className="m-5">
                {/* <Button
          className="ml-5 mr-5"
          type="primary"
          onClick={() => dispatchLocal({ type: "get_data" })}
          loading={state.loading}
        >
          Get posts
        </Button> */}
                <Button className="ml-5 mr-5" onClick={fetchUser} loading={user.loading}>
                    Get User
                </Button>
            </Card>
        </div>
    );
};

export default Trigger;
