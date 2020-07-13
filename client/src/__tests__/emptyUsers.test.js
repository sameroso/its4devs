import { emptyUsers } from '../actions';

import { storeFactory } from '../../tests/testUtils';

let store;
describe('actios gets called and update reducer', () => {
  beforeEach(() => {
    const initialState = { users: { _id: 'id' } };
    store = storeFactory(initialState);
  });

  it('actions gets called and user Reducer gets update on the store', (done) => {
    expect(store.getState().users).toEqual({ _id: 'id' });

    store.dispatch(emptyUsers());

    expect(store.getState().users).toEqual([]);
    done();
  });
});
