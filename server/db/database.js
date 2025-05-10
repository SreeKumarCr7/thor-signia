const path = require('path');
const fs = require('fs');
const { Pool } = require('pg');

let db;

// Environment detection
const isVercel = process.env.VERCEL === '1';
const isProduction = process.env.NODE_ENV === 'production';
const hasRailwayDb = !!process.env.DATABASE_URL;

// PostgreSQL connection setup
const setupPostgresConnection = async () => {
  console.log('Setting up PostgreSQL connection with Railway...');
  
  try {
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false // Required for Vercel to connect to Railway
      },
      // Connection pool settings
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000
    });
    
    // Test the connection
    const client = await pool.connect();
    console.log('✅ Successfully connected to PostgreSQL database');
    
    try {
      // First check if the table already exists
      const tableCheck = await client.query(
        "SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'contacts')"
      );
      
      const tableExists = tableCheck.rows[0].exists;
      console.log(`Table check result: ${tableExists ? 'Table exists' : 'Table does not exist'}`);
      
      if (!tableExists) {
        // Create the contacts table if it doesn't exist
        console.log('Creating contacts table in public schema...');
        await client.query(`
          CREATE TABLE public.contacts (
            id SERIAL PRIMARY KEY,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            phone TEXT,
            company TEXT NOT NULL,
            message TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          )
        `);
        console.log('✅ PostgreSQL contacts table created successfully');
      } else {
        console.log('✅ PostgreSQL contacts table already exists');
      }
    } catch (tableError) {
      console.error('Error working with contacts table:', tableError);
      throw tableError;
    } finally {
      client.release();
    }
    
    // Return compatibility layer
    return createPgCompatibilityLayer(pool);
  } catch (err) {
    console.error('❌ PostgreSQL connection failed:', err);
    throw err; // Rethrow to be handled by the caller
  }
};

// SQLite fallback for local development only
const setupSQLiteConnection = () => {
  if (isProduction || isVercel) {
    console.error('❌ Attempted to use SQLite in production/Vercel environment');
    throw new Error('SQLite is not supported in production/Vercel environment');
  }
  
  console.log('Setting up SQLite for local development...');
  const sqlite3 = require('sqlite3').verbose();
  const dbPath = path.join(__dirname, 'contacts.db');
  
  // Ensure the directory exists
  const dbDir = path.dirname(dbPath);
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
  }
  
  return new Promise((resolve, reject) => {
    const sqliteDb = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        console.error('❌ SQLite connection failed:', err.message);
        reject(err);
        return;
      }
      
      console.log('✅ Connected to SQLite database');
      
      // Create contacts table
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
          console.error('❌ Failed to create SQLite table:', err.message);
          reject(err);
        } else {
          console.log('✅ SQLite contacts table initialized');
          resolve(sqliteDb);
        }
      });
    });
  });
};

// PostgreSQL compatibility layer (makes PG work with SQLite interface)
const createPgCompatibilityLayer = (pgPool) => {
  // Helper to ensure all table references use public schema
  const ensurePublicSchema = (query) => {
    // Regular expression to match table names not prefixed with a schema
    // This regex looks for table names in common SQL operations
    return query.replace(/\b(FROM|JOIN|UPDATE|INTO|TABLE)\s+(?!public\.)(\w+)/gi, '$1 public.$2');
  };

  return {
    // Run query (for INSERT, UPDATE, DELETE)
    run: async (query, params, callback) => {
      try {
        // Convert SQLite placeholders to PostgreSQL placeholders
        let pgQuery = query;
        let paramIndex = 0;
        pgQuery = query.replace(/\?/g, () => `$${++paramIndex}`);
        
        // Ensure public schema is used
        pgQuery = ensurePublicSchema(pgQuery);
        
        // For INSERT queries, add RETURNING id
        if (query.trim().toUpperCase().startsWith('INSERT')) {
          if (!pgQuery.includes('RETURNING')) {
            pgQuery += ' RETURNING id';
          }
        }
        
        console.log('PostgreSQL query:', pgQuery);
        const result = await pgPool.query(pgQuery, params);
        
        if (callback) {
          // Simulate SQLite's this.lastID
          const lastID = result.rows && result.rows[0] ? result.rows[0].id : null;
          callback.call({ lastID });
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
        // Convert SQLite placeholders to PostgreSQL placeholders
        let pgQuery = query;
        let paramIndex = 0;
        pgQuery = query.replace(/\?/g, () => `$${++paramIndex}`);
        
        // Ensure public schema is used
        pgQuery = ensurePublicSchema(pgQuery);
        
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
        // Convert SQLite placeholders to PostgreSQL placeholders
        let pgQuery = query;
        let paramIndex = 0;
        pgQuery = query.replace(/\?/g, () => `$${++paramIndex}`);
        
        // Ensure public schema is used
        pgQuery = ensurePublicSchema(pgQuery);
        
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

// Main database initialization
(async function initializeDatabase() {
  try {
    console.log('Database initialization started...');
    console.log('Environment:', {
      NODE_ENV: process.env.NODE_ENV || 'development',
      VERCEL: isVercel ? 'true' : 'false',
      HAS_DATABASE_URL: hasRailwayDb ? 'true' : 'false'
    });
    
    // Production/Vercel environment - must use PostgreSQL
    if (isProduction || isVercel) {
      if (!hasRailwayDb) {
        throw new Error('DATABASE_URL environment variable is required in production/Vercel environment');
      }
      
      console.log('Setting up PostgreSQL for production/Vercel environment...');
      db = await setupPostgresConnection();
    }
    // Local development - can use PostgreSQL if available, otherwise SQLite
    else {
      if (hasRailwayDb) {
        console.log('DATABASE_URL found in development - using PostgreSQL...');
        try {
          db = await setupPostgresConnection();
        } catch (pgError) {
          console.log('PostgreSQL failed in development, falling back to SQLite...');
          db = await setupSQLiteConnection();
        }
      } else {
        console.log('No DATABASE_URL found in development - using SQLite...');
        db = await setupSQLiteConnection();
      }
    }
    
    console.log('✅ Database initialization complete');
  } catch (error) {
    console.error('❌ FATAL DATABASE ERROR:', error);
    
    // In development, try SQLite as last resort
    if (!isProduction && !isVercel) {
      try {
        console.log('Attempting SQLite as last resort for development...');
        db = await setupSQLiteConnection();
      } catch (sqliteError) {
        console.error('❌ Failed to initialize any database:', sqliteError);
        throw error; // Rethrow the original error
      }
    } else {
      // In production, we must fail loudly
      throw error;
    }
  }
})();

module.exports = db; 