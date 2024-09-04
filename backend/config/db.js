// backend/config/db.js
const { Pool } = require('pg');

// Configure PostgreSQL connection pool
const pool = new Pool({
  user: 'yami',
  host: 'localhost',
  database: 'todolist',
  password: 'yami',
  port: 5432,
});

module.exports = pool;
