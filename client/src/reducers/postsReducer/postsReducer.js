import types from '../../actions/types';
export default (state = [], action) => {
  switch (action.type) {
    case types.FETCH_POSTS:
      return action.payload;
    case types.CLEAR_POST_STATE:
      return [];
    default:
      return state;
  }
};
