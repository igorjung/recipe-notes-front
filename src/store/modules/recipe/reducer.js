import produce from 'immer';

const INITIAL_STATE = {
  recipes: [],
  loading: false,
};

export default function recipe(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@recipes/FETCH_RECIPES_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@recipes/FETCH_RECIPES_SUCCESS': {
        draft.recipes = action.payload.recipes;
        draft.loading = false;
        break;
      }
      case '@recipes/FETCH_RECIPES_FAILURE': {
        draft.loading = false;
        break;
      }
      default:
    }
  });
}
