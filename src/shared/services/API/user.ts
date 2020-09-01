import { UserResponse } from '../../../store/Users/users.reducer';
import { message } from 'antd';

const isDev = () => process.env.NODE_ENV === 'development';
const BASE_URL = isDev() ? 'http://localhost:3000' : 'https://interviews-training-api.vercel.app';

export const delay = (ms: number): Promise<void> => new Promise((res) => setTimeout(res, ms));

export const getUser = async (user: UserResponse): Promise<UserResponse> => {
    console.log({ user });

    return await fetch(`${BASE_URL}/api/login`, {
        method: 'POST',
        body: JSON.stringify(user),
    })
        .then((r) => r.json())
        .catch(() => {
            message.error('Ошибка при входе (1), попробуйте позже');
        });
};
