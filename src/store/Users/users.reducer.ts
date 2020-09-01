import { Action } from '../../shared/interfaces/redux-interfaces';
import { UsersActions } from './users.actions';

export interface Geo {
    lat: string;
    lng: string;
}

export interface Addres {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: Geo;
}

export interface Company {
    name: string;
    catchPhrase: string;
    bs: string;
}

export interface UserResponse {
    id: number;
    name: string;
    username: string;
    email: string;
    address: Addres;
    phone: string;
    website: string;
    company: Company;
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
        case UsersActions.GetUser:
            return {
                ...state,
                loading: true,
            };
        case UsersActions.GetUserSuccess:
            return {
                ...state,
                loading: false,
                error: null,
                data: action.payload,
            };
        case UsersActions.GetUserError:
            return {
                ...state,
                error: true,
            };

        case UsersActions.ChangeName:
            return {
                ...state,
                loading: true,
            };
        case UsersActions.ChangeNameFinished:
            return {
                ...state,
                loading: false,
                data: {
                    ...state.data,
                    name: action.payload,
                },
            };
        default:
            return state;
    }
};
