import sqlite3
import os
from datetime import datetime

# Make sure the app directory exists
if not os.path.exists('app'):
    os.makedirs('app')

# Connect to the SQLite database (will create it if it doesn't exist)
conn = sqlite3.connect('app/contacts.db')
cursor = conn.cursor()

# Create contacts table
cursor.execute('''
CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    company TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
''')

# Create a test entry
cursor.execute('''
INSERT INTO contacts (name, email, phone, company, message, created_at)
VALUES (?, ?, ?, ?, ?, ?)
''', ('Test User', 'test@example.com', '1234567890', 'Test Company', 'This is a test message', datetime.now().isoformat()))

# Commit the transaction and close the connection
conn.commit()
conn.close()

print("Database created successfully with test entry!") 