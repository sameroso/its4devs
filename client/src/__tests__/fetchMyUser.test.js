import { storeFactory } from '../../tests/testUtils';
import { fetchMyUser } from '../actions';
import moxios from 'moxios';

describe('fetchMyUser action dispatcher', () => {
  const user = {
    googleId: '100675593168163907056',
    profilePic:
      'https://lh3.googleusercontent.com/a-/AOh14Ggp7sJAENlDO87g6fG0U9xSv8MmPTZUC-aI_x7BQw',
    profileName: 'Samer',
    description: 'my description',
    whatsApp: 'whatsApp',
    facebookLink: 'FacebookLink',
    gitHub: 'github',
    posts: [],
    dateCreated: 'dateCreated',
  };

  let store;
  beforeEach(() => {
    moxios.install();
    store = storeFactory();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  it('the response comes correctly', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: user,
      });
    });
    return store.dispatch(fetchMyUser()).then(() => {
      const newState = store.getState().user;
      const expectedState = {
        user: user,
      };
      expect(newState).toEqual(expectedState.user);
    });
  });
});
