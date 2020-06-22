const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const postSchema = new Schema({
  id: String,
  posts: [
    {
      postedBy: { profileName: String, profilePic: String, userId: String },
      title: String,
      body: String,
      likes: [{ userId: String, likeType: String }],
      dateCreated: { type: Date, default: Date },
      comments: [
        {
          profileName: String,
          profilePic: String,
          userId: String,
          body: String,
          dateCreated: { type: Date, default: Date },
        },
      ],
    },
  ],
});

mongoose.connection.useDb('todoando');

mongoose.model('posts', postSchema);
