import { Action } from '../../shared/interfaces/redux-interfaces';
import { ScenesActions } from './scenes.actions';

export interface ScenesResponse {
    name: string;
    picture?: string;
    tags: string[];
}

export interface ScenesState {
    loading: boolean;
    error: any | null;
    data: ScenesResponse | null;
}

export const initialState: ScenesState = {
    loading: false,
    error: null,
    data: null,
};

export default (state: ScenesState = initialState, action: Action<ScenesResponse>): ScenesState => {
    switch (action.type) {
        case ScenesActions.SAVE_SCENE_SUCCESS:
            localStorage.setItem('user', JSON.stringify(action.payload));
            return {
                ...state,
                data: action.payload,
                loading: false,
            };
        case ScenesActions.SAVE_SCENE_PENDING:
            return {
                ...state,
                data: null,
                loading: true,
            };
        case ScenesActions.SAVE_SCENE_ERROR:
            return {
                ...state,
                data: null,
                loading: false,
                error: true,
            };
        default:
            return state;
    }
};
