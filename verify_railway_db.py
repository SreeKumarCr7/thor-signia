"""
Verification script for the Railway PostgreSQL database connection.
This script tests the connection to the Railway database and checks the contacts table.
"""

import os
import sys
import logging
import psycopg2
from psycopg2 import sql
from dotenv import load_dotenv

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s [%(levelname)s]: %(message)s',
    datefmt='%Y-%m-%d %H:%M:%S'
)
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()

def verify_railway_database():
    """Verify the Railway PostgreSQL database connection and check the contacts table."""
    
    # Get the database URL from environment variables
    database_url = os.getenv('DATABASE_URL')
    
    if not database_url:
        # Try to construct database URL from individual components
        pg_user = os.getenv('POSTGRES_USER')
        pg_password = os.getenv('POSTGRES_PASSWORD')
        pg_host = os.getenv('PGHOST')
        pg_port = os.getenv('PGPORT')
        pg_db = os.getenv('POSTGRES_DB')
        
        if all([pg_user, pg_password, pg_host, pg_port, pg_db]):
            import urllib.parse
            encoded_password = urllib.parse.quote_plus(pg_password)
            database_url = f"postgresql://{pg_user}:{encoded_password}@{pg_host}:{pg_port}/{pg_db}"
            logger.info(f"Constructed database URL from environment variables. Host: {pg_host}")
        else:
            logger.error("DATABASE_URL environment variable not set and individual connection parameters are incomplete")
            return False
    
    try:
        # Parse the database URL
        if database_url.startswith('postgresql://'):
            # Remove the protocol part
            db_url_no_protocol = database_url.replace('postgresql://', '')
        
        # Split credentials and host information
        if '@' in db_url_no_protocol:
            credentials, host_info = db_url_no_protocol.split('@')
            if ':' in credentials:
                user, password = credentials.split(':')
            else:
                user = credentials
                password = ""
            
            # Parse host and database
            if '/' in host_info:
                host_port, database = host_info.split('/')
                
                if ':' in host_port:
                    host, port = host_port.split(':')
                else:
                    host = host_port
                    port = "5432"  # Default PostgreSQL port
            else:
                host = host_info
                database = "postgres"  # Default database name
                port = "5432"  # Default PostgreSQL port
        else:
            logger.error("Invalid database URL format")
            return False
        
        # Connect to PostgreSQL
        logger.info(f"Connecting to PostgreSQL at {host}:{port}/{database}...")
        
        # Create connection parameters
        conn_params = {
            'host': host,
            'port': port,
            'user': user,
            'password': password,
            'database': database
        }
        
        # Connect to the database
        conn = psycopg2.connect(**conn_params)
        conn.autocommit = True
        
        logger.info("Successfully connected to Railway PostgreSQL database")
        
        # Check if contacts table exists
        with conn.cursor() as cursor:
            cursor.execute("""
                SELECT EXISTS (
                    SELECT FROM information_schema.tables 
                    WHERE table_name = 'contact'
                );
            """)
            table_exists = cursor.fetchone()[0]
            
            if table_exists:
                logger.info("Contacts table exists in the database")
                
                # Count contacts in the table
                cursor.execute("SELECT COUNT(*) FROM contact;")
                count = cursor.fetchone()[0]
                logger.info(f"Number of contact records in the database: {count}")
                
                # Get the most recent contacts (up to 5)
                cursor.execute("""
                    SELECT id, name, email, phone, company, created_at
                    FROM contact
                    ORDER BY created_at DESC
                    LIMIT 5;
                """)
                recent_contacts = cursor.fetchall()
                
                if recent_contacts:
                    logger.info("Most recent contacts:")
                    for contact in recent_contacts:
                        logger.info(f"ID: {contact[0]}, Name: {contact[1]}, Email: {contact[2]}, Created: {contact[5]}")
                else:
                    logger.info("No contact records found in the database")
            else:
                logger.warning("Contacts table does not exist in the database")
                
                # Create the contacts table
                logger.info("Creating contacts table...")
                cursor.execute("""
                    CREATE TABLE contact (
                        id SERIAL PRIMARY KEY,
                        name VARCHAR(100) NOT NULL,
                        email VARCHAR(120) NOT NULL,
                        phone VARCHAR(20),
                        company VARCHAR(100) NOT NULL,
                        message TEXT NOT NULL,
                        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
                    );
                """)
                logger.info("Successfully created contacts table")
        
        # Close the connection
        conn.close()
        logger.info("Database connection closed")
        
        return True
        
    except Exception as e:
        logger.error(f"Error verifying Railway database: {e}")
        return False

if __name__ == "__main__":
    if verify_railway_database():
        logger.info("Railway database verification completed successfully")
        sys.exit(0)
    else:
        logger.error("Railway database verification failed")
        sys.exit(1) 