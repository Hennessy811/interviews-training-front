import { UserResponse } from '../../../store/Users/users.reducer';
import { message } from 'antd';

const isDev = () => process.env.NODE_ENV === 'development';
const BASE_URL = isDev() ? 'http://localhost:3000' : 'http://localhost:3000';

export const delay = (ms: number): Promise<void> => new Promise((res) => setTimeout(res, ms));

export const getUser = async (user: UserResponse): Promise<UserResponse> => {
    console.log({ user });

    return await fetch(`${BASE_URL}/api/login`, {
        method: 'POST',
        body: JSON.stringify(user),
    })
        .then((r) => r.json())
        .catch(() => {
            message.error('Ошибка при входе, попробуйте позже');
        });
};
