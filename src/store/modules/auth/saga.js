// Dependencies
import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

// Services
import history from '~/services/history';
import api from '~/services/api';

// Actions
import { signInRequest, signInSuccess, signFailure } from './actions';

export function* signIn({ payload }) {
  try {
    const data = payload;

    const response = yield call(api.post, 'auth/login', data);

    const { token, user } = response.data;

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(signInSuccess(token, user));

    history.push('/');
  } catch (e) {
    if (!e.response || e.response.data.error === undefined) {
      toast.error(`Ops, ocorreu um erro! Tente novamente mais tarde.`);
      yield put(signFailure());
      return;
    }
    toast.error(`${e.response.data.error}`);
    yield put(signFailure());
  }
}

export function* signUp({ payload }) {
  try {
    const { data } = payload;

    yield call(api.post, 'auth/register', data);

    const { email, password } = data;
    const loginData = { email, password };

    yield put(signInRequest(loginData));
  } catch (e) {
    if (!e.response || e.response.data.error === undefined) {
      toast.error(`Ops, ocorreu um erro! Tente novamente mais tarde.`);
      yield put(signFailure());
      return;
    }
    toast.error(`${e.response.data.error}`);
    yield put(signFailure());
  }
}

export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export function signOut() {
  history.push('/');
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
  takeLatest('@auth/SIGN_OUT', signOut),
]);
