import React, { useEffect } from 'react';
import { connect } from 'react-redux';

function PostCardList(props) {
  return <div>PostCardList</div>;
}

export default connect(null, { fetchPosts })(PostCardList);
