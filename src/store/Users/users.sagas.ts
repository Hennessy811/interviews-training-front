import { call, put, takeLatest, delay, takeEvery, all } from 'redux-saga/effects';
import { getUser } from '../../shared/services/API/user';
import { UsersActions } from './users.actions';

export function* fetchUser(action: any): any {
    try {
        yield delay(1000);
        const user = yield call(getUser, action.payload);

        yield put({ type: UsersActions.GetUserSuccess, payload: user });
    } catch (e) {
        yield put({
            type: UsersActions.GetUserError,
            payload: { error: e.message },
        });
    }
}

function* changeName(action: any) {
    yield delay(1000);
    yield put({ type: UsersActions.ChangeNameFinished, payload: action.payload });
}

export function* changeNameSaga(): any {
    yield takeEvery(UsersActions.ChangeName, changeName);
}

export function* userSaga(): any {
    yield takeLatest(UsersActions.GetUser, fetchUser);
}

export function* rootUsersSaga(): any {
    yield all([userSaga(), changeNameSaga()]);
}
