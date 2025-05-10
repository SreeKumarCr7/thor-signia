# Thor Signia Website

## Overview

This is the codebase for the Thor Signia website, a React-based frontend with an Express backend for handling contact form submissions.

## Features

- Modern React frontend with TailwindCSS
- Express.js backend with SQLite database
- Contact form with secure email notifications
- Form submission backups for data security
- Ready for Vercel deployment

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   # Frontend only
   npm run dev
   
   # Backend only
   npm run server
   
   # Frontend and backend together
   npm run dev:full
   ```

4. Build for production:
   ```bash
   npm run build
   ```

## Backend API

The backend provides the following endpoints:

- `POST /api/contacts` - Create a new contact submission (Form submissions)

## Database & Storage

The application uses multiple layers of storage to ensure data is not lost:

1. **SQLite Database**:
   - In development: File-based SQLite database at `server/db/contacts.db`
   - In Vercel production: In-memory SQLite database

2. **Email Notifications**:
   - Each form submission sends a detailed email notification
   - Ensures you receive all submissions even if database resets

3. **Local Backup (Development only)**:
   - JSON file backup stored in `server/data/contact_submissions.json`
   - Not available in Vercel production due to read-only filesystem

## Vercel Deployment

This project is configured for serverless deployment on Vercel:

1. Push this repository to GitHub

2. Connect the GitHub repository to Vercel:
   - Go to [Vercel](https://vercel.com)
   - Import your repository
   - Configure environment variables (see below)
   - Deploy

## Environment Variables for Vercel

Configure these environment variables in your Vercel project:

```
# Vercel Configuration
VERCEL=1
NODE_ENV=production

# Email Configuration
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-email@example.com
EMAIL_PASS=your-password
EMAIL_FROM=noreply@thorsignia.in
EMAIL_TO=your-notification-email@example.com
```

## Project Structure

- `/src` - Frontend React code
- `/server` - Backend Express code
  - `/db` - Database setup and SQLite file
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

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/34c9545e-c265-4af1-aca5-2ea740a0cf05) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
