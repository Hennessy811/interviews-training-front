import shortid from 'shortid';
import { Scenario } from '../../shared/interfaces/scenario';

export enum StateActions {
    START = 'START',
    SET_SCENARIO = 'SET_SCENARIO',
    NEXT = 'NEXT',
    PREV = 'PREV',
}

interface Action<T> {
    type: StateActions;
    payload?: T;
}

export interface State {
    loading: boolean;
    data: Scenario | null;
    started: boolean;
    currentQuestion: number;
}

export const sessionPageInitialState: State = {
    loading: true,
    data: null,
    started: false,
    currentQuestion: 0,
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
        case StateActions.NEXT:
            const questionsListLen = state.data?.sections?.map((s) => s.questions)?.flat()?.length || 1;
            return {
                ...state,
                currentQuestion:
                    state.currentQuestion < questionsListLen - 1 ? state.currentQuestion + 1 : state.currentQuestion,
            };
        case StateActions.PREV:
            return {
                ...state,
                currentQuestion: state.currentQuestion > 0 ? state.currentQuestion - 1 : state.currentQuestion,
            };
        default:
            return state;
    }
};
