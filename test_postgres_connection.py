"""
Test script to verify the PostgreSQL connection using individual environment variables.
This script temporarily sets the environment variables to match what's configured in Vercel.
"""

import os
import sys
import logging
from app import create_app, db
from app.models.contact import Contact
from sqlalchemy import text

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s [%(levelname)s]: %(message)s',
    datefmt='%Y-%m-%d %H:%M:%S'
)
logger = logging.getLogger(__name__)

# Set the Railway PostgreSQL environment variables for testing
os.environ['POSTGRES_DB'] = 'railway'
os.environ['POSTGRES_PASSWORD'] = 'eQrizxGBFtXTBDLrNFDdtpudHbAfcKRb'
os.environ['POSTGRES_USER'] = 'postgres'
os.environ['PGHOST'] = 'centerbeam.proxy.rlwy.net'
os.environ['PGPORT'] = '53009'

def test_postgresql_connection():
    """Test the connection to the PostgreSQL database."""
    try:
        # Create the Flask app with the database configuration
        app = create_app()
        
        # Get the database URL that was constructed
        db_url = app.config['SQLALCHEMY_DATABASE_URI']
        
        # Create a masked version for logging (hide password)
        if 'postgresql://' in db_url:
            try:
                parts = db_url.split('@')
                auth = parts[0].split('://')
                protocol = auth[0]
                credentials = auth[1].split(':')
                user = credentials[0]
                masked_url = f"{protocol}://{user}:****@{parts[1]}"
            except Exception:
                masked_url = "postgresql://****"
        else:
            masked_url = db_url
            
        logger.info(f"Database URL: {masked_url}")
        
        # Test the connection by running a simple query
        with app.app_context():
            # Run a simple query to verify connection works
            try:
                db.session.execute(text('SELECT 1'))
                logger.info("PostgreSQL connection test successful!")
                
                # Create tables if they don't exist
                db.create_all()
                logger.info("Database tables created or verified")
                
                # Count existing contact records
                contact_count = Contact.query.count()
                logger.info(f"Number of contact records in database: {contact_count}")
                
                # List all tables in the database
                tables = db.session.execute(text("""
                    SELECT table_name FROM information_schema.tables 
                    WHERE table_schema = 'public'
                """)).fetchall()
                
                if tables:
                    logger.info(f"Tables in database: {', '.join([t[0] for t in tables])}")
                else:
                    logger.info("No tables found in database")
                
                return True
            except Exception as e:
                logger.error(f"Database query failed: {e}")
                return False
        
    except Exception as e:
        logger.error(f"Database connection test failed: {e}")
        return False

if __name__ == "__main__":
    test_postgresql_connection() 