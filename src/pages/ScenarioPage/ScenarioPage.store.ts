import shortid from 'shortid';
import { Scenario } from '../../shared/interfaces/scenario';

export enum StateActions {
    SET_SCENARIO = 'SET_SCENARIO',
    START = 'START',
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

export const scenarioPageInitialState: State = {
    loading: true,
    data: null,
    started: false,
};

export const scenarioPageReducer = (state = scenarioPageInitialState, action: Action<any>) => {
    switch (action.type) {
        case StateActions.SET_SCENARIO:
            return {
                ...state,
                data: action.payload,
                loading: false,
            };
        case StateActions.START:
            return {
                ...state,
                started: true,
            };

        default:
            return state;
    }
};
