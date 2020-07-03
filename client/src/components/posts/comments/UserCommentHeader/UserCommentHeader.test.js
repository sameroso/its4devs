import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import moxios from 'moxios';
import { BrowserRouter } from 'react-router-dom';

import { storeFactory } from '../../../../../tests/testUtils';
import UserCommentHeader from './UserCommentHeader';

let wrapper;

const initialState = {
  postHeader: [],
};
const props = {
  comment: { userId: '123' },
};
const response = {
  _id: '123',
  googleId: '1032243322042555061856787739769',
  profilePic:
    'https://lh3.googleusercontent.com/a-/AOh14Ggac96G7QkXURykSFRQ36qFGTZ4Sq8lHLsKgLFIDFE',
  profileName: 'Clara',
  whatsApp: '',
  facebookLink: '',
  gitHub: '',
  description: '',
  dateCreated: '2020-06-28T20:20:28.000Z',
  __v: 0,
  initialFormFilled: true,
};

describe('component does not fetch user', () => {
  const store = storeFactory(initialState);
  beforeEach(() => {
    moxios.install();
    wrapper = mount(
      <Provider store={store}>
        <UserCommentHeader {...props} />
      </Provider>
    );
  });
  afterEach(() => {
    moxios.uninstall();
    wrapper.unmount();
  });

  it('shows loader and does not show user', () => {
    expect(wrapper.find('._UserCommentHeader_Img').length).toBe(0);
    expect(wrapper.find('._UserCommentHeader_Loader').length).not.toBe(0);
  });
});

describe('component does not fetch user', () => {
  const store = storeFactory(initialState);
  beforeEach(() => {
    moxios.install();
    moxios.stubRequest('/api/fetchuser', {
      status: 200,
      response: response,
    });

    wrapper = mount(
      <Provider store={store}>
        <BrowserRouter>
          <UserCommentHeader {...props} />
        </BrowserRouter>
      </Provider>
    );
  });
  afterEach(() => {
    moxios.uninstall();
    wrapper.unmount();
  });

  it('shows user and does not show loader', (done) => {
    expect(wrapper.find('._UserCommentHeader_Img').length).toBe(0);
    expect(wrapper.find('._UserCommentHeader_Loader').length).not.toBe(0);
    moxios.wait(() => {
      wrapper.update();

      expect(wrapper.find('._UserCommentHeader_Img').length).toBe(1);
      expect(wrapper.find('._UserCommentHeader_Loader').length).toBe(0);
      done();
    });
  });
});
