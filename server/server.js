const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5000;

// Log startup information
console.log('Starting server with configuration:', {
  NODE_ENV: process.env.NODE_ENV,
  VERCEL: process.env.VERCEL,
  HAS_DATABASE_URL: !!process.env.DATABASE_URL,
  PORT
});

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Basic error handling for all routes
app.use((req, res, next) => {
  try {
    next();
  } catch (err) {
    console.error('Uncaught error in middleware:', err);
    res.status(500).json({ error: 'Server error', message: 'An unexpected error occurred' });
  }
});

// Health check route - does not require database
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok',
    environment: process.env.NODE_ENV || 'development',
    database_type: process.env.DATABASE_URL ? 'PostgreSQL' : 'SQLite',
    vercel: process.env.VERCEL === '1'
  });
});

// Debug route - with database check
app.get('/api/debug', async (req, res) => {
  try {
    // Don't require database module until route is called
    const db = require('./db/database');
    
    // Simple query that works in both PostgreSQL and SQLite
    const query = process.env.DATABASE_URL 
      ? 'SELECT 1 as connected'  // PostgreSQL
      : 'SELECT 1 as connected'; // SQLite
    
    // Use a Promise to handle both async (pg) and callback (sqlite) patterns
    const result = await new Promise((resolve, reject) => {
      if (process.env.DATABASE_URL) {
        // PostgreSQL uses async/await pattern
        db.all(query, [])
          .then(results => resolve(results))
          .catch(err => reject(err));
      } else {
        // SQLite uses callback pattern
        db.all(query, [], (err, rows) => {
          if (err) reject(err);
          else resolve(rows);
        });
      }
    });
    
    res.json({
      status: 'ok',
      database: process.env.DATABASE_URL ? 'PostgreSQL' : 'SQLite',
      connection: 'active',
      result: result
    });
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({
      status: 'error',
      message: error.message,
      database_type: process.env.DATABASE_URL ? 'PostgreSQL' : 'SQLite'
    });
  }
});

// Initialize routes with proper error handling
app.get('/', (req, res) => {
  res.json({ message: 'Thor Signia API is running' });
});

// Contact form routes (lazy-loaded to prevent errors during startup)
app.use('/api/contacts', (req, res, next) => {
  try {
    const contactRoutes = require('./routes/contacts');
    contactRoutes(req, res, next);
  } catch (err) {
    console.error('Error loading contact routes:', err);
    res.status(500).json({ error: 'Server configuration error' });
  }
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ 
    error: 'Server error', 
    message: err.message
  });
});

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../dist')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../dist', 'index.html'));
  });
}

// For Vercel serverless deployment
if (process.env.VERCEL) {
  // Export the app for serverless
  module.exports = app;
} else {
  // Start the server for local development
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Promise Rejection:', err);
}); 