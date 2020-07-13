import { emptyUserPostProfile } from '../actions';

import { storeFactory } from '../../tests/testUtils';

let store;
describe('actios gets called and update reducer', () => {
  beforeEach(() => {
    const initialState = { postHeader: { _id: 'id' } };
    store = storeFactory(initialState);
  });

  it('actions gets called and user Reducer gets update on the store', (done) => {
    expect(store.getState().postHeader).toEqual({ _id: 'id' });

    store.dispatch(emptyUserPostProfile());

    expect(store.getState().postHeader).toEqual([]);
    done();
  });
});
