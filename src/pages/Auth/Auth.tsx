import React, { useState, useEffect } from 'react';
import styles from './Auth.module.scss';
import cn from 'classnames';
import { Typography, Button, message } from 'antd';
import { GoogleLogin } from 'react-google-login';
import { RootStore } from '../../store';
import { useSelector, useDispatch } from 'react-redux';
import { useAuth } from '../../shared/utils/hooks/useAuth';
import { UsersActions } from '../../store/Users/users.actions';
import { Redirect } from 'react-router-dom';

const Auth = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: RootStore) => state.user.data);

    const onSuccess = (response: any) => {
        dispatch({
            type: UsersActions.SAVE_USER_PENDING,
            payload: response.profileObj,
        });
    };

    const onError = (response: any) => {
        console.log(response);

        message.error('Ошибка при входе, попробуйте позже');
    };

    if (user) {
        return <Redirect to="/" />;
    }

    return (
        <div>
            <Typography.Title>Плз залогиньтесь</Typography.Title>

            <div>
                <GoogleLogin
                    isSignedIn
                    clientId="74999273921-07of8e9vvki6fvmas9c7vviqpofmnpl9.apps.googleusercontent.com"
                    buttonText="гугел"
                    onSuccess={onSuccess}
                    onFailure={onError}
                    cookiePolicy={'single_host_origin'}
                />
                {/* <Button onClick={push}>Push data</Button> */}
            </div>
        </div>
    );
};

export default Auth;
