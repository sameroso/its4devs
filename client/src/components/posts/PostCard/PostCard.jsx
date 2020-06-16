import React, { useState } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

import { deletePost } from '../../../actions';
import { editPost } from '../../../actions';
import CardButtons from '../CardButtons/CardButtons';
import PostCardField from '../PostCardField/PostCardField';
import CommentsList from '../comments/CommentsList/CommentsList';
import CommentForm from '../comments/CommentForm/CommentForm';
import dateHelper from '../../../helpers/dateHelper';

import './PostCard.scss';

function PostCard({
  post,
  deletePost,
  reset,
  myUserId,
  handleSubmit,
  editPost,
}) {
  const [postCardFieldMode, setPostCardFieldMode] = useState(true);

  const deleteCurrentPost = () => {
    deletePost({ postId: post.postId });
  };

  const editCurrentPost = (formValues) => {
    editPost({ ...formValues, postId: post.postId });
  };

  return (
    <>
      <div className="d-flex top-post-card mt-4 justify-content-between">
        <div>
          <img
            src={post.postedBy.profilePic}
            className="img-card-size my-auto ml-1 py-1 px-1"
          ></img>
          <span className="text-white ml-2 my-auto">
            {post.postedBy.profileName}
          </span>
        </div>
        <div>
          <CardButtons
            onDelete={deleteCurrentPost}
            onEdit={handleSubmit(editCurrentPost)}
            onBtnChange={setPostCardFieldMode}
            postedBy={post.postedBy.userId}
            userId={myUserId}
            reset={reset}
          />
        </div>
      </div>
      <div className="postcard-bg pb-3">
        <div className="row">
          <Field
            name="postCardBody"
            component={PostCardField}
            postCardFieldMode={postCardFieldMode}
            className="post-card-style"
          />
        </div>
        <div className="row justify-content-end mr-5 mt-1">
          <small className="my-auto">{dateHelper(post.dateCreated)}</small>
        </div>
      </div>
      <hr className="postcard-bottom-line" />
      <CommentsList post={post} />
      <CommentForm form={post.postId.toString()} postId={post.postId} />
    </>
  );
}

const mapStateToProps = (state) => {
  return { myUserId: state.user._id };
};

function validate(values) {
  const errors = {};
  if (!values.postCardBody) {
    errors.postCardBody = 'NÃO PODE POST VAZIO';
  }

  return errors;
}

export default reduxForm({ enableReinitialize: true, validate })(
  connect(mapStateToProps, { deletePost, editPost })(PostCard)
);
