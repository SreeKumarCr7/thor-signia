# Thor Signia Backend Server

This is the backend server for the Thor Signia website, handling contact form submissions and storing them in a SQLite database.

## Features

- RESTful API for contact form submissions
- SQLite database for data storage
- Express.js server with CORS enabled
- API endpoints for creating and retrieving contact form data

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the server:
   ```bash
   npm run server
   ```
   
   For development with auto-restart:
   ```bash
   npm run dev:server
   ```
   
   To run both frontend and backend together:
   ```bash
   npm run dev:full
   ```

## API Endpoints

### Contacts

- `GET /api/contacts` - Get all contacts
- `GET /api/contacts/:id` - Get a specific contact by ID
- `POST /api/contacts` - Create a new contact

## Database

The application uses SQLite for data storage. The database file is created at `server/db/contacts.db` when the server starts for the first time.

### Contact Schema

| Field     | Type     | Description                      |
|-----------|----------|----------------------------------|
| id        | INTEGER  | Primary key, auto-incrementing   |
| name      | TEXT     | Contact's full name (required)   |
| email     | TEXT     | Email address (required)         |
| phone     | TEXT     | Phone number (optional)          |
| company   | TEXT     | Company name (required)          |
| message   | TEXT     | Contact message (required)       |
| created_at| TIMESTAMP| Timestamp of submission          | 