import { fetchUser } from '../actions';
import moxios from 'moxios';
import { storeFactory } from '../../tests/testUtils';

let store;
describe('actios gets called and update reducer', () => {
  beforeEach(() => {
    moxios.install();
    moxios.stubRequest('/api/fetchuser', {
      status: 200,
      response: 'response',
    });
    store = storeFactory();
  });

  it('actions gets called and user Reducer gets update on the store', (done) => {
    store.dispatch(fetchUser());

    expect(store.getState().users).toEqual([]);
    moxios.wait(() => {
      expect(store.getState().users).toEqual(['response']);
      done();
    });
  });
});
