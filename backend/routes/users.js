const express = require('express');
const passport = require('passport'); // Import passport here
const bcrypt = require('bcryptjs');
const pool = require('../config/db'); // Import database connection

const router = express.Router();

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body; // Add 'name' here

  try {
    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Insert the new user with the name and hashed password
    const newUser = await pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
      [name, email, hashedPassword] // Add 'name' to the query
    );

    res.json(newUser.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


router.post('/login', (req, res, next) => {
  console.log('Login request body:', req.body); // Log request body to inspect incoming data
  
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return res.status(500).json({ message: 'Server error' });
    }
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    req.login(user, (err) => {
      if (err) {
        return res.status(500).json({ message: 'Login failed' });
      }
      return res.json({ message: 'Login successful', user });
    });
  })(req, res, next);
});
module.exports = router;
