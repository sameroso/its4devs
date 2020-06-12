const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
  googleId: String,
  facebookId: String,
  gitHubId: String,
  profilePic: String,
  profileName: String,
  description: String,
  whatsApp: String,
  facebookLink: String,
  gitHub: String,
  initialFormFilled: Boolean,
  posts: [
    {
      postedBy: { profileName: String, profilePic: String, userId: String },
      title: String,
      body: String,
      likes: [{ userId: String }],
      dateCreated: { type: Date, default: Date },
    },
  ],
  dateCreated: { type: Date, default: Date },
});

mongoose.connection.useDb('todoando');

mongoose.model('users', userSchema);
