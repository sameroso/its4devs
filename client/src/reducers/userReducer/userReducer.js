import types from '../../actions/types';
export default (state = [], action) => {
  switch (action.type) {
    case types.FETCH_USER:
      return [...state, action.payload];
    case types.EMPTY_USERS:
      return [];
    default:
      return state;
  }
};
