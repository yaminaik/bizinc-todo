// comment.js (Backend)

const express = require('express');
const router = express.Router();
const pool = require('../config/db'); // PostgreSQL connection pool

// GET comments for a specific post
router.get('/post/:postId', async (req, res) => {
  const { postId } = req.params;

  try {
    const query = 'SELECT * FROM comments WHERE post_id = $1';
    const result = await pool.query(query, [postId]);
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching comments:', err.message);
    res.status(500).send('Server Error');
  }
});

router.post('/post/:postId', async (req, res) => {
  const { content, user_id } = req.body;
  const { postId } = req.params;

  if (!content || !user_id || !postId) {
    return res.status(400).json({ msg: 'All fields are required' });
  }

  try {
    const query = 'INSERT INTO comments (content, user_id, post_id) VALUES ($1, $2, $3) RETURNING *';
    const values = [content, user_id, postId];
    const result = await pool.query(query, values);

    res.json(result.rows[0]); // Return the newly added comment
  } catch (err) {
    console.error('Error adding comment:', err.message);
    res.status(500).send('Server Error');
  }
});


module.exports = router;
