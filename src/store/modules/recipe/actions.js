export function fetchRecipesRequest(query) {
  return {
    type: '@recipes/FETCH_RECIPES_REQUEST',
    payload: { query },
  };
}

export function fetchRecipesSuccess(recipes) {
  return {
    type: '@recipes/FETCH_RECIPES_SUCCESS',
    payload: { recipes },
  };
}

export function fetchRecipesFailure() {
  return {
    type: '@recipes/FETCH_RECIPES_FAILURE',
  };
}
