const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.status(401).json({ message: 'Unauthorized access. Please log in first.' });
  };
  
  module.exports = isAuthenticated;
  