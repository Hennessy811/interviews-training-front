import { call, put, takeLatest, delay, all } from 'redux-saga/effects';
import { ScenesActions } from './scenes.actions';
import { Action } from '../../shared/interfaces/redux-interfaces';
import { ScenesResponse } from './scenes.reducer';
import { message } from 'antd';
import { addScene } from '../../shared/services/API/scenes';

export function* sendScene(action: Action<ScenesResponse>): any {
    try {
        yield delay(1000);
        yield call(addScene, action.payload);

        yield put({ type: ScenesActions.SAVE_SCENE_SUCCESS, payload: action.payload });
    } catch (e) {
        message.error('Ошибка при сохранении, попробуйте позже');

        yield put({
            type: ScenesActions.SAVE_SCENE_ERROR,
            payload: { error: e.message },
        });
    }
}

export function* saveScene(): any {
    yield takeLatest(ScenesActions.SAVE_SCENE_PENDING, sendScene);
}

export function* rootScenesSaga(): any {
    yield all([saveScene()]);
}
