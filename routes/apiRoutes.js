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
  /*  app.post('/api/updateuserposts', requireLogin, async (req, res) => {
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
  }); */

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
  /*  app.post('/api/deleteuserpost', async (req, res) => {
    const User = mongoose.model('users');
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $pull: { posts: { postId: req.body.postId } } },
      { new: true }
    );

    res.send(user);
  }); */

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
  app.post('/api/editpost', async (req, res) => {
    const Posts = await mongoose.model('posts');
    const postsData = await Posts.findOne({ id: '1' });
    const post = postsData.posts.find((el) => {
      return el.postId === req.body.postId;
    });
    post.body = await req.body.postCardBody;
    const updated = await postsData.save();
    res.send(updated);
  });
  /*  app.post('/api/edituserpost', async (req, res) => {
    const User = await mongoose.model('users');
    const user = await User.findById(req.user._id);
    const post = user.posts.find((el) => {
      return el.postId === req.body.postId;
    });
    post.body = await req.body.postCardBody;
    const updated = await user.save();
    res.send(updated);
  }); */
  app.post('/api/createcommentpost', async (req, res) => {
    const Posts = mongoose.model('posts');
    const postsData = await Posts.findOne({ id: '1' });
    postsData.sequenceId++;
    const post = postsData.posts.find((post) => {
      return post.postId === req.body.postId;
    });
    await post.comments.push({
      commentId: req.body.commentId,
      profileName: req.body.profileName,
      profilePic: req.body.profilePic,
      userId: req.user._id,
      body: req.body.commentForm,
    });
    const updated = await postsData.save();
    res.send(updated);
  });
  /*  app.post('/api/createcommentuser', requireLogin, async (req, res) => {
    const postData = {
      commentId: req.body.commentId,
      profileName: req.body.profileName,
      profilePic: req.body.profilePic,
      userId: req.user._id,
      body: req.body.commentForm,
    };
    const User = mongoose.model('users');
    const user = await User.findById(req.user._id);
    console.log(user);
    const post = user.posts.find((post) => {
      return post.postId === req.body.postId;
    });
    console.log(post);
    post.comments.push(postData);
    const updated = await user.save();
    res.send(updated);
  }); */
  app.post('/api/editcomment', async (req, res) => {
    const Posts = mongoose.model('posts');
    const postData = await Posts.findOne({ id: '1' });

    const post = postData.posts.find((post) => {
      return post.postId === req.body.postId;
    });
    const comment = post.comments.find((comment) => {
      return comment.commentId === req.body.commentId;
    });
    comment.body = req.body.commentFormPosted;
    const updated = await postData.save();
    res.send(updated);
  });
  app.post('/api/deletecomment', async (req, res) => {
    const Posts = mongoose.model('posts');
    const postData = await Posts.findOne({ id: '1' });

    const post = postData.posts.find((post) => {
      return post.postId === req.body.postId;
    });
    const comment = post.comments.find((comment) => {
      return comment.commentId === req.body.commentId;
    });
    comment.remove();
    const updated = await postData.save();
    res.send(updated);
  });
  app.post('/api/addlike', async (req, res) => {
    const Posts = mongoose.model('posts');
    const postData = await Posts.findOne({ id: '1' });
    const post = postData.posts.find((post) => {
      return post.postId === req.body.postId;
    });
    post.likes.push({ userId: req.body.userId, likeType: req.body.likeType });
    const updated = await postData.save();
    res.send(updated);
  });
  app.post('/api/togglelike', async (req, res) => {
    const Posts = mongoose.model('posts');
    const postData = await Posts.findOne({ id: '1' });
    const post = postData.posts.find((post) => {
      return post.postId === req.body.postId;
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
    console.log(user);
    res.send(user);
  });
};

module.exports = apiRoutes;
