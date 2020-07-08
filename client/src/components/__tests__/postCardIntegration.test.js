import React from 'react';
import { mount } from 'enzyme';
import moxios from 'moxios';
import Postcard from '../posts/PostCard/PostCard';
import { Provider } from 'react-redux';
import { act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { storeFactory } from '../../../tests/testUtils';

const props = {
  form: '5ef12ca91d67c9002466be55',
  post: {
    likes: [{ userId: '5ef12ca91d67c9002466be54', likeType: 'lula' }],
    body: '3',
    comments: [],
    postedBy: {
      profileName: 'profileName',
      profilePic: 'profilePic',
      userId: '5ef12ca91d67c9002466be54',
    },
    _id: '5ef12ca91d67c9002466be55',
  },
};
const propsWithComments = {
  form: '5ef12ca91d67c9002466be55',
  post: {
    likes: [],
    body: '3',
    comments: [
      {
        body: 'Aeeee',
        dateCreated: '2020-07-01T16:10:12.000Z',
        profileName: 'Sameroso',
        profilePic:
          'https://lh3.googleusercontent.com/a-/AOh14Gi5UGSMG-QME4znpMF30LwF8Tq4Vigym3NBKRPz-g',
        userId: '5ef12ca91d67c9002466be54',
        _id: '5efcb564da90030024f0250a',
      },
    ],
    postedBy: {
      profileName: 'profileName',
      profilePic: 'profilePic',
      userId: '5ef12ca91d67c9002466be54',
    },
    _id: '5ef12ca91d67c9002466be55',
  },
};
const initialState = {
  user: { _id: '5ef12ca91d67c9002466be54' },
  postHeader: [],
};

const responseSameUserPost = {
  _id: '5ef12ca91d67c9002466be54',
  facebookId: '3245260152192168',
  profilePic:
    'https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=3245260152192168&height=200&width=200&ext=1595590835&hash=AeR6zMHzUb_5FYC9',
  profileName: 'Samerino',
  whatsApp: 'samer',
  facebookLink: 'josefina',
  gitHub: '',
  description: 'sou eu',
  dateCreated: '2020-06-23T11:14:11.000Z',
  __v: 0,
  initialFormFilled: true,
};
const postResponseWithComments = {
  likes: [],
  body: '3',
  comments: [
    {
      body: 'Aeeee',
      dateCreated: '2020-07-01T16:10:12.000Z',
      profileName: 'Sameroso',
      profilePic:
        'https://lh3.googleusercontent.com/a-/AOh14Gi5UGSMG-QME4znpMF30LwF8Tq4Vigym3NBKRPz-g',
      userId: '5ef2a8bba1f1430024215d29',
      _id: '5efcb564da90030024f0250a',
    },
  ],
  postedBy: {
    profileName: 'profileName',
    profilePic: 'profilePic',
    userId: '5ef12ca91d67c9002466be54',
  },
  _id: '5ef12ca91d67c9002466be55',
};
let wrapper;

const store = storeFactory(initialState);

beforeEach(() => {
  moxios.install();

  afterEach(() => {
    moxios.uninstall();
  });
});

describe('user is the same of post and props without comments', () => {
  beforeEach(async () => {
    await act(async () => {
      wrapper = mount(
        <Provider store={store}>
          <BrowserRouter>
            <Postcard {...props} />
          </BrowserRouter>
        </Provider>
      );
    });
    moxios.stubRequest('/api/fetchuser', {
      status: 200,
      response: responseSameUserPost,
    });
    moxios.stubRequest('/api/createcommentpost', {
      status: 200,
      response: postResponseWithComments,
    });
  });

  it('edit and delete btns shows', (done) => {
    moxios.wait(() => {
      wrapper.update();
      expect(wrapper.find('.trash-btn').length).toBe(1);
      expect(wrapper.find('.commentbtns-label').length).toBe(1);
      expect(wrapper.find('.cardbtns-cancelbtn').length).toBe(0);
      expect(wrapper.find('.cardbtns-savebtn').length).toBe(0);
      done();
      wrapper.unmount();
    });
  });
  it('save and cancel btns shows after clicking on edit and the other does not show', (done) => {
    moxios.wait(() => {
      wrapper.update();
      wrapper.find('.commentbtns-label').simulate('click');
      expect(wrapper.find('.trash-btn').length).toBe(0);
      expect(wrapper.find('.cardbtns-cancelbtn').length).toBe(1);
      expect(wrapper.find('.cardbtns-savebtn').length).toBe(1);
      done();
      wrapper.unmount();
    });
  });
  it('can edit input after clicking on edit btn', (done) => {
    moxios.wait(() => {
      wrapper.update();
      expect(wrapper.find('textarea').prop('readOnly')).toBe(true);
      wrapper.find('.commentbtns-label').simulate('click');
      expect(wrapper.find('textarea').at(1).prop('readOnly')).toBe(false);
      done();
      wrapper.unmount();
    });
  });
  it('comments component shows up after clicking on comment btn', (done) => {
    moxios.wait(() => {
      wrapper.update();
      expect(wrapper.find('._CommentForm').length).toBe(0);
      wrapper.find('.comment-btn-comment-list').simulate('click');
      expect(wrapper.find('._CommentForm').length).toBe(1);
      done();
      wrapper.unmount();
    });
  });
  it('comment gets submitted', (done) => {
    moxios.wait(() => {
      wrapper.update();
      const editBtn = wrapper.find('.comment-btn-comment-list');
      editBtn.simulate('click');
      wrapper
        .find('._CommentFormTextsArea')
        .at(1)
        .simulate('change', { target: { value: 'new value' } });
      expect(
        store.getState().form[
          '5ef12ca91d67c9002466be555ef12ca91d67c9002466be54'
        ].values.commentForm
      ).toBe('new value');
      const commentForm = wrapper.find('._CommentForm');
      commentForm.simulate('submit');
      moxios.wait(() => {
        expect(store.getState().postsData.comments.length).toBe(1);
        done();
        wrapper.unmount();
      });
    });
  });
});
describe('user is the same of post and props with comments', () => {
  beforeEach(async () => {
    moxios.stubRequest('/api/fetchuser', {
      status: 200,
      response: responseSameUserPost,
    });
    moxios.stubRequest('/api/createcommentpost', {
      status: 200,
      response: postResponseWithComments,
    });
    await act(async () => {
      wrapper = mount(
        <Provider store={store}>
          <BrowserRouter>
            <Postcard {...propsWithComments} />
          </BrowserRouter>
        </Provider>
      );
    });
  });
  afterEach(() => {
    wrapper.unmount();
  });
  it('shows comments after clicking on show comments btn', () => {
    expect(wrapper.find('._Comment').length).toBe(0);
    wrapper.find('._ShowComments_btn').simulate('click');
    expect(wrapper.find('._Comment').length).toBe(1);
  });
  it('shows comments after clicking on show comments btn', () => {
    expect(wrapper.find('._CommentBtns').length).toBe(0);
    wrapper.find('._ShowComments_btn').simulate('click');
    expect(wrapper.find('._CommentBtns').length).toBe(1);
  });

  it('click on comment editbtn turns readonly to false', () => {
    wrapper.find('._ShowComments_btn').simulate('click');
    expect(wrapper.find('._CommentField_textarea').at(1).prop('readOnly')).toBe(
      true
    );
    wrapper.find('._CommentLabel').simulate('click');
    expect(wrapper.find('._CommentField_textarea').at(1).prop('readOnly')).toBe(
      false
    );
  });

  it('click on comment editbtn shows save and cancel btn', () => {
    wrapper.find('._ShowComments_btn').simulate('click');
    expect(wrapper.find('._CommentBtns_cancelBtn').length).toBe(0);
    expect(wrapper.find('._CommentBtns_saveBtn').length).toBe(0);
    wrapper.find('._CommentLabel').simulate('click');
    expect(wrapper.find('._CommentBtns_cancelBtn').length).toBe(1);
    expect(wrapper.find('._CommentBtns_saveBtn').length).toBe(1);
  });

  it('shows comments after commenting', () => {
    expect(wrapper.find('._Comment').length).toBe(0);
    wrapper.find('.comment-btn-comment-list').simulate('click');
    wrapper
      .find('._CommentFormTextsArea')
      .at(1)
      .simulate('change', { target: { value: 'new value' } });
    wrapper.find('._CommentForm').simulate('submit');

    expect(wrapper.find('._Comment').length).toBe(1);
  });
});

describe('post with likes', () => {
  beforeEach(async () => {
    moxios.install();
    await act(async () => {
      wrapper = mount(
        <Provider store={store}>
          <BrowserRouter>
            <Postcard {...props} />
          </BrowserRouter>
        </Provider>
      );
    });
    moxios.stubRequest('/api/fetchuser', {
      status: 200,
      response: responseSameUserPost,
    });
  });
  it('number of likes updates correctly', (done) => {
    moxios.wait(() => {
      wrapper.update();
      expect(wrapper.find('._PostLikes_React_1_Value').text()).toEqual('1');
      done();
    });
  });
  it('clicking on arrow down like list shows', (done) => {
    moxios.wait(() => {
      wrapper.update();
      expect(wrapper.find('._LikeList1').length).toEqual(0);

      wrapper.find('._PostLikes_Arrow').simulate('click');

      expect(wrapper.find('._LikeList1').length).toEqual(1);

      done();
    });
  });

  it('name loads correctly on the list', (done) => {
    moxios.wait(() => {
      wrapper.update();
      wrapper.find('._PostLikes_Arrow').simulate('click');
      moxios.wait(() => {
        wrapper.update();
        expect(wrapper.find('._LikeName_User').length).toEqual(1);
        done();
      });
    });
  });

  it.skip('name clicking outside closes likes list', (done) => {
    console.log(wrapper.debug());
    moxios.wait(() => {
      wrapper.update();
      wrapper.find('._PostLikes_Arrow').simulate('click');
      moxios.wait(() => {
        wrapper.update();
        expect(wrapper.find('._LikeName_User').length).toEqual(1);
        console.log(wrapper.html());
        wrapper.find('._PostCard').at(0).simulate('click');
        wrapper.update();
        wrapper.setProps({});
        console.log(wrapper.html());
        expect(wrapper.find('._LikeName_User').length).toEqual(0);
        done();
      });
    });
  });
});
