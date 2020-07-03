import React from 'react';
import Comment from './Comment';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { storeFactory } from '../../../../../tests/testUtils';
import moxios from 'moxios';

import { act } from '@testing-library/react';

let store, wrapper;

const initialState = {
  user: { _id: '123' },
  postsData: [{ posts: 'posts' }],
};
const props = {
  form: 'commentFormId',
  initialValues: {
    commentFormPosted: 'comment Form Initial Value',
  },
  comment: {
    body: 'Aeeee',
    dateCreated: '2020-07-01T16:10:12.000Z',
    profileName: 'Sameroso',
    profilePic:
      'https://lh3.googleusercontent.com/a-/AOh14Gi5UGSMG-QME4znpMF30LwF8Tq4Vigym3NBKRPz-g',
    userId: '123',
    _id: '5efcb564da90030024f0250a',
  },
};

describe('user is the same of comment user', () => {
  beforeEach(async () => {
    moxios.install();
    moxios.stubRequest('/api/deletecomment', {
      status: 200,
      response: null,
    });
    moxios.stubRequest('/api/editcomment', {
      status: 200,
      response: { posts: 'edited posts' },
    });

    store = storeFactory(initialState);
    await act(async () => {
      wrapper = mount(
        <Provider store={store}>
          <Comment {...props} />
        </Provider>
      );
    });
  });

  afterEach(() => {
    moxios.uninstall();
    wrapper.unmount();
  });

  it('edit btns shows', () => {
    expect(wrapper.find('._CommentBtns').length).toBe(1);
  });

  it('form gets deleted with success', (done) => {
    expect(store.getState().postsData).toEqual(initialState.postsData);

    wrapper.find('._Modal_Btn_Action').simulate('click');

    moxios.wait(() => {
      expect(store.getState().postsData).toBe(null);
      done();
    });
  });

  it('form gets edited with success', async (done) => {
    expect(store.getState().postsData).toEqual(initialState.postsData);
    wrapper.find('._CommentLabel').simulate('click');
    await act(async () => {
      wrapper.find('._Modal_Btn_Action').simulate('click');
    });

    moxios.wait(() => {
      expect(store.getState().postsData).toEqual({ posts: 'edited posts' });
      done();
    });
  });

  it('readOnly goes to false after clicking on the edit btn', () => {
    expect(wrapper.find('._CommentField_textarea').at(1).prop('readOnly')).toBe(
      true
    );
    wrapper.find('._CommentLabel').simulate('click');
    expect(wrapper.find('._CommentField_textarea').at(1).prop('readOnly')).toBe(
      false
    );
  });
});

describe('comment is not the same of who posted', () => {
  beforeEach(async () => {
    props.comment.userId = '1234';
    store = storeFactory(initialState);
    await act(async () => {
      wrapper = mount(
        <Provider store={store}>
          <Comment {...props} />
        </Provider>
      );
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });
  it('does not render edit btns', () => {
    expect(wrapper.find('._CommentBtns').length).toBe(0);
  });
});
