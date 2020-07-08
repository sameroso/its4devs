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

  app.get('/api/posts', requireLogin, async (req, res) => {
    const Posts = mongoose.model('posts');
    const posts = await Posts.findOne({ id: '1' });

    res.send(posts);
  });

  app.post('/api/deletepost', async (req, res) => {
    const Posts = mongoose.model('posts');
    const posts = await Posts.findOneAndUpdate(
      { id: '1' },
      { $pull: { posts: { _id: req.body.postId } } },
      { new: true }
    );

    res.send(posts);
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
      youtubeLink: req.body.youtubeInput,
      title: req.body.title,
      body: req.body.postForm,
      likes: [],
      comments: [],
    };

    Posts.findOneAndUpdate({ id: '1' }, options, (error, result) => {
      if (!error) {
        // If the document doesn't exist
        if (!result) {
          result = new Posts({
            // the database id is hardcoded
            id: '1',
            posts: [
              {
                postedBy: {
                  profileName: req.body.profileName,
                  profilePic: req.body.profilePic,
                  userId: req.user._id,
                },
                youtubeLink: req.body.youtubeInput,
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
  app.post('/api/editpost', async (req, res) => {
    const Posts = await mongoose.model('posts');
    const postsData = await Posts.findOne({ id: '1' });
    const post = postsData.posts.find((el) => {
      return el._id.toString() === req.body.postId;
    });
    post.body = await req.body.postCardBody;
    post.youtubeLink = await req.body.postCardYoutubeLink;
    const updated = await postsData.save();

    res.send(updated);
  });

  app.post('/api/createcommentpost', async (req, res) => {
    const Posts = mongoose.model('posts');
    const postsData = await Posts.findOne({ id: '1' });
    const post = postsData.posts.find((post) => {
      return post._id.toString() === req.body.postId;
    });

    await post.comments.push({
      profileName: req.body.profileName,
      profilePic: req.body.profilePic,
      userId: req.user._id,
      body: req.body.commentForm,
    });

    const updated = await postsData.save();
    res.send(updated);
  });

  app.post('/api/editcomment', async (req, res) => {
    const Posts = mongoose.model('posts');
    const postData = await Posts.findOne({ id: '1' });

    const post = postData.posts.find((post) => {
      return post._id.toString() === req.body.postId;
    });
    const comment = post.comments.find((comment) => {
      return comment._id.toString() === req.body.commentId;
    });
    comment.body = req.body.commentFormPosted;
    const updated = await postData.save();
    res.send(updated);
  });
  app.post('/api/deletecomment', async (req, res) => {
    const Posts = mongoose.model('posts');
    const postData = await Posts.findOne({ id: '1' });

    const post = postData.posts.find((post) => {
      return post._id.toString() === req.body.postId;
    });
    const comment = post.comments.find((comment) => {
      return comment._id.toString() === req.body.commentId;
    });
    comment.remove();
    const updated = await postData.save();
    res.send(updated);
  });
  app.post('/api/addlike', async (req, res) => {
    const Posts = mongoose.model('posts');
    const postData = await Posts.findOne({ id: '1' });
    const post = postData.posts.find((post) => {
      return post._id.toString() === req.body.postId;
    });
    post.likes.push({ userId: req.body.userId, likeType: req.body.likeType });
    const updated = await postData.save();
    res.send(updated);
  });
  app.post('/api/togglelike', async (req, res) => {
    const Posts = mongoose.model('posts');
    const postData = await Posts.findOne({ id: '1' });
    const post = postData.posts.find((post) => {
      return post._id.toString() === req.body.postId;
    });
    const like = post.likes.find((like) => {
      return like.userId === req.body.userId;
    });
    if (like.likeType === req.body.likeType) {
      like.remove();
    } else {
      like.remove();
      post.likes.push({ userId: req.body.userId, likeType: req.body.likeType });
    }
    const updated = await postData.save();
    res.send(updated);
  });
  app.post('/api/fetchuser', async (req, res) => {
    const User = mongoose.model('users');
    const user = await User.findById(req.body.id);
    res.send(user);
  });
};

module.exports = apiRoutes;
