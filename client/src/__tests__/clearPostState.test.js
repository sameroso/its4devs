import { clearPostState } from '../actions';

import { storeFactory } from '../../tests/testUtils';

let store;
describe('actios gets called and update reducer', () => {
  beforeEach(() => {
    const initialState = { postsData: { _id: 'id' } };
    store = storeFactory(initialState);
  });

  it('actions gets called and user Reducer gets update on the store', (done) => {
    expect(store.getState().postsData).toEqual({ _id: 'id' });

    store.dispatch(clearPostState());

    expect(store.getState().postsData).toEqual([]);
    done();
  });
});
