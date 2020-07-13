import { fetchUserPostProfile } from '../actions';
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
    store.dispatch(fetchUserPostProfile());

    expect(store.getState().postHeader).toEqual([]);
    moxios.wait(() => {
      expect(store.getState().postHeader).toEqual(['response']);
      done();
    });
  });
});
