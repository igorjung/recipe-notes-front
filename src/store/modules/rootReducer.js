// Dependencies
import { combineReducers } from 'redux';

// Reducers
import auth from './auth/reducer';
import user from './user/reducer';
import recipe from './recipe/reducer';

export default combineReducers({
  auth,
  user,
  recipe,
});
