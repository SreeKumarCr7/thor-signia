const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const contactRoutes = require('./routes/contacts');

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

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok',
    environment: process.env.NODE_ENV || 'development',
    database: process.env.DATABASE_URL ? 'Railway PostgreSQL' : 'SQLite'
  });
});

// Debug route
app.get('/api/debug', async (req, res) => {
  try {
    const db = require('./db/database');
    
    if (process.env.DATABASE_URL) {
      // PostgreSQL test
      const result = await db.all('SELECT NOW() as time', []);
      res.json({
        status: 'ok',
        database: 'PostgreSQL',
        connection: 'active',
        time: result
      });
    } else {
      // SQLite test
      db.all('SELECT datetime() as time', [], (err, rows) => {
        if (err) {
          throw new Error(`Database query error: ${err.message}`);
        }
        res.json({
          status: 'ok',
          database: 'SQLite',
          connection: 'active',
          time: rows
        });
      });
    }
  } catch (error) {
    console.error('Debug route error:', error);
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

// Contact form routes
app.use('/api/contacts', contactRoutes);

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