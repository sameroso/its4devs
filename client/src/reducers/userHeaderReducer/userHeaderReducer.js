import types from '../../actions/types';
export default (state = [], action) => {
  switch (action.type) {
    case types.FETCH_PROFILE_USER_HEADER:
      return [...state, action.payload];
    case types.EMPTY_PROFILE_USER_HEADER:
      console.log('oi');
      return [];
    default:
      return state;
  }
};
