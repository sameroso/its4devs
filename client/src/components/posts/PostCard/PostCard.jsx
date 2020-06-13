import React, { useState } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

import { deletePost } from '../../../actions';
import { editPost } from '../../../actions';
import CardButtons from '../CardButtons/CardButtons';
import PostCardField from '../PostCardField/PostCardField';

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
    console.log({ ...formValues, postId: post.postId });
  };

  return (
    <div className="postcard-bg">
      <div className="row">
        <img src={post.postedBy.profilePic} className="img-card-size"></img>
        <p>{post.postedBy.profileName}</p>
        <Field
          name="postCardBody"
          component={PostCardField}
          postCardFieldMode={postCardFieldMode}
        />
        <p>{post.dateCreated}</p>
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
