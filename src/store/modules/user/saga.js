// Dependencies
import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

// Services
import api from '~/services/api';

// Actions
import { signOut } from '~/store/modules/auth/actions';
import { updateProfileSuccess, updateFailure } from './actions';

export function* updateProfile({ payload }) {
  try {
    const { data, id } = payload;

    const response = yield call(api.put, `users/${id}`, data);

    toast.success('Perfil atualizado com sucesso!');

    const user = response.data;

    delete user.password;

    yield put(updateProfileSuccess(user));
  } catch (e) {
    if (!e.response || e.response.data.error === undefined) {
      toast.error(`Um erro aconteceu, tente novamente mais tarde.`);
      yield put(updateFailure());
    } else if (
      e.response.status === 401 &&
      e.response.data.error ===
        'Usuário precisa esta logado para executar essa ação.'
    ) {
      yield put(signOut());
    } else {
      toast.error(`${e.response.data.error}`);
      yield put(updateFailure());
    }
  }
}

export default all([takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile)]);
