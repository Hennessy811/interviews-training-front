import { Action } from '../../shared/interfaces/redux-interfaces';
import { UsersActions } from './users.actions';

export interface UserResponse {
    email: string;
    familyName: string;
    givenName: string;
    googleId: string;
    imageUrl: string;
    name: string;
}

export interface UsersState {
    loading: boolean;
    error: any | null;
    data: UserResponse | null;
}

export const initialState: UsersState = {
    loading: false,
    error: null,
    data: null,
};

export default (state: UsersState = initialState, action: Action<UserResponse>): UsersState => {
    switch (action.type) {
        case UsersActions.SAVE_USER_SUCCESS:
            localStorage.setItem('user', JSON.stringify(action.payload));
            return {
                ...state,
                data: action.payload,
                loading: false,
            };
        case UsersActions.SAVE_USER_PENDING:
            return {
                ...state,
                data: null,
                loading: true,
            };
        case UsersActions.SAVE_USER_ERROR:
            return {
                ...state,
                data: null,
                loading: false,
                error: true,
            };
        case UsersActions.LOGOUT:
            localStorage.removeItem('user');
            return initialState;
        default:
            return state;
    }
};
