# Thor Signia Website

## Overview

This is the codebase for the Thor Signia website, a React-based frontend with a Flask Python backend for handling contact form submissions.

## Features

- Modern React frontend with TailwindCSS
- Flask backend with PostgreSQL database
- Contact form with secure email notifications
- Form submission backups for data security
- Ready for Vercel/Railway deployment

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Python 3.8 or higher
- pip

### Installation

1. Clone the repository
2. Install frontend dependencies:
   ```bash
   npm install
   ```

3. Install backend dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Run the development server:
   ```bash
   # Frontend only
   npm run dev
   
   # Backend only
   python app.py
   
   # For both, run each in separate terminals
   ```

5. Build for production:
   ```bash
   npm run build
   ```

## Backend API

The backend provides the following endpoints:

- `POST /api/contacts` - Create a new contact submission (Form submissions)
- `GET /api/contacts/health` - Health check endpoint

## Database & Storage

The application uses multiple layers of storage to ensure data is not lost:

1. **PostgreSQL Database**:
   - In development: Local SQLite database
   - In production: Railway PostgreSQL database

2. **Email Notifications**:
   - Each form submission sends a detailed email notification
   - Ensures you receive all submissions even if database resets

3. **Local Backup (Development only)**:
   - JSON file backup stored in `app/data/contact_submissions.json`
   - Not available in production due to read-only filesystem

## Railway Deployment

This project is configured for deployment on Railway:

1. Push this repository to GitHub

2. Connect the GitHub repository to Railway:
   - Go to [Railway](https://railway.app)
   - Import your repository
   - Configure environment variables (see below)
   - Deploy

## Environment Variables

Configure these environment variables in your Railway project:

```
# Flask Configuration
FLASK_ENV=production
PORT=5000

# Email Configuration
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-email@example.com
EMAIL_PASS=your-password
EMAIL_FROM=noreply@thorsignia.in
EMAIL_TO=your-notification-email@example.com

# Database Configuration (will be set automatically by Railway)
DATABASE_URL=postgresql://...
```

## Project Structure

- `/src` - Frontend React code
- `/app` - Backend Flask code
  - `/models` - Database models
  - `/routes` - API routes
  - `/services` - Backend services (email, backup)
  - `/data` - Local backup storage (development only)
- `/public` - Static assets
- `/dist` - Built frontend (after running `npm run build`)

# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/34c9545e-c265-4af1-aca5-2ea740a0cf05

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/34c9545e-c265-4af1-aca5-2ea740a0cf05) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Install Python dependencies
pip install -r requirements.txt

# Step 5: Start the development server with auto-reloading and an instant preview.
npm run dev
# In another terminal
python app.py
```

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Flask
- PostgreSQL/SQLite

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/34c9545e-c265-4af1-aca5-2ea740a0cf05) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
