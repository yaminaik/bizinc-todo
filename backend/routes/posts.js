const express = require('express');
const router = express.Router();
const pool = require('../config/db');



// Get all posts with user's name
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT posts.id, posts.title, posts.content, posts.user_id, users.name AS username
      FROM posts
      JOIN users ON posts.user_id = users.id
    `);
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});




// Create a new post
// Create a new post
router.post('/', (req, res) => {
  // Check if user is authenticated
  console.log(req);

  // Print specific properties of the request
  console.log('Request body:', req.body); // Shows the data sent in the body of the request
  console.log('Request user:', req.user); // Shows the user data if authenticated
  console.log('Is user authenticated:', req.isAuthenticated()); // Check if user is authenticated

  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: 'You must be logged in to create a post.' });
  }

  const { title, content } = req.body;
  const user_id = req.user.id; // Get the logged-in user's ID from the session

  pool.query(
    'INSERT INTO posts (title, content, user_id) VALUES ($1, $2, $3) RETURNING *',
    [title, content, user_id],
    (err, result) => {
      if (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
      }
      res.json(result.rows[0]);
    }
  );
});


router.get('/user/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const result = await pool.query(`
      SELECT posts.id, posts.title, posts.content, posts.user_id, users.name AS username
      FROM posts
      JOIN users ON posts.user_id = users.id
      WHERE users.id = $1
    `, [userId]);

    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


// Get the number of comments on a specific post
router.get('/post/:postId/comment-count', async (req, res) => {
  const { postId } = req.params;
  try {
    const result = await pool.query('SELECT COUNT(*) FROM comments WHERE post_id = $1', [postId]);
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
