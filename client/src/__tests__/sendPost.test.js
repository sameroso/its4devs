import { sendPost } from '../actions';
import moxios from 'moxios';
import { storeFactory } from '../../tests/testUtils';

let store;
describe('actios gets called and update reducer', () => {
  beforeEach(() => {
    moxios.install();
    moxios.stubRequest('/api/sendpost', {
      status: 200,
      response: 'response',
    });
    store = storeFactory();
  });

  it('actions gets called and user Reducer gets update on the store', (done) => {
    store.dispatch(sendPost());

    expect(store.getState().postsData).toEqual([]);
    moxios.wait(() => {
      expect(store.getState().postsData).toEqual('response');
      done();
    });
  });
});
