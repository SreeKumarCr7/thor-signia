const express = require('express');
const router = express.Router();

// Create a module function that returns a router
module.exports = (req, res, next) => {
  try {
    // Lazy-load the database and email service modules
    const db = require('../db/database');
    const emailService = require('../services/emailService');
    
    // Use router.route for clean method handling
    router.route('/')
      // POST - Create a new contact
      .post(async (req, res) => {
        try {
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
            
            // Send email notification - don't block on this
            const emailPromise = emailService.sendContactNotification(contactData)
              .catch(err => {
                console.error('Email notification failed:', err);
                return { success: false, error: err.message };
              });
            
            // Backup the submission - don't block on this
            const backupPromise = emailService.backupSubmission(contactData)
              .catch(err => {
                console.error('Backup failed:', err);
                return { success: false, error: err.message };
              });
            
            // Wait for database operation to complete (required)
            // But don't fail if email or backup fails
            const dbResult = await dbPromise;
            
            // Use Promise.allSettled to get results of all operations, but not fail if some fail
            const [emailResult, backupResult] = await Promise.allSettled([
              emailPromise,
              backupPromise
            ]);
            
            res.status(201).json({ 
              id: dbResult.id,
              message: 'Contact saved successfully',
              emailSent: emailResult.status === 'fulfilled' && emailResult.value?.success,
              backupCreated: backupResult.status === 'fulfilled' && backupResult.value?.success
            });
          } catch (error) {
            console.error('Error processing contact submission:', error);
            res.status(500).json({ error: 'Failed to save contact' });
          }
        } catch (error) {
          console.error('Contact POST route error:', error);
          res.status(500).json({ error: 'Server error processing contact form' });
        }
      })
      
      // GET - Only allowed in development
      .get((req, res) => {
        try {
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
        } catch (error) {
          console.error('Contact GET route error:', error);
          res.status(500).json({ error: 'Server error retrieving contacts' });
        }
      });
    
    // Individual contact route
    router.route('/:id')
      .get((req, res) => {
        try {
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
        } catch (error) {
          console.error('Contact GET by ID route error:', error);
          res.status(500).json({ error: 'Server error retrieving contact' });
        }
      });
    
    // Handle the current request
    return router(req, res, next);
  } catch (err) {
    console.error('Fatal error in contacts router:', err);
    res.status(500).json({ error: 'Server configuration error' });
  }
}; 