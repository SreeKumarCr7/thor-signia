const path = require('path');
const fs = require('fs');
const { Pool } = require('pg');

let db;

// Check if running on Vercel or has DATABASE_URL (Railway)
const isVercel = process.env.VERCEL === '1';
const hasRailwayDb = !!process.env.DATABASE_URL;

// Helper to initialize the contacts table in PostgreSQL
const initPostgresTable = async (client) => {
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS contacts (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT,
        company TEXT NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('PostgreSQL contacts table initialized.');
    return true;
  } catch (err) {
    console.error('Error creating PostgreSQL table:', err);
    return false;
  }
};

// SQLite compatibility layer for PostgreSQL
const createPgCompatibilityLayer = (pgPool) => {
  return {
    // Run query (for INSERT, UPDATE, DELETE)
    run: async (query, params, callback) => {
      try {
        // Convert SQLite placeholders (?) to PostgreSQL placeholders ($1, $2, etc.)
        const pgQuery = query.replace(/\?/g, (_, i) => `$${i + 1}`);
        const result = await pgPool.query(pgQuery, params);
        
        if (callback) {
          // Simulate SQLite's this.lastID
          callback.call({ lastID: result.rows[0]?.id || 0 });
        }
        return result;
      } catch (err) {
        console.error('PostgreSQL query error:', err);
        if (callback) callback(err);
        throw err;
      }
    },
    
    // Get a single row
    get: async (query, params, callback) => {
      try {
        // Convert SQLite placeholders (?) to PostgreSQL placeholders ($1, $2, etc.)
        const pgQuery = query.replace(/\?/g, (_, i) => `$${i + 1}`);
        const result = await pgPool.query(pgQuery, params);
        
        if (callback) {
          callback(null, result.rows[0] || null);
        }
        return result.rows[0] || null;
      } catch (err) {
        console.error('PostgreSQL query error:', err);
        if (callback) callback(err);
        throw err;
      }
    },
    
    // Get all rows
    all: async (query, params, callback) => {
      try {
        // Convert SQLite placeholders (?) to PostgreSQL placeholders ($1, $2, etc.)
        const pgQuery = query.replace(/\?/g, (_, i) => `$${i + 1}`);
        const result = await pgPool.query(pgQuery, params);
        
        if (callback) {
          callback(null, result.rows);
        }
        return result.rows;
      } catch (err) {
        console.error('PostgreSQL query error:', err);
        if (callback) callback(err);
        throw err;
      }
    }
  };
};

// Setup for Railway PostgreSQL
if (hasRailwayDb) {
  console.log('Using Railway PostgreSQL database');
  
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
  });
  
  // Test connection and initialize table
  pool.connect()
    .then(client => {
      console.log('Connected to Railway PostgreSQL');
      return initPostgresTable(client)
        .then(() => {
          client.release();
          console.log('Railway database setup complete');
        });
    })
    .catch(err => {
      console.error('Failed to connect to Railway PostgreSQL:', err);
    });
  
  // Create compatibility layer
  db = createPgCompatibilityLayer(pool);
}
// Setup for Vercel with in-memory SQLite
else if (isVercel) {
  // Use an in-memory SQLite database in Vercel
  const sqlite3 = require('sqlite3').verbose();
  const sqliteDb = new sqlite3.Database(':memory:');
  console.log('Using in-memory SQLite database for Vercel deployment');
  
  // Initialize the in-memory database
  sqliteDb.serialize(() => {
    sqliteDb.run(`CREATE TABLE IF NOT EXISTS contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      company TEXT NOT NULL,
      message TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`);
    console.log('Contacts table initialized in memory.');
  });
  
  db = sqliteDb;
}
// Local development with SQLite
else {
  // Use file-based SQLite in development
  const sqlite3 = require('sqlite3').verbose();
  const dbPath = path.join(__dirname, 'contacts.db');
  
  // Create db directory if it doesn't exist
  const dbDir = path.dirname(dbPath);
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
  }
  
  const sqliteDb = new sqlite3.Database(dbPath, (err) => {
    if (err) {
      console.error('Error opening database', err.message);
    } else {
      console.log('Connected to the SQLite database.');
      
      // Create contacts table if it doesn't exist
      sqliteDb.run(`CREATE TABLE IF NOT EXISTS contacts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT,
        company TEXT NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`, (err) => {
        if (err) {
          console.error('Error creating table', err.message);
        } else {
          console.log('Contacts table initialized.');
        }
      });
    }
  });
  
  db = sqliteDb;
}

module.exports = db; 