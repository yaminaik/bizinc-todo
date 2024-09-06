const express = require('express');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors'); // Import cors
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const pool = require('./config/db'); // PostgreSQL connection pool
require('dotenv').config();
const app = express();

// CORS configuration
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from this origin (frontend)
  credentials: true // Allow credentials (cookies, sessions)
}));

// Middleware to parse JSON
app.use(express.json());

// Session configuration
app.use(session({
  secret: process.env.secret_key,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }, // Use secure: true in production with HTTPS
}));

// Initialize Passport and restore authentication state from the session
app.use(passport.initialize());
app.use(passport.session());

// Passport Local Strategy
passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
  try {
    const userResult = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = userResult.rows[0];

    if (!user) {
      return done(null, false, { message: 'Incorrect email.' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return done(null, false, { message: 'Incorrect password.' });
    }

    return done(null, user);
  } catch (err) {
    return done(err);
  }
}));

// Serialize user to store in session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
  try {
    const userResult = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    const user = userResult.rows[0];
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

// Define routes
const postsRouter = require('./routes/posts');
const usersRouter = require('./routes/users');
const commentsRouter = require('./routes/comments');

// Register routes after middleware
app.use('/api/posts', postsRouter);
app.use('/api/users', usersRouter);
app.use('/api/comments', commentsRouter);

// Start the server
app.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
});
