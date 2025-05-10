const path = require('path');
const fs = require('fs');

let db;
const isVercel = process.env.VERCEL === '1';

if (isVercel) {
  // Use an in-memory SQLite database in Vercel
  const sqlite3 = require('sqlite3').verbose();
  db = new sqlite3.Database(':memory:');
  console.log('Using in-memory SQLite database for Vercel deployment');
  
  // Initialize the in-memory database
  db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS contacts (
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
} else {
  // Use file-based SQLite in development
  const sqlite3 = require('sqlite3').verbose();
  const dbPath = path.join(__dirname, 'contacts.db');
  
  // Create db directory if it doesn't exist
  const dbDir = path.dirname(dbPath);
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
  }
  
  db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
      console.error('Error opening database', err.message);
    } else {
      console.log('Connected to the SQLite database.');
      
      // Create contacts table if it doesn't exist
      db.run(`CREATE TABLE IF NOT EXISTS contacts (
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
}

module.exports = db; 