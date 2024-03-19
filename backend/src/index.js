const express = require("express");
const cors = require("cors");
const passport = require('passport');
const cookieParser = require('cookie-parser')
const { SECRET, PORT, CLIENT_URL } = require('./constants/index')
const session = require('express-session')

const app = express();

require('./middlewares/passport-middleware')
app.use(session({
    secret: SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 1209600000 },
  })) 
app.use(cookieParser());
app.use(cors({ origin: CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(passport.initialize())
app.use(passport.session());

const authRoutes = require('./routes/auth')
const appRoutes = require('./routes/app')

//initialize routes
app.use('/api', authRoutes);
app.use('/', appRoutes);



const appStart = () => {
  try {
    app.listen(PORT, () => {
      console.log(`The app is running at http://localhost:${PORT}`)
    })
  } catch (error) {
    console.log(`Error: ${error.message}`)
  }
}

appStart()