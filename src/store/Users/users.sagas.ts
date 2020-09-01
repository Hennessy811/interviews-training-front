import { call, put, takeLatest, delay, all } from 'redux-saga/effects';
import { getUser } from '../../shared/services/API/user';
import { UsersActions } from './users.actions';
import { Action } from '../../shared/interfaces/redux-interfaces';
import { UserResponse } from './users.reducer';
import { message } from 'antd';

export function* fetchUser(action: Action<UserResponse>): any {
    try {
        yield delay(1000);
        yield call(getUser, action.payload);

        yield put({ type: UsersActions.SAVE_USER_SUCCESS, payload: action.payload });
    } catch (e) {
        message.error('Ошибка при входе (1), попробуйте позже');

        yield put({
            type: UsersActions.SAVE_USER_ERROR,
            payload: { error: e.message },
        });
    }
}

// function* changeName(action: any) {
//     yield delay(1000);
//     yield put({ type: UsersActions.ChangeNameFinished, payload: action.payload });
// }

// export function* changeNameSaga(): any {
//     yield takeEvery(UsersActions.ChangeName, changeName);
// }

export function* saveUser(): any {
    yield takeLatest(UsersActions.SAVE_USER_PENDING, fetchUser);
}

export function* rootUsersSaga(): any {
    yield all([saveUser()]);
}
