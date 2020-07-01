import React from 'react';
import { mount } from 'enzyme';
import Profile from './Profile';
import { storeFactory } from '../../../tests/testUtils';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import moxios, { wait } from 'moxios';
import { act } from '@testing-library/react';

const initialState = {
  user: { _id: '123' },
};
const props = {
  match: {
    params: '74847987sa',
  },
};
const responseSameId = {
  _id: '123',
  facebookId: '3245260152192168',
  profilePic:
    'https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=3245260152192168&height=200&width=200&ext=1595590835&hash=AeR6zMHzUb_5FYC9',
  profileName: 'Name',
  whatsApp: '31991394898',
  facebookLink: 'fblink',
  gitHub: 'github',
  description: 'sou eu',
  dateCreated: '2020-06-23T11:14:11.000Z',
  __v: 0,
  initialFormFilled: true,
};
const response = {
  _id: '5ef1e40376bd54129ecf729a',
  facebookId: '3245260152192168',
  profilePic:
    'https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=3245260152192168&height=200&width=200&ext=1595590835&hash=AeR6zMHzUb_5FYC9',
  profileName: 'Name',
  whatsApp: '31991394898',
  facebookLink: 'fblink',
  gitHub: 'github',
  description: 'sou eu',
  dateCreated: '2020-06-23T11:14:11.000Z',
  __v: 0,
  initialFormFilled: true,
};
const newResponse = {
  _id: '5ef1e40376bd54129ecf729a',
  facebookId: '3245260152192168',
  profilePic:
    'https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=3245260152192168&height=200&width=200&ext=1595590835&hash=AeR6zMHzUb_5FYC9',
  profileName: 'responseSubmit',
  whatsApp: 'number after submit',
  facebookLink: 'fblink',
  gitHub: 'github after submit',
  description: 'description after submit',
  dateCreated: '2020-06-23T11:14:11.000Z',
  __v: 0,
  initialFormFilled: true,
};
let store;

beforeEach(() => {
  store = storeFactory(initialState);
});

describe('component renders form with user being the profile form', () => {
  let wrapper;

  beforeEach(async () => {
    moxios.install();
    moxios.stubRequest('/api/fetchuser', {
      status: 200,
      response: response,
    });
    await act(async () => {
      wrapper = mount(
        <Provider store={store}>
          <BrowserRouter>
            <Profile {...props} />
          </BrowserRouter>
        </Provider>
      );
    });
  });
  afterEach(() => {
    moxios.uninstall();
  });
  it('useEffect updates initialValues', (done) => {
    try {
      moxios.wait(() => {
        expect(wrapper.find('ReduxForm').first().prop('userProfile')).toEqual(
          {}
        );
        wrapper.update();
        expect(wrapper.find('ReduxForm').first().prop('userProfile')).toEqual(
          response
        );
        done();
        wrapper.unmount();
      });
    } catch {
      console.log('error');
      done();
    }
  });
  it('values in the store change when input value changes', (done) => {
    try {
      moxios.wait(() => {
        wrapper
          .find('input')
          .at(0)
          .simulate('change', { target: { value: 'changed name' } });
        wrapper.update();
        expect(store.getState().form.Profile.values.profileName).toBe(
          'changed name'
        );
        expect(wrapper.find('ReduxForm').first().prop('userProfile')).toEqual(
          response
        );
        done();
        wrapper.unmount();
      });
    } catch {
      console.log('error');
      done();
    }
  });

  it('values updates when user submits', (done) => {
    try {
      const form = wrapper.find('form');

      moxios.wait(async () => {
        wrapper
          .find('input')
          .at(0)
          .simulate('change', { target: { value: 'changed name' } });
        wrapper.update();

        moxios.stubRequest('/api/updateuser', {
          status: 200,
          response: newResponse,
        });

        await act(async () => {
          form.simulate('submit');
        });

        moxios.wait(() => {
          expect(store.getState().user).toBe(newResponse);
          done();
        });
      });
    } catch {
      console.log('error');
      done();
    }
  });
  it('ReadOnly prop gets true', (done) => {
    try {
      moxios.wait(() => {
        expect(wrapper.find('input').first().prop('readOnly')).toBe(true);
        done();
      });
    } catch {
      console.log('error');
      done();
    }
  });
  it('ReadOnly prop gets true', (done) => {
    try {
      moxios.wait(() => {
        expect(wrapper.find('button').prop('type')).toBe('text');
        expect(wrapper.find('button').length).toBe(1);

        done();
      });
    } catch {
      console.log('error');
      done();
    }
  });
});

describe('user is the same of profile', () => {
  let wrapper;

  beforeEach(async () => {
    moxios.install();
    moxios.stubRequest('/api/fetchuser', {
      status: 200,
      response: responseSameId,
    });
    await act(async () => {
      wrapper = mount(
        <Provider store={store}>
          <BrowserRouter>
            <Profile {...props} />
          </BrowserRouter>
        </Provider>
      );
    });
  });
  afterEach(() => {
    moxios.uninstall();
  });
  it('shows input with readOnly false', (done) => {
    try {
      moxios.wait(() => {
        wrapper.update();

        expect(wrapper.find('input').first().prop('readOnly')).toBe(false);
        done();
      });
    } catch {
      console.log('error');
      done();
    }
  });

  it('shows button save', (done) => {
    try {
      moxios.wait(() => {
        wrapper.update();

        expect(wrapper.find('button').length).toBe(2);
        expect(wrapper.find('button').last().prop('type')).toBe('submit');
        done();
      });
    } catch {
      console.log('error');
      done();
    }
  });
});
