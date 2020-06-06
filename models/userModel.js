const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
  googleId: String,
  facebookId: String,
  profilePic: String,
  profileName: String,
  description: String,
  whatsApp: String,
  facebookLink: String,
  votes: String,
  donations: [{ title: String, body: String, date: Date }],
  date: { type: Date, default: Date.now },
  meta: {
    votes: Number,
    favs: Number,
  },
});

mongoose.connection.useDb('todoando');

mongoose.model('users', userSchema);
