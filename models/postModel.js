const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const postSchema = new Schema({
  id: String,
  posts: [
    {
      postedBy: { profileName: String, profilePic: String, userId: String },
      title: String,
      body: String,
      likes: [{ userId: String }],
      dateCreated: { type: Date, default: Date },
    },
  ],
});

mongoose.connection.useDb('todoando');

mongoose.model('posts', postSchema);
