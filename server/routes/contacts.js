const express = require('express');
const router = express.Router();
const db = require('../db/database');
const emailService = require('../services/emailService');

// Get all contacts - Route should only be used in development
router.get('/', (req, res) => {
  // In production, don't allow listing all contacts
  if (process.env.NODE_ENV === 'production') {
    return res.status(403).json({ error: 'Access restricted in production' });
  }
  
  db.all('SELECT * FROM contacts ORDER BY created_at DESC', [], (err, rows) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Failed to retrieve contacts' });
    }
    res.json(rows);
  });
});

// Get a single contact by ID - Route should only be used in development
router.get('/:id', (req, res) => {
  // In production, don't allow accessing specific contacts
  if (process.env.NODE_ENV === 'production') {
    return res.status(403).json({ error: 'Access restricted in production' });
  }
  
  const id = req.params.id;
  db.get('SELECT * FROM contacts WHERE id = ?', [id], (err, row) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Failed to retrieve contact' });
    }
    if (!row) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    res.json(row);
  });
});

// Create a new contact
router.post('/', async (req, res) => {
  const { name, email, phone, company, message } = req.body;
  
  // Validate required fields
  if (!name || !email || !company || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  const sql = `INSERT INTO contacts (name, email, phone, company, message) 
               VALUES (?, ?, ?, ?, ?)`;
  
  try {
    // Store in database
    const dbPromise = new Promise((resolve, reject) => {
      db.run(sql, [name, email, phone, company, message], function(err) {
        if (err) {
          console.error('Database error:', err.message);
          reject(err);
        } else {
          resolve({ id: this.lastID });
        }
      });
    });
    
    // Data for email and backup
    const contactData = {
      name, 
      email, 
      phone, 
      company, 
      message,
      timestamp: new Date().toISOString()
    };
    
    // Send email notification
    const emailPromise = emailService.sendContactNotification(contactData);
    
    // Backup the submission
    const backupPromise = emailService.backupSubmission(contactData);
    
    // Wait for operations to complete
    const [dbResult, emailResult, backupResult] = await Promise.allSettled([
      dbPromise, 
      emailPromise, 
      backupPromise
    ]);
    
    // If database operation succeeded, consider it a success
    if (dbResult.status === 'fulfilled') {
      res.status(201).json({ 
        id: dbResult.value.id,
        message: 'Contact saved successfully',
        emailSent: emailResult.status === 'fulfilled' && emailResult.value.success,
        backupCreated: backupResult.status === 'fulfilled' && backupResult.value.success
      });
    } else {
      throw new Error(dbResult.reason || 'Failed to save contact');
    }
  } catch (error) {
    console.error('Error processing contact submission:', error);
    res.status(500).json({ error: 'Failed to save contact' });
  }
});

module.exports = router; 