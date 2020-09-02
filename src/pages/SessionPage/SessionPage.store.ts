import shortid from 'shortid';
import { Scenario } from '../../shared/interfaces/scenario';

export enum StateActions {
    START = 'START',
    SET_SCENARIO = 'SET_SCENARIO',
}

interface Action<T> {
    type: StateActions;
    payload?: T;
}

interface State {
    loading: boolean;
    data: Scenario | null;
    started: boolean;
}

export const sessionPageInitialState: State = {
    loading: true,
    data: null,
    started: false,
};

export const sessionPageReducer = (state = sessionPageInitialState, action: Action<any>) => {
    switch (action.type) {
        case StateActions.START:
            return {
                ...state,
                started: true,
            };

        case StateActions.SET_SCENARIO:
            return {
                ...state,
                data: action.payload,
                loading: false,
            };
        default:
            return state;
    }
};
