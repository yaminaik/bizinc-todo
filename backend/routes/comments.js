const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// Get comments for a specific post
router.get('/post/:postId', async (req, res) => {
  const { postId } = req.params;
  try {
    const result = await pool.query('SELECT * FROM comments WHERE post_id = $1', [postId]);
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Add a new comment
router.post('/', async (req, res) => {
  const { content, post_id, user_id } = req.body;
  try {
    const newComment = await pool.query(
      'INSERT INTO comments (content, post_id, user_id) VALUES ($1, $2, $3) RETURNING *',
      [content, post_id, user_id]
    );
    res.json(newComment.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
