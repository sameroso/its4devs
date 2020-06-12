const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const postSchema = new Schema({
  posts: [
    {
      postedBy: { userName: String, profilePic: String, userId: String },
      title: String,
      body: String,
      date: Date,
      likes: [{ userId: String }],
    },
  ],
});

mongoose.connection.useDb('todoando');

mongoose.model('posts', postSchema);
