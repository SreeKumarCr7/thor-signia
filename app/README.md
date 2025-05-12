# Thor Signia Flask Backend

This directory contains the Flask backend for the Thor Signia website.

## Structure

- `/models` - Database models using SQLAlchemy
- `/routes` - API routes for handling requests
- `/services` - Backend services like email notifications
- `/config` - Configuration settings
- `/data` - Local backup storage (development only)

## Features

- Contact form submission handling
- Railway PostgreSQL database integration
- Email notifications for form submissions
- Local backup for development environments

## Setup

1. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

2. Set up environment variables (copy .env.example to .env and modify)

3. Run the development server:
   ```bash
   python app.py
   ```

## API Endpoints

- `POST /api/contacts` - Submit a new contact form
- `GET /api/contacts/health` - Health check endpoint

## Database

The application supports two database types:

1. **SQLite** (development): Automatically created as `app/contacts.db`
2. **PostgreSQL** (production): Configured via the `DATABASE_URL` environment variable

## Email Notifications

Configure email settings in your environment variables to enable notification emails for each form submission. 