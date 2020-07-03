import React from 'react';
import { shallow } from 'enzyme';
import CommentsList from './CommentsList';

let wrapper;
const props = {
  showComments: true,
  post: {
    comments: [
      { comment: '1', _id: '1' },
      { comment: '2', _id: '2' },
      { comment: '3', _id: '3' },
    ],
  },
  initialValues: {
    commentFormPosted: 'comment.body',
  },
};

describe('3 comments', () => {
  beforeEach(() => {
    wrapper = shallow(<CommentsList {...props} />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('render all 3 comments', () => {
    expect(wrapper.find('._Comment_Component').length).toBe(3);
  });
  it('does not render show more btn', () => {
    expect(wrapper.find('.CommentList-show-more-btn').length).toBe(0);
  });
});
describe('4 comments', () => {
  beforeEach(() => {
    props.post.comments.push({ comment: '4', _id: '4' });
    wrapper = shallow(<CommentsList {...props} />);
  });
  afterEach(() => {
    wrapper.unmount();
  });
  it('renders only 3 comments', () => {
    expect(wrapper.find('._Comment_Component').length).toBe(3);
  });
  it('does render show more btn', () => {
    expect(wrapper.find('.CommentList-show-more-btn').length).toBe(1);
  });
});
