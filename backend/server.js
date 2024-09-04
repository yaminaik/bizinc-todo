// backend/server.js
const express = require('express');
const postRoutes = require('./routes/posts'); // Import your posts routes
const logger = require('./middleware/logger'); // Import the logging middleware
const cors = require('cors');

const app = express();
const port = 3001;

// Middleware
app.use(express.json()); // To parse JSON bodies
app.use(logger); // Logging middleware
app.use(cors()); 

// Root route (optional, for testing)
app.get('/', (req, res) => {
  res.send('Welcome to the backend API!');
});


app.use('/api/posts', postRoutes); // Mount the posts routes


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

app.use(logger); // Add logging middleware
