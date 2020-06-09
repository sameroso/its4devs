import actionTypes from '../../actions/types';
import authReducer from './authReducer';

it('returns initial state when no action ', () => {
  const newState = authReducer(null, { type: actionTypes.FETCH_MY_USER });
  expect(newState).toBe(false);
});
it('returns state x when action is passed ', () => {});
it('returns state y when action is passed ', () => {});
