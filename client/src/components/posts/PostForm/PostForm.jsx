import React from 'react';
import { connect } from 'react-redux';
import { sendPost } from '../../../actions';

function PostForm({ postData: { profileName, profilePic }, sendPost }) {
  const postData = {
    profileName,
    profilePic,
    id: '1',
  };
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendPost(postData);
        }}
      >
        <textarea placeholder="Compartilhe o que Você está Pensando" />
        <button type="submit">lansa a braba caraio</button>
      </form>
    </div>
  );
}

export default connect(null, { sendPost })(PostForm);
