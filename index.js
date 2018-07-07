const express = require('express');

const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');

const bodyParser = require('body-parser');
const keys = require('./config/keys');

require('./models/User.js');
//require('./services/passport'); tambien estaria bien
const passportConfig = require('./services/passport');

////
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(bodyParser.json());

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

//para indicar que use las cookieSession
app.use(passport.initialize());
app.use(passport.session());

authRoutes(app);
require('./routes/billingRoutes')(app);

mongoose.connect(keys.mongoURI);

////   require('./routes/authRoutes')(app);   hace lo mismo

if (process.env.NODE_ENV === 'production') {
  // Express will serve up production assets
  // like our main.js file, or main.css file!
  app.use(express.static('client/build'));

  // Express will serve up the index.html file
  // if it doesn't recognize the route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
