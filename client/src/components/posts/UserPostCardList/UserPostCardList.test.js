import React from 'react';
import { mount } from 'enzyme';
import moxios from 'moxios';
import { Provider } from 'react-redux';

import UserPostCardList from './UserPostCardList';
import { storeFactory } from '../../../../tests/testUtils';

let wrapper;
const initialState = { user: { _id: '123' } };
const store = storeFactory(initialState);
const props = { userProfile: { _id: '5ef12c551d67c9002466be50' } };

const responseNoPosts = [];
const responseWithPosts = {
  id: '1',
  __v: 113,
  _id: '5ef12c781d67c9002466be51',
  posts: [
    {
      _id: '5ef12c781d67c9002466be52',
      body: '1',
      comments: [],
      dateCreated: '2020-06-22T22:11:04.000Z',
      likes: [],
      postedBy: {
        profileName: 'Samer',
        profilePic:
          'https://lh3.googleusercontent.com/a-/AOh14Ggp7sJAENlDO87g6fG0U9xSv8MmPTZUC-aI_x7BQw',
        userId: '5ef12c551d67c9002466be50',
      },
    },
  ],
};

describe('response has no posts', () => {
  beforeEach(() => {
    moxios.install();
    moxios.stubRequest('/api/posts', {
      status: 200,
      response: responseNoPosts,
    });
    wrapper = mount(
      <Provider store={store}>
        <UserPostCardList {...props} />
      </Provider>
    );
  });
  afterEach(() => {
    moxios.uninstall();
  });
  it('test', () => {
    expect(wrapper.find('._UserPostCardList_Loader').length).toBe(1);
    expect(wrapper.find('._UserPostCardList_PostCard').length).toBe(0);
  });
});

describe('response has less than 5 posts', () => {
  beforeEach(() => {
    moxios.install();
    moxios.stubRequest('/api/posts', {
      status: 200,
      response: responseWithPosts,
    });
    wrapper = mount(
      <Provider store={store}>
        <UserPostCardList {...props} />
      </Provider>
    );
  });
  afterEach(() => {
    moxios.uninstall();
  });
  it('post shows with returned value', (done) => {
    moxios.wait(() => {
      wrapper.update();
      expect(wrapper.find('._UserPostCardList_Loader').length).toBe(0);
      expect(wrapper.find('._UserPostCardList_PostCard').length).toBe(1);
      done();
    });
  });
});
