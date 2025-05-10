const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const contactRoutes = require('./routes/contacts');

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5000;

// Display environment variables for debugging (excluding secrets)
console.log('Environment:', {
  NODE_ENV: process.env.NODE_ENV,
  VERCEL: process.env.VERCEL,
  HAS_DATABASE_URL: !!process.env.DATABASE_URL,
  PORT: process.env.PORT
});

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Global error handler caught:', err);
  res.status(500).json({ 
    error: 'Internal Server Error', 
    message: err.message || 'Unknown error occurred',
    stack: process.env.NODE_ENV === 'production' ? undefined : err.stack
  });
});

// API routes
app.use('/api/contacts', contactRoutes);

// Simple health check route
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'Server is running',
    environment: process.env.NODE_ENV || 'development',
    database: process.env.DATABASE_URL ? 'Railway PostgreSQL' : (process.env.VERCEL ? 'In-memory SQLite' : 'File-based SQLite')
  });
});

// Debug route to verify database connection
app.get('/api/debug', async (req, res) => {
  try {
    const db = require('./db/database');
    
    // For PostgreSQL connection
    if (process.env.DATABASE_URL) {
      // Test query - adjust as needed based on your actual database setup
      const result = await db.all('SELECT COUNT(*) as count FROM contacts', []);
      res.json({
        status: 'ok',
        database: 'PostgreSQL',
        connection: 'active',
        query_result: result
      });
    } 
    // For SQLite connection
    else {
      db.all('SELECT COUNT(*) as count FROM contacts', [], (err, rows) => {
        if (err) {
          throw new Error(`Database query error: ${err.message}`);
        }
        res.json({
          status: 'ok',
          database: process.env.VERCEL ? 'In-memory SQLite' : 'File-based SQLite',
          connection: 'active',
          query_result: rows
        });
      });
    }
  } catch (error) {
    console.error('Debug route error:', error);
    res.status(500).json({
      status: 'error',
      error: error.message,
      stack: process.env.NODE_ENV === 'production' ? undefined : error.stack
    });
  }
});

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../dist')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../dist', 'index.html'));
  });
}

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Promise Rejection:', err);
});

module.exports = app; 