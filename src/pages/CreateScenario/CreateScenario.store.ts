import shortid from 'shortid';

export enum StateActions {
    SET_TITLE = 'SET_TITLE',
    SET_TAGS = 'SET_TAGS',
    ADD_SECTION = 'ADD_SECTION',
    REMOVE_SECTION = 'REMOVE_SECTION',
    CHANGE_SECTION = 'CHANGE_SECTION',
    ADD_QUESTION = 'ADD_QUESTION',
    REMOVE_QUESTION = 'REMOVE_QUESTION',
    CHANGE_QUESTION = 'CHANGE_QUESTION',
}

interface Action<T> {
    type: StateActions;
    payload?: T;
}

export interface Question {
    id: string;

    title: string;
    correctAnswer: string;
}

export interface Section {
    id: string;
    title?: string;
    questions?: Question[];
}

interface State {
    title: string;
    tags: string | string[];
    sections: Section[];
}

export const createScenarioInitialState: State = {
    title: '',
    tags: '',
    sections: [],
};

export const createScenarioReducer = (state = createScenarioInitialState, action: Action<any>) => {
    switch (action.type) {
        case StateActions.SET_TITLE:
            return {
                ...state,
                title: action.payload,
            };
        case StateActions.SET_TAGS:
            return {
                ...state,
                tags: action.payload,
            };
        case StateActions.ADD_SECTION:
            const sessionId = shortid.generate();
            return {
                ...state,
                sections: [...state.sections, { id: sessionId }],
            };
        case StateActions.REMOVE_SECTION:
            return {
                ...state,
                sections: state.sections.filter((i) => i.id !== action.payload),
            };
        case StateActions.CHANGE_SECTION:
            return {
                ...state,
                sections: state.sections.map((i) => {
                    if (i.id === action.payload.id) {
                        return {
                            ...i,
                            ...action.payload,
                        };
                    } else return i;
                }),
            };
        case StateActions.ADD_QUESTION:
            const questionId = shortid.generate();
            return {
                ...state,
                sections: state.sections.map((i) => {
                    // Передавать в payload нужно id вопроса
                    if (i.id === action.payload) {
                        return {
                            ...i,
                            questions: [...(i.questions || []), { id: questionId }],
                        };
                    } else return i;
                }),
            };
        case StateActions.REMOVE_QUESTION:
            return {
                ...state,
                sections: state.sections.map((i) => ({
                    ...i,
                    questions: i.questions?.filter((q) => q.id !== action.payload.questionId),
                })),
            };
        case StateActions.CHANGE_QUESTION:
            return {
                ...state,
                sections: state.sections.map((i) => {
                    if (action.payload.sectionId === i.id) {
                        return {
                            ...i,
                            questions: i.questions?.map((q) => {
                                if (q.id === action.payload.questionId) {
                                    return { ...q, ...action.payload };
                                } else {
                                    return q;
                                }
                            }),
                        };
                    } else {
                        return i;
                    }
                }),
            };

        default:
            return state;
    }
};
