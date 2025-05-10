const path = require('path');
const fs = require('fs');
const { Pool } = require('pg');

let db;

// Check if running on Vercel or has DATABASE_URL (Railway)
const isVercel = process.env.VERCEL === '1';
const hasRailwayDb = !!process.env.DATABASE_URL;

// Fallback SQLite for when PostgreSQL connection fails
const setupSQLiteFallback = () => {
  console.warn('Using SQLite fallback due to PostgreSQL connection issues');
  const sqlite3 = require('sqlite3').verbose();
  const sqliteDb = new sqlite3.Database(':memory:');
  
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
    console.log('SQLite fallback initialized with contacts table');
  });
  
  return sqliteDb;
};

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

// Setup database connection with proper error handling
(async function initializeDatabase() {
  try {
    // Setup for Railway PostgreSQL
    if (hasRailwayDb) {
      console.log('Attempting to connect to Railway PostgreSQL database');
      
      try {
        const pool = new Pool({
          connectionString: process.env.DATABASE_URL,
          ssl: {
            rejectUnauthorized: false // This is needed for Vercel to connect to Railway
          },
          // Add connection pool settings
          max: 20, // Maximum number of clients
          idleTimeoutMillis: 30000, // How long a client is allowed to remain idle before being closed
          connectionTimeoutMillis: 2000 // How long to wait for a connection
        });
        
        // Test connection
        const client = await pool.connect();
        console.log('Successfully connected to Railway PostgreSQL');
        
        // Initialize the table
        await initPostgresTable(client);
        client.release();
        
        // Set the database connector
        db = createPgCompatibilityLayer(pool);
        console.log('PostgreSQL setup complete');
      } catch (pgError) {
        console.error('Failed to connect to PostgreSQL, using SQLite fallback:', pgError);
        db = setupSQLiteFallback();
      }
    }
    // Setup for Vercel with in-memory SQLite
    else if (isVercel) {
      console.log('Using in-memory SQLite database for Vercel deployment');
      db = setupSQLiteFallback();
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
  } catch (error) {
    console.error('Fatal database initialization error:', error);
    // Always provide a working database even if initialization fails
    db = setupSQLiteFallback();
  }
})();

module.exports = db; 