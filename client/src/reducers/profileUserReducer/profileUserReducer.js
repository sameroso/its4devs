import types from '../../actions/types';
export default (state = {}, action) => {
  switch (action.type) {
    case types.FETCH_PROFILE_USER:
      return action.payload;
    default:
      return state;
  }
};
