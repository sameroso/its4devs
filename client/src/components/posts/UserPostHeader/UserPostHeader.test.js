import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import moxios from 'moxios';
import { BrowserRouter } from 'react-router-dom';
import { storeFactory } from '../../../../tests/testUtils';

import UserPostHeader from './UserPostHeader';
let wrapper;

describe('component render and does not fetch user', () => {
  beforeEach(() => {
    const props = { post: { postedBy: { userId: '123' } } };
    const store = storeFactory();
    wrapper = mount(
      <Provider store={store}>
        <UserPostHeader {...props} />
      </Provider>
    );
  });
  afterEach(() => {
    wrapper.unmount();
  });
  it('shows Loader', () => {
    expect(wrapper.find('._UserPostHeader_Loader').length).not.toBe(1);
  });
});

describe('component render and fetch user', () => {
  beforeEach(() => {
    const initialState = { postHeader: [{ _id: '123' }] };
    const props = { post: { postedBy: { userId: '123' } } };
    const store = storeFactory();

    moxios.install();
    moxios.stubRequest('/api/fetchuser', {
      status: 200,
      response: {
        _id: '123',
        googleId: '123',
        profilePic: 'profilePic',
        profileName: 'profileName',
        whatsApp: 'zap',
        facebookLink: 'facebook',
        gitHub: 'github',
        description: 'description',
        dateCreated: '2020-06-22T22:10:29.000Z',
        __v: 0,
        initialFormFilled: true,
      },
    });
    wrapper = mount(
      <Provider store={store}>
        <BrowserRouter>
          <UserPostHeader {...props} />
        </BrowserRouter>
      </Provider>
    );
  });
  afterEach(() => {
    moxios.uninstall();
    wrapper.unmount();
  });
  it('updates user with the correct info', () => {
    wrapper.update();
    expect(wrapper.find('._UserPostHeader_img').prop('src')).toBe('profilePic');
    expect(wrapper.find('._UserPostHeader_name').text()).toBe('profileName');
  });
});
