const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const postSchema = new Schema({
  id: String,
  sequenceId: Number,
  posts: [
    {
      postId: Number,
      postedBy: { profileName: String, profilePic: String, userId: String },
      title: String,
      body: String,
      likes: [{ userId: String }],
      dateCreated: { type: Date, default: Date },
      comments: [
        {
          commentId: Number,
          profileName: String,
          profilePic: String,
          userId: String,
          body: String,
        },
      ],
    },
  ],
});

mongoose.connection.useDb('todoando');

mongoose.model('posts', postSchema);
