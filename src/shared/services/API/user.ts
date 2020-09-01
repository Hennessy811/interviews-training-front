import { UserResponse } from '../../../store/Users/users.reducer';
import { BASE_URL } from '../../utils/helpers';

export const delay = (ms: number): Promise<void> => new Promise((res) => setTimeout(res, ms));

export const getUser = async (user: UserResponse): Promise<UserResponse> => {
    console.log({ user });

    return await fetch(`${BASE_URL}/api/login`, {
        method: 'POST',
        body: JSON.stringify(user),
    }).then((r) => r.json());
};
