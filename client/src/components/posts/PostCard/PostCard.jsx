import React, { useState } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

import { deletePost } from '../../../actions';
import CardButtons from '../CardButtons/CardButtons';
import PostCardField from '../PostCardField/PostCardField';

import './PostCard.scss';

function PostCard({ post, deletePost, reset }) {
  const [postCardFieldMode, setPostCardFieldMode] = useState(true);

  const deletecurrentPost = () => {
    deletePost({ postId: post.postId });
  };

  const editCurrentPost = () => {
    console.log('joia');
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
        onDelete={deletecurrentPost}
        onEdit={editCurrentPost}
        onBtnChange={setPostCardFieldMode}
        reset={reset}
      />
    </div>
  );
}

const mapStateToProps = (state) => {
  console.log(state);
  return state;
};

export default reduxForm({ enableReinitialize: true })(
  connect(mapStateToProps, { deletePost })(PostCard)
);
