const express = require('express');
const app = express();
require('./services/passport');

const authRoutes = require('./routes/authRoutes');

authRoutes(app);

app.listen(5000);
