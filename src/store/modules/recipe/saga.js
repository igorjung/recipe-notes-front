// Dependencies
import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

// Services
import api from '~/services/api';

// Actions
import { signOut } from '~/store/modules/auth/actions';
import { fetchRecipesSuccess, fetchRecipesFailure } from './actions';

export function* fethcRecipes({ payload }) {
  try {
    const { query } = payload;
    const response = yield call(api.get, `recipes${query}`);
    const recipes = response.data;
    yield put(fetchRecipesSuccess(recipes));
  } catch (e) {
    if (!e.response || e.response.data.error === undefined) {
      toast.error(`Um erro aconteceu, tente novamente mais tarde.`);
      yield put(fetchRecipesFailure());
    } else if (
      e.response.status === 401 &&
      e.response.data.error ===
        'Usuário precisa esta logado para executar essa ação.'
    ) {
      yield put(signOut());
    } else {
      toast.error(`${e.response.data.error}`);
      yield put(fetchRecipesFailure());
    }
  }
}

export default all([
  takeLatest('@recipes/FETCH_RECIPES_REQUEST', fethcRecipes),
]);
