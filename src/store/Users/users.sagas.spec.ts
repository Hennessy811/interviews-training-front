import { testSaga } from 'redux-saga-test-plan';
import { fetchUser } from './users.sagas';
import { getUser } from '../../shared/services/API/user';
import { UsersActions } from './users.actions';

it('should increment click counter (state test with test-plan async-way)', async () => {
    testSaga(fetchUser, { id: '1' })
        .next()

        .delay(1000)

        .next()

        .call(getUser, undefined)

        .next({ type: UsersActions.GetUserError, payload: {} });
});
