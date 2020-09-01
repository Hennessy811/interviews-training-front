import { combineReducers, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import user, { UsersState } from './Users/users.reducer';
import createSagaMiddleware from 'redux-saga';
import { rootUsersSaga } from './Users/users.sagas';
import { all } from 'redux-saga/effects';

const sagaMiddleware = createSagaMiddleware();

export interface RootStore {
    user: UsersState;
}

export const rootReducer = combineReducers({
    user,
});

export const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(sagaMiddleware),
        // other store enhancers if any
    ),
);

const rootSaga = function* rootSaga() {
    yield all([rootUsersSaga()]);
};

sagaMiddleware.run(rootSaga);
