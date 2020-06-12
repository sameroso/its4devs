const mongoose = require('mongoose');

const apiRoutes = (app) => {
  app.post('/api/updateuser', async (req, res) => {
    const User = mongoose.model('users');
    const userData = {
      userName: req.body.userName,
      facebookLink: req.body.facebookLink,
      gitHub: req.body.gitHub,
      whatsApp: req.body.whatsApp,
      description: req.body.description,
    };
    const user = await User.findById(req.user._id);
    user.userName = req.body.userName;
    user.facebookLink = req.body.facebookLink;
    user.gitHub = req.body.gitHub;
    user.whatsApp = req.body.whatsApp;
    user.description = req.body.description;
    user.initialFormFilled = true;
    const updated = await user.save();

    res.send(updated);
  });

  app.get('/api/posts', async (req, res) => {
    const Posts = await mongoose.model('posts');

    res.send(Posts);
  });
};

module.exports = apiRoutes;
