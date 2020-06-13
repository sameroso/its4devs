const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');

const apiRoutes = (app) => {
  app.post('/api/updateuser', requireLogin, async (req, res) => {
    const User = mongoose.model('users');
    const user = await User.findById(req.user._id);

    user.profileName = req.body.profileName;
    user.facebookLink = req.body.facebookLink;
    user.gitHub = req.body.gitHub;
    user.whatsApp = req.body.whatsApp;
    user.description = req.body.description;
    user.initialFormFilled = true;
    const updated = await user.save();

    res.send(updated);
  });
  app.post('/api/updateuserposts', requireLogin, async (req, res) => {
    const post = {
      postId: req.body.sequenceId,
      postedBy: {
        profileName: req.body.profileName,
        profilePic: req.body.profilePic,
        userId: req.user._id,
      },
      title: req.body.title,
      body: req.body.body,
      likes: [],
    };
    const User = mongoose.model('users');
    const user = await User.findById(req.user._id);
    user.posts.push(post);
    const updated = await user.save();
    res.send(updated);
  });

  app.get('/api/posts', requireLogin, async (req, res) => {
    const Posts = mongoose.model('posts');
    const posts = await Posts.findOne({ id: '1' });

    res.send(posts);
  });

  app.post('/api/deletepost', async (req, res) => {
    const Posts = mongoose.model('posts');
    const posts = await Posts.findOneAndUpdate(
      { id: '1' },
      { $pull: { posts: { postId: req.body.postId } } },
      { new: true }
    );

    res.send(posts);
  });
  app.post('/api/deleteuserpost', async (req, res) => {
    const User = mongoose.model('users');
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $pull: { posts: { postId: req.body.postId } } },
      { new: true }
    );

    res.send(user);
  });

  app.post('/api/sendpost', requireLogin, async (req, res) => {
    const Posts = await mongoose.model('posts');
    const options = { upsert: true };

    const post = {
      postedBy: {
        profileName: req.body.profileName,
        profilePic: req.body.profilePic,
        userId: req.user._id,
      },
      title: req.body.title,
      body: req.body.postForm,
      likes: [],
      comments: [],
      postId: req.body.sequenceId,
    };

    Posts.findOneAndUpdate({ id: '1' }, options, (error, result) => {
      if (!error) {
        // If the document doesn't exist
        if (!result) {
          result = new Posts({
            // the database id is hardcoded
            id: '1',
            sequenceId: 1,
            posts: [
              {
                postedBy: {
                  profileName: req.body.profileName,
                  profilePic: req.body.profilePic,
                  userId: req.user._id,
                },
                postId: 1,
                title: req.body.title,
                body: req.body.postForm,
                likes: [],
                comments: [],
              },
            ],
          });
        } else {
          result.sequenceId++;
          result.posts.push(post);
        }
        // Save the document
        result.save(function (error) {
          if (!error) {
            // Do something with the document
            res.send(result);
          } else {
            throw error;
          }
        });
      }
    });
  });
};

module.exports = apiRoutes;
