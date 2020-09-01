import { UserResponse } from '../../../store/Users/users.reducer';

export const delay = (ms: number): Promise<void> => new Promise((res) => setTimeout(res, ms));

export const getUser = async (id = 1): Promise<UserResponse> => {
    return await fetch(`https://jsonplaceholder.typicode.com/users/${id}`).then((r) => r.json());
};
