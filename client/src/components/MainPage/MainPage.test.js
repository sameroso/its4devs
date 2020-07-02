import React from 'react';
import { shallow, mount } from 'enzyme';
import './MainPage';
import MainPage from './MainPage';
import { Provider } from 'react-redux';
import { storeFactory } from '../../../tests/testUtils';
import { BrowserRouter } from 'react-router-dom';
import moxios from 'moxios';
import { Component } from 'react';

let wrapper;
const initialState = {
  user: {
    profileName: '',
    facebookLink: '',
    gitHub: '',
    description: '',
    whatsApp: '',
    initialFormFilled: false,
  },
};
const response = {
  _id: '5ef12c781d67c9002466be51',
  id: '1',
  posts: [
    {
      postedBy: {
        profileName: 'Samer',
        profilePic:
          'https://lh3.googleusercontent.com/a-/AOh14Ggp7sJAENlDO87g6fG0U9xSv8MmPTZUC-aI_x7BQw',
        userId: '5ef12c551d67c9002466be50',
      },
      likes: [
        {
          _id: '5ef2a8afa1f1430024215d28',
          userId: '5ef12c551d67c9002466be50',
          likeType: 'dilma',
        },
        {
          _id: '5ef2a8dea1f1430024215d2b',
          userId: '5ef2a8bba1f1430024215d29',
          likeType: 'dilma',
        },
      ],
      dateCreated: '2020-06-22T22:12:19.000Z',
      comments: [],
      _id: '5ef12cc31d67c9002466be56',
      body: '5',
    },
  ],
  __v: 113,
};

describe('initialFormfilled is false', () => {
  beforeEach(() => {
    const store = storeFactory(initialState);
    wrapper = mount(
      <Provider store={store}>
        <MainPage />
      </Provider>
    );
  });
  afterEach(() => {
    wrapper.unmount();
  });
  it('shows form', () => {
    expect(wrapper.find('._MainPage_InitialForm')).not.toBe(0);
  });
});

describe('initialFormfilled is false and fetch posts', () => {
  const store = storeFactory(initialState);
  beforeEach(() => {
    moxios.install();
    moxios.stubRequest('/api/posts', {
      status: 200,
      response: response,
    });
    wrapper = mount(
      <Provider store={store}>
        <MainPage />
      </Provider>
    );
  });
  afterEach(() => {
    moxios.uninstall();
    wrapper.unmount();
  });
  it('fetch posts correctly', () => {
    expect(store.getState().postsData.posts).toEqual(response.posts);
  });
});

describe('initialFormfilled is true', () => {
  beforeEach(() => {
    initialState.user.initialFormFilled = true;
    const store = storeFactory(initialState);
    wrapper = mount(
      <Provider store={store}>
        <BrowserRouter>
          <MainPage />
        </BrowserRouter>
      </Provider>
    );
  });
  it('shows the page with posts when initialFormfilled is false', () => {
    expect(wrapper.find('._MainPage_InitialForm').length).toBe(0);
    expect(wrapper.find('._MainPage_Header_And_Posts').length).toBe(1);
  });
});
