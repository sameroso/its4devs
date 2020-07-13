import { storeFactory } from '../../tests/testUtils';
import { updateUser } from '../actions';
import moxios from 'moxios';

let store;
describe('actios gets called and update reducer', () => {
  beforeEach(() => {
    moxios.install();
    moxios.stubRequest('/api/updateuser', {
      status: 200,
      response: 'response',
    });
    store = storeFactory();
  });

  it('actions gets called and user Reducer gets update on the store', (done) => {
    store.dispatch(updateUser());

    expect(store.getState().user).toEqual(null);

    moxios.wait(() => {
      expect(store.getState().user).toBe('response');
      done();
    });
  });
});
