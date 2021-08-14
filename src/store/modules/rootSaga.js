// Dependencies
import { all } from 'redux-saga/effects';

// Sagas
import auth from './auth/saga';
import user from './user/saga';

export default function* rootSaga() {
  return yield all([auth, user]);
}
