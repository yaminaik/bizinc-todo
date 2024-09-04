// backend/routes/posts.js
const express = require('express');
const router = express.Router();
const pool = require('../config/db'); // PostgreSQL connection

// Get all posts
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM posts');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Create a new post
router.post('/', async (req, res) => {
  const { title, content, user_id } = req.body;
  try {
    const newPost = await pool.query(
      'INSERT INTO posts (title, content, user_id) VALUES ($1, $2, $3) RETURNING *',
      [title, content, user_id]
    );
    res.json(newPost.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
// Get all posts by a specific user
router.get('/user/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
      const result = await pool.query('SELECT * FROM posts WHERE user_id = $1', [userId]);
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
