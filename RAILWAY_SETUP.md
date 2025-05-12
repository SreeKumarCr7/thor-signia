# Railway PostgreSQL Setup for Thor Signia

This document provides step-by-step instructions for setting up a Railway PostgreSQL database for the Thor Signia contact form.

## Prerequisites

- A Railway account (sign up at [railway.app](https://railway.app) if you don't have one)
- Git repository for the Thor Signia project connected to Railway
- Basic understanding of PostgreSQL and environment variables

## Step 1: Create a PostgreSQL Database on Railway

1. Sign in to your Railway account at [railway.app](https://railway.app)
2. Navigate to your Thor Signia project (or create a new project)
3. Click "New" and select "Database" → "PostgreSQL"
4. Wait for the database to be provisioned (this might take a few minutes)

## Step 2: Get the Database Connection Information

Once your PostgreSQL database is provisioned, you'll need its connection details:

1. Click on the PostgreSQL database in your Railway dashboard
2. Navigate to the "Connect" tab
3. You'll see the connection information including:
   - Database URL (`DATABASE_URL`)
   - Individual connection parameters:
     - Username (`POSTGRES_USER`)
     - Password (`POSTGRES_PASSWORD`)
     - Host (`PGHOST`)
     - Port (`PGPORT`) 
     - Database name (`POSTGRES_DB`)

## Step 3: Configure Environment Variables

Railway automatically makes environment variables available to your application, but you have three options for setting up your connection:

### Option A: Use Railway's Automatic Environment Variables
Railway automatically adds your database connection details to your project's environment. No additional configuration is needed.

### Option B: Manually Add the DATABASE_URL Variable
1. In your Railway project dashboard, select your web service
2. Go to the "Variables" tab
3. Add the `DATABASE_URL` from your PostgreSQL service

### Option C: Set Individual Connection Parameters 
Alternatively, you can set individual connection parameters:
- `POSTGRES_USER`
- `POSTGRES_PASSWORD`
- `PGHOST`
- `PGPORT`
- `POSTGRES_DB`

## Step 4: Set Up the Database Tables

Use the provided setup script to create the necessary tables in your Railway PostgreSQL database.

### Run Locally (for testing):
```bash
# Export the database URL to your environment
export DATABASE_URL="your_railway_postgresql_url"

# Run the setup script
python setup_railway_db.py
```

### Run in Railway:
Railway will automatically set up the database using the scripts defined in the project.

## Step 5: Migrate Existing Data (Optional)

If you have existing contact data in SQLite that you want to migrate to PostgreSQL:

```bash
python setup_railway_db.py --migrate
```

## Verifying the Setup

To verify that your database is properly configured and connected:

```bash
python test_postgres_connection.py
```

## Troubleshooting

### Connection Issues
- Ensure the `DATABASE_URL` format is correct (should start with `postgresql://`)
- Check if your network allows connections to the Railway PostgreSQL server
- Verify that PostgreSQL is properly provisioned in Railway

### Data Persistence
- Railway PostgreSQL databases are persistent by default
- Make regular backups of important data

### SSL Issues
- Railway PostgreSQL connections use SSL by default
- Ensure your application's PostgreSQL client supports SSL connections

## Using the Railway PostgreSQL Database

The application is already configured to use the Railway PostgreSQL database when the appropriate environment variables are set. The database connection setup happens in `app/__init__.py`.

When the contact form is submitted, the data will be saved to your Railway PostgreSQL database instead of the local SQLite database.

## Testing the Contact Form

After setting up the Railway PostgreSQL database, test the contact form by:

1. Visiting the contact page at `https://your-website.com/contact`
2. Filling out and submitting the form
3. Verifying that the data appears in your Railway PostgreSQL database

You can check the database contents using the Railway dashboard's SQL editor feature. 