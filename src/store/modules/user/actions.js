export function updateProfileRequest(data, id) {
  return {
    type: '@user/UPDATE_PROFILE_REQUEST',
    payload: { data, id },
  };
}

export function updateProfileSuccess(profile) {
  return {
    type: '@user/UPDATE_PROFILE_SUCCESS',
    payload: { profile },
  };
}

export function updateFailure() {
  return {
    type: '@user/UPDATE_FAILURE',
  };
}
