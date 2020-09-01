import React, { useEffect } from 'react';
import styles from './AppHeader.module.scss';
import cn from 'classnames';
import { Menu, Button } from 'antd';
import { useAuth } from '../../utils/hooks/useAuth';
import { useDispatch, useSelector } from 'react-redux';
import { UsersActions } from '../../../store/Users/users.actions';
import { RootStore } from '../../../store';
import { Link, useHistory } from 'react-router-dom';

const AppHeader = () => {
    const user = useSelector((state: RootStore) => state.user.data);
    const auth = useAuth();
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        if (auth?.name) {
            dispatch({
                type: UsersActions.SAVE_USER_SUCCESS,
                payload: auth,
            });
        }
    }, [auth]);

    console.log(history);

    return (
        <div className={styles.Header}>
            <div>
                <div className="logo" />
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[history.location.pathname]}>
                    <Menu.Item key="/">
                        <Link to="/">Главная</Link>
                    </Menu.Item>
                    <Menu.Item key="/create-scenario">
                        <Link to="/create-scenario">Создать сет</Link>
                    </Menu.Item>
                </Menu>
            </div>
            <div>
                <div>
                    {user ? (
                        <>
                            <Button type="link" href="/auth">
                                {user?.name}
                            </Button>
                            <Button
                                type="primary"
                                onClick={() =>
                                    dispatch({
                                        type: UsersActions.LOGOUT,
                                    })
                                }
                            >
                                Logout
                            </Button>
                            )
                        </>
                    ) : (
                        <>
                            <Button type="link" href="/auth">
                                Login
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AppHeader;
