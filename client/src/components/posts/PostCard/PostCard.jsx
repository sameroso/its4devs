import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

import { deletePost } from '../../../actions';
import { editPost } from '../../../actions';
import CardButtons from '../CardButtons/CardButtons';
import PostCardField from '../PostCardField/PostCardField';
import CommentsList from '../comments/CommentsList/CommentsList';
import CommentForm from '../comments/CommentForm/CommentForm';
import dateHelper from '../../../helpers/dateHelper';
import PostLikes from '../PostLikes/PostLikes';

import './PostCard.scss';
import { Link } from 'react-router-dom';

function PostCard({
  post,
  deletePost,
  reset,
  myUserId,
  handleSubmit,
  editPost,
}) {
  const [postCardFieldMode, setPostCardFieldMode] = useState(true);
  const [showComments, setShowComments] = useState(false);
  const [btnMode, setBtnMode] = useState(false);
  const postCardRef = useRef(null);

  function handleClickOutside(event) {
    if (postCardRef.current && !postCardRef.current.contains(event.target)) {
      setBtnMode(false);
      setPostCardFieldMode(true);
      reset();
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }

  const deleteCurrentPost = () => {
    deletePost({ postId: post._id });
  };

  const editCurrentPost = (formValues) => {
    editPost({ ...formValues, postId: post._id });
  };

  const [showCommentForm, setShowCommentForm] = useState(false);
  const isCommentFormShowing = showCommentForm ? (
    <CommentForm
      setShowComments={setShowComments}
      form={post._id + post.postedBy.userId}
      postId={post._id}
    />
  ) : null;
  return (
    <div onClick={(e) => handleClickOutside(e)} ref={postCardRef}>
      <div className="d-flex top-post-card mt-4 justify-content-between">
        <div>
          <Link to={`profile/${post.postedBy.userId}`}>
            <img
              src={post.postedBy.profilePic}
              className="img-card-size my-auto ml-1 py-1 px-1"
            ></img>
            <span className="text-white ml-2 my-auto mx-auto">
              {post.postedBy.profileName}
            </span>
          </Link>
        </div>
        <div>
          <CardButtons
            onDelete={deleteCurrentPost}
            onEdit={handleSubmit(editCurrentPost)}
            onBtnChange={setPostCardFieldMode}
            postedBy={post.postedBy.userId}
            userId={myUserId}
            reset={reset}
            postId={post._id}
            btnMode={btnMode}
            setBtnMode={setBtnMode}
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
            postId={post._id}
            userId={myUserId}
          />
        </div>
        <div className="row justify-content-around mt-1 mx-auto">
          <div className="mx-auto">
            <PostLikes myUserId={myUserId} postId={post.postId} post={post} />
          </div>
          <small className="my-auto mr-3">{dateHelper(post.dateCreated)}</small>
        </div>
      </div>
      <hr className="postcard-bottom-line" />
      <CommentsList
        showComments={showComments}
        setShowComments={setShowComments}
        post={post}
        onSetPostForm={setShowCommentForm}
      />
      {isCommentFormShowing}
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
