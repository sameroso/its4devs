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
      <div className="d-flex top-post-card justify-content-between ">
        <span className="text-white ml-3">{post.postedBy.profileName}</span>
        <small className="my-auto text-white mr-2">
          {dateHelper(post.dateCreated)}
        </small>
      </div>
      <div className="postcard-bg pb-5">
        <div className="row justify-content-around">
          <img
            src={post.postedBy.profilePic}
            className="img-card-size my-auto"
          ></img>
        </div>
        <div className="row">
          <Field
            name="postCardBody"
            component={PostCardField}
            postCardFieldMode={postCardFieldMode}
            className="post-card-style"
          />
        </div>

        <CardButtons
          onDelete={deleteCurrentPost}
          onEdit={handleSubmit(editCurrentPost)}
          onBtnChange={setPostCardFieldMode}
          postedBy={post.postedBy.userId}
          userId={myUserId}
          reset={reset}
        />
      </div>
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
