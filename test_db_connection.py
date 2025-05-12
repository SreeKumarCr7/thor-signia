"""
This script tests the connection to the PostgreSQL database 
using the DATABASE_URL environment variable.
"""

import os
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

def test_database_connection():
    """Test the connection to the database and show the URL being used."""
    try:
        # Create the Flask app with the database configuration
        app = create_app()
        
        # Print the SQLAlchemy database URL being used
        db_url = app.config['SQLALCHEMY_DATABASE_URI']
        masked_url = db_url
        
        # Mask password in the URL for security before logging
        if 'postgresql://' in db_url:
            try:
                # Find password part in URL and mask it
                user_pass_part = db_url.split('@')[0].split('://')[-1]
                if ':' in user_pass_part:
                    user, password = user_pass_part.split(':', 1)
                    masked_url = db_url.replace(f"{user}:{password}", f"{user}:****")
            except Exception:
                # If parsing fails, mask entire URL except protocol and ending
                protocol = db_url.split('://')[0]
                masked_url = f"{protocol}://****"
        
        logger.info(f"Database URL: {masked_url}")
        
        # Test if this is PostgreSQL or SQLite
        if 'postgresql://' in db_url:
            logger.info("Using PostgreSQL database")
        elif 'sqlite://' in db_url:
            logger.info("Using SQLite database")
        else:
            logger.info(f"Using database of type: {db_url.split('://')[0]}")
        
        # Test the connection by running a simple query
        with app.app_context():
            # Run a simple query to verify connection works
            db.session.execute(text('SELECT 1'))
            logger.info("Database connection test successful!")
            
            # Count existing contact records
            contact_count = Contact.query.count()
            logger.info(f"Number of contact records in database: {contact_count}")
            
            # List table names
            tables = db.session.execute(text("""
                SELECT table_name FROM information_schema.tables 
                WHERE table_schema = 'public'
            """)).fetchall() if 'postgresql://' in db_url else []
            
            if tables:
                logger.info(f"Tables in database: {', '.join([t[0] for t in tables])}")
            
        return True
        
    except Exception as e:
        logger.error(f"Database connection test failed: {e}")
        return False

if __name__ == "__main__":
    test_database_connection() 