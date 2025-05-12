"""
This script sets up the database tables for Thor Signia.
It uses the Flask app context to create all tables defined in the models.
"""

from app import create_app, db
from app.models.contact import Contact
import logging

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s [%(levelname)s]: %(message)s',
    datefmt='%Y-%m-%d %H:%M:%S'
)
logger = logging.getLogger(__name__)

def setup_database():
    """Create all tables in the database."""
    try:
        # Create the Flask app
        app = create_app()
        
        # Get the database URL being used
        db_url = app.config['SQLALCHEMY_DATABASE_URI']
        logger.info(f"Using database: {db_url if 'sqlite' in db_url else db_url.split('@')[0] + '@...'}") 
        
        # Create all tables within the app context
        with app.app_context():
            # Create tables
            db.create_all()
            logger.info("Database tables created successfully!")
            
            # Count contact records
            contact_count = Contact.query.count()
            logger.info(f"Current contact records in database: {contact_count}")
    
    except Exception as e:
        logger.error(f"Failed to set up database: {e}")

if __name__ == "__main__":
    setup_database() 