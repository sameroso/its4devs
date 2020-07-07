import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import ReactPlayer from 'react-player';

import { deletePost } from '../../../actions';
import { editPost } from '../../../actions';
import CardButtons from '../CardButtons/CardButtons';
import PostCardField from '../PostCardField/PostCardField';
import CommentsList from '../comments/CommentsList/CommentsList';
import CommentForm from '../comments/CommentForm/CommentForm';
import dateHelper from '../../../helpers/dateHelper';
import PostLikes from '../PostLikes/PostLikes';
import UserPostHeader from '../UserPostHeader/UserPostHeader';
import successMessage from '../../../functions/successMessage';
import errorMessage from '../../../functions/errorMessage';

import './PostCard.scss';

function PostCard({
  post,
  deletePost,
  reset,
  currentUserId,
  handleSubmit,
  editPost,
}) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [editing, setEditing] = useState(false);

  const [isOnDeleteMode, setIsOnDeleteMode] = useState(true);
  const [showComments, setShowComments] = useState(false);
  const postCardRef = useRef(null);

  const willPlayerShow =
    !post.youtubeLink || post.youtubeLink === '' ? null : (
      <div className="mx-auto">
        <ReactPlayer
          url={post.youtubeLink}
          height="250px"
          width="100%"
          className="mx-auto mt-2"
          controls={true}
        />
      </div>
    );
  function handleClickOutside(event) {
    if (postCardRef.current && !postCardRef.current.contains(event.target)) {
      setIsOnDeleteMode(true);
      reset();
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }

  const deleteCurrentPost = async () => {
    try {
      setIsDeleting(true);
      await deletePost({ postId: post._id });
      successMessage('Post deletado!');
      setIsDeleting(false);
    } catch {
      errorMessage('Erro! Tente mais tarde');
      setIsDeleting(false);
    }
  };

  const editCurrentPost = async (formValues) => {
    try {
      setEditing(true);
      await editPost({ ...formValues, postId: post._id });
      setIsOnDeleteMode(true);
      setEditing(false);
      successMessage('Post editado!');
    } catch {
      errorMessage('Erro! Tente mais tarde');
      setEditing(false);
    }
  };

  const [showCommentForm, setShowCommentForm] = useState(false);
  const renderCommentForm = showCommentForm ? (
    <CommentForm
      setShowComments={setShowComments}
      form={post._id + post.postedBy.userId}
      postId={post._id}
    />
  ) : null;
  return (
    <div
      onClick={(e) => handleClickOutside(e)}
      ref={postCardRef}
      className="_PostCard"
    >
      <div className="d-flex top-post-card mt-4 justify-content-between">
        <div>
          <UserPostHeader post={post} className="_UserPostHeader" />
        </div>
        <div>
          <CardButtons
            editing={editing}
            isDeleting={isDeleting}
            onDelete={deleteCurrentPost}
            onEdit={handleSubmit(editCurrentPost)}
            setIsOnDeleteMode={setIsOnDeleteMode}
            isOnDeleteMode={isOnDeleteMode}
            postedBy={post.postedBy.userId}
            userId={currentUserId}
            reset={reset}
            postId={post._id}
          />
        </div>
      </div>
      <div className="postcard-bg pb-3">
        <div className="row">
          {willPlayerShow}
          <Field
            name="postCardBody"
            component={PostCardField}
            isOnDeleteMode={isOnDeleteMode}
            className="post-card-style"
            postId={post._id}
            userId={currentUserId}
          />
        </div>
        <div className="row justify-content-around mt-1 mx-auto">
          <div className="mx-auto">
            <PostLikes
              currentUserId={currentUserId}
              postId={post._id}
              post={post}
              className="_PostLikes"
            />
          </div>
          <small className="my-auto mr-3">{dateHelper(post.dateCreated)}</small>
        </div>
      </div>
      <hr className="postcard-bottom-line" />
      <CommentsList
        showComments={showComments}
        setShowComments={setShowComments}
        post={post}
        setShowCommentForm={setShowCommentForm}
      />
      {renderCommentForm}
    </div>
  );
}

const mapStateToProps = (state) => {
  return { currentUserId: state.user._id };
};

function validate(values) {
  const errors = {};
  if (!values.postCardBody) {
    errors.postCardBody = 'A postagem deve conter alguma informação';
  }

  return errors;
}

export default reduxForm({ enableReinitialize: true, validate })(
  connect(mapStateToProps, { deletePost, editPost })(PostCard)
);
