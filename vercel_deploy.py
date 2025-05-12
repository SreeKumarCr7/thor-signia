"""
This script is run during Vercel deployment to set up the database.
It initializes the Railway PostgreSQL database, creates tables, and performs any necessary migrations.
"""

import os
import logging
import sys
from dotenv import load_dotenv

# Add the parent directory to the path so we can import from app
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s [%(levelname)s]: %(message)s',
    datefmt='%Y-%m-%d %H:%M:%S'
)
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()

def setup_database():
    """Set up the database during deployment."""
    try:
        logger.info("Starting database setup during deployment...")
        
        # Check for DATABASE_URL environment variable
        database_url = os.getenv('DATABASE_URL')
        
        if not database_url:
            logger.warning("DATABASE_URL not found. Checking for individual connection parameters...")
            
            # Check for individual PostgreSQL connection parameters
            pg_user = os.getenv('POSTGRES_USER')
            pg_password = os.getenv('POSTGRES_PASSWORD')
            pg_host = os.getenv('PGHOST')
            pg_port = os.getenv('PGPORT')
            pg_db = os.getenv('POSTGRES_DB')
            
            if all([pg_user, pg_password, pg_host, pg_port, pg_db]):
                import urllib.parse
                
                # URL encode the password to handle special characters
                encoded_password = urllib.parse.quote_plus(pg_password)
                database_url = f"postgresql://{pg_user}:{encoded_password}@{pg_host}:{pg_port}/{pg_db}"
                logger.info(f"Constructed database URL from environment variables. Host: {pg_host}")
            else:
                logger.warning("Individual PostgreSQL connection parameters not found or incomplete.")
                logger.info("Falling back to SQLite for this deployment.")
                return
        
        # Run the database setup script with the DATABASE_URL
        from setup_railway_db import connect_to_postgres, create_contacts_table
        
        # Connect to PostgreSQL
        conn = connect_to_postgres(database_url)
        
        # Create tables
        if create_contacts_table(conn):
            logger.info("Database tables created successfully!")
        
        # Close connection
        conn.close()
        logger.info("Database setup completed.")
        
    except Exception as e:
        logger.error(f"Error setting up database: {e}")
        # Don't fail the deployment if database setup fails
        return

if __name__ == "__main__":
    setup_database() 